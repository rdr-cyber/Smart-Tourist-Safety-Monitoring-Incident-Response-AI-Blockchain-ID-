import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

const DigitalIdentity = () => {
  const [identityStatus, setIdentityStatus] = useState('Verified by Tourism Dept');
  
  // Mock VC data
  const verifiableCredential = {
    id: 'vc-tourist-12345',
    name: 'John Smith',
    nationality: 'American',
    issuedBy: 'Tourism Department',
    issuedDate: '2025-09-01',
    expiryDate: '2025-12-31',
    status: 'Active',
  };

  const generateQRCode = () => {
    // In a real app, this would generate a QR code with the VC data
    Alert.alert(
      'QR Code Generated',
      'Your QR code is ready for offline presentation',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Digital Identity Wallet</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Verifiable Credential</Text>
        <View style={styles.qrPlaceholder}>
          <Text style={styles.qrText}>QR Code Placeholder</Text>
          <Text style={styles.qrSubtext}>Tap to generate QR code</Text>
        </View>
        <TouchableOpacity style={styles.qrButton} onPress={generateQRCode}>
          <Text style={styles.qrButtonText}>Generate QR Code</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Credential Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{verifiableCredential.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Nationality:</Text>
          <Text style={styles.value}>{verifiableCredential.nationality}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Issued By:</Text>
          <Text style={styles.value}>{verifiableCredential.issuedBy}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Issued Date:</Text>
          <Text style={styles.value}>{verifiableCredential.issuedDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Expiry Date:</Text>
          <Text style={styles.value}>{verifiableCredential.expiryDate}</Text>
        </View>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Status</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{identityStatus}</Text>
          <View style={[
            styles.statusIndicator, 
            {
              backgroundColor: identityStatus === 'Revoked' ? '#F44336' : 
                              identityStatus === 'Active' ? '#4CAF50' : '#2196F3'
            }
          ]} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  qrPlaceholder: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  qrText: {
    fontSize: 18,
    color: '#666',
  },
  qrSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  qrButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  qrButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default DigitalIdentity;