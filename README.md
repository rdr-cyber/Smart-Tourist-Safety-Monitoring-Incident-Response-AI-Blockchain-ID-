# Smart Tourist Safety Monitoring & Incident Response System

## Project Overview

This repository contains a comprehensive safety monitoring and incident response system for tourists, leveraging AI and Blockchain technologies to enhance travel safety.

## Live Application

✅ **Application URL**: https://smart-tourist-safety-monitoring-ej66gepmu-shelfwises-projects.vercel.app

## System Architecture

### Mobile App (Tourist-Facing)
- **Platform**: React Native
- **Features**:
  - Home Dashboard with interactive map and SOS button
  - Digital Identity Wallet with DID/VC storage
  - AI-powered Incident Reporting
  - Real-time Notifications
  - Privacy-focused Settings

### Web App (Admin & Agency Dashboard)
- **Platform**: React with Material-UI
- **Features**:
  - Role-based Secure Login
  - Real-time Incident Management
  - Tourist Verification System
  - Dispatch & Response Tracking
  - Analytics & Reporting

### Backend Services
- **Server**: Node.js with Express
- **Database**: MongoDB (conceptual)
- **Blockchain**: DID registry for identity management
- **AI Models**: TensorFlow.js for on-device processing

## Key Features

### Mobile Application
1. **Home Dashboard**
   - Interactive map with live geo-fence highlighting safe zones and restricted areas
   - AI-driven status bar ("Safe / Caution / Alert")
   - Quick access SOS button (floating red button, one-tap trigger)

2. **Digital Identity & Wallet**
   - Tourist's Verifiable Credential (VC) stored in DID wallet
   - QR code generation for offline proof presentation
   - Credential status display ("Verified by Tourism Dept / Active / Revoked")

3. **Incident Reporting**
   - AI auto-detection of distress (fall detection, abnormal movements)
   - Manual incident reporting with category selection
   - Media upload capability (photos, short video/audio clips)
   - Auto timestamp and location metadata

4. **Notifications Panel**
   - Real-time alerts for emergency responses
   - Incident status updates with case IDs
   - Police dispatch notifications

5. **Settings & Privacy**
   - Consent preferences for PII sharing
   - Language switching capability
   - Offline mode for storing incidents locally

### Web Application
1. **Secure Login & Role Management**
   - Role-based access control (Police, ERSS operator, Hospital desk, Tourism Dept admin)
   - DID-based authentication with multi-factor authentication

2. **Incident Management Console**
   - Real-time list of active incidents with severity scores
   - Filtering by location, time, and incident type
   - Map visualization with incident clustering and heatmaps

3. **Tourist Verification**
   - Blockchain-backed verification of tourist DID/VC
   - Credential status checking (valid/expired/revoked)
   - Proof logs with blockchain transaction IDs

4. **Dispatch & Response Tracker**
   - One-click dispatch commands to nearest response units
   - SLA timers to ensure timely action
   - Response updates logged to blockchain for audit

5. **Analytics & Reports**
   - Daily/weekly safety analytics by region and demographics
   - Predictive alerts for high-risk areas
   - Exportable reports in CSV/JSON formats

## Advanced Features

### Itinerary Risk Scanner
- AI-powered analysis of tourist itineraries
- Risk scoring for planned activities and locations
- Real-time alerts for high-risk segments
- Alternative route suggestions

### Integrated Digital Safe
- Secure storage for digital valuables (documents, photos, passwords)
- Blockchain-backed encryption
- Emergency access for authorized contacts
- Backup and sync across devices

### Anonymous Incident Reporting
- One-tap anonymous reporting for sensitive incidents
- End-to-end encryption for reporter identity
- Geofenced anonymous reporting zones
- Real-time acknowledgment without identity reveal

### AI-Based Safety Score for Locations
- Machine learning models for location risk assessment
- Real-time safety scoring based on multiple factors
- Predictive analytics for emerging risks
- Community-sourced safety data integration

### Fake Guide/Taxi Detector
- Image recognition for license verification
- Database cross-checking with authorized providers
- Real-time alerts for suspicious activities
- Reporting mechanism for fraudulent operators

### Travel Insurance & Safety Integration
- Direct integration with insurance providers
- Automated claims processing for verified incidents
- Safety score discounts for responsible tourists
- Emergency medical network access

## Technical Implementation

### UI Design
- Professional Material-UI theme with safety-themed colors
- Responsive design for all device sizes
- India travel-related graphics and animations
- Card-based layout with subtle shadows and rounded corners

### Map Engine
- OpenStreetMap or Mapbox with offline caching capabilities
- India-specific map layers and points of interest
- Real-time incident clustering and heatmaps
- Location-based safety zone visualization

### Blockchain Layer
- DID registry for tourist identities
- Hash-only incident proofs stored on blockchain
- Smart contracts for automated verification
- Transparent audit trail for all actions

### AI Models
- On-device models for fall detection and sentiment analysis
- Cloud-based models for risk scoring and predictive analytics
- Computer vision for fake guide/taxi detection
- Natural language processing for incident categorization

### Data Privacy
- Incident logs stored with consent vault
- Only cryptographic proofs stored on blockchain
- PII sharing controlled by user consent preferences
- End-to-end encryption for sensitive communications

## Directory Structure

```
├── mobile-app/                 # Tourist-facing mobile application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── screens/            # Main application screens
│   │   │   ├── HomeDashboard.js     # Map with geo-fencing, status bar, SOS button
│   │   │   ├── DigitalIdentity.js   # DID wallet with VC storage and QR code
│   │   │   ├── IncidentReporting.js # AI detection and manual incident reporting
│   │   │   ├── Notifications.js     # Real-time alerts and updates
│   │   │   └── Settings.js          # Privacy preferences and offline mode
│   │   ├── assets/             # Images, icons, and other static assets
│   │   └── services/           # API services and utilities
│   ├── App.js                  # Main application component
│   └── package.json            # Project dependencies and scripts
│
└── web-app/                    # Admin & agency dashboard
    ├── src/
    │   ├── components/         # Reusable UI components
    │   ├── views/              # Main dashboard views
    │   │   ├── Login.js             # Secure login with role management
    │   │   ├── Dashboard.js         # Overview dashboard
    │   │   ├── IncidentManagement.js # Real-time incident list and map visualization
    │   │   ├── TouristVerification.js # Blockchain-backed tourist DID/VC verification
    │   │   ├── DispatchTracker.js    # Response unit dispatch and tracking
    │   │   └── AnalyticsReports.js   # Safety analytics and predictive alerts
    │   ├── assets/             # Images, icons, and other static assets
    │   ├── services/           # API services and utilities
    │   └── utils/              # Helper functions and utilities
    ├── public/                 # Static assets
    ├── server.js               # Backend Express server
    ├── package.json            # Project dependencies and scripts
    ├── .env                    # Environment variables
    └── build/                  # Production build (created after npm run build)
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)
- React Native CLI (for mobile development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rdr-cyber/smart-tourist-safety-monitoring.git
   cd smart-tourist-safety-monitoring
   ```

2. Install dependencies for web app:
   ```bash
   cd web-app
   npm install
   ```

3. Install dependencies for mobile app:
   ```bash
   cd ../mobile-app
   npm install
   ```

### Running the Applications

#### Web App
```bash
cd web-app
# Start both frontend and backend servers
npm run dev

# Or start them separately:
# Terminal 1: Backend server
node server.js

# Terminal 2: Frontend development server
npm start
```

Open your browser to `http://localhost:3000`

#### Mobile App
```bash
cd mobile-app
# For iOS
npx react-native run-ios

# For Android
npx react-native run-android
```

### Production Build

#### Web App
```bash
cd web-app
npm run build
```

## Technologies Used

### Mobile App
- React Native
- React Navigation
- React Native Maps
- Expo for development tools

### Web App
- React with React Router
- Material-UI (MUI) for UI components
- Express.js for backend server
- Node.js runtime environment
- RESTful API architecture

### Backend Services
- Node.js with Express
- MongoDB or PostgreSQL (conceptual)
- Redis for caching (conceptual)
- Docker for containerization (conceptual)

### AI & Machine Learning
- TensorFlow.js for on-device models
- Python with scikit-learn for cloud models
- OpenCV for computer vision
- NLTK for natural language processing

### Blockchain
- Ethereum or Hyperledger Fabric (conceptual)
- Solidity for smart contracts
- Web3.js for blockchain integration
- IPFS for decentralized storage

## India Tourism Features

This system is specifically designed for the Indian tourism sector with:

- Location-specific incident tracking for popular Indian tourist destinations
- Response units organized by major Indian cities (Agra, Mumbai, Jaipur, Delhi)
- Demographic analytics tailored for international tourist patterns in India
- Predictive analytics for seasonal tourism trends in India
- Multi-lingual support considerations for Indian languages
- Integration with India's Emergency Response Support System (ERSS)

## Documentation

- [System Specifications](SYSTEM_SPECIFICATIONS.md) - Detailed feature specifications
- [Deployment Summary](DEPLOYMENT_SUMMARY.md) - Deployment information
- [Web Application README](web-app/README.md) - Web app documentation
- [Preview](preview.html) - HTML preview of the application

## Deployment

The application is currently deployed at:
https://smart-tourist-safety-monitoring-ej66gepmu-shelfwises-projects.vercel.app

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/rdr-cyber/smart-tourist-safety-monitoring](https://github.com/rdr-cyber/smart-tourist-safety-monitoring)