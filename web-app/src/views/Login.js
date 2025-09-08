import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Grid,
  Avatar,
  Divider,
  Link,
  Fade,
  styled,
  keyframes,
} from '@mui/material';
import {
  Security as SecurityIcon,
  AccountCircle as AccountIcon,
  Lock as LockIcon,
  VerifiedUser as VerifiedUserIcon,
  Fingerprint as FingerprintIcon,
  LocationOn as LocationOnIcon,
  Public as PublicIcon,
  Shield as ShieldIcon,
  VpnKey as VpnKeyIcon,
  Login as LoginIcon,
} from '@mui/icons-material';

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
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Login = () => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const roles = [
    'Police',
    'ERSS Operator',
    'Hospital Desk',
    'Tourism Department Admin',
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, this would authenticate with the backend
    console.log('Login attempt with:', { role, username, password, rememberMe });
    // Redirect to dashboard after successful login
    window.location.href = '/dashboard';
  };

  // India tourist destinations for background
  const destinations = [
    { name: 'Taj Mahal, Agra', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
    { name: 'Gateway of India, Mumbai', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
    { name: 'Hawa Mahal, Jaipur', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
    { name: 'India Gate, Delhi', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
  ];

  return (
    <Container component="main" maxWidth="xl" style={{ marginTop: '20px', position: 'relative', minHeight: 'calc(100vh - 40px)' }}>
      {/* Background images for India tourist destinations */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gridTemplateRows: 'repeat(2, 1fr)', 
        gap: 2,
        zIndex: -1,
        opacity: 0.2
      }}>
        {destinations.map((dest, index) => (
          <Box 
            key={index} 
            sx={{ 
              backgroundImage: `url(${dest.image})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              borderRadius: 2,
              animation: `${fadeInAnimation} 1s ease-in-out`
            }} 
          />
        ))}
      </Box>
      
      <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ minHeight: '100%' }}>
        <Grid item xs={12} md={6}>
          <Fade in={true} timeout={1000}>
            <Box textAlign="center" mb={4}>
              <Avatar sx={{ 
                width: 80, 
                height: 80, 
                margin: '0 auto 20px', 
                bgcolor: 'primary.main',
                animation: `${pulseAnimation} 2s infinite`
              }}>
                <SecurityIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography component="h1" variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', animation: `${fadeInAnimation} 1s ease-out` }}>
                Smart Tourist Safety
              </Typography>
              <Typography variant="h5" color="text.secondary" gutterBottom sx={{ animation: `${fadeInAnimation} 1.2s ease-out` }}>
                Admin & Agency Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 600, margin: '16px auto', animation: `${fadeInAnimation} 1.4s ease-out` }}>
                Secure monitoring and incident response platform powered by AI and Blockchain technology for India's tourist destinations
              </Typography>
            </Box>
          </Fade>
          
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Grid item xs={12} sm={4}>
              <Fade in={true} timeout={1500}>
                <IndiaCard sx={{ textAlign: 'center', height: '100%', animation: `${floatAnimation} 3s ease-in-out infinite` }}>
                  <CardContent>
                    <VerifiedUserIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>Secure Access</Typography>
                    <Typography variant="body2" color="text.secondary">
                      DID-based authentication with multi-factor security for Indian tourism authorities
                    </Typography>
                  </CardContent>
                </IndiaCard>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Fade in={true} timeout={2000}>
                <IndiaCard sx={{ textAlign: 'center', height: '100%', animation: `${floatAnimation} 3s ease-in-out infinite 0.5s` }}>
                  <CardContent>
                    <FingerprintIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>Real-time Monitoring</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Live incident tracking and response coordination across Indian tourist destinations
                    </Typography>
                  </CardContent>
                </IndiaCard>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Fade in={true} timeout={2500}>
                <IndiaCard sx={{ textAlign: 'center', height: '100%', animation: `${floatAnimation} 3s ease-in-out infinite 1s` }}>
                  <CardContent>
                    <ShieldIcon sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>Data Protection</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Blockchain-secured tourist verification and privacy controls for Indian travelers
                    </Typography>
                  </CardContent>
                </IndiaCard>
              </Fade>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Fade in={true} timeout={3000}>
            <IndiaCard sx={{ boxShadow: 8, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              <CardContent sx={{ p: 4 }}>
                <Box textAlign="center" mb={3}>
                  <Avatar sx={{ 
                    width: 60, 
                    height: 60, 
                    margin: '0 auto 15px', 
                    bgcolor: 'primary.main',
                    animation: `${pulseAnimation} 2s infinite`
                  }}>
                    <LoginIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Typography component="h1" variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
                    Secure Login
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    Access your dashboard with verified credentials for Indian tourist safety management
                  </Typography>
                </Box>
                
                <Box component="form" onSubmit={handleLogin} noValidate>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel id="role-select-label">Select Your Role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      value={role}
                      label="Select Your Role"
                      onChange={(e) => setRole(e.target.value)}
                      required
                      startAdornment={<AccountIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                      sx={{ borderRadius: '50px' }}
                    >
                      {roles.map((r) => (
                        <MenuItem key={r} value={r}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccountIcon sx={{ mr: 1, fontSize: 20 }} />
                            {r}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username or Email"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                      startAdornment: <AccountIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                    sx={{ borderRadius: '50px' }}
                  />
                  
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                    sx={{ borderRadius: '50px' }}
                  />
                  
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Remember me for 30 days"
                    />
                  </FormGroup>
                  
                  <IndiaButton
                    type="submit"
                    fullWidth
                    size="large"
                    sx={{ mt: 2, py: 1.5, fontWeight: 600, boxShadow: 3 }}
                  >
                    Secure Sign In
                  </IndiaButton>
                  
                  <Box textAlign="center" sx={{ mt: 2 }}>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Box>
                  
                  <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      OR
                    </Typography>
                  </Divider>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FingerprintIcon />}
                    sx={{ py: 1.5, borderRadius: '50px' }}
                  >
                    Biometric Authentication
                  </Button>
                </Box>
              </CardContent>
            </IndiaCard>
          </Fade>
          
          <Box textAlign="center" sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Protected by Blockchain ID Verification • End-to-End Encryption • India Tourism Security Standard
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(33, 150, 243, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(33, 150, 243, 0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </Container>
  );
};

export default Login;