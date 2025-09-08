# Smart Tourist Safety Monitoring & Incident Response System

This project implements a comprehensive safety monitoring and incident response system for tourists using AI and Blockchain technology, specifically designed for India's tourism sector.

## Project Structure

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
    ├── README.md               # Web application documentation
    ├── demo.html               # Standalone HTML demo
    └── build/                  # Production build (created after npm run build)
```

## Mobile App Features

### 1. Home Dashboard
- Interactive map with live geo-fence highlighting safe zones and restricted areas
- AI-driven risk score status bar ("Safe / Caution / Alert")
- Quick access SOS button (floating red button, one-tap trigger)
- Navigation to other app sections

### 2. Digital Identity & Wallet
- Tourist's Verifiable Credential (VC) stored in DID wallet
- QR code generation for offline proof presentation
- Credential status display ("Verified by Tourism Dept / Active / Revoked")

### 3. Incident Reporting
- AI auto-detection of distress (fall detection, abnormal movements)
- Manual incident reporting with category selection
- Media upload capability (photos, short video/audio clips)
- Auto timestamp and location metadata

### 4. Notifications Panel
- Real-time alerts for emergency responses
- Incident status updates with case IDs
- Police dispatch notifications
- Emergency Response System (ERSS) triggers

### 5. Settings & Privacy
- Consent preferences for PII sharing
- Language switching capability
- Offline mode for storing incidents locally
- Local incident management

## Web App Features

### 1. Secure Login & Role Management
- Role-based access control (Police, ERSS operator, Hospital desk, Tourism Dept admin)
- DID-based authentication with multi-factor authentication

### 2. Dashboard Overview
- Real-time statistics and KPIs
- Quick action buttons for key functions
- Safety zone visualization for popular Indian tourist destinations
- Recent incidents and tourist verification updates

### 3. Incident Management Console
- Real-time list of active incidents with severity scores
- Filtering by location, time, and incident type
- Map visualization with incident clustering and heatmaps

### 4. Tourist Verification
- Blockchain-backed verification of tourist DID/VC
- Credential status checking (valid/expired/revoked)
- Proof logs with blockchain transaction IDs

### 5. Dispatch & Response Tracker
- One-click dispatch commands to nearest response units
- SLA timers to ensure timely action
- Response updates logged to blockchain for audit

### 6. Analytics & Reports
- Daily/weekly safety analytics by region and demographics
- Predictive alerts for high-risk areas
- Exportable reports in CSV/JSON formats

## Additional Features

### 1. Itinerary Risk Scanner
- AI-powered analysis of tourist itineraries
- Risk scoring for planned activities and locations
- Real-time alerts for high-risk segments
- Alternative route suggestions

### 2. Integrated Digital Safe
- Secure storage for digital valuables (documents, photos, passwords)
- Blockchain-backed encryption
- Emergency access for authorized contacts
- Backup and sync across devices

### 3. Anonymous Incident Reporting
- One-tap anonymous reporting for sensitive incidents
- End-to-end encryption for reporter identity
- Geofenced anonymous reporting zones
- Real-time acknowledgment without identity reveal

### 4. AI-Based Safety Score for Locations
- Machine learning models for location risk assessment
- Real-time safety scoring based on multiple factors
- Predictive analytics for emerging risks
- Community-sourced safety data integration

### 5. Fake Guide/Taxi Detector
- Image recognition for license verification
- Database cross-checking with authorized providers
- Real-time alerts for suspicious activities
- Reporting mechanism for fraudulent operators

### 6. Travel Insurance & Safety Integration
- Direct integration with insurance providers
- Automated claims processing for verified incidents
- Safety score discounts for responsible tourists
- Emergency medical network access

## Technical Implementation Notes

### UI Design
- Professional Material-UI theme with safety-themed colors
- Responsive design for all device sizes
- India travel-related graphics and animations
- Card-based layout with subtle shadows and rounded corners
- Consistent styling across all views

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

## Backend Server

### Technology Stack
- Node.js with Express.js
- RESTful API architecture
- CORS-enabled for cross-origin requests
- Environment variable configuration

### API Endpoints
- Incidents management (CRUD operations)
- Tourist verification and credential management
- Real-time data streaming for live updates
- Analytics and reporting endpoints

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Mobile App
```bash
cd mobile-app
npm install
# For iOS
npx react-native run-ios
# For Android
npx react-native run-android
```

### Web App
1. Navigate to the web-app directory:
   ```bash
   cd web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start both frontend and backend servers:
   ```bash
   npm run dev
   ```

   Or start them separately:
   ```bash
   # Terminal 1: Start backend server
   node server.js
   
   # Terminal 2: Start frontend development server
   npm start
   ```

4. Open your browser to:
   - Development: http://localhost:3000
   - Production: http://localhost:5000 (after building)

### Production Build
To create a production build of the web application:

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

- [Web Application README](web-app/README.md) - Detailed documentation for the web application
- [Running Instructions](RUNNING_INSTRUCTIONS.md) - Step-by-step guide to run the complete system
- [Enhancement Summary](FINAL_ENHANCEMENT_SUMMARY.md) - Summary of all improvements made
- [Demo HTML](web-app/demo.html) - Standalone HTML demonstration of UI/UX design

## Support

For support, please open an issue on the repository or contact the development team.