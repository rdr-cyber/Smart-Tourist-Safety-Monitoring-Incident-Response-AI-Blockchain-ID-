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
  Button,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  LocalShipping as DispatchIcon,
  Check as CheckIcon,
  Timer as TimerIcon,
  LocationOn as LocationOnIcon,
  Send as SendIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Emergency as EmergencyIcon,
  Map as MapIcon,
  Speed as SpeedIcon,
  GpsFixed as GpsFixedIcon,
} from '@mui/icons-material';
import { incidentApi, unitApi } from '../services/api';

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

const DispatchTracker = () => {
  const [incidents, setIncidents] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [responseUnit, setResponseUnit] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Load incidents and units from API
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [incidentsRes, unitsRes] = await Promise.all([
        incidentApi.getAllIncidents(),
        unitApi.getAllUnits()
      ]);
      setIncidents(incidentsRes.data);
      setUnits(unitsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load data: ' + err.message);
      setSnackbar({
        open: true,
        message: 'Failed to load data. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDispatch = (incident) => {
    setSelectedIncident(incident);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedIncident(null);
    setResponseUnit('');
  };

  const confirmDispatch = () => {
    if (!responseUnit) {
      setSnackbar({
        open: true,
        message: 'Please select a response unit',
        severity: 'warning'
      });
      return;
    }

    // In a real app, this would dispatch the unit via API
    setSnackbar({
      open: true,
      message: `Response unit ${responseUnit} dispatched to ${selectedIncident.location}`,
      severity: 'success'
    });

    // Update the incident status locally
    const updatedIncidents = incidents.map(incident => 
      incident.id === selectedIncident.id 
        ? { ...incident, status: 'In Progress', assignedTo: responseUnit } 
        : incident
    );
    setIncidents(updatedIncidents);

    handleCloseDialog();
  };

  const getSlaColor = (slaStatus) => {
    switch (slaStatus) {
      case 'On Time': return 'success';
      case 'Delayed': return 'warning';
      case 'Critical': return 'error';
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'error';
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      default: return 'default';
    }
  };

  const getUnitTypeColor = (type) => {
    switch (type) {
      case 'Police': return 'primary';
      case 'Ambulance': return 'error';
      case 'Fire': return 'warning';
      default: return 'default';
    }
  };

  // Filter incidents based on tab
  const filteredIncidents = incidents.filter(incident => {
    switch (tabValue) {
      case 0: return true; // All
      case 1: return incident.status === 'Active';
      case 2: return incident.status === 'In Progress';
      case 3: return incident.status === 'Resolved';
      case 4: return incident.priority === 'Critical' || incident.priority === 'High';
      default: return true;
    }
  });

  // Stats for the dashboard
  const stats = [
    { 
      title: 'Units Available', 
      value: units.filter(unit => unit.status === 'Available').length, 
      icon: <CheckCircleIcon />, 
      color: 'success',
      description: 'Ready for dispatch'
    },
    { 
      title: 'En Route', 
      value: incidents.filter(i => i.status === 'In Progress').length, 
      icon: <AccessTimeIcon />, 
      color: 'warning',
      description: 'Active responses'
    },
    { 
      title: 'On-time Rate', 
      value: '92%', 
      icon: <TimerIcon />, 
      color: 'info',
      description: 'SLA compliance'
    },
    { 
      title: 'Avg Response', 
      value: '7.2 min', 
      icon: <DispatchIcon />, 
      color: 'primary',
      description: 'Response time'
    },
  ];

  // Response units for different cities in India
  const responseUnits = [
    { id: 'POL-05-AGRA', type: 'Police', location: 'Taj Mahal, Agra', status: 'Available', responseTime: '5 min', imageClass: 'taj-mahal-bg' },
    { id: 'POL-12-MUMBAI', type: 'Police', location: 'Gateway of India, Mumbai', status: 'Busy', responseTime: '12 min', imageClass: 'gateway-of-india-bg' },
    { id: 'POL-08-JAIPUR', type: 'Police', location: 'Hawa Mahal, Jaipur', status: 'Available', responseTime: '7 min', imageClass: 'hawa-mahal-bg' },
    { id: 'POL-15-DELHI', type: 'Police', location: 'India Gate, Delhi', status: 'Available', responseTime: '6 min', imageClass: 'india-gate-bg' },
    { id: 'POL-08-UTTARAKHAND', type: 'Police', location: 'Kedarnath Temple, Uttarakhand', status: 'Available', responseTime: '15 min', imageClass: 'kedarnath-temple-bg' },
    { id: 'POL-15-PURI', type: 'Police', location: 'Jagannath Temple, Puri', status: 'Available', responseTime: '8 min', imageClass: 'jagannath-temple-bg' },
    { id: 'AMB-02-AGRA', type: 'Ambulance', location: 'Taj Mahal, Agra', status: 'En Route', responseTime: '8 min', imageClass: 'taj-mahal-bg' },
    { id: 'AMB-05-MUMBAI', type: 'Ambulance', location: 'Gateway of India, Mumbai', status: 'Available', responseTime: '5 min', imageClass: 'gateway-of-india-bg' },
    { id: 'AMB-03-JAIPUR', type: 'Ambulance', location: 'Hawa Mahal, Jaipur', status: 'Available', responseTime: '6 min', imageClass: 'hawa-mahal-bg' },
    { id: 'FIR-01-AGRA', type: 'Fire', location: 'Taj Mahal, Agra', status: 'Available', responseTime: '9 min', imageClass: 'taj-mahal-bg' },
    { id: 'FIR-02-UTTARAKHAND', type: 'Fire', location: 'Kedarnath Temple, Uttarakhand', status: 'Available', responseTime: '18 min', imageClass: 'kedarnath-temple-bg' },
    { id: 'FIR-03-PURI', type: 'Fire', location: 'Jagannath Temple, Puri', status: 'Available', responseTime: '12 min', imageClass: 'jagannath-temple-bg' }
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, animation: `${fadeInAnimation} 0.8s ease-out` }}>
            Dispatch Tracker
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ animation: `${fadeInAnimation} 1s ease-out` }}>
            Real-time response unit dispatch and tracking across Indian tourist destinations
          </Typography>
        </Box>
        <Chip 
          icon={<DispatchIcon />} 
          label="Live Tracking" 
          color="success" 
          variant="outlined" 
          sx={{ animation: `${pulseAnimation} 2s infinite` }}
        />
      </Box>
      
      <AppBar position="static" sx={{ borderRadius: 2, mb: 3, background: 'linear-gradient(45deg, #FF5722, #FF9800)' }}>
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
                  Real-time Dispatch Tracking
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
                    onClick={loadData}
                    disabled={loading}
                    sx={{ borderRadius: '50px' }}
                  >
                    Refresh
                  </Button>
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
                <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: '12px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Case ID</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Assigned To</TableCell>
                        <TableCell>Response Time</TableCell>
                        <TableCell>SLA</TableCell>
                        <TableCell>ETA</TableCell>
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
                              backgroundColor: 'rgba(255, 87, 34, 0.05)',
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
                              color={getSlaColor(incident.slaStatus)}
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
                            <Typography variant="body2">
                              {incident.assignedTo}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {incident.responseTime}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={incident.slaStatus} 
                              color={getSlaColor(incident.slaStatus)} 
                              size="small" 
                              icon={incident.slaStatus === 'On Time' ? <CheckIcon /> : <TimerIcon />}
                              sx={{ borderRadius: '50px' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {incident.eta}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <IndiaButton 
                              size="small" 
                              startIcon={<DispatchIcon />}
                              onClick={() => handleDispatch(incident)}
                              disabled={incident.status === 'Resolved'}
                            >
                              Dispatch
                            </IndiaButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </IndiaCard>
        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <IndiaCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Response Units Status
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Unit ID</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Current Location</TableCell>
                          <TableCell>Response Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {units.map((unit, index) => (
                          <TableRow 
                            key={unit.id} 
                            sx={{ 
                              animation: `${fadeInAnimation} ${0.5 + index * 0.1}s ease-in` 
                            }}
                          >
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <GpsFixedIcon sx={{ fontSize: 14, mr: 0.5, color: 'primary.main' }} />
                                {unit.id}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={unit.type} 
                                size="small" 
                                color={getUnitTypeColor(unit.type)}
                                sx={{ borderRadius: '50px' }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={unit.status} 
                                color={unit.status === 'Available' ? 'success' : unit.status === 'Busy' ? 'error' : 'warning'} 
                                size="small" 
                                sx={{ borderRadius: '50px' }}
                              />
                            </TableCell>
                            <TableCell>{unit.location}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SpeedIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                                {unit.responseTime}
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </IndiaCard>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <IndiaCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    SLA Compliance
                  </Typography>
                  <Box textAlign="center" p={2}>
                    <Typography variant="h3" color="success.main">92%</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>On-time Response Rate</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                      <Box>
                        <Typography variant="h6" color="primary.main">89%</Typography>
                        <Typography variant="body2">Police</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6" color="secondary.main">95%</Typography>
                        <Typography variant="body2">Ambulance</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6" color="warning.main">91%</Typography>
                        <Typography variant="body2">Fire</Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      Response Time Distribution
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ width: 80 }}>0-5 min</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={45} 
                        color="success" 
                        sx={{ flex: 1, mr: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" sx={{ width: 40, textAlign: 'right' }}>45%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ width: 80 }}>5-10 min</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={35} 
                        color="primary" 
                        sx={{ flex: 1, mr: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" sx={{ width: 40, textAlign: 'right' }}>35%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ width: 80 }}>10+ min</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={20} 
                        color="warning" 
                        sx={{ flex: 1, mr: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" sx={{ width: 40, textAlign: 'right' }}>20%</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </IndiaCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DispatchIcon sx={{ mr: 1 }} />
            Dispatch Response Unit
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedIncident && (
            <Box mt={2}>
              <Typography variant="h6">Incident: {selectedIncident.id}</Typography>
              <Typography><strong>Location:</strong> {selectedIncident.location}</Typography>
              <Typography><strong>Type:</strong> {selectedIncident.type}</Typography>
              <Typography><strong>Status:</strong> {selectedIncident.status}</Typography>
              
              <Box mt={3}>
                <FormControl fullWidth>
                  <InputLabel>Select Response Unit</InputLabel>
                  <Select
                    value={responseUnit}
                    label="Select Response Unit"
                    onChange={(e) => setResponseUnit(e.target.value)}
                    sx={{ borderRadius: '50px' }}
                  >
                    <MenuItem value=""><em>Select a unit</em></MenuItem>
                    {units
                      .filter(unit => unit.status === 'Available')
                      .map((unit) => (
                        <MenuItem key={unit.id} value={unit.id}>
                          {unit.id} - {unit.type} ({unit.location})
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                
                <Box mt={2}>
                  <TextField
                    fullWidth
                    label="Additional Notes (Optional)"
                    multiline
                    rows={3}
                    placeholder="Any additional information for the response unit..."
                    sx={{ borderRadius: '12px' }}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" sx={{ borderRadius: '50px' }}>
            Cancel
          </Button>
          <IndiaButton 
            startIcon={<SendIcon />}
            onClick={confirmDispatch}
            sx={{ borderRadius: '50px' }}
          >
            Confirm Dispatch
          </IndiaButton>
        </DialogActions>
      </Dialog>
      
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

export default DispatchTracker;