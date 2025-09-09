// Simple Express server to demonstrate backend API for the web application
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 9999; // Changed to 9999 to avoid conflicts

// Middleware
app.use(cors());
app.use(express.json());

// AI Anomaly Detection Integration
const axios = require('axios');

// IoT Integration
const mqtt = require('mqtt');

// Connect to MQTT broker (assuming it's running locally)
const mqttClient = mqtt.connect('mqtt://localhost:1883');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  // Subscribe to IoT alert topics
  mqttClient.subscribe('iot/alerts/sos');
  mqttClient.subscribe('iot/alerts/health');
  mqttClient.subscribe('iot/alerts/battery');
});

mqttClient.on('message', (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    
    // Handle different types of IoT alerts
    if (topic === 'iot/alerts/sos') {
      handleSOSAlert(payload);
    } else if (topic === 'iot/alerts/health') {
      handleHealthAlert(payload);
    } else if (topic === 'iot/alerts/battery') {
      handleBatteryAlert(payload);
    }
  } catch (error) {
    console.error('Error processing MQTT message:', error);
  }
});

// Handle SOS alerts from IoT devices
function handleSOSAlert(alertData) {
  console.log('IoT SOS Alert Received:', alertData);
  
  // Create a new incident in the system
  const newIncident = {
    id: `INC-2025-${Math.floor(100000 + Math.random() * 900000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    location: `${alertData.location.latitude}, ${alertData.location.longitude}`,
    type: 'IoT SOS Alert',
    severity: 'Critical',
    status: 'Active',
    assignedTo: 'IoT_SYSTEM',
    responseTime: '0 min',
    slaStatus: 'Pending',
    dispatchedUnits: [],
    eta: 'Immediate',
    priority: 'Critical',
    reporter: `IoT Device ${alertData.device_id}`,
    description: `SOS alert from wearable device. Heart Rate: ${alertData.health_metrics.heart_rate} BPM, Temperature: ${alertData.health_metrics.body_temperature}°C`
  };
  
  mockIncidents.unshift(newIncident);
  console.log('New incident created from IoT SOS alert');
}

// Handle health alerts from IoT devices
function handleHealthAlert(alertData) {
  console.log('IoT Health Alert Received:', alertData);
  
  // Create a new incident for abnormal health metrics
  if (alertData.heart_rate > 120 || alertData.heart_rate < 50) {
    const newIncident = {
      id: `INC-2025-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      location: 'Unknown (from wearable device)',
      type: 'Health Anomaly Detected',
      severity: 'High',
      status: 'Active',
      assignedTo: 'IoT_SYSTEM',
      responseTime: '0 min',
      slaStatus: 'Pending',
      dispatchedUnits: [],
      eta: 'Immediate',
      priority: 'High',
      reporter: `IoT Device ${alertData.device_id}`,
      description: `Abnormal heart rate detected: ${alertData.heart_rate} BPM`
    };
    
    mockIncidents.unshift(newIncident);
    console.log('New incident created from IoT health alert');
  }
}

// Handle battery alerts from IoT devices
function handleBatteryAlert(alertData) {
  console.log('IoT Battery Alert Received:', alertData);
  
  // Log the alert but don't create an incident unless it's critical
  if (alertData.battery_level < 10) {
    console.log(`CRITICAL: Device ${alertData.device_id} battery critically low: ${alertData.battery_level}%`);
  }
}

// Blockchain integration
// In a real implementation, this would connect to the deployed smart contract
// For now, we'll simulate the blockchain functionality

// Mock data - Enhanced with more India travel related locations
const mockIncidents = [
  {
    id: 'INC-2025-001245',
    timestamp: '2025-09-08 14:30:22',
    location: 'Taj Mahal, Agra',
    type: 'Medical Emergency',
    severity: 'High',
    status: 'Active',
    assignedTo: 'POL-05-AGRA',
    responseTime: '7.2 min',
    slaStatus: 'On Time',
    dispatchedUnits: ['POL-05-AGRA', 'AMB-02-AGRA'],
    eta: '5 min',
    priority: 'Critical',
    reporter: 'John Smith',
    description: 'Tourist suffered heatstroke near the main entrance'
  },
  {
    id: 'INC-2025-001244',
    timestamp: '2025-09-08 14:25:10',
    location: 'Gateway of India, Mumbai',
    type: 'Lost/Harassed',
    severity: 'Medium',
    status: 'In Progress',
    assignedTo: 'POL-12-MUMBAI',
    responseTime: '12.5 min',
    slaStatus: 'Delayed',
    dispatchedUnits: ['POL-12-MUMBAI'],
    eta: 'Arrived',
    priority: 'High',
    reporter: 'Maria Garcia',
    description: 'Tourist reported being harassed by street vendors'
  },
  {
    id: 'INC-2025-001243',
    timestamp: '2025-09-08 14:15:45',
    location: 'Hawa Mahal, Jaipur',
    type: 'Accident',
    severity: 'High',
    status: 'Resolved',
    assignedTo: 'POL-08-JAIPUR',
    responseTime: '8.1 min',
    slaStatus: 'On Time',
    dispatchedUnits: ['POL-08-JAIPUR', 'AMB-05-JAIPUR'],
    eta: 'Resolved',
    priority: 'Medium',
    reporter: 'Yamamoto Takeshi',
    description: 'Tourist had a fall near the main entrance'
  },
  {
    id: 'INC-2025-001242',
    timestamp: '2025-09-08 14:10:33',
    location: 'India Gate, Delhi',
    type: 'Theft',
    severity: 'Low',
    status: 'Active',
    assignedTo: 'POL-15-DELHI',
    responseTime: '5.3 min',
    slaStatus: 'On Time',
    dispatchedUnits: ['POL-15-DELHI'],
    eta: '3 min',
    priority: 'Low',
    reporter: 'Emma Wilson',
    description: 'Tourist reported pickpocketing near the monument'
  },
  {
    id: 'INC-2025-001241',
    timestamp: '2025-09-08 13:45:21',
    location: 'Charminar, Hyderabad',
    type: 'Medical Emergency',
    severity: 'Medium',
    status: 'In Progress',
    assignedTo: 'POL-18-HYDERABAD',
    responseTime: '9.7 min',
    slaStatus: 'On Time',
    dispatchedUnits: ['POL-18-HYDERABAD', 'AMB-07-HYDERABAD'],
    eta: '2 min',
    priority: 'High',
    reporter: 'Robert Johnson',
    description: 'Tourist suffered from food poisoning'
  },
  {
    id: 'INC-2025-001240',
    timestamp: '2025-09-08 13:30:15',
    location: 'Victoria Memorial, Kolkata',
    type: 'Lost Child',
    severity: 'High',
    status: 'Active',
    assignedTo: 'POL-22-KOLKATA',
    responseTime: '6.1 min',
    slaStatus: 'On Time',
    dispatchedUnits: ['POL-22-KOLKATA'],
    eta: '4 min',
    priority: 'Critical',
    reporter: 'Priya Sharma',
    description: 'Local reported lost child near the main entrance'
  }
];

const mockTourists = [
  {
    id: 'DID-2025-001245',
    name: 'John Smith',
    nationality: 'American',
    status: 'Verified',
    issuedBy: 'Tourism Department',
    issuedDate: '2025-09-01',
    expiryDate: '2025-12-31',
    txId: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
    lastVerified: '2025-09-08 14:30:22',
    verificationCount: 12,
    currentLocation: 'Taj Mahal, Agra'
  },
  {
    id: 'DID-2025-001244',
    name: 'Maria Garcia',
    nationality: 'Spanish',
    status: 'Active',
    issuedBy: 'Tourism Department',
    issuedDate: '2025-09-05',
    expiryDate: '2025-12-31',
    txId: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    lastVerified: '2025-09-08 10:15:45',
    verificationCount: 8,
    currentLocation: 'Gateway of India, Mumbai'
  },
  {
    id: 'DID-2025-001243',
    name: 'Yamamoto Takeshi',
    nationality: 'Japanese',
    status: 'Verified',
    issuedBy: 'Tourism Department',
    issuedDate: '2025-09-03',
    expiryDate: '2025-12-31',
    txId: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
    lastVerified: '2025-09-08 09:45:12',
    verificationCount: 15,
    currentLocation: 'Hawa Mahal, Jaipur'
  },
  {
    id: 'DID-2025-001242',
    name: 'Emma Wilson',
    nationality: 'British',
    status: 'Verified',
    issuedBy: 'Tourism Department',
    issuedDate: '2025-09-02',
    expiryDate: '2025-12-31',
    txId: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
    lastVerified: '2025-09-08 14:10:33',
    verificationCount: 7,
    currentLocation: 'India Gate, Delhi'
  },
  {
    id: 'DID-2025-001241',
    name: 'Robert Johnson',
    nationality: 'Canadian',
    status: 'Active',
    issuedBy: 'Tourism Department',
    issuedDate: '2025-09-06',
    expiryDate: '2025-12-31',
    txId: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
    lastVerified: '2025-09-08 13:45:21',
    verificationCount: 5,
    currentLocation: 'Charminar, Hyderabad'
  },
  {
    id: 'DID-2025-001240',
    name: 'Priya Sharma',
    nationality: 'Indian',
    status: 'Verified',
    issuedBy: 'Tourism Department',
    issuedDate: '2025-09-07',
    expiryDate: '2025-12-31',
    txId: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
    lastVerified: '2025-09-08 13:30:15',
    verificationCount: 3,
    currentLocation: 'Victoria Memorial, Kolkata'
  }
];

// India-themed tourist locations with safety scores
const indiaTouristLocations = [
  { name: 'Taj Mahal, Agra', safetyScore: 92, riskLevel: 'Low', touristCount: 15000 },
  { name: 'Gateway of India, Mumbai', safetyScore: 78, riskLevel: 'Medium', touristCount: 22000 },
  { name: 'Hawa Mahal, Jaipur', safetyScore: 65, riskLevel: 'High', touristCount: 12000 },
  { name: 'India Gate, Delhi', safetyScore: 88, riskLevel: 'Low', touristCount: 18000 },
  { name: 'Charminar, Hyderabad', safetyScore: 82, riskLevel: 'Medium', touristCount: 9000 },
  { name: 'Victoria Memorial, Kolkata', safetyScore: 90, riskLevel: 'Low', touristCount: 7500 },
  { name: 'Qutub Minar, Delhi', safetyScore: 94, riskLevel: 'Low', touristCount: 11000 },
  { name: 'Mysore Palace, Mysore', safetyScore: 87, riskLevel: 'Low', touristCount: 8500 }
];

// India-themed response units
const responseUnits = [
  { id: 'POL-05-AGRA', type: 'Police', location: 'Taj Mahal, Agra', status: 'Available', responseTime: '5 min' },
  { id: 'POL-12-MUMBAI', type: 'Police', location: 'Gateway of India, Mumbai', status: 'Busy', responseTime: '12 min' },
  { id: 'POL-08-JAIPUR', type: 'Police', location: 'Hawa Mahal, Jaipur', status: 'Available', responseTime: '7 min' },
  { id: 'POL-15-DELHI', type: 'Police', location: 'India Gate, Delhi', status: 'Available', responseTime: '6 min' },
  { id: 'AMB-02-AGRA', type: 'Ambulance', location: 'Taj Mahal, Agra', status: 'En Route', responseTime: '8 min' },
  { id: 'AMB-05-MUMBAI', type: 'Ambulance', location: 'Gateway of India, Mumbai', status: 'Available', responseTime: '5 min' },
  { id: 'AMB-03-JAIPUR', type: 'Ambulance', location: 'Hawa Mahal, Jaipur', status: 'Available', responseTime: '6 min' },
  { id: 'FIR-01-AGRA', type: 'Fire', location: 'Taj Mahal, Agra', status: 'Available', responseTime: '9 min' }
];

// API Routes
app.get('/api/incidents', (req, res) => {
  res.json({
    success: true,
    data: mockIncidents,
    count: mockIncidents.length
  });
});

app.get('/api/incidents/:id', (req, res) => {
  const incident = mockIncidents.find(i => i.id === req.params.id);
  if (incident) {
    res.json({
      success: true,
      data: incident
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Incident not found'
    });
  }
});

app.get('/api/tourists', (req, res) => {
  res.json({
    success: true,
    data: mockTourists,
    count: mockTourists.length
  });
});

app.get('/api/tourists/:id', (req, res) => {
  const tourist = mockTourists.find(t => t.id === req.params.id);
  if (tourist) {
    res.json({
      success: true,
      data: tourist
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Tourist not found'
    });
  }
});

app.post('/api/incidents', (req, res) => {
  const newIncident = {
    id: `INC-2025-${Math.floor(100000 + Math.random() * 900000)}`,
    ...req.body,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    status: 'Active'
  };
  mockIncidents.push(newIncident);
  res.status(201).json({
    success: true,
    data: newIncident
  });
});

app.put('/api/incidents/:id', (req, res) => {
  const index = mockIncidents.findIndex(i => i.id === req.params.id);
  if (index !== -1) {
    mockIncidents[index] = { ...mockIncidents[index], ...req.body };
    res.json({
      success: true,
      data: mockIncidents[index]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Incident not found'
    });
  }
});

app.get('/api/locations', (req, res) => {
  res.json({
    success: true,
    data: indiaTouristLocations,
    count: indiaTouristLocations.length
  });
});

app.get('/api/units', (req, res) => {
  res.json({
    success: true,
    data: responseUnits,
    count: responseUnits.length
  });
});

// Serve static files from the React app build directory
// Only serve static files if the build directory exists
const buildPath = path.join(__dirname, 'build');
const fs = require('fs');

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  
  // Serve the React app for any non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  // If no build directory, provide a simple status page
  app.get('/', (req, res) => {
    res.json({
      message: 'Smart Tourist Safety Monitoring Backend Server',
      status: 'Running',
      api_endpoints: {
        incidents: '/api/incidents',
        tourists: '/api/tourists'
      }
    });
  });
}

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// AI Anomaly Detection Endpoints
app.post('/api/ai/detect/location-dropoff', async (req, res) => {
  try {
    // In a real implementation, this would call the AI service
    const { locationData } = req.body;
    
    // Simulate AI detection
    const isAnomaly = Math.random() > 0.8; // 20% chance of anomaly for demo
    const confidence = Math.random();
    
    // If anomaly detected, create an incident
    if (isAnomaly) {
      const newIncident = {
        id: `INC-2025-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        location: 'Unknown Location',
        type: 'Location Drop-off Detected',
        severity: confidence > 0.7 ? 'High' : 'Medium',
        status: 'Active',
        assignedTo: 'AI_SYSTEM',
        responseTime: '0 min',
        slaStatus: 'Pending',
        dispatchedUnits: [],
        eta: 'Immediate',
        priority: confidence > 0.7 ? 'Critical' : 'High',
        reporter: 'AI Anomaly Detection System',
        description: 'Tourist location signal dropped unexpectedly'
      };
      mockIncidents.unshift(newIncident);
    }
    
    res.json({
      success: true,
      data: {
        anomaly: isAnomaly,
        confidence: confidence,
        timestamp: new Date().toISOString(),
        type: 'location_dropoff'
      }
    });
  } catch (error) {
    console.error('AI detection error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform AI detection'
    });
  }
});

app.post('/api/ai/detect/inactivity', async (req, res) => {
  try {
    // In a real implementation, this would call the AI service
    const { locationData, thresholdMinutes } = req.body;
    
    // Simulate AI detection
    const isAnomaly = Math.random() > 0.85; // 15% chance of anomaly for demo
    const confidence = Math.random();
    
    // If anomaly detected, create an incident
    if (isAnomaly) {
      const newIncident = {
        id: `INC-2025-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        location: 'Unknown Location',
        type: 'Prolonged Inactivity Detected',
        severity: confidence > 0.7 ? 'High' : 'Medium',
        status: 'Active',
        assignedTo: 'AI_SYSTEM',
        responseTime: '0 min',
        slaStatus: 'Pending',
        dispatchedUnits: [],
        eta: 'Immediate',
        priority: confidence > 0.7 ? 'Critical' : 'High',
        reporter: 'AI Anomaly Detection System',
        description: `Tourist has been inactive for more than ${thresholdMinutes || 30} minutes`
      };
      mockIncidents.unshift(newIncident);
    }
    
    res.json({
      success: true,
      data: {
        anomaly: isAnomaly,
        confidence: confidence,
        timestamp: new Date().toISOString(),
        type: 'prolonged_inactivity'
      }
    });
  } catch (error) {
    console.error('AI detection error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform AI detection'
    });
  }
});

app.post('/api/ai/detect/route-deviation', async (req, res) => {
  try {
    // In a real implementation, this would call the AI service
    const { currentPath, plannedItinerary } = req.body;
    
    // Simulate AI detection
    const isAnomaly = Math.random() > 0.9; // 10% chance of anomaly for demo
    const confidence = Math.random();
    
    // If anomaly detected, create an incident
    if (isAnomaly) {
      const newIncident = {
        id: `INC-2025-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        location: 'Unknown Location',
        type: 'Route Deviation Detected',
        severity: confidence > 0.7 ? 'High' : 'Medium',
        status: 'Active',
        assignedTo: 'AI_SYSTEM',
        responseTime: '0 min',
        slaStatus: 'Pending',
        dispatchedUnits: [],
        eta: 'Immediate',
        priority: confidence > 0.7 ? 'Critical' : 'High',
        reporter: 'AI Anomaly Detection System',
        description: 'Tourist has significantly deviated from planned itinerary'
      };
      mockIncidents.unshift(newIncident);
    }
    
    res.json({
      success: true,
      data: {
        anomaly: isAnomaly,
        confidence: confidence,
        timestamp: new Date().toISOString(),
        type: 'route_deviation'
      }
    });
  } catch (error) {
    console.error('AI detection error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform AI detection'
    });
  }
});

// IoT Integration Endpoints
app.post('/api/iot/devices', (req, res) => {
  try {
    const { deviceId, touristId } = req.body;
    
    // In a real implementation, this would register the device in the system
    // For now, we'll just simulate it
    
    res.json({
      success: true,
      data: {
        device_id: deviceId,
        tourist_id: touristId,
        status: 'registered',
        message: 'Device registered successfully'
      }
    });
  } catch (error) {
    console.error('IoT device registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register IoT device'
    });
  }
});

app.post('/api/iot/devices/:deviceId/sos', (req, res) => {
  try {
    const { deviceId } = req.params;
    
    // In a real implementation, this would trigger an SOS from the device
    // For now, we'll just simulate it
    
    // Create an incident
    const newIncident = {
      id: `INC-2025-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      location: 'Unknown (from wearable device)',
      type: 'IoT SOS Alert',
      severity: 'Critical',
      status: 'Active',
      assignedTo: 'IoT_SYSTEM',
      responseTime: '0 min',
      slaStatus: 'Pending',
      dispatchedUnits: [],
      eta: 'Immediate',
      priority: 'Critical',
      reporter: `IoT Device ${deviceId}`,
      description: 'SOS alert triggered from wearable device'
    };
    
    mockIncidents.unshift(newIncident);
    
    res.json({
      success: true,
      data: {
        alert_id: `ALERT_${deviceId}_${Date.now()}`,
        status: 'SOS alert triggered',
        incident_id: newIncident.id
      }
    });
  } catch (error) {
    console.error('IoT SOS trigger error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to trigger SOS from IoT device'
    });
  }
});

app.get('/api/iot/devices/:deviceId/status', (req, res) => {
  try {
    const { deviceId } = req.params;
    
    // In a real implementation, this would fetch actual device status
    // For now, we'll return simulated data
    
    const status = {
      device_id: deviceId,
      is_active: true,
      battery_level: Math.floor(Math.random() * 100),
      signal_strength: Math.floor(Math.random() * (-50 + 100) - 100), // -100 to -50
      last_heartbeat: new Date().toISOString(),
      location: {
        latitude: 28.6139 + (Math.random() - 0.5) * 0.1,
        longitude: 77.2090 + (Math.random() - 0.5) * 0.1,
        accuracy: Math.floor(Math.random() * 10) + 3
      }
    };
    
    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    console.error('IoT device status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get IoT device status'
    });
  }
});

// Blockchain integration endpoints
app.post('/api/blockchain/identity', (req, res) => {
  // In a real implementation, this would create an identity on the blockchain
  const { touristData } = req.body;
  
  // Simulate blockchain transaction
  const blockchainTx = {
    transactionHash: '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    blockNumber: Math.floor(Math.random() * 1000000),
    gasUsed: Math.floor(Math.random() * 50000),
    status: 'success'
  };
  
  res.json({
    success: true,
    data: {
      touristId: touristData.touristId,
      blockchainTx,
      message: 'Identity created on blockchain successfully'
    }
  });
});

app.get('/api/blockchain/identity/:touristId', (req, res) => {
  // In a real implementation, this would fetch identity from the blockchain
  const { touristId } = req.params;
  
  // Simulate blockchain data
  const blockchainData = {
    touristId,
    isVerified: true,
    isActive: true,
    issuer: 'Tourism Department',
    issuedDate: '2025-09-01',
    expiryDate: '2025-12-31',
    createdAt: '2025-09-01T10:00:00Z',
    updatedAt: '2025-09-01T10:00:00Z',
    transactionHistory: [
      {
        transactionHash: '0x' + Math.random().toString(36).substring(2, 15),
        blockNumber: Math.floor(Math.random() * 1000000),
        eventType: 'IdentityCreated',
        timestamp: '2025-09-01T10:00:00Z'
      }
    ]
  };
  
  res.json({
    success: true,
    data: blockchainData
  });
});

app.post('/api/blockchain/verify/:touristId', (req, res) => {
  // In a real implementation, this would verify identity on the blockchain
  const { touristId } = req.params;
  
  // Simulate blockchain verification
  const blockchainTx = {
    transactionHash: '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    blockNumber: Math.floor(Math.random() * 1000000),
    gasUsed: Math.floor(Math.random() * 50000),
    status: 'success'
  };
  
  res.json({
    success: true,
    data: {
      touristId,
      blockchainTx,
      message: 'Identity verified on blockchain successfully'
    }
  });
});

app.post('/api/blockchain/revoke/:touristId', (req, res) => {
  // In a real implementation, this would revoke identity on the blockchain
  const { touristId } = req.params;
  
  // Simulate blockchain revocation
  const blockchainTx = {
    transactionHash: '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    blockNumber: Math.floor(Math.random() * 1000000),
    gasUsed: Math.floor(Math.random() * 50000),
    status: 'success'
  };
  
  res.json({
    success: true,
    data: {
      touristId,
      blockchainTx,
      message: 'Identity revoked on blockchain successfully'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});