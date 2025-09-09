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
  LinearProgress,
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
} from '@mui/icons-material';
import { incidentApi, touristApi } from '../services/api';

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

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [incidents, setIncidents] = useState([]);
  const [tourists, setTourists] = useState([]);
  const [loading, setLoading] = useState(true);
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
        const [incidentsRes, touristsRes] = await Promise.all([
          incidentApi.getAllIncidents(),
          touristApi.getAllTourists()
        ]);
        setIncidents(incidentsRes.data);
        setTourists(touristsRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const [incidentsRes, touristsRes] = await Promise.all([
        incidentApi.getAllIncidents(),
        touristApi.getAllTourists()
      ]);
      setIncidents(incidentsRes.data);
      setTourists(touristsRes.data);
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

  const quickActions = [
    { title: 'Incident Management', icon: <IncidentIcon />, color: 'primary', href: '/incidents' },
    { title: 'Tourist Verification', icon: <VerificationIcon />, color: 'secondary', href: '/verification' },
    { title: 'Dispatch Tracker', icon: <DispatchIcon />, color: '#9c27b0', href: '/dispatch' },
    { title: 'Analytics & Reports', icon: <AnalyticsIcon />, color: '#ff9800', href: '/analytics' },
  ];

  const safetyZones = [
    { 
      name: 'Taj Mahal, Agra', 
      status: 'Safe', 
      level: 95, 
      color: 'success',
      imageClass: 'taj-mahal-bg'
    },
    { 
      name: 'Gateway of India, Mumbai', 
      status: 'Moderate', 
      level: 70, 
      color: 'warning',
      imageClass: 'gateway-of-india-bg'
    },
    { 
      name: 'Hawa Mahal, Jaipur', 
      status: 'High Risk', 
      level: 30, 
      color: 'error',
      imageClass: 'hawa-mahal-bg'
    },
    { 
      name: 'India Gate, Delhi', 
      status: 'Safe', 
      level: 90, 
      color: 'success',
      imageClass: 'india-gate-bg'
    },
    { 
      name: 'Kedarnath Temple, Uttarakhand', 
      status: 'Safe', 
      level: 88, 
      color: 'success',
      imageClass: 'kedarnath-temple-bg'
    },
    { 
      name: 'Jagannath Temple, Puri', 
      status: 'Moderate', 
      level: 75, 
      color: 'warning',
      imageClass: 'jagannath-temple-bg'
    },
  ];

  return (
    <div>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #2E7D32 0%, #0288D1 100%)' }}>
        <Toolbar>
          <SecurityIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Smart Tourist Safety Admin Portal
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
              Dashboard Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ animation: `${fadeInAnimation} 1s ease-out` }}>
              Real-time monitoring and analytics for tourist safety across India
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
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <IndiaCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Quick Actions
                  </Typography>
                  <Button size="small" color="primary" sx={{ borderRadius: '50px' }}>
                    View All
                  </Button>
                </Box>
                <Grid container spacing={2}>
                  {quickActions.map((action, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Button
                        fullWidth
                        variant="contained"
                        href={action.href}
                        sx={{
                          height: 80,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          py: 2,
                          borderRadius: 3,
                          backgroundColor: action.color,
                          boxShadow: 3,
                          '&:hover': {
                            boxShadow: 6,
                            transform: 'translateY(-2px)',
                          },
                          animation: `${fadeInAnimation} ${0.5 + index * 0.1}s ease-out`
                        }}
                      >
                        {action.icon}
                        <Typography variant="body1" sx={{ mt: 1, fontWeight: 600, color: 'white' }}>
                          {action.title}
                        </Typography>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </IndiaCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <IndiaCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Safety Zones
                  </Typography>
                  <Button size="small" color="primary" sx={{ borderRadius: '50px' }}>
                    View Map
                  </Button>
                </Box>
                
                <Box sx={{ 
                  height: 200, 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80)',
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
                    <MapIcon sx={{ fontSize: 40, color: 'white', mr: 1 }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      India Tourist Safety Map
                    </Typography>
                  </Box>
                </Box>
                
                {safetyZones.map((zone, index) => (
                  <Box key={index} sx={{ mb: 2, animation: `${fadeInAnimation} ${0.7 + index * 0.1}s ease-out` }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {zone.name}
                      </Typography>
                      <Chip 
                        label={zone.status} 
                        size="small" 
                        color={zone.color}
                        sx={{ borderRadius: '50px' }}
                      />
                    </Box>
                    <Box sx={{ 
                      height: 100, 
                      borderRadius: 2,
                      mb: 1,
                      position: 'relative',
                      boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.3)'
                    }} className={zone.imageClass}>
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
                    <LinearProgress 
                      variant="determinate" 
                      value={zone.level} 
                      color={zone.color}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </CardContent>
            </IndiaCard>
          </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <IndiaCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Recent Incidents
                  </Typography>
                  <Button size="small" color="primary" href="/incidents" sx={{ borderRadius: '50px' }}>
                    View All
                  </Button>
                </Box>
                
                {incidents.slice(0, 3).map((incident, index) => (
                  <Box 
                    key={incident.id} 
                    sx={{ 
                      mb: 2, 
                      pb: 2, 
                      borderBottom: index < incidents.slice(0, 3).length - 1 ? 1 : 0, 
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
                    Tourist Verification
                  </Typography>
                  <Button size="small" color="primary" href="/verification" sx={{ borderRadius: '50px' }}>
                    View All
                  </Button>
                </Box>
                
                {tourists.slice(0, 3).map((tourist, index) => (
                  <Box 
                    key={tourist.id} 
                    sx={{ 
                      mb: 2, 
                      pb: 2, 
                      borderBottom: index < tourists.slice(0, 3).length - 1 ? 1 : 0, 
                      borderColor: 'divider',
                      animation: `${fadeInAnimation} ${0.9 + index * 0.1}s ease-out`
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                          <PersonIcon fontSize="small" />
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

export default Dashboard;