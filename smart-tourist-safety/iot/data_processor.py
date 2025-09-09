"""
IoT Data Processor for Smart Tourist Safety System
This module processes data received from wearable devices
"""

import json
import paho.mqtt.client as mqtt
from datetime import datetime
from cryptography.fernet import Fernet
import base64
import sqlite3
from threading import Thread
import time

class IoTDataProcessor:
    """
    Processes IoT data from wearable devices
    """
    
    def __init__(self, mqtt_broker="localhost", mqtt_port=1883, db_path="iot_data.db"):
        self.mqtt_broker = mqtt_broker
        self.mqtt_port = mqtt_port
        self.db_path = db_path
        self.mqtt_client = mqtt.Client()
        self.device_keys = {}  # Store encryption keys for devices
        self.setup_database()
        self.setup_mqtt()
        
    def setup_database(self):
        """
        Set up SQLite database for storing IoT data
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create tables
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS device_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                device_id TEXT,
                tourist_id TEXT,
                data_type TEXT,
                data TEXT,
                timestamp TEXT,
                processed BOOLEAN DEFAULT FALSE
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS device_registry (
                device_id TEXT PRIMARY KEY,
                tourist_id TEXT,
                encryption_key TEXT,
                registered_at TEXT
            )
        ''')
        
        conn.commit()
        conn.close()
        print("Database setup completed")
    
    def setup_mqtt(self):
        """
        Set up MQTT client for receiving data
        """
        def on_connect(client, userdata, flags, rc):
            if rc == 0:
                print("IoT Data Processor connected to MQTT broker")
                # Subscribe to relevant topics
                client.subscribe("iot/device/location")
                client.subscribe("iot/device/health")
                client.subscribe("iot/device/heartbeat")
                client.subscribe("iot/device/sos")
                client.subscribe("iot/device/data")
            else:
                print(f"Failed to connect to MQTT broker with code {rc}")
        
        def on_message(client, userdata, msg):
            try:
                payload = json.loads(msg.payload.decode())
                self.process_incoming_data(payload, msg.topic)
            except Exception as e:
                print(f"Error processing message: {e}")
        
        self.mqtt_client.on_connect = on_connect
        self.mqtt_client.on_message = on_message
        
        try:
            self.mqtt_client.connect(self.mqtt_broker, self.mqtt_port, 60)
        except Exception as e:
            print(f"Failed to connect to MQTT broker: {e}")
    
    def register_device(self, device_id, tourist_id, encryption_key):
        """
        Register a device in the system
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO device_registry 
            (device_id, tourist_id, encryption_key, registered_at)
            VALUES (?, ?, ?, ?)
        ''', (device_id, tourist_id, encryption_key, datetime.now().isoformat()))
        
        conn.commit()
        conn.close()
        
        # Store in memory for quick access
        self.device_keys[device_id] = encryption_key
        print(f"Device {device_id} registered for tourist {tourist_id}")
    
    def get_device_key(self, device_id):
        """
        Get encryption key for a device
        """
        if device_id in self.device_keys:
            return self.device_keys[device_id]
        
        # Fetch from database if not in memory
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT encryption_key FROM device_registry WHERE device_id = ?', (device_id,))
        result = cursor.fetchone()
        conn.close()
        
        if result:
            self.device_keys[device_id] = result[0]
            return result[0]
        return None
    
    def decrypt_data(self, device_id, encrypted_data):
        """
        Decrypt data from a device
        """
        key = self.get_device_key(device_id)
        if not key:
            raise Exception(f"No encryption key found for device {device_id}")
        
        try:
            cipher = Fernet(key.encode())
            encrypted_bytes = base64.b64decode(encrypted_data.encode())
            decrypted_data = cipher.decrypt(encrypted_bytes)
            return json.loads(decrypted_data.decode())
        except Exception as e:
            raise Exception(f"Failed to decrypt data: {e}")
    
    def store_raw_data(self, device_id, tourist_id, data_type, encrypted_data):
        """
        Store raw encrypted data in database
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO device_data 
            (device_id, tourist_id, data_type, data, timestamp)
            VALUES (?, ?, ?, ?, ?)
        ''', (device_id, tourist_id, data_type, encrypted_data, datetime.now().isoformat()))
        
        conn.commit()
        conn.close()
    
    def process_incoming_data(self, payload, topic):
        """
        Process incoming data from MQTT
        """
        try:
            device_id = payload.get("device_id")
            tourist_id = payload.get("tourist_id")
            encrypted_data = payload.get("data")
            timestamp = payload.get("timestamp")
            
            # Store raw data
            data_type = topic.split("/")[-1]  # Extract data type from topic
            self.store_raw_data(device_id, tourist_id, data_type, encrypted_data)
            
            # Decrypt and process data
            try:
                decrypted_data = self.decrypt_data(device_id, encrypted_data)
                print(f"Processed data from {device_id}: {decrypted_data}")
                
                # Handle specific data types
                if data_type == "sos":
                    self.handle_sos_alert(device_id, tourist_id, decrypted_data)
                elif data_type == "location":
                    self.handle_location_update(device_id, tourist_id, decrypted_data)
                elif data_type == "health":
                    self.handle_health_update(device_id, tourist_id, decrypted_data)
                elif data_type == "heartbeat":
                    self.handle_heartbeat(device_id, tourist_id, decrypted_data)
                
                # Mark as processed
                self.mark_data_as_processed(device_id, timestamp)
                
            except Exception as e:
                print(f"Error decrypting data from {device_id}: {e}")
                
        except Exception as e:
            print(f"Error processing incoming data: {e}")
    
    def handle_sos_alert(self, device_id, tourist_id, sos_data):
        """
        Handle SOS alert from device
        """
        print(f"!!! SOS ALERT from device {device_id} for tourist {tourist_id} !!!")
        print(f"SOS Details: {json.dumps(sos_data, indent=2)}")
        
        # In a real implementation, this would:
        # 1. Create an incident in the main system
        # 2. Notify emergency responders
        # 3. Send alerts to emergency contacts
        # 4. Update tourist status in the system
        
        # For demo, we'll just print the alert
        location = sos_data.get("location", {})
        health = sos_data.get("health_metrics", {})
        
        print(f"Location: {location.get('latitude')}, {location.get('longitude')}")
        print(f"Heart Rate: {health.get('heart_rate')} BPM")
        print(f"Body Temperature: {health.get('body_temperature')} °C")
        
        # Publish to alert topic
        alert_payload = {
            "alert_type": "SOS",
            "device_id": device_id,
            "tourist_id": tourist_id,
            "location": location,
            "health_metrics": health,
            "timestamp": datetime.now().isoformat()
        }
        
        self.mqtt_client.publish("iot/alerts/sos", json.dumps(alert_payload))
    
    def handle_location_update(self, device_id, tourist_id, location_data):
        """
        Handle location update from device
        """
        location = location_data.get("data", {})
        print(f"Location update from {device_id}: {location.get('latitude')}, {location.get('longitude')}")
        
        # In a real implementation, this would:
        # 1. Update tourist location in the main system
        # 2. Check geo-fencing rules
        # 3. Feed into AI anomaly detection
        
        # Publish to location updates topic
        update_payload = {
            "device_id": device_id,
            "tourist_id": tourist_id,
            "location": location,
            "timestamp": datetime.now().isoformat()
        }
        
        self.mqtt_client.publish("iot/updates/location", json.dumps(update_payload))
    
    def handle_health_update(self, device_id, tourist_id, health_data):
        """
        Handle health metrics update from device
        """
        health = health_data.get("data", {})
        print(f"Health update from {device_id}: Heart Rate {health.get('heart_rate')} BPM")
        
        # In a real implementation, this would:
        # 1. Monitor for health anomalies
        # 2. Alert if critical thresholds are exceeded
        # 3. Store historical health data
        
        # Check for abnormal heart rate
        heart_rate = health.get("heart_rate", 0)
        if heart_rate > 120 or heart_rate < 50:
            print(f"WARNING: Abnormal heart rate detected: {heart_rate} BPM")
            
            # Publish health alert
            alert_payload = {
                "alert_type": "HEALTH_ANOMALY",
                "device_id": device_id,
                "tourist_id": tourist_id,
                "heart_rate": heart_rate,
                "timestamp": datetime.now().isoformat()
            }
            
            self.mqtt_client.publish("iot/alerts/health", json.dumps(alert_payload))
    
    def handle_heartbeat(self, device_id, tourist_id, heartbeat_data):
        """
        Handle device heartbeat
        """
        heartbeat = heartbeat_data.get("data", {})
        print(f"Heartbeat from {device_id}: Battery {heartbeat.get('battery_level')}%")
        
        # Check for low battery
        battery_level = heartbeat.get("battery_level", 100)
        if battery_level < 20:
            print(f"WARNING: Low battery on device {device_id}: {battery_level}%")
            
            # Publish battery alert
            alert_payload = {
                "alert_type": "LOW_BATTERY",
                "device_id": device_id,
                "tourist_id": tourist_id,
                "battery_level": battery_level,
                "timestamp": datetime.now().isoformat()
            }
            
            self.mqtt_client.publish("iot/alerts/battery", json.dumps(alert_payload))
    
    def mark_data_as_processed(self, device_id, timestamp):
        """
        Mark data as processed in the database
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE device_data 
            SET processed = TRUE 
            WHERE device_id = ? AND timestamp = ?
        ''', (device_id, timestamp))
        
        conn.commit()
        conn.close()
    
    def start_processing(self):
        """
        Start the data processing service
        """
        print("Starting IoT Data Processor...")
        self.mqtt_client.loop_start()
        
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("Stopping IoT Data Processor...")
            self.mqtt_client.loop_stop()
            self.mqtt_client.disconnect()

# Example usage
if __name__ == "__main__":
    # Initialize data processor
    processor = IoTDataProcessor()
    
    # Start processing (this would run in a separate thread in a real application)
    processor_thread = Thread(target=processor.start_processing)
    processor_thread.start()
    
    # Keep the main thread alive
    try:
        processor_thread.join()
    except KeyboardInterrupt:
        print("IoT Data Processor stopped")