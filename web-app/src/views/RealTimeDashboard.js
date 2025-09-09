import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  styled,
  keyframes,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ListAlt as IncidentIcon,
  VerifiedUser as VerificationIcon,
  LocalShipping as DispatchIcon,
  Assessment as AnalyticsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  ExitToApp as LogoutIcon,
  Security as SecurityIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  TrendingUp as TrendingUpIcon,
  LocationOn as LocationOnIcon,
  People as PeopleIcon,
  Refresh as RefreshIcon,
  Flag as FlagIcon,
  Map as MapIcon,
  Emergency as EmergencyIcon,
  Timeline as TimelineIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis
} from '@mui/x-charts';
import { incidentApi, touristApi, locationApi, unitApi } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

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

const RealTimeDashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [incidents, setIncidents] = useState([]);
  const [tourists, setTourists] = useState([]);
  const [locations, setLocations] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // In a real app, this would clear session data
    window.location.href = '/';
  };

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [incidentsRes, touristsRes, locationsRes, unitsRes] = await Promise.all([
          incidentApi.getAllIncidents(),
          touristApi.getAllTourists(),
          locationApi.getAllLocations(),
          unitApi.getAllUnits()
        ]);
        setIncidents(incidentsRes.data);
        setTourists(touristsRes.data);
        setLocations(locationsRes.data);
        setUnits(unitsRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Set up real-time updates
    const interval = setInterval(loadData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const [incidentsRes, touristsRes, locationsRes, unitsRes] = await Promise.all([
        incidentApi.getAllIncidents(),
        touristApi.getAllTourists(),
        locationApi.getAllLocations(),
        unitApi.getAllUnits()
      ]);
      setIncidents(incidentsRes.data);
      setTourists(touristsRes.data);
      setLocations(locationsRes.data);
      setUnits(unitsRes.data);
    } catch (err) {
      console.error('Failed to refresh data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from loaded data
  const stats = [
    { 
      title: 'Active Incidents', 
      value: incidents.filter(i => i.status === 'Active').length, 
      change: '+3', 
      color: 'error', 
      icon: <WarningIcon />,
      description: 'Requires immediate attention'
    },
    { 
      title: 'Resolved Today', 
      value: incidents.filter(i => i.status === 'Resolved').length, 
      change: '85%', 
      color: 'success', 
      icon: <CheckCircleIcon />,
      description: 'Successfully closed'
    },
    { 
      title: 'Avg Response Time', 
      value: '7.2 min', 
      change: '-0.3', 
      color: 'primary', 
      icon: <AccessTimeIcon />,
      description: 'Faster than yesterday'
    },
    { 
      title: 'Tourists Verified', 
      value: tourists.filter(t => t.status === 'Verified').length, 
      change: '+24', 
      color: 'info', 
      icon: <PeopleIcon />,
      description: 'Valid credentials'
    },
  ];

  // Prepare data for charts
  const incidentTypeData = [
    { name: 'Medical Emergency', value: incidents.filter(i => i.type === 'Medical Emergency').length },
    { name: 'Lost/Harassed', value: incidents.filter(i => i.type === 'Lost/Harassed').length },
    { name: 'Accident', value: incidents.filter(i => i.type === 'Accident').length },
    { name: 'Theft', value: incidents.filter(i => i.type === 'Theft').length },
    { name: 'Other', value: incidents.filter(i => !['Medical Emergency', 'Lost/Harassed', 'Accident', 'Theft'].includes(i.type)).length },
  ];

  const incidentTimelineData = incidents.slice(0, 10).map((incident, index) => ({
    time: incident.timestamp.split(' ')[1],
    incidents: index + 1,
  }));

  const locationSafetyData = locations.map(location => ({
    name: location.name,
    safetyScore: location.safetyScore,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Map data
  const mapCenter = [20.5937, 78.9629]; // Center of India
  const mapZoom = 5;

  // Tourist density data for heatmap
  const touristDensityData = locations.map(location => ({
    name: location.name,
    latitude: 20 + (Math.random() - 0.5) * 10, // Random lat for demo
    longitude: 78 + (Math.random() - 0.5) * 10, // Random lng for demo
    density: location.touristCount / 1000,
  }));

  return (
    <div>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #2E7D32 0%, #0288D1 100%)' }}>
        <Toolbar>
          <SecurityIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Smart Tourist Safety - Real-Time Dashboard
          </Typography>
          <Chip label="Live Monitoring" color="success" size="small" sx={{ mr: 2, animation: `${pulseAnimation} 2s infinite` }} />
          <IconButton color="inherit" onClick={handleMenu}>
            <AccountIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <AccountIcon sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <TrendingUpIcon sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, animation: `${fadeInAnimation} 0.8s ease-out` }}>
              Real-Time Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ animation: `${fadeInAnimation} 1s ease-out` }}>
              Live monitoring and analytics for tourist safety across India
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
              onClick={handleRefresh}
              disabled={loading}
              sx={{ borderRadius: '50px' }}
            >
              Refresh Data
            </Button>
            <Chip 
              icon={<AccessTimeIcon />} 
              label="Updated just now" 
              color="success" 
              variant="outlined" 
              sx={{ animation: `${pulseAnimation} 2s infinite` }}
            />
          </Box>
        </Box>
        
        {/* Stats Cards */}
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <IndiaCard sx={{ height: '100%', animation: `${fadeInAnimation} ${0.3 + index * 0.1}s ease-out` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: `${stat.color}.main` }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: stat.change.startsWith('+') ? 'success.main' : stat.change.startsWith('-') ? 'error.main' : 'text.secondary' }}>
                        {stat.change} from last period
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {stat.description}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: `${stat.color}.light`, width: 56, height: 56 }}>
                      {stat.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </IndiaCard>
            </Grid>
          ))}
        </Grid>
        
        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <IndiaCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    <PieChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Incident Types Distribution
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={incidentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {incidentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </IndiaCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <IndiaCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    <ShowChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Incidents Timeline
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={incidentTimelineData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="incidents" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </IndiaCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <IndiaCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    <BarChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Location Safety Scores
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={locationSafetyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="safetyScore" fill="#82ca9d" name="Safety Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </IndiaCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <IndiaCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    <TimelineIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Tourist Density Heatmap
                  </Typography>
                </Box>
                <Box sx={{ height: 300, position: 'relative' }}>
                  <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {touristDensityData.map((location, index) => (
                      <Circle
                        key={index}
                        center={[location.latitude, location.longitude]}
                        radius={location.density * 5000}
                        fillColor={location.density > 0.7 ? '#f44336' : location.density > 0.4 ? '#ff9800' : '#4caf50'}
                        color={location.density > 0.7 ? '#f44336' : location.density > 0.4 ? '#ff9800' : '#4caf50'}
                        fillOpacity={0.5}
                      >
                        <Popup>
                          <strong>{location.name}</strong>
                          <br />
                          Tourist Density: {location.density.toFixed(2)}
                        </Popup>
                      </Circle>
                    ))}
                  </MapContainer>
                </Box>
              </CardContent>
            </IndiaCard>
          </Grid>
        </Grid>
        
        {/* Recent Incidents and Tourists */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <IndiaCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    <EmergencyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Recent Incidents
                  </Typography>
                  <Button size="small" color="primary" href="/incidents" sx={{ borderRadius: '50px' }}>
                    View All
                  </Button>
                </Box>
                
                {incidents.slice(0, 5).map((incident, index) => (
                  <Box 
                    key={incident.id} 
                    sx={{ 
                      mb: 2, 
                      pb: 2, 
                      borderBottom: index < incidents.slice(0, 5).length - 1 ? 1 : 0, 
                      borderColor: 'divider',
                      animation: `${fadeInAnimation} ${0.9 + index * 0.1}s ease-out`
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EmergencyIcon sx={{ fontSize: 16, mr: 1, color: 'error.main' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {incident.location}
                        </Typography>
                      </Box>
                      <Chip 
                        label={incident.status} 
                        size="small" 
                        color={incident.status === 'Active' ? 'error' : incident.status === 'In Progress' ? 'warning' : 'success'}
                        sx={{ borderRadius: '50px' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {incident.type} • {incident.timestamp}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {incident.assignedTo}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </IndiaCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <IndiaCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    <PeopleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Recent Tourists
                  </Typography>
                  <Button size="small" color="primary" href="/verification" sx={{ borderRadius: '50px' }}>
                    View All
                  </Button>
                </Box>
                
                {tourists.slice(0, 5).map((tourist, index) => (
                  <Box 
                    key={tourist.id} 
                    sx={{ 
                      mb: 2, 
                      pb: 2, 
                      borderBottom: index < tourists.slice(0, 5).length - 1 ? 1 : 0, 
                      borderColor: 'divider',
                      animation: `${fadeInAnimation} ${0.9 + index * 0.1}s ease-out`
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                          <AccountIcon fontSize="small" />
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {tourist.name}
                        </Typography>
                      </Box>
                      <Chip 
                        label={tourist.status} 
                        size="small" 
                        color={tourist.status === 'Verified' ? 'success' : tourist.status === 'Active' ? 'primary' : 'error'}
                        sx={{ borderRadius: '50px' }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <FlagIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {tourist.nationality} • Verified {tourist.lastVerified}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {tourist.currentLocation || 'Unknown location'}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </IndiaCard>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default RealTimeDashboard;