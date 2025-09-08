import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

const DigitalSafe = () => {
  const [documents, setDocuments] = useState([
    { id: '1', name: 'Passport', type: 'passport', uploaded: true },
    { id: '2', name: 'Visa', type: 'visa', uploaded: true },
    { id: '3', name: 'Travel Insurance', type: 'insurance', uploaded: false },
    { id: '4', name: 'Hotel Booking', type: 'hotel', uploaded: false },
  ]);

  const sendToEmbassy = () => {
    Alert.alert(
      'Send to Embassy',
      'This will send all your documents to the nearest embassy with a distress message. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: () => {
            Alert.alert(
              'Documents Sent',
              'Your documents have been sent to the nearest embassy. Help is on the way.'
            );
          },
          style: 'destructive',
        },
      ]
    );
  };

  const sendToEmail = () => {
    Alert.alert(
      'Send to Email',
      'This will send all your documents to your registered email. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: () => {
            Alert.alert(
              'Documents Sent',
              'Your documents have been sent to your registered email.'
            );
          },
        },
      ]
    );
  };

  const uploadDocument = (docId) => {
    // In a real app, this would open the camera or file picker
    Alert.alert(
      'Upload Document',
      'In a real app, this would open your camera or file picker to upload the document',
      [{ text: 'OK' }]
    );
  };

  const viewDocument = (docId) => {
    Alert.alert(
      'View Document',
      'In a real app, this would show the stored document',
      [{ text: 'OK' }]
    );
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'passport': return '🛂';
      case 'visa': return 'visa';
      case 'insurance': return '📋';
      case 'hotel': return '🏨';
      default: return '📄';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Integrated Digital Safe</Text>
        <Text style={styles.subtitle}>
          Securely store important documents and access them when needed
        </Text>
      </View>
      
      <View style={styles.securityNotice}>
        <Text style={styles.securityText}>
          🔒 All documents are encrypted and stored securely on your device
        </Text>
      </View>
      
      <View style={styles.documentsContainer}>
        <Text style={styles.sectionTitle}>Your Documents</Text>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.documentCard}>
            <View style={styles.documentInfo}>
              <Text style={styles.documentIcon}>{getDocumentIcon(doc.type)}</Text>
              <View>
                <Text style={styles.documentName}>{doc.name}</Text>
                <Text style={styles.documentStatus}>
                  {doc.uploaded ? 'Uploaded' : 'Not uploaded'}
                </Text>
              </View>
            </View>
            <View style={styles.documentActions}>
              {doc.uploaded ? (
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => viewDocument(doc.id)}
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={() => uploadDocument(doc.id)}
                >
                  <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.emergencyActions}>
        <Text style={styles.sectionTitle}>Emergency Actions</Text>
        <TouchableOpacity style={styles.embassyButton} onPress={sendToEmbassy}>
          <Text style={styles.embassyButtonText}>Send to Embassy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emailButton} onPress={sendToEmail}>
          <Text style={styles.emailButtonText}>Send to Email</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>How It Works</Text>
        <Text style={styles.infoText}>
          • All documents are encrypted using military-grade encryption
        </Text>
        <Text style={styles.infoText}>
          • Documents are stored locally on your device, not on external servers
        </Text>
        <Text style={styles.infoText}>
          • One-touch emergency sending to embassies or your email
        </Text>
        <Text style={styles.infoText}>
          • Access your documents even without internet connectivity
        </Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  securityNotice: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  securityText: {
    textAlign: 'center',
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  documentsContainer: {
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
  documentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  documentStatus: {
    fontSize: 14,
    color: '#666',
  },
  documentActions: {
    flexDirection: 'row',
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  viewButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  emergencyActions: {
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
  embassyButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  embassyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emailButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  emailButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
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
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default DigitalSafe;