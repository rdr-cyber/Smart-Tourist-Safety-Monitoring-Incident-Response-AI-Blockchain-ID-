# Smart Tourist Safety Monitoring System

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Web%20%26%20Mobile-blue)](https://github.com/rdr-cyber/smart-tourist-safety-monitoring)

A comprehensive safety monitoring and incident response system for tourists using AI and Blockchain technology.

## 🌟 Overview

This project implements a smart safety monitoring system for tourists that combines AI-powered risk detection with Blockchain-based identity verification. The system provides real-time incident reporting, emergency response coordination, and predictive safety analytics.

## 🏗️ Architecture

```
├── mobile-app/                 # Tourist-facing mobile application
└── web-app/                    # Admin & agency dashboard
    ├── server.js               # Backend Express server
    └── src/                    # Frontend React application
```

## 📱 Features

### Mobile App
- **Home Dashboard**: Interactive map with geo-fencing and SOS button
- **Digital Identity**: DID wallet with Verifiable Credentials
- **Incident Reporting**: AI auto-detection and manual reporting
- **Notifications**: Real-time alerts and updates
- **Privacy Controls**: Consent preferences and offline mode

### Web Dashboard
- **Incident Management**: Real-time incident tracking and mapping
- **Tourist Verification**: Blockchain-backed identity verification
- **Dispatch Tracking**: Response unit coordination and monitoring
- **Analytics & Reports**: Safety analytics and predictive alerts

### Advanced Features
- **Itinerary Risk Scanner**: AI-powered travel risk assessment
- **Digital Safe**: Secure storage for digital valuables
- **Anonymous Reporting**: Privacy-preserving incident reporting
- **Safety Scoring**: AI-based location risk assessment
- **Fraud Detection**: Fake guide/taxi identification
- **Insurance Integration**: Automated claims processing

## 🚀 Technology Stack

### Frontend
- **Mobile**: React Native
- **Web**: React with Material-UI

### Backend
- **Server**: Node.js with Express
- **API**: RESTful architecture

### AI & Blockchain
- **AI Models**: TensorFlow.js, Computer Vision
- **Blockchain**: DID registry, Smart Contracts

## 🛠️ Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

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

3. Start the development servers:
```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
# Terminal 1: Backend server
node server.js

# Terminal 2: Frontend development server
npm start
```

4. Open your browser to `http://localhost:3000`

### Production Build
```bash
cd web-app
npm run build
```

## 📖 Documentation

Detailed documentation is available in the following files:
- [Web Application Guide](web-app/README.md)
- [Running Instructions](RUNNING_INSTRUCTIONS.md)
- [System Enhancement Summary](FINAL_ENHANCEMENT_SUMMARY.md)

## 🇮🇳 India Tourism Focus

This system is specifically designed for the Indian tourism sector with:
- Location-specific incident tracking for popular Indian tourist destinations
- Response units organized by major Indian cities
- Multi-lingual support considerations
- Integration with India's Emergency Response Support System (ERSS)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please open an issue on the repository.