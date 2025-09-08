import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Avatar,
  LinearProgress,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  styled,
  keyframes,
} from '@mui/material';
import {
  Search as SearchIcon,
  Verified as VerifiedIcon,
  Block as BlockIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  QrCode as QrCodeIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  AccountBalance as AccountBalanceIcon,
  Flag as FlagIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { touristApi } from '../services/api';

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

const TouristVerification = () => {
  const [tourists, setTourists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Sample tourists data
  const sampleTourists = [
    {
      id: 'DID-2025-001245',
      name: 'John Smith',
      nationality: 'American',
      status: 'Verified',
      issuedBy: 'Tourism Department',
      issuedDate: '2025-09-01',
      expiryDate: '2025-12-31',
      txId: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
      lastVerified: '2025-09-08 14:30:22',
      verificationCount: 12,
      currentLocation: 'Taj Mahal, Agra',
      imageClass: 'taj-mahal-bg'
    },
    {
      id: 'DID-2025-001244',
      name: 'Maria Garcia',
      nationality: 'Spanish',
      status: 'Active',
      issuedBy: 'Tourism Department',
      issuedDate: '2025-09-05',
      expiryDate: '2025-12-31',
      txId: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      lastVerified: '2025-09-08 10:15:45',
      verificationCount: 8,
      currentLocation: 'Gateway of India, Mumbai',
      imageClass: 'gateway-of-india-bg'
    },
    {
      id: 'DID-2025-001243',
      name: 'Yamamoto Takeshi',
      nationality: 'Japanese',
      status: 'Verified',
      issuedBy: 'Tourism Department',
      issuedDate: '2025-09-03',
      expiryDate: '2025-12-31',
      txId: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
      lastVerified: '2025-09-08 09:45:12',
      verificationCount: 15,
      currentLocation: 'Kedarnath Temple, Uttarakhand',
      imageClass: 'kedarnath-temple-bg'
    },
    {
      id: 'DID-2025-001242',
      name: 'Emma Wilson',
      nationality: 'British',
      status: 'Verified',
      issuedBy: 'Tourism Department',
      issuedDate: '2025-09-02',
      expiryDate: '2025-12-31',
      txId: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
      lastVerified: '2025-09-08 14:10:33',
      verificationCount: 7,
      currentLocation: 'Jagannath Temple, Puri',
      imageClass: 'jagannath-temple-bg'
    }
  ];

  // Load tourists from API
  useEffect(() => {
    loadTourists();
  }, []);

  const loadTourists = async () => {
    try {
      setLoading(true);
      const response = await touristApi.getAllTourists();
      setTourists(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load tourists: ' + err.message);
      setSnackbar({
        open: true,
        message: 'Failed to load tourists. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const stats = [
    { 
      title: 'Total Verified', 
      value: tourists.filter(t => t.status === 'Verified').length, 
      icon: <VerifiedIcon />, 
      color: 'success',
      description: 'Valid credentials'
    },
    { 
      title: 'Active Today', 
      value: tourists.filter(t => t.status === 'Active').length, 
      icon: <PersonIcon />, 
      color: 'primary',
      description: 'Currently traveling'
    },
    { 
      title: 'Revoked', 
      value: tourists.filter(t => t.status === 'Revoked').length, 
      icon: <BlockIcon />, 
      color: 'error',
      description: 'Invalid credentials'
    },
    { 
      title: 'Avg Verification', 
      value: '2.4 sec', 
      icon: <SecurityIcon />, 
      color: 'info',
      description: 'Processing time'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'success';
      case 'Active': return 'primary';
      case 'Revoked': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Verified': return <CheckCircleIcon />;
      case 'Active': return <WarningIcon />;
      case 'Revoked': return <ErrorIcon />;
      default: return <PersonIcon />;
    }
  };

  const handleSearch = () => {
    // In a real app, this would search the blockchain
    console.log('Searching for:', searchTerm);
  };

  const handleViewDetails = (tourist) => {
    setSelectedTourist(tourist);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTourist(null);
  };

  // Filter tourists based on search term
  const filteredTourists = tourists.filter(tourist => {
    return searchTerm === '' || 
      tourist.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.txId.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, animation: `${fadeInAnimation} 0.8s ease-out` }}>
            Tourist Verification
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ animation: `${fadeInAnimation} 1s ease-out` }}>
            Blockchain-backed identity verification for tourist safety across India
          </Typography>
        </Box>
        <Chip 
          icon={<SecurityIcon />} 
          label="Blockchain Secured" 
          color="success" 
          variant="outlined" 
          sx={{ animation: `${pulseAnimation} 2s infinite` }}
        />
      </Box>
      
      <AppBar position="static" sx={{ borderRadius: 2, mb: 3, background: 'linear-gradient(45deg, #4CAF50, #8BC34A)' }}>
        <Toolbar sx={{ p: 0 }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ width: '100%' }}
            TabIndicatorProps={{ style: { background: '#FFD700' } }}
          >
            <Tab label="All Tourists" />
            <Tab label="Verified" />
            <Tab label="Active" />
            <Tab label="Revoked" />
            <Tab label="Recently Verified" />
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
                  Blockchain-backed Tourist Verification
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
                    onClick={loadTourists}
                    disabled={loading}
                    sx={{ borderRadius: '50px' }}
                  >
                    Refresh
                  </Button>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search by DID, name, or TxID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
                    }}
                    sx={{ minWidth: 300, borderRadius: '50px' }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<FilterIcon />}
                    sx={{ borderRadius: '50px' }}
                  >
                    Filters
                  </Button>
                  <IconButton>
                    <DownloadIcon />
                  </IconButton>
                </Box>
              </Box>
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    Loading tourists...
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: '12px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Tourist</TableCell>
                        <TableCell>DID</TableCell>
                        <TableCell>Nationality</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Current Location</TableCell>
                        <TableCell>Issued By</TableCell>
                        <TableCell>Expiry Date</TableCell>
                        <TableCell>Last Verified</TableCell>
                        <TableCell>Verifications</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredTourists.map((tourist) => (
                        <TableRow 
                          key={tourist.id} 
                          hover 
                          sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            animation: `${fadeInAnimation} 0.5s ease-in`,
                            transition: 'background-color 0.3s',
                            '&:hover': {
                              backgroundColor: 'rgba(76, 175, 80, 0.05)',
                            }
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                                <PersonIcon fontSize="small" />
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {tourist.name}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {tourist.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <FlagIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                              <Typography variant="body2">
                                {tourist.nationality}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={tourist.status} 
                              color={getStatusColor(tourist.status)} 
                              size="small" 
                              icon={getStatusIcon(tourist.status)}
                              sx={{ borderRadius: '50px' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                              <Typography variant="body2">
                                {tourist.currentLocation || 'Unknown'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccountBalanceIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                              <Typography variant="body2">
                                {tourist.issuedBy}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {tourist.expiryDate}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {tourist.lastVerified}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {tourist.verificationCount}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <IndiaButton 
                              size="small" 
                              onClick={() => handleViewDetails(tourist)}
                            >
                              View
                            </IndiaButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {filteredTourists.length} of {tourists.length} tourists
                </Typography>
                <Box>
                  <Button size="small" sx={{ mr: 1, borderRadius: '50px' }}>Previous</Button>
                  <IndiaButton size="small">Next</IndiaButton>
                </Box>
              </Box>
            </CardContent>
          </IndiaCard>
        </Grid>
      </Grid>
      
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2 }}>
              <PersonIcon />
            </Avatar>
            Tourist Verification Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedTourist && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <IndiaCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Verifiable Credential
                      </Typography>
                      <Chip 
                        label={selectedTourist.status} 
                        color={getStatusColor(selectedTourist.status)} 
                        size="small" 
                        icon={getStatusIcon(selectedTourist.status)}
                        sx={{ borderRadius: '50px' }}
                      />
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">DID</Typography>
                          <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                            {selectedTourist.id}
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">Name</Typography>
                          <Typography variant="body1">
                            {selectedTourist.name}
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">Nationality</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FlagIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body1">
                              {selectedTourist.nationality}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">Current Location</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body1">
                              {selectedTourist.currentLocation || 'Unknown'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">Issued By</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccountBalanceIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body1">
                              {selectedTourist.issuedBy}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">Issued Date</Typography>
                          <Typography variant="body1">
                            {selectedTourist.issuedDate}
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">Expiry Date</Typography>
                          <Typography variant="body1">
                            {selectedTourist.expiryDate}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </IndiaCard>
              </Grid>
              
              <Grid item xs={12}>
                <IndiaCard>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Blockchain Proof
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">Transaction ID</Typography>
                      <Typography 
                        sx={{ 
                          fontFamily: 'monospace', 
                          backgroundColor: 'grey.100', 
                          p: 2, 
                          borderRadius: 1,
                          wordBreak: 'break-all'
                        }}
                      >
                        {selectedTourist.txId}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        variant="outlined" 
                        startIcon={<HistoryIcon />}
                        href={`https://blockchain-explorer.example.com/tx/${selectedTourist.txId}`}
                        target="_blank"
                        sx={{ borderRadius: '50px' }}
                      >
                        View on Blockchain Explorer
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<QrCodeIcon />}
                        sx={{ borderRadius: '50px' }}
                      >
                        Generate QR Code
                      </Button>
                    </Box>
                  </CardContent>
                </IndiaCard>
              </Grid>
              
              <Grid item xs={12}>
                <IndiaCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Verification Logs
                      </Typography>
                      <Button size="small" startIcon={<DownloadIcon />} sx={{ borderRadius: '50px' }}>
                        Export
                      </Button>
                    </Box>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Verified By</TableCell>
                            <TableCell>Method</TableCell>
                            <TableCell>Result</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>{selectedTourist.lastVerified}</TableCell>
                            <TableCell>Police Station {selectedTourist.id.split('-')[2]}</TableCell>
                            <TableCell>QR Code Scan</TableCell>
                            <TableCell>
                              <Chip 
                                label="Valid" 
                                color="success" 
                                size="small" 
                                icon={<VerifiedIcon />}
                                sx={{ borderRadius: '50px' }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2025-09-08 10:15:45</TableCell>
                            <TableCell>Hospital Desk</TableCell>
                            <TableCell>DID Lookup</TableCell>
                            <TableCell>
                              <Chip 
                                label="Valid" 
                                color="success" 
                                size="small" 
                                icon={<VerifiedIcon />}
                                sx={{ borderRadius: '50px' }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2025-09-07 16:45:33</TableCell>
                            <TableCell>Hotel Reception</TableCell>
                            <TableCell>QR Code Scan</TableCell>
                            <TableCell>
                              <Chip 
                                label="Valid" 
                                color="success" 
                                size="small" 
                                icon={<VerifiedIcon />}
                                sx={{ borderRadius: '50px' }}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </IndiaCard>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" sx={{ borderRadius: '50px' }}>
            Close
          </Button>
          {selectedTourist && selectedTourist.status !== 'Revoked' && (
            <Button 
              variant="contained" 
              color="error" 
              startIcon={<BlockIcon />}
              onClick={() => {
                // In a real app, this would revoke the credential on the blockchain
                setSnackbar({
                  open: true,
                  message: `Credential for ${selectedTourist.name} has been revoked`,
                  severity: 'success'
                });
                handleCloseDialog();
              }}
              sx={{ borderRadius: '50px' }}
            >
              Revoke Credential
            </Button>
          )}
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

export default TouristVerification;