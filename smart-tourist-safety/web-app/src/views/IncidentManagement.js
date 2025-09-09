import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Box,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Avatar,
  LinearProgress,
  CircularProgress,
  Alert,
  Snackbar,
  styled,
  keyframes,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Map as MapIcon,
  Emergency as EmergencyIcon,
} from '@mui/icons-material';
import { incidentApi } from '../services/api';

// Custom styled components for India-themed design
const IndiaCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light} 100%)`,
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const IndiaButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: '50px',
  padding: '10px 20px',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
  },
}));

// Custom animations for India-themed experience
const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeInAnimation = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Load incidents from API
  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      setLoading(true);
      const response = await incidentApi.getAllIncidents();
      setIncidents(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load incidents: ' + err.message);
      setSnackbar({
        open: true,
        message: 'Failed to load incidents. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Filter incidents based on search and filters
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = searchTerm === '' || 
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === '' || incident.type === filterType;
    const matchesLocation = filterLocation === '' || incident.location === filterLocation;
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const stats = [
    { 
      title: 'Active Incidents', 
      value: incidents.filter(i => i.status === 'Active').length, 
      icon: <WarningIcon />, 
      color: 'error',
      description: 'Requires immediate attention'
    },
    { 
      title: 'In Progress', 
      value: incidents.filter(i => i.status === 'In Progress').length, 
      icon: <AccessTimeIcon />, 
      color: 'warning',
      description: 'Being handled'
    },
    { 
      title: 'Resolved Today', 
      value: incidents.filter(i => i.status === 'Resolved').length, 
      icon: <CheckCircleIcon />, 
      color: 'success',
      description: 'Successfully closed'
    },
    { 
      title: 'Avg Response', 
      value: '7.2 min', 
      icon: <TrendingUpIcon />, 
      color: 'info',
      description: 'Response time'
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'error';
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  // Get unique incident types and locations for filters
  const incidentTypes = [...new Set(incidents.map(i => i.type))];
  const locations = [...new Set(incidents.map(i => i.location))];

  // Sample incidents data with India locations
  const sampleIncidents = [
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
      description: 'Tourist suffered heatstroke near the main entrance',
      imageClass: 'taj-mahal-bg'
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
      description: 'Tourist reported being harassed by street vendors',
      imageClass: 'gateway-of-india-bg'
    },
    {
      id: 'INC-2025-001243',
      timestamp: '2025-09-08 14:15:45',
      location: 'Kedarnath Temple, Uttarakhand',
      type: 'Accident',
      severity: 'High',
      status: 'Resolved',
      assignedTo: 'POL-08-UTTARAKHAND',
      responseTime: '8.1 min',
      slaStatus: 'On Time',
      dispatchedUnits: ['POL-08-UTTARAKHAND', 'AMB-05-UTTARAKHAND'],
      eta: 'Resolved',
      priority: 'Medium',
      reporter: 'Yamamoto Takeshi',
      description: 'Tourist had a fall near the temple steps',
      imageClass: 'kedarnath-temple-bg'
    },
    {
      id: 'INC-2025-001242',
      timestamp: '2025-09-08 14:10:33',
      location: 'Jagannath Temple, Puri',
      type: 'Theft',
      severity: 'Low',
      status: 'Active',
      assignedTo: 'POL-15-PURI',
      responseTime: '5.3 min',
      slaStatus: 'On Time',
      dispatchedUnits: ['POL-15-PURI'],
      eta: '3 min',
      priority: 'Low',
      reporter: 'Emma Wilson',
      description: 'Tourist reported pickpocketing near the temple',
      imageClass: 'jagannath-temple-bg'
    }
  ];

  // India tourist destinations with images
  const indiaDestinations = [
    { name: 'Taj Mahal, Agra', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
    { name: 'Gateway of India, Mumbai', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
    { name: 'Hawa Mahal, Jaipur', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
    { name: 'India Gate, Delhi', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, animation: `${fadeInAnimation} 0.8s ease-out` }}>
            Incident Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ animation: `${fadeInAnimation} 1s ease-out` }}>
            Real-time monitoring and response coordination for tourist incidents across India
          </Typography>
        </Box>
        <Chip 
          icon={<NotificationsIcon />} 
          label="Live Monitoring" 
          color="success" 
          variant="outlined" 
          sx={{ animation: `${pulseAnimation} 2s infinite` }}
        />
      </Box>
      
      <AppBar position="static" sx={{ borderRadius: 2, mb: 3, background: 'linear-gradient(45deg, #2196F3, #21CBF3)' }}>
        <Toolbar sx={{ p: 0 }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ width: '100%' }}
            TabIndicatorProps={{ style: { background: '#FFD700' } }}
          >
            <Tab label="All Incidents" />
            <Tab label="Active" />
            <Tab label="In Progress" />
            <Tab label="Resolved" />
            <Tab label="High Priority" />
            <Tab label="My Assignments" />
          </Tabs>
        </Toolbar>
      </AppBar>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <IndiaCard sx={{ height: '100%', animation: `${fadeInAnimation} ${0.3 + index * 0.1}s ease-out` }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: `${stat.color}.main` }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.description}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: `${stat.color}.light`, width: 48, height: 48 }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </IndiaCard>
          </Grid>
        ))}
      </Grid>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <IndiaCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Real-time Incidents
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
                    onClick={loadIncidents}
                    disabled={loading}
                    sx={{ borderRadius: '50px' }}
                  >
                    Refresh
                  </Button>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search incidents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
                    }}
                    sx={{ minWidth: 250, borderRadius: '50px' }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<FilterIcon />}
                    sx={{ whiteSpace: 'nowrap', borderRadius: '50px' }}
                  >
                    Advanced Filters
                  </Button>
                  <IndiaButton
                    startIcon={<AddIcon />}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    New Incident
                  </IndiaButton>
                </Box>
              </Box>
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    Loading incidents...
                  </Typography>
                </Box>
              ) : (
                <>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={5}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Incident Type</InputLabel>
                        <Select
                          value={filterType}
                          label="Incident Type"
                          onChange={(e) => setFilterType(e.target.value)}
                          sx={{ borderRadius: '50px' }}
                        >
                          <MenuItem value=""><em>All Types</em></MenuItem>
                          {incidentTypes.map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} md={5}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Location</InputLabel>
                        <Select
                          value={filterLocation}
                          label="Location"
                          onChange={(e) => setFilterLocation(e.target.value)}
                          sx={{ borderRadius: '50px' }}
                        >
                          <MenuItem value=""><em>All Locations</em></MenuItem>
                          {locations.map((location) => (
                            <MenuItem key={location} value={location}>{location}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} md={2}>
                      <IndiaButton
                        fullWidth
                        sx={{ height: '100%' }}
                      >
                        Apply
                      </IndiaButton>
                    </Grid>
                  </Grid>
                  
                  <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: '12px' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Case ID</TableCell>
                          <TableCell>Timestamp</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Priority</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Reporter</TableCell>
                          <TableCell>Assigned To</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredIncidents.map((incident) => (
                          <TableRow 
                            key={incident.id} 
                            hover 
                            sx={{ 
                              '&:last-child td, &:last-child th': { border: 0 },
                              animation: `${fadeInAnimation} 0.5s ease-in`,
                              transition: 'background-color 0.3s',
                              '&:hover': {
                                backgroundColor: 'rgba(33, 150, 243, 0.05)',
                              }
                            }}
                          >
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <EmergencyIcon sx={{ fontSize: 16, mr: 1, color: 'error.main' }} />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {incident.id}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {incident.timestamp}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                  {incident.location}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={incident.type} 
                                size="small" 
                                variant="outlined"
                                color={getSeverityColor(incident.severity)}
                                sx={{ borderRadius: '50px' }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={incident.priority} 
                                size="small" 
                                color={getPriorityColor(incident.priority)}
                                sx={{ borderRadius: '50px', fontWeight: 'bold' }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={incident.status} 
                                color={getStatusColor(incident.status)} 
                                size="small" 
                                sx={{ borderRadius: '50px' }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                  {incident.reporter}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {incident.assignedTo}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <IndiaButton size="small" color="primary">
                                View
                              </IndiaButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Showing {filteredIncidents.length} of {incidents.length} incidents
                    </Typography>
                    <Box>
                      <Button size="small" sx={{ mr: 1, borderRadius: '50px' }}>Previous</Button>
                      <IndiaButton size="small">Next</IndiaButton>
                    </Box>
                  </Box>
                </>
              )}
            </CardContent>
          </IndiaCard>
        </Grid>
        
        <Grid item xs={12}>
          <IndiaCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Incident Map Visualization
                </Typography>
                <Box>
                  <Button size="small" variant="outlined" sx={{ mr: 1, borderRadius: '50px' }}>
                    Heatmap
                  </Button>
                  <Button size="small" variant="outlined" sx={{ borderRadius: '50px' }}>
                    Clusters
                  </Button>
                </Box>
              </Box>
              <Box sx={{ 
                height: 500, 
                backgroundColor: '#e3f2fd', 
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: 'url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 0 0 1000px rgba(33, 150, 243, 0.3)'
              }}>
                <Box sx={{ 
                  textAlign: 'center', 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: 3,
                  borderRadius: 2,
                  backdropFilter: 'blur(5px)',
                  animation: `${fadeInAnimation} 1s ease-out`
                }}>
                  <MapIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    Interactive Incident Map
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Real-time visualization of incidents across popular Indian tourist destinations
                  </Typography>
                  <IndiaButton size="large">
                    View Full Map
                  </IndiaButton>
                </Box>
                
                {/* Animated map markers for India tourist locations */}
                <Box sx={{
                  position: 'absolute',
                  top: '30%',
                  left: '40%',
                  width: 24,
                  height: 24,
                  bgcolor: 'error.main',
                  borderRadius: '50%',
                  boxShadow: 3,
                  border: '2px solid white',
                  animation: `${pulseAnimation} 2s infinite`
                }} />
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '60%',
                  width: 24,
                  height: 24,
                  bgcolor: 'warning.main',
                  borderRadius: '50%',
                  boxShadow: 3,
                  border: '2px solid white',
                  animation: `${pulseAnimation} 2s infinite 0.5s`
                }} />
                <Box sx={{
                  position: 'absolute',
                  top: '40%',
                  left: '70%',
                  width: 24,
                  height: 24,
                  bgcolor: 'success.main',
                  borderRadius: '50%',
                  boxShadow: 3,
                  border: '2px solid white',
                  animation: `${pulseAnimation} 2s infinite 1s`
                }} />
                <Box sx={{
                  position: 'absolute',
                  top: '60%',
                  left: '30%',
                  width: 24,
                  height: 24,
                  bgcolor: 'info.main',
                  borderRadius: '50%',
                  boxShadow: 3,
                  border: '2px solid white',
                  animation: `${pulseAnimation} 2s infinite 1.5s`
                }} />
              </Box>
            </CardContent>
          </IndiaCard>
        </Grid>
      </Grid>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default IncidentManagement;