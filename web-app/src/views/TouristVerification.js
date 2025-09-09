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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem as SelectMenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  VerifiedUser as VerificationIcon,
  AccountCircle as AccountIcon,
  ExitToApp as LogoutIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  History as HistoryIcon,
  Block as BlockIcon,
  Search as SearchIcon,
  QrCode as QrCodeIcon,
} from '@mui/icons-material';
import { touristApi, blockchainApi } from '../services/api';

const TouristVerification = () => {
  const [tourists, setTourists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [blockchainData, setBlockchainData] = useState(null);
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);

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
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyIdentity = async (touristId) => {
    try {
      const response = await blockchainApi.verifyIdentity(touristId);
      console.log('Identity verified on blockchain:', response);
      // Refresh tourist data
      loadTourists();
      setVerifyDialogOpen(false);
    } catch (error) {
      console.error('Failed to verify identity on blockchain:', error);
    }
  };

  const handleRevokeIdentity = async (touristId) => {
    try {
      const response = await blockchainApi.revokeIdentity(touristId);
      console.log('Identity revoked on blockchain:', response);
      // Refresh tourist data
      loadTourists();
      setRevokeDialogOpen(false);
    } catch (error) {
      console.error('Failed to revoke identity on blockchain:', error);
    }
  };

  const handleViewBlockchainData = async (touristId) => {
    try {
      const response = await blockchainApi.getIdentity(touristId);
      setBlockchainData(response.data);
    } catch (error) {
      console.error('Failed to fetch blockchain data:', error);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <VerificationIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tourist Verification
          </Typography>
          <IconButton color="inherit">
            <AccountIcon />
          </IconButton>
          <IconButton color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Tourist Identities
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      startIcon={<CheckCircleIcon />}
                      onClick={() => setVerifyDialogOpen(true)}
                    >
                      Verify Identity
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<BlockIcon />}
                      color="error"
                      onClick={() => setRevokeDialogOpen(true)}
                    >
                      Revoke Identity
                    </Button>
                  </Box>
                </Box>
                
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Tourist ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Nationality</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Blockchain Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tourists.map((tourist) => (
                        <TableRow key={tourist.id}>
                          <TableCell>{tourist.id}</TableCell>
                          <TableCell>{tourist.name}</TableCell>
                          <TableCell>{tourist.nationality}</TableCell>
                          <TableCell>
                            <Chip 
                              label={tourist.status} 
                              color={tourist.status === 'Verified' ? 'success' : tourist.status === 'Active' ? 'primary' : 'error'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label="On Blockchain" 
                              color="success"
                              size="small"
                              icon={<SecurityIcon />}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              size="small" 
                              onClick={() => handleViewBlockchainData(tourist.id)}
                            >
                              <HistoryIcon />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleVerifyIdentity(tourist.id)}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Verify Dialog */}
      <Dialog open={verifyDialogOpen} onClose={() => setVerifyDialogOpen(false)}>
        <DialogTitle>Verify Tourist Identity</DialogTitle>
        <DialogContent>
          <Typography>Select a tourist to verify their identity on the blockchain</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Tourist</InputLabel>
            <Select
              value={selectedTourist || ''}
              label="Select Tourist"
              onChange={(e) => setSelectedTourist(e.target.value)}
            >
              {tourists.map((tourist) => (
                <SelectMenuItem key={tourist.id} value={tourist.id}>
                  {tourist.name} ({tourist.id})
                </SelectMenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVerifyDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => handleVerifyIdentity(selectedTourist)}
            disabled={!selectedTourist}
          >
            Verify on Blockchain
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Revoke Dialog */}
      <Dialog open={revokeDialogOpen} onClose={() => setRevokeDialogOpen(false)}>
        <DialogTitle>Revoke Tourist Identity</DialogTitle>
        <DialogContent>
          <Typography>Warning: This action will revoke the tourist's identity on the blockchain</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Tourist</InputLabel>
            <Select
              value={selectedTourist || ''}
              label="Select Tourist"
              onChange={(e) => setSelectedTourist(e.target.value)}
            >
              {tourists.map((tourist) => (
                <SelectMenuItem key={tourist.id} value={tourist.id}>
                  {tourist.name} ({tourist.id})
                </SelectMenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRevokeDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => handleRevokeIdentity(selectedTourist)}
            disabled={!selectedTourist}
          >
            Revoke on Blockchain
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Blockchain Data Dialog */}
      <Dialog open={!!blockchainData} onClose={() => setBlockchainData(null)} maxWidth="md" fullWidth>
        <DialogTitle>Blockchain Identity Data</DialogTitle>
        <DialogContent>
          {blockchainData && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Identity Information</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Tourist ID:</strong> {blockchainData.touristId}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Status:</strong> 
                    <Chip 
                      label={blockchainData.isActive ? 'Active' : 'Inactive'} 
                      color={blockchainData.isActive ? 'success' : 'error'}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Verified:</strong> 
                    <Chip 
                      label={blockchainData.isVerified ? 'Yes' : 'No'} 
                      color={blockchainData.isVerified ? 'success' : 'error'}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Issuer:</strong> {blockchainData.issuer}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Issued Date:</strong> {blockchainData.issuedDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Expiry Date:</strong> {blockchainData.expiryDate}</Typography>
                </Grid>
                
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography variant="h6">Transaction History</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Transaction Hash</TableCell>
                          <TableCell>Block Number</TableCell>
                          <TableCell>Event Type</TableCell>
                          <TableCell>Timestamp</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {blockchainData.transactionHistory.map((tx, index) => (
                          <TableRow key={index}>
                            <TableCell>{tx.transactionHash}</TableCell>
                            <TableCell>{tx.blockNumber}</TableCell>
                            <TableCell>{tx.eventType}</TableCell>
                            <TableCell>{tx.timestamp}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBlockchainData(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TouristVerification;