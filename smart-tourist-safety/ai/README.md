# AI/ML Anomaly Detection Engine

This directory contains the AI/ML models for the Smart Tourist Safety Monitoring & Incident Response System.

## Overview

The anomaly detection engine implements machine learning models to identify unusual tourist behavior that may indicate distress or safety concerns. The system monitors:

1. **Location Drop-off Detection**: Identifies when a tourist's location signal suddenly stops or drops off in non-urban areas
2. **Prolonged Inactivity Detection**: Detects unusual periods of inactivity compared to the tourist's typical patterns
3. **Route Deviation Detection**: Compares the tourist's actual path against their planned itinerary to identify significant unplanned diversions

## Models

### 1. Location Drop-off Detection
- Uses Isolation Forest algorithm to detect sudden stoppages
- Analyzes location data patterns including time intervals and movement speeds
- Triggers alerts when a tourist's device stops transmitting location data unexpectedly

### 2. Prolonged Inactivity Detection
- Monitors time intervals between location updates
- Compares current inactivity periods to historical patterns
- Flags unusually long periods without movement

### 3. Route Deviation Detection
- Compares actual travel paths with planned itineraries
- Calculates centroid deviations and path length differences
- Identifies significant unplanned diversions from intended routes

## API Endpoints

### Health Check
```
GET /health
```

### Location Drop-off Detection
```
POST /detect/location-dropoff
{
  "location_data": [
    {
      "latitude": 27.175015,
      "longitude": 78.042155,
      "timestamp": "2025-09-08T10:00:00Z"
    },
    ...
  ]
}
```

### Prolonged Inactivity Detection
```
POST /detect/inactivity
{
  "location_data": [...],
  "threshold_minutes": 30
}
```

### Route Deviation Detection
```
POST /detect/route-deviation
{
  "current_path": [...],
  "planned_itinerary": [...]
}
```

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the API server:
```bash
python app.py
```

The API will be available at `http://localhost:5001`

## Training Models

To train the models with historical data:
```
POST /train
{
  "training_data": {
    "location_data": [...]
  }
}
```

## Model Persistence

Save trained models:
```
POST /save-models
{
  "filepath": "models/anomaly_detection_model.pkl"
}
```

Load trained models:
```
POST /load-models
{
  "filepath": "models/anomaly_detection_model.pkl"
}
```

## Integration with Backend

The backend server can integrate with the AI engine by making HTTP requests to the API endpoints:

```javascript
// Example integration in Node.js
const axios = require('axios');

async function detectAnomaly(touristId, locationData) {
  try {
    const response = await axios.post('http://localhost:5001/detect/location-dropoff', {
      location_data: locationData
    });
    
    if (response.data.anomaly) {
      // Trigger alert in the main system
      await triggerAlert(touristId, response.data);
    }
    
    return response.data;
  } catch (error) {
    console.error('Failed to detect anomaly:', error);
    return null;
  }
}
```

## Future Enhancements

1. Integration with real-time streaming data platforms
2. Implementation of deep learning models for more complex pattern recognition
3. Addition of computer vision models for image-based anomaly detection
4. Natural language processing for analyzing tourist communications
5. Federated learning to improve models while preserving privacy