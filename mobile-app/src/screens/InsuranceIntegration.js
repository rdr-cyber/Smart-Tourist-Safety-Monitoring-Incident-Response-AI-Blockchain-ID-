import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

const InsuranceIntegration = () => {
  const [activePolicy, setActivePolicy] = useState({
    id: 'POL-2025-001245',
    provider: 'Global Travel Insurance Co.',
    coverage: 'Medical, Theft, Accident',
    startDate: '2025-09-01',
    endDate: '2025-12-31',
    status: 'Active',
  });

  const [claims, setClaims] = useState([
    {
      id: 'CLM-2025-001245',
      date: '2025-09-05',
      type: 'Medical Emergency',
      status: 'Processing',
      amount: '$1,250',
    },
    {
      id: 'CLM-2025-001244',
      date: '2025-08-22',
      type: 'Lost Luggage',
      status: 'Approved',
      amount: '$850',
    },
  ]);

  const fileNewClaim = () => {
    Alert.alert(
      'File New Claim',
      'Select the type of claim you want to file:',
      [
        {
          text: 'Medical Emergency',
          onPress: () => startClaimProcess('Medical Emergency'),
        },
        {
          text: 'Theft/Robbery',
          onPress: () => startClaimProcess('Theft/Robbery'),
        },
        {
          text: 'Accident',
          onPress: () => startClaimProcess('Accident'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const startClaimProcess = (claimType) => {
    Alert.alert(
      'Claim Process Started',
      `Filing a ${claimType} claim. Please provide the following information:\n\n1. Incident details\n2. Photos/documentation\n3. Police report (if applicable)\n4. Medical reports (if applicable)`,
      [
        {
          text: 'Continue',
          onPress: () => {
            Alert.alert(
              'Document Upload',
              'In a real app, you would now upload required documents',
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  const viewPolicyDetails = () => {
    Alert.alert(
      'Policy Details',
      `Provider: ${activePolicy.provider}\nCoverage: ${activePolicy.coverage}\nStart Date: ${activePolicy.startDate}\nEnd Date: ${activePolicy.endDate}\nStatus: ${activePolicy.status}`,
      [{ text: 'OK' }]
    );
  };

  const contactProvider = () => {
    Alert.alert(
      'Contact Provider',
      'How would you like to contact your insurance provider?',
      [
        { text: 'Call', onPress: () => Alert.alert('Calling...', 'Dialing provider') },
        { text: 'Email', onPress: () => Alert.alert('Email', 'Opening email client') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return '#4CAF50';
      case 'Processing': return '#FFC107';
      case 'Rejected': return '#F44336';
      default: return '#2196F3';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Travel Insurance Integration</Text>
        <Text style={styles.subtitle}>
          Quick claims and policy management directly from the app
        </Text>
      </View>
      
      <View style={styles.policyCard}>
        <View style={styles.policyHeader}>
          <Text style={styles.policyTitle}>Active Policy</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(activePolicy.status) }]}>
            <Text style={styles.statusText}>{activePolicy.status}</Text>
          </View>
        </View>
        <Text style={styles.providerText}>{activePolicy.provider}</Text>
        <Text style={styles.coverageText}>Coverage: {activePolicy.coverage}</Text>
        <Text style={styles.dateText}>Valid: {activePolicy.startDate} to {activePolicy.endDate}</Text>
        <View style={styles.policyActions}>
          <TouchableOpacity style={styles.detailsButton} onPress={viewPolicyDetails}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={contactProvider}>
            <Text style={styles.contactButtonText}>Contact Provider</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.claimsContainer}>
        <View style={styles.claimsHeader}>
          <Text style={styles.sectionTitle}>Recent Claims</Text>
          <TouchableOpacity style={styles.newClaimButton} onPress={fileNewClaim}>
            <Text style={styles.newClaimButtonText}>+ New Claim</Text>
          </TouchableOpacity>
        </View>
        
        {claims.map((claim) => (
          <View key={claim.id} style={styles.claimCard}>
            <View style={styles.claimHeader}>
              <Text style={styles.claimType}>{claim.type}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(claim.status) }]}>
                <Text style={styles.statusText}>{claim.status}</Text>
              </View>
            </View>
            <Text style={styles.claimDate}>Filed: {claim.date}</Text>
            <Text style={styles.claimAmount}>Amount: {claim.amount}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.benefitsContainer}>
        <Text style={styles.sectionTitle}>Insurance Benefits</Text>
        <View style={styles.benefitItem}>
          <Text style={styles.benefitEmoji}>📱</Text>
          <Text style={styles.benefitText}>One-touch claim filing with automatic incident data</Text>
        </View>
        <View style={styles.benefitItem}>
          <Text style={styles.benefitEmoji}>📸</Text>
          <Text style={styles.benefitText}>Photo documentation automatically attached to claims</Text>
        </View>
        <View style={styles.benefitItem}>
          <Text style={styles.benefitEmoji}>🏥</Text>
          <Text style={styles.benefitText}>Direct connection to medical providers</Text>
        </View>
        <View style={styles.benefitItem}>
          <Text style={styles.benefitEmoji}>⏱️</Text>
          <Text style={styles.benefitText}>Faster processing with verified incident reports</Text>
        </View>
      </View>
      
      <View style={styles.emergencyContainer}>
        <Text style={styles.emergencyTitle}>Emergency Assistance</Text>
        <Text style={styles.emergencyText}>
          In case of emergency, our integrated system will automatically notify your insurance provider and provide them with verified incident details.
        </Text>
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyButtonText}>Emergency Contact</Text>
        </TouchableOpacity>
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
  policyCard: {
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
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  policyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  providerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  coverageText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  policyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  detailsButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contactButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  contactButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  claimsContainer: {
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
  claimsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  newClaimButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  newClaimButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  claimCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  claimType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  claimDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  claimAmount: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  benefitsContainer: {
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
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  benefitText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  emergencyContainer: {
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
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emergencyText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  emergencyButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InsuranceIntegration;