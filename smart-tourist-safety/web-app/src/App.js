import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './assets/india-images.css'; // Import India-themed image CSS

// Import views
import Dashboard from './views/Dashboard';
import IncidentManagement from './views/IncidentManagement';
import TouristVerification from './views/TouristVerification';
import DispatchTracker from './views/DispatchTracker';
import AnalyticsReports from './views/AnalyticsReports';
import Login from './views/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
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