import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
} from 'react-native';

const DigitalIdentity = () => {
  const [identityStatus, setIdentityStatus] = useState('Verified by Tourism Dept');
  const [showBlockchainInfo, setShowBlockchainInfo] = useState(false);
  
  // Mock VC data
  const verifiableCredential = {
    id: 'vc-tourist-12345',
    name: 'John Smith',
    nationality: 'American',
    issuedBy: 'Tourism Department',
    issuedDate: '2025-09-01',
    expiryDate: '2025-12-31',
    status: 'Active',
    blockchain: {
      transactionHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
      blockNumber: 12345678,
      issuerAddress: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c',
      verificationCount: 12,
      lastVerified: '2025-09-08 14:30:22',
    }
  };

  const generateQRCode = () => {
    // In a real app, this would generate a QR code with the VC data
    Alert.alert(
      'QR Code Generated',
      'Your QR code is ready for offline presentation',
      [{ text: 'OK' }]
    );
  };

  const verifyOnBlockchain = () => {
    // In a real app, this would verify the identity on the blockchain
    Alert.alert(
      'Blockchain Verification',
      'Your identity has been verified on the blockchain. Transaction: ' + verifiableCredential.blockchain.transactionHash,
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
        <TouchableOpacity 
          style={styles.blockchainButton} 
          onPress={() => setShowBlockchainInfo(true)}
        >
          <Text style={styles.blockchainButtonText}>View Blockchain Info</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.verifyButton} 
          onPress={verifyOnBlockchain}
        >
          <Text style={styles.verifyButtonText}>Verify on Blockchain</Text>
        </TouchableOpacity>
      </View>
      
      {/* Blockchain Info Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showBlockchainInfo}
        onRequestClose={() => setShowBlockchainInfo(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Blockchain Information</Text>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Identity Details</Text>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Tourist ID:</Text>
                <Text style={styles.value}>{verifiableCredential.id}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{verifiableCredential.status}</Text>
              </View>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Blockchain Data</Text>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Transaction Hash:</Text>
                <Text style={styles.value} numberOfLines={2}>{verifiableCredential.blockchain.transactionHash}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Block Number:</Text>
                <Text style={styles.value}>{verifiableCredential.blockchain.blockNumber}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Issuer Address:</Text>
                <Text style={styles.value} numberOfLines={1}>{verifiableCredential.blockchain.issuerAddress}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Verification Count:</Text>
                <Text style={styles.value}>{verifiableCredential.blockchain.verificationCount}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Last Verified:</Text>
                <Text style={styles.value}>{verifiableCredential.blockchain.lastVerified}</Text>
              </View>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Security Features</Text>
              <View style={styles.securityFeature}>
                <Text style={styles.securityText}>✓ Immutable Record</Text>
              </View>
              <View style={styles.securityFeature}>
                <Text style={styles.securityText}>✓ Tamper-Proof Verification</Text>
              </View>
              <View style={styles.securityFeature}>
                <Text style={styles.securityText}>✓ Transparent Audit Trail</Text>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <Button
              title="Close"
              onPress={() => setShowBlockchainInfo(false)}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// ... existing styles ...

const styles = StyleSheet.create({
  // ... existing styles ...
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
    marginBottom: 10,
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
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  blockchainButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  blockchainButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    padding: 20,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 10,
  },
  infoSection: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  securityFeature: {
    padding: 10,
    marginBottom: 5,
  },
  securityText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  modalFooter: {
    padding: 20,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default DigitalIdentity;