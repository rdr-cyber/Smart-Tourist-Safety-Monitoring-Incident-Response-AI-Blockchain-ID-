import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './views/Dashboard';
import IncidentManagement from './views/IncidentManagement';
import TouristVerification from './views/TouristVerification';
import DispatchTracker from './views/DispatchTracker';
import AnalyticsReports from './views/AnalyticsReports';
import Login from './views/Login';
import RealTimeDashboard from './views/RealTimeDashboard';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Dark green
    },
    secondary: {
      main: '#0288D1', // Blue
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<RealTimeDashboard />} />
          <Route path="/incidents" element={<IncidentManagement />} />
          <Route path="/verification" element={<TouristVerification />} />
          <Route path="/dispatch" element={<DispatchTracker />} />
          <Route path="/analytics" element={<AnalyticsReports />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;