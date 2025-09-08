# Smart Tourist Safety Admin Dashboard

Admin dashboard for the Smart Tourist Safety Monitoring & Incident Response system with enhanced India-themed UI/UX.

## Features

- Real-time incident monitoring and management
- Tourist verification using blockchain-backed DID/VC
- Dispatch and response tracking with SLA compliance
- Analytics and reporting with data-driven insights
- India-themed design with enhanced graphics and animations

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the web-app directory:
   ```
   cd web-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

### Option 1: Run Backend and Frontend Separately

1. Start the backend server:
   ```
   npm run server
   ```

2. In a new terminal, start the frontend development server:
   ```
   npm start
   ```

### Option 2: Run Both Servers Concurrently

```
npm run dev
```

## API Endpoints

The backend server runs on port 5000 and provides the following endpoints:

- `GET /api/incidents` - Get all incidents
- `GET /api/incidents/:id` - Get incident by ID
- `POST /api/incidents` - Create new incident
- `PUT /api/incidents/:id` - Update incident
- `GET /api/tourists` - Get all tourists
- `GET /api/tourists/:id` - Get tourist by ID
- `GET /api/locations` - Get safety data for tourist locations
- `GET /api/units` - Get response unit status

## Environment Variables

Create a `.env` file in the web-app directory with the following variables:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Smart Tourist Safety Admin
REACT_APP_VERSION=1.0.0
```

## Enhanced Features

### India-Themed Design
- Custom color schemes inspired by Indian culture
- Monument imagery from popular Indian tourist destinations
- Regional design elements reflecting India's diversity

### Advanced Animations
- Smooth fade-in effects for all components
- Pulse animations for live indicators
- Hover effects for interactive elements
- Progress bar animations for data visualization

### Real-time Data Visualization
- Incident tracking with status indicators
- Response unit location mapping
- Safety score heatmaps for tourist locations
- Performance metrics with animated charts

## File Structure

```
web-app/
├── public/
├── src/
│   ├── components/
│   ├── services/
│   ├── views/
│   ├── App.js
│   └── index.js
├── server.js
├── enhanced-demo.html
└── package.json
```

## Views

1. **Dashboard** - Overview of system status and quick actions
2. **Incident Management** - Real-time incident list and tracking
3. **Tourist Verification** - Blockchain-backed tourist identity verification
4. **Dispatch Tracker** - Response unit tracking and dispatch management
5. **Analytics & Reports** - Data-driven insights and performance metrics

## Enhanced Demo

For a standalone demonstration of the enhanced UI/UX, open `enhanced-demo.html` in your browser.

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT in server.js
2. **CORS errors**: Ensure the frontend and backend are properly configured
3. **Missing dependencies**: Run `npm install` to install all required packages

### Backend Not Starting

If you encounter issues starting the backend server:

1. Ensure Node.js is properly installed
2. Check that all dependencies are installed with `npm install`
3. Verify the server.js file permissions

### Frontend Not Loading

If the frontend doesn't load properly:

1. Ensure all dependencies are installed
2. Check the console for any error messages
3. Verify the API endpoints are accessible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.