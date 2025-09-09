"""
IoT Device Simulator for Smart Tourist Safety System
This module simulates wearable devices that can transmit location and health metrics
"""

import json
import time
import random
from datetime import datetime, timedelta
import paho.mqtt.client as mqtt
from cryptography.fernet import Fernet
import base64
import hashlib

class WearableDevice:
    """
    Simulates a wearable device for tourist safety monitoring
    """
    
    def __init__(self, device_id, tourist_id, encryption_key=None):
        self.device_id = device_id
        self.tourist_id = tourist_id
        self.encryption_key = encryption_key or Fernet.generate_key()
        self.cipher = Fernet(self.encryption_key)
        self.is_active = True
        self.battery_level = 100
        self.last_heartbeat = datetime.now()
        
        # Device capabilities
        self.has_gps = True
        self.has_heart_rate = True
        self.has_sos_button = True
        self.waterproof = True
        
    def get_location(self):
        """
        Simulate GPS location data
        """
        # Simulate movement around a central point (e.g., tourist location)
        base_lat = 28.6139 + random.uniform(-0.1, 0.1)  # Near Delhi
        base_lng = 77.2090 + random.uniform(-0.1, 0.1)
        
        return {
            "latitude": round(base_lat + random.uniform(-0.001, 0.001), 6),
            "longitude": round(base_lng + random.uniform(-0.001, 0.001), 6),
            "altitude": random.randint(200, 300),
            "accuracy": random.randint(3, 10),
            "timestamp": datetime.now().isoformat()
        }
    
    def get_health_metrics(self):
        """
        Simulate health metrics data
        """
        return {
            "heart_rate": random.randint(60, 100),
            "body_temperature": round(random.uniform(36.5, 37.5), 1),
            "steps": random.randint(0, 10000),
            "calories": random.randint(0, 500),
            "timestamp": datetime.now().isoformat()
        }
    
    def encrypt_data(self, data):
        """
        Encrypt data before transmission
        """
        data_str = json.dumps(data)
        encrypted_data = self.cipher.encrypt(data_str.encode())
        return base64.b64encode(encrypted_data).decode()
    
    def decrypt_data(self, encrypted_data):
        """
        Decrypt received data
        """
        encrypted_bytes = base64.b64decode(encrypted_data.encode())
        decrypted_data = self.cipher.decrypt(encrypted_bytes)
        return json.loads(decrypted_data.decode())
    
    def generate_heartbeat(self):
        """
        Generate device heartbeat data
        """
        self.battery_level = max(0, self.battery_level - random.uniform(0.1, 0.5))
        self.last_heartbeat = datetime.now()
        
        return {
            "device_id": self.device_id,
            "tourist_id": self.tourist_id,
            "battery_level": round(self.battery_level, 2),
            "signal_strength": random.randint(-90, -50),
            "is_active": self.is_active,
            "timestamp": self.last_heartbeat.isoformat()
        }
    
    def trigger_sos(self):
        """
        Trigger SOS alert
        """
        location = self.get_location()
        health = self.get_health_metrics()
        
        sos_data = {
            "device_id": self.device_id,
            "tourist_id": self.tourist_id,
            "alert_type": "SOS",
            "location": location,
            "health_metrics": health,
            "timestamp": datetime.now().isoformat(),
            "priority": "CRITICAL"
        }
        
        return sos_data

class IoTDeviceManager:
    """
    Manages multiple IoT devices and their communication
    """
    
    def __init__(self, mqtt_broker="localhost", mqtt_port=1883):
        self.devices = {}
        self.mqtt_broker = mqtt_broker
        self.mqtt_port = mqtt_port
        self.mqtt_client = mqtt.Client()
        self.setup_mqtt()
        
    def setup_mqtt(self):
        """
        Set up MQTT client
        """
        def on_connect(client, userdata, flags, rc):
            if rc == 0:
                print("Connected to MQTT broker successfully")
            else:
                print(f"Failed to connect to MQTT broker with code {rc}")
        
        def on_disconnect(client, userdata, rc):
            print("Disconnected from MQTT broker")
        
        self.mqtt_client.on_connect = on_connect
        self.mqtt_client.on_disconnect = on_disconnect
        
        try:
            self.mqtt_client.connect(self.mqtt_broker, self.mqtt_port, 60)
            self.mqtt_client.loop_start()
        except Exception as e:
            print(f"Failed to connect to MQTT broker: {e}")
    
    def register_device(self, device_id, tourist_id):
        """
        Register a new wearable device
        """
        if device_id not in self.devices:
            device = WearableDevice(device_id, tourist_id)
            self.devices[device_id] = device
            print(f"Device {device_id} registered for tourist {tourist_id}")
            return device
        else:
            print(f"Device {device_id} already registered")
            return self.devices[device_id]
    
    def unregister_device(self, device_id):
        """
        Unregister a wearable device
        """
        if device_id in self.devices:
            del self.devices[device_id]
            print(f"Device {device_id} unregistered")
            return True
        return False
    
    def transmit_data(self, device_id, data, topic="iot/device/data"):
        """
        Transmit encrypted data from device to MQTT broker
        """
        if device_id in self.devices:
            device = self.devices[device_id]
            encrypted_data = device.encrypt_data(data)
            
            payload = {
                "device_id": device_id,
                "tourist_id": device.tourist_id,
                "data": encrypted_data,
                "timestamp": datetime.now().isoformat()
            }
            
            try:
                self.mqtt_client.publish(topic, json.dumps(payload))
                print(f"Data transmitted from device {device_id}")
                return True
            except Exception as e:
                print(f"Failed to transmit data: {e}")
                return False
        else:
            print(f"Device {device_id} not found")
            return False
    
    def simulate_device_activity(self, device_id, interval=30):
        """
        Simulate regular device activity (location updates, health metrics)
        """
        if device_id in self.devices:
            device = self.devices[device_id]
            
            # Generate and transmit location data
            location_data = {
                "type": "location_update",
                "data": device.get_location()
            }
            self.transmit_data(device_id, location_data, "iot/device/location")
            
            # Generate and transmit health metrics
            health_data = {
                "type": "health_metrics",
                "data": device.get_health_metrics()
            }
            self.transmit_data(device_id, health_data, "iot/device/health")
            
            # Generate and transmit heartbeat
            heartbeat_data = {
                "type": "heartbeat",
                "data": device.generate_heartbeat()
            }
            self.transmit_data(device_id, heartbeat_data, "iot/device/heartbeat")
            
            return True
        return False
    
    def trigger_device_sos(self, device_id):
        """
        Trigger SOS from a specific device
        """
        if device_id in self.devices:
            device = self.devices[device_id]
            sos_data = device.trigger_sos()
            
            # Transmit SOS alert
            self.transmit_data(device_id, sos_data, "iot/device/sos")
            
            print(f"SOS triggered from device {device_id}")
            return sos_data
        return None

# Example usage
if __name__ == "__main__":
    # Initialize device manager
    device_manager = IoTDeviceManager()
    
    # Register a device
    device = device_manager.register_device("device_001", "tourist_12345")
    
    # Simulate device activity
    print("Simulating device activity...")
    device_manager.simulate_device_activity("device_001")
    
    # Trigger SOS
    print("Triggering SOS...")
    sos_alert = device_manager.trigger_device_sos("device_001")
    if sos_alert:
        print(f"SOS Alert: {json.dumps(sos_alert, indent=2)}")
    
    # Keep the simulation running
    try:
        while True:
            time.sleep(30)  # Update every 30 seconds
            device_manager.simulate_device_activity("device_001")
    except KeyboardInterrupt:
        print("Simulation stopped")
        device_manager.mqtt_client.loop_stop()
        device_manager.mqtt_client.disconnect()