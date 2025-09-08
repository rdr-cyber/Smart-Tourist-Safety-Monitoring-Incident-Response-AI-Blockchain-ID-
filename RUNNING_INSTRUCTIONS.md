# Running the Smart Tourist Safety Monitoring System

This document provides detailed instructions on how to run the complete Smart Tourist Safety Monitoring & Incident Response System with both frontend and backend components.

## Prerequisites

Before running the application, ensure you have the following installed:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - This includes npm (Node Package Manager)

2. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

3. **Modern Web Browser**
   - Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari

## Installation Steps

### 1. Navigate to the Project Directory

Open your terminal or command prompt and navigate to the web-app directory:

```bash
cd "C:\Users\rajde\OneDrive\Desktop\Smart Tourist Safety Monitoring & Incident Response (AI + Blockchain ID)\web-app"
```

### 2. Install Dependencies

Install all required packages for both frontend and backend:

```bash
npm install
```

This will install:
- React and related frontend libraries
- Express.js for the backend server
- Material-UI components
- CORS and other middleware
- Development dependencies

### 3. Verify Installation

Check that the package.json file exists and contains the correct dependencies:

```bash
dir package.json
```

## Running the Application

### Option 1: Run Frontend and Backend Separately (Recommended for Development)

#### Start the Backend Server

In one terminal window, start the backend server:

```bash
node server.js
```

You should see output similar to:
```
Server is running on port 5000
API endpoints available at http://localhost:5000/api
```

#### Start the Frontend Development Server

In another terminal window, start the frontend development server:

```bash
npm start
```

This will:
1. Start the React development server
2. Automatically open your default browser to http://localhost:3000
3. Enable hot reloading for development

### Option 2: Run Both Servers with Concurrently

You can also run both servers simultaneously using the built-in script:

```bash
npm run dev
```

This command will:
1. Start the frontend development server on port 3000
2. Start the backend API server on port 5000
3. Run both processes concurrently

Note: If you encounter any issues with this command due to PowerShell restrictions, use Option 1 instead.

## Accessing the Application

### Frontend Interface
Open your web browser and navigate to:
- **Development Mode**: http://localhost:3000
- **Production Mode**: http://localhost:5000 (after building)

### Backend API
The backend API is accessible at:
- http://localhost:5000/api/incidents
- http://localhost:5000/api/tourists

### API Endpoints

#### Incidents
- `GET /api/incidents` - Retrieve all incidents
- `GET /api/incidents/:id` - Retrieve a specific incident by ID
- `POST /api/incidents` - Create a new incident
- `PUT /api/incidents/:id` - Update an existing incident

#### Tourists
- `GET /api/tourists` - Retrieve all tourists
- `GET /api/tourists/:id` - Retrieve a specific tourist by ID

## Testing the API

You can test the API endpoints using curl or any HTTP client:

### Get All Incidents
```bash
curl http://localhost:5000/api/incidents
```

### Get All Tourists
```bash
curl http://localhost:5000/api/tourists
```

## Demo Mode

If you want to quickly preview the UI without running the full application:

1. Open the demo.html file directly in your browser:
   ```
   C:\Users\rajde\OneDrive\Desktop\Smart Tourist Safety Monitoring & Incident Response (AI + Blockchain ID)\web-app\demo.html
   ```

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
If you see an error about ports being in use:
- Change the PORT in the .env file
- Or stop other processes using those ports

#### 2. Module Not Found Errors
If you see errors about missing modules:
```bash
npm install express cors dotenv
```

#### 3. PowerShell Execution Policy Issues
If you encounter issues with PowerShell scripts:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 4. CORS Errors
The backend server already includes CORS middleware, but if you encounter issues:
- Ensure both frontend and backend servers are running
- Check that API endpoints are accessible

#### 5. Development Server Won't Start
If the React development server won't start:
- Check that Node.js is properly installed
- Try clearing npm cache: `npm cache clean --force`
- Delete node_modules folder and reinstall: `rm -rf node_modules && npm install`

## Building for Production

To create a production build of the frontend:

```bash
npm run build
```

This will:
1. Create an optimized build in the `build/` directory
2. Minify all JavaScript and CSS files
3. Optimize images and assets

After building, you can serve the production version using the backend server:
- Navigate to http://localhost:5000

## Environment Variables

The application uses the following environment variables (configured in the .env file):

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Smart Tourist Safety Admin
REACT_APP_VERSION=1.0.0
PORT=5000
```

## Stopping the Servers

To stop the servers:
- Press `Ctrl + C` in each terminal window
- Or close the terminal windows

## Project Structure

```
web-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── views/              # Main dashboard views
│   ├── services/           # API services
│   ├── utils/              # Helper functions
│   ├── assets/             # Images and other assets
│   ├── theme.js            # Material-UI theme configuration
│   ├── App.js              # Main application component
│   └── index.js            # Entry point
├── server.js               # Backend Express server
├── package.json            # Project dependencies and scripts
├── .env                    # Environment variables
├── README.md               # Project documentation
├── demo.html               # Standalone HTML demo
└── build/                  # Production build (created after npm run build)
```

## India Tourism Features

The application includes India-specific features:
- Tourist destinations: Taj Mahal (Agra), Gateway of India (Mumbai), Hawa Mahal (Jaipur), India Gate (Delhi)
- Response units organized by Indian cities
- Demographic analytics for international tourist patterns in India
- Multi-lingual support considerations

## Support

For any issues or questions:
1. Check the console logs in your browser's developer tools
2. Check the terminal output for server errors
3. Verify all installation steps were completed
4. Ensure all required dependencies are installed

The development team can be contacted through the repository issues if this is hosted on a version control platform.