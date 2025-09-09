"""
IoT API Service for Smart Tourist Safety System
This module provides RESTful APIs for IoT device management and data integration
"""

from flask import Flask, request, jsonify
from iot.data_processor import IoTDataProcessor
from iot.device_simulator import IoTDeviceManager
import json
import base64
from cryptography.fernet import Fernet

app = Flask(__name__)

# Initialize IoT components
data_processor = IoTDataProcessor()
device_manager = IoTDeviceManager()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "IoT Integration Service",
        "version": "1.0.0"
    })

@app.route('/devices', methods=['POST'])
def register_device():
    """Register a new IoT device"""
    try:
        data = request.get_json()
        device_id = data.get('device_id')
        tourist_id = data.get('tourist_id')
        encryption_key = data.get('encryption_key')
        
        if not device_id or not tourist_id:
            return jsonify({
                "error": "Missing device_id or tourist_id"
            }), 400
        
        # If no encryption key provided, generate one
        if not encryption_key:
            encryption_key = Fernet.generate_key().decode()
        
        # Register device
        data_processor.register_device(device_id, tourist_id, encryption_key)
        
        return jsonify({
            "status": "success",
            "device_id": device_id,
            "tourist_id": tourist_id,
            "encryption_key": encryption_key
        })
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to register device: {str(e)}"
        }), 500

@app.route('/devices/<device_id>', methods=['DELETE'])
def unregister_device(device_id):
    """Unregister an IoT device"""
    try:
        # In a real implementation, this would remove the device from the system
        return jsonify({
            "status": "success",
            "message": f"Device {device_id} unregistered"
        })
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to unregister device: {str(e)}"
        }), 500

@app.route('/devices/<device_id>/data', methods=['POST'])
def receive_device_data(device_id):
    """Receive data from an IoT device"""
    try:
        data = request.get_json()
        tourist_id = data.get('tourist_id')
        encrypted_data = data.get('data')
        data_type = data.get('type', 'generic')
        
        if not tourist_id or not encrypted_data:
            return jsonify({
                "error": "Missing tourist_id or data"
            }), 400
        
        # Store the data (it will be processed by the data processor)
        data_processor.store_raw_data(device_id, tourist_id, data_type, encrypted_data)
        
        return jsonify({
            "status": "success",
            "message": "Data received and queued for processing"
        })
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to receive device data: {str(e)}"
        }), 500

@app.route('/devices/<device_id>/sos', methods=['POST'])
def trigger_sos(device_id):
    """Trigger SOS from a device"""
    try:
        # In a real implementation, this would trigger an SOS alert
        # For now, we'll simulate it
        sos_data = {
            "device_id": device_id,
            "alert_type": "SOS",
            "timestamp": "2025-09-08T10:00:00Z",
            "priority": "CRITICAL"
        }
        
        # Publish to MQTT for processing
        data_processor.mqtt_client.publish("iot/device/sos", json.dumps(sos_data))
        
        return jsonify({
            "status": "success",
            "message": "SOS alert triggered",
            "alert_id": "ALERT_" + device_id
        })
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to trigger SOS: {str(e)}"
        }), 500

@app.route('/devices/<device_id>/status', methods=['GET'])
def get_device_status(device_id):
    """Get device status"""
    try:
        # In a real implementation, this would fetch actual device status
        # For now, we'll return simulated data
        status = {
            "device_id": device_id,
            "is_active": True,
            "battery_level": 85,
            "signal_strength": -75,
            "last_heartbeat": "2025-09-08T10:00:00Z",
            "location": {
                "latitude": 28.6139,
                "longitude": 77.2090,
                "accuracy": 5
            }
        }
        
        return jsonify({
            "status": "success",
            "data": status
        })
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to get device status: {str(e)}"
        }), 500

@app.route('/alerts', methods=['GET'])
def get_recent_alerts():
    """Get recent IoT alerts"""
    try:
        # In a real implementation, this would fetch alerts from a database
        # For now, we'll return simulated data
        alerts = [
            {
                "alert_id": "ALERT_001",
                "device_id": "device_001",
                "tourist_id": "tourist_12345",
                "alert_type": "SOS",
                "timestamp": "2025-09-08T10:00:00Z",
                "priority": "CRITICAL",
                "status": "ACTIVE"
            },
            {
                "alert_id": "ALERT_002",
                "device_id": "device_002",
                "tourist_id": "tourist_67890",
                "alert_type": "LOW_BATTERY",
                "timestamp": "2025-09-08T09:30:00Z",
                "priority": "MEDIUM",
                "status": "RESOLVED"
            }
        ]
        
        return jsonify({
            "status": "success",
            "data": alerts,
            "count": len(alerts)
        })
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to get alerts: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)