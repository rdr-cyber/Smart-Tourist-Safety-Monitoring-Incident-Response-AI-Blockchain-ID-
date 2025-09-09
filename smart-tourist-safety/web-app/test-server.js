// Simple test server to demonstrate API endpoints are working
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
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
  }
];

const indiaTouristLocations = [
  { name: 'Taj Mahal, Agra', safetyScore: 92, riskLevel: 'Low', touristCount: 15000 },
  { name: 'Gateway of India, Mumbai', safetyScore: 78, riskLevel: 'Medium', touristCount: 22000 },
  { name: 'Hawa Mahal, Jaipur', safetyScore: 65, riskLevel: 'High', touristCount: 12000 },
  { name: 'India Gate, Delhi', safetyScore: 88, riskLevel: 'Low', touristCount: 18000 }
];

const responseUnits = [
  { id: 'POL-05-AGRA', type: 'Police', location: 'Taj Mahal, Agra', status: 'Available', responseTime: '5 min' },
  { id: 'POL-12-MUMBAI', type: 'Police', location: 'Gateway of India, Mumbai', status: 'Busy', responseTime: '12 min' },
  { id: 'AMB-02-AGRA', type: 'Ambulance', location: 'Taj Mahal, Agra', status: 'En Route', responseTime: '8 min' },
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

app.get('/api/tourists', (req, res) => {
  res.json({
    success: true,
    data: mockTourists,
    count: mockTourists.length
  });
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

app.listen(PORT, () => {
  console.log(`Test server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});