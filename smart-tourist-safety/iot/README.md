# IoT Integration Framework

This directory contains the IoT integration framework for the Smart Tourist Safety Monitoring & Incident Response System.

## Overview

The IoT framework enables integration with wearable devices that can:
- Continuously transmit location data
- Monitor basic health metrics (heart rate, body temperature)
- Include a physical, waterproof manual SOS button
- Extend connectivity beyond smartphone-dependent areas

## Components

### 1. Device Simulator ([device_simulator.py](device_simulator.py))
Simulates wearable devices with the following capabilities:
- GPS location tracking
- Health metrics monitoring
- SOS button functionality
- Device heartbeat signals
- Data encryption for secure transmission

### 2. Data Processor ([data_processor.py](data_processor.py))
Processes incoming data from wearable devices:
- Decrypts encrypted data
- Stores raw data in database
- Handles SOS alerts
- Processes location updates
- Monitors health metrics
- Manages device heartbeats

### 3. API Service ([api_service.py](api_service.py))
Provides RESTful APIs for IoT device management:
- Device registration/unregistration
- Data ingestion
- SOS triggering
- Device status monitoring
- Alert retrieval

## Architecture

```
Wearable Devices → MQTT Broker → Data Processor → Main System
       ↑              ↑              ↑              ↑
  Device Simulator    |         API Service    Backend Integration
                      |
                 IoT Data Flow
```

## Data Flow

1. **Device Registration**: Devices register with the system and receive encryption keys
2. **Data Collection**: Devices collect location and health data
3. **Data Encryption**: Data is encrypted before transmission
4. **Data Transmission**: Encrypted data is sent via MQTT
5. **Data Processing**: Data processor decrypts and processes incoming data
6. **Alert Generation**: Critical events trigger alerts in the main system
7. **System Integration**: Processed data is integrated with the main safety system

## API Endpoints

### Health Check
```
GET /health
```

### Device Management
```
POST /devices
{
  "device_id": "device_001",
  "tourist_id": "tourist_12345",
  "encryption_key": "optional_encryption_key"
}

DELETE /devices/{device_id}
```

### Data Ingestion
```
POST /devices/{device_id}/data
{
  "tourist_id": "tourist_12345",
  "data": "encrypted_data",
  "type": "location|health|heartbeat|sos"
}
```

### SOS Triggering
```
POST /devices/{device_id}/sos
```

### Device Status
```
GET /devices/{device_id}/status
```

### Alert Retrieval
```
GET /alerts
```

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Start the API service:
```bash
python api_service.py
```

The API will be available at `http://localhost:5002`

3. Start the data processor:
```bash
python data_processor.py
```

## Integration with Main System

The IoT system integrates with the main backend through:
1. MQTT messaging for real-time data flow
2. RESTful APIs for device management
3. Database sharing for persistent data storage

### Example Integration in Node.js:
```javascript
const axios = require('axios');

// Register a new device
async function registerDevice(deviceId, touristId) {
  try {
    const response = await axios.post('http://localhost:5002/devices', {
      device_id: deviceId,
      tourist_id: touristId
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to register device:', error);
    return null;
  }
}

// Handle SOS alerts
async function handleSOSAlert(alertData) {
  // Create incident in main system
  await createIncident({
    type: 'IoT SOS Alert',
    location: alertData.location,
    priority: 'CRITICAL',
    description: `SOS alert from wearable device ${alertData.device_id}`
  });
}
```

## Security Features

1. **End-to-End Encryption**: All data is encrypted before transmission
2. **Device Authentication**: Devices must register before sending data
3. **Secure Key Management**: Encryption keys are securely stored and managed
4. **Data Integrity**: Message authentication ensures data hasn't been tampered with

## Future Enhancements

1. **Bluetooth Low Energy (BLE) Integration**: Direct device communication
2. **Edge Computing**: On-device processing for faster response times
3. **Advanced Health Monitoring**: Integration with medical-grade sensors
4. **Offline Mode**: Local data storage when connectivity is lost
5. **Machine Learning**: Predictive analytics for health and safety patterns