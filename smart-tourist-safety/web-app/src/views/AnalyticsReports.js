import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  LinearProgress,
  CircularProgress,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Avatar,
  styled,
  keyframes,
} from '@mui/material';
import {
  Assessment as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Download as DownloadIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as ShowChartIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { incidentApi, touristApi, locationApi } from '../services/api';

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

const AnalyticsReports = () => {
  const [incidents, setIncidents] = useState([]);
  const [tourists, setTourists] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  // Load data from API
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [incidentsRes, touristsRes, locationsRes] = await Promise.all([
        incidentApi.getAllIncidents(),
        touristApi.getAllTourists(),
        locationApi.getAllLocations()
      ]);
      setIncidents(incidentsRes.data);
      setTourists(touristsRes.data);
      setLocations(locationsRes.data);
    } catch (err) {
      console.error('Failed to load analytics data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate analytics data
  const getTotalIncidents = () => incidents.length;
  const getResolvedIncidents = () => incidents.filter(i => i.status === 'Resolved').length;
  const getActiveIncidents = () => incidents.filter(i => i.status === 'Active').length;
  const getVerifiedTourists = () => tourists.filter(t => t.status === 'Verified').length;
  const getAverageResponseTime = () => {
    const totalResponseTime = incidents.reduce((sum, incident) => {
      const time = parseFloat(incident.responseTime);
      return sum + (isNaN(time) ? 0 : time);
    }, 0);
    return (totalResponseTime / incidents.length).toFixed(1) + ' min';
  };

  // Get incident types distribution
  const getIncidentTypes = () => {
    const types = {};
    incidents.forEach(incident => {
      types[incident.type] = (types[incident.type] || 0) + 1;
    });
    return Object.entries(types).map(([type, count]) => ({ type, count }));
  };

  // Get incidents by location
  const getIncidentsByLocation = () => {
    const locationCounts = {};
    incidents.forEach(incident => {
      locationCounts[incident.location] = (locationCounts[incident.location] || 0) + 1;
    });
    return Object.entries(locationCounts).map(([location, count]) => ({ location, count }));
  };

  // Get tourist nationalities distribution
  const getTouristNationalities = () => {
    const nationalities = {};
    tourists.forEach(tourist => {
      nationalities[tourist.nationality] = (nationalities[tourist.nationality] || 0) + 1;
    });
    return Object.entries(nationalities).map(([nationality, count]) => ({ nationality, count }));
  };

  // Stats for the dashboard
  const stats = [
    { 
      title: 'Total Incidents', 
      value: getTotalIncidents(), 
      icon: <WarningIcon />, 
      color: 'error',
      description: 'All reported incidents'
    },
    { 
      title: 'Resolved Incidents', 
      value: getResolvedIncidents(), 
      icon: <CheckCircleIcon />, 
      color: 'success',
      description: 'Successfully closed cases'
    },
    { 
      title: 'Active Incidents', 
      value: getActiveIncidents(), 
      icon: <AccessTimeIcon />, 
      color: 'warning',
      description: 'Currently being handled'
    },
    { 
      title: 'Verified Tourists', 
      value: getVerifiedTourists(), 
      icon: <PeopleIcon />, 
      color: 'info',
      description: 'Trusted travelers'
    },
    { 
      title: 'Avg Response Time', 
      value: getAverageResponseTime(), 
      icon: <TrendingUpIcon />, 
      color: 'primary',
      description: 'Time to first response'
    },
  ];

  // Incident types data
  const incidentTypes = getIncidentTypes();
  
  // Incidents by location
  const incidentsByLocation = getIncidentsByLocation();
  
  // Tourist nationalities
  const touristNationalities = getTouristNationalities();

  // India-themed tourist locations with safety scores
  const indiaTouristLocations = [
    { name: 'Taj Mahal, Agra', safetyScore: 92, riskLevel: 'Low', touristCount: 15000, imageClass: 'taj-mahal-bg' },
    { name: 'Gateway of India, Mumbai', safetyScore: 78, riskLevel: 'Medium', touristCount: 22000, imageClass: 'gateway-of-india-bg' },
    { name: 'Hawa Mahal, Jaipur', safetyScore: 65, riskLevel: 'High', touristCount: 12000, imageClass: 'hawa-mahal-bg' },
    { name: 'India Gate, Delhi', safetyScore: 88, riskLevel: 'Low', touristCount: 18000, imageClass: 'india-gate-bg' },
    { name: 'Kedarnath Temple, Uttarakhand', safetyScore: 85, riskLevel: 'Low', touristCount: 8000, imageClass: 'kedarnath-temple-bg' },
    { name: 'Jagannath Temple, Puri', safetyScore: 82, riskLevel: 'Low', touristCount: 15000, imageClass: 'jagannath-temple-bg' },
    { name: 'Qutub Minar, Delhi', safetyScore: 94, riskLevel: 'Low', touristCount: 11000, imageClass: 'qutub-minar-bg' },
    { name: 'Mysore Palace, Mysore', safetyScore: 87, riskLevel: 'Low', touristCount: 8500, imageClass: 'mysore-palace-bg' }
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, animation: `${fadeInAnimation} 0.8s ease-out` }}>
            Analytics & Reports
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ animation: `${fadeInAnimation} 1s ease-out` }}>
            Data-driven insights for tourist safety across India
          </Typography>
        </Box>
        <Chip 
          icon={<AnalyticsIcon />} 
          label="Real-time Data" 
          color="primary" 
          variant="outlined" 
          sx={{ animation: `${pulseAnimation} 2s infinite` }}
        />
      </Box>
      
      <AppBar position="static" sx={{ borderRadius: 2, mb: 3, background: 'linear-gradient(45deg, #9C27B0, #673AB7)' }}>
        <Toolbar sx={{ p: 0 }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ width: '100%' }}
            TabIndicatorProps={{ style: { background: '#FFD700' } }}
          >
            <Tab label="Overview" />
            <Tab label="Incident Trends" />
            <Tab label="Location Analysis" />
            <Tab label="Tourist Demographics" />
            <Tab label="Performance Metrics" />
          </Tabs>
        </Toolbar>
      </AppBar>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Loading analytics data...
          </Typography>
        </Box>
      ) : (
        <>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
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
              
              <Grid item xs={12} md={6}>
                <IndiaCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        <BarChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Incident Types Distribution
                      </Typography>
                      <Button size="small" startIcon={<DownloadIcon />}>
                        Export
                      </Button>
                    </Box>
                    
                    {incidentTypes.map((item, index) => (
                      <Box key={index} sx={{ mb: 2, animation: `${fadeInAnimation} ${0.5 + index * 0.1}s ease-out` }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.type}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.count}
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(item.count / getTotalIncidents()) * 100} 
                          color={
                            item.type.includes('Medical') ? 'error' : 
                            item.type.includes('Lost') ? 'warning' : 
                            item.type.includes('Theft') ? 'primary' : 'info'
                          }
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    ))}
                  </CardContent>
                </IndiaCard>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <IndiaCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        <PieChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Incidents by Location
                      </Typography>
                      <Button size="small" startIcon={<DownloadIcon />}>
                        Export
                      </Button>
                    </Box>
                    
                    {incidentsByLocation.map((item, index) => (
                      <Box key={index} sx={{ mb: 2, animation: `${fadeInAnimation} ${0.5 + index * 0.1}s ease-out` }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {item.location}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.count}
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(item.count / getTotalIncidents()) * 100} 
                          color={
                            item.location.includes('Taj') ? 'error' : 
                            item.location.includes('Gateway') ? 'warning' : 
                            item.location.includes('Hawa') ? 'primary' : 'info'
                          }
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    ))}
                  </CardContent>
                </IndiaCard>
              </Grid>
              
              <Grid item xs={12}>
                <IndiaCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        <ShowChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Safety Score by Location
                      </Typography>
                      <Button size="small" startIcon={<DownloadIcon />}>
                        Export
                      </Button>
                    </Box>
                    
                    <Box sx={{ 
                      height: 300, 
                      backgroundImage: 'url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 2,
                      mb: 2,
                      position: 'relative',
                      boxShadow: 'inset 0 0 0 1000px rgba(33, 150, 243, 0.3)'
                    }}>
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Box sx={{ textAlign: 'center', color: 'white' }}>
                          <MapIcon sx={{ fontSize: 40, mb: 1 }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            India Tourist Safety Heatmap
                          </Typography>
                          <Typography variant="body2">
                            Color-coded safety scores across popular tourist destinations
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Grid container spacing={2}>
                      {locations.map((location, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                          <Box sx={{ 
                            p: 2, 
                            borderRadius: 2, 
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            textAlign: 'center',
                            animation: `${fadeInAnimation} ${0.7 + index * 0.1}s ease-out`,
                            position: 'relative',
                            overflow: 'hidden'
                          }}>
                            <Box sx={{ 
                              height: 100, 
                              borderRadius: 2,
                              mb: 1,
                              position: 'relative',
                              boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.3)'
                            }} className={location.imageClass}>
                              <Box sx={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                right: 0, 
                                bottom: 0, 
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: 2,
                              }} />
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                              {location.name}
                            </Typography>
                            <Typography variant="h5" sx={{ 
                              fontWeight: 700, 
                              color: location.safetyScore > 80 ? 'success.main' : 
                                     location.safetyScore > 60 ? 'warning.main' : 'error.main' 
                            }}>
                              {location.safetyScore}
                            </Typography>
                            <Chip 
                              label={location.riskLevel} 
                              size="small" 
                              color={
                                location.riskLevel === 'Low' ? 'success' : 
                                location.riskLevel === 'Medium' ? 'warning' : 'error'
                              }
                              sx={{ mt: 1, borderRadius: '50px' }}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </IndiaCard>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <IndiaCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Incident Trends Over Time
                      </Typography>
                      <Button size="small" startIcon={<DownloadIcon />}>
                        Export Report
                      </Button>
                    </Box>
                    
                    <Box sx={{ 
                      height: 400, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      borderRadius: 2,
                      mb: 2
                    }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <ShowChartIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          Incident Trends Visualization
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Interactive chart showing incident trends over the past 30 days
                        </Typography>
                        <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
                          This would show a line chart with incident volumes over time
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          textAlign: 'center'
                        }}>
                          <CalendarIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                          <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            24%
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Increase This Month
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          textAlign: 'center'
                        }}>
                          <WarningIcon sx={{ fontSize: 32, color: 'warning.main', mb: 1 }} />
                          <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            15%
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Medical Emergencies
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          textAlign: 'center'
                        }}>
                          <AccessTimeIcon sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
                          <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            7.2 min
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Avg Response Time
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </IndiaCard>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <IndiaCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        <LocationIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Location Safety Analysis
                      </Typography>
                      <Button size="small" startIcon={<DownloadIcon />}>
                        Export Analysis
                      </Button>
                    </Box>
                    
                    <Grid container spacing={2}>
                      {locations.map((location, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <IndiaCard sx={{ height: '100%' }}>
                            <CardContent>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    {location.name}
                                  </Typography>
                                  <Chip 
                                    label={`${location.touristCount.toLocaleString()} visitors`}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  />
                                </Box>
                                <Avatar sx={{ 
                                  bgcolor: location.safetyScore > 80 ? 'success.light' : 
                                          location.safetyScore > 60 ? 'warning.light' : 'error.light',
                                  width: 56, 
                                  height: 56 
                                }}>
                                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                                    {location.safetyScore}
                                  </Typography>
                                </Avatar>
                              </Box>
                              
                              <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                  <Typography variant="body2" color="text.secondary">
                                    Safety Score
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {location.safetyScore}/100
                                  </Typography>
                                </Box>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={location.safetyScore} 
                                  color={
                                    location.safetyScore > 80 ? 'success' : 
                                    location.safetyScore > 60 ? 'warning' : 'error'
                                  }
                                  sx={{ height: 8, borderRadius: 4 }}
                                />
                              </Box>
                              
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    Risk Level
                                  </Typography>
                                  <Chip 
                                    label={location.riskLevel} 
                                    size="small" 
                                    color={
                                      location.riskLevel === 'Low' ? 'success' : 
                                      location.riskLevel === 'Medium' ? 'warning' : 'error'
                                    }
                                    sx={{ mt: 0.5, borderRadius: '50px' }}
                                  />
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                  <Typography variant="body2" color="text.secondary">
                                    Incidents
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {incidents.filter(i => i.location === location.name).length}
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </IndiaCard>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </IndiaCard>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <IndiaCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        <PeopleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Tourist Demographics
                      </Typography>
                      <Button size="small" startIcon={<DownloadIcon />}>
                        Export Data
                      </Button>
                    </Box>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <IndiaCard>
                          <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                              <FlagIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                              Nationality Distribution
                            </Typography>
                            
                            {touristNationalities.map((item, index) => (
                              <Box key={index} sx={{ mb: 2, animation: `${fadeInAnimation} ${0.5 + index * 0.1}s ease-out` }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {item.nationality}
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {item.count}
                                  </Typography>
                                </Box>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={(item.count / tourists.length) * 100} 
                                  color={
                                    item.nationality === 'American' ? 'primary' : 
                                    item.nationality === 'Japanese' ? 'error' : 
                                    item.nationality === 'British' ? 'secondary' : 'info'
                                  }
                                  sx={{ height: 8, borderRadius: 4 }}
                                />
                              </Box>
                            ))}
                          </CardContent>
                        </IndiaCard>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <IndiaCard>
                          <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                              <CalendarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                              Verification Status
                            </Typography>
                            
                            <Box sx={{ mb: 3 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  Verified Tourists
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {getVerifiedTourists()}
                                </Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={(getVerifiedTourists() / tourists.length) * 100} 
                                color="success"
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                            
                            <Box sx={{ mb: 3 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  Active Tourists
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {tourists.filter(t => t.status === 'Active').length}
                                </Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={(tourists.filter(t => t.status === 'Active').length / tourists.length) * 100} 
                                color="warning"
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                            
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                                Tourist Verification Trends
                              </Typography>
                              <Box sx={{ 
                                height: 200, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                borderRadius: 2
                              }}>
                                <Box sx={{ textAlign: 'center' }}>
                                  <PieChartIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                  <Typography variant="body2" color="text.secondary">
                                    Pie chart showing verification status distribution
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </CardContent>
                        </IndiaCard>
                      </Grid>
                    </Grid>
                  </CardContent>
                </IndiaCard>
              </Grid>
            </Grid>
          )}
          
          {tabValue === 4 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <IndiaCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Performance Metrics
                      </Typography>
                      <Button size="small" startIcon={<DownloadIcon />}>
                        Export Metrics
                      </Button>
                    </Box>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <IndiaCard>
                          <CardContent>
                            <Box sx={{ textAlign: 'center' }}>
                              <Avatar sx={{ 
                                width: 64, 
                                height: 64, 
                                bgcolor: 'success.light', 
                                mx: 'auto', 
                                mb: 2 
                              }}>
                                <AccessTimeIcon sx={{ fontSize: 32, color: 'white' }} />
                              </Avatar>
                              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                                7.2 min
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                                Avg Response Time
                              </Typography>
                              <Chip 
                                label="+0.3 min from last month" 
                                color="success" 
                                size="small" 
                                variant="outlined"
                              />
                            </Box>
                          </CardContent>
                        </IndiaCard>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <IndiaCard>
                          <CardContent>
                            <Box sx={{ textAlign: 'center' }}>
                              <Avatar sx={{ 
                                width: 64, 
                                height: 64, 
                                bgcolor: 'primary.light', 
                                mx: 'auto', 
                                mb: 2 
                              }}>
                                <CheckCircleIcon sx={{ fontSize: 32, color: 'white' }} />
                              </Avatar>
                              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                92%
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                                SLA Compliance
                              </Typography>
                              <Chip 
                                label="+3% from last month" 
                                color="primary" 
                                size="small" 
                                variant="outlined"
                              />
                            </Box>
                          </CardContent>
                        </IndiaCard>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <IndiaCard>
                          <CardContent>
                            <Box sx={{ textAlign: 'center' }}>
                              <Avatar sx={{ 
                                width: 64, 
                                height: 64, 
                                bgcolor: 'warning.light', 
                                mx: 'auto', 
                                mb: 2 
                              }}>
                                <TrendingUpIcon sx={{ fontSize: 32, color: 'white' }} />
                              </Avatar>
                              <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                                85%
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                                Resolution Rate
                              </Typography>
                              <Chip 
                                label="+5% from last month" 
                                color="warning" 
                                size="small" 
                                variant="outlined"
                              />
                            </Box>
                          </CardContent>
                        </IndiaCard>
                      </Grid>
                    </Grid>
                    
                    <IndiaCard sx={{ mt: 3 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          Response Time Distribution
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Typography variant="body2" sx={{ width: 100 }}>0-5 min</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={45} 
                            color="success" 
                            sx={{ flex: 1, mr: 1, height: 12, borderRadius: 6 }}
                          />
                          <Typography variant="body2" sx={{ width: 50, textAlign: 'right' }}>45%</Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Typography variant="body2" sx={{ width: 100 }}>5-10 min</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={35} 
                            color="primary" 
                            sx={{ flex: 1, mr: 1, height: 12, borderRadius: 6 }}
                          />
                          <Typography variant="body2" sx={{ width: 50, textAlign: 'right' }}>35%</Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Typography variant="body2" sx={{ width: 100 }}>10-15 min</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={15} 
                            color="warning" 
                            sx={{ flex: 1, mr: 1, height: 12, borderRadius: 6 }}
                          />
                          <Typography variant="body2" sx={{ width: 50, textAlign: 'right' }}>15%</Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ width: 100 }}>15+ min</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={5} 
                            color="error" 
                            sx={{ flex: 1, mr: 1, height: 12, borderRadius: 6 }}
                          />
                          <Typography variant="body2" sx={{ width: 50, textAlign: 'right' }}>5%</Typography>
                        </Box>
                      </CardContent>
                    </IndiaCard>
                  </CardContent>
                </IndiaCard>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default AnalyticsReports;