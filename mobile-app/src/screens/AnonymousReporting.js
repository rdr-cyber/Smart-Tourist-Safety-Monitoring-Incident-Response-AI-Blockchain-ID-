import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

const AnonymousReporting = () => {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const incidentTypes = [
    'Scam',
    'Theft',
    'Harassment',
    'Unsafe Area',
    'Other',
  ];

  const submitReport = () => {
    if (!incidentType) {
      Alert.alert('Error', 'Please select an incident type');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please provide a description');
      return;
    }

    // In a real app, this would send the anonymous report to the backend
    Alert.alert(
      'Report Submitted',
      'Thank you for your anonymous report. It will help improve safety analytics for other tourists.',
      [{ text: 'OK' }]
    );
    
    // Reset form
    setIncidentType('');
    setDescription('');
    setLocation('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Anonymous Incident Reporting</Text>
        <Text style={styles.subtitle}>
          Report scams, theft, harassment or other safety concerns anonymously
        </Text>
      </View>
      
      <View style={styles.privacyNotice}>
        <Text style={styles.privacyText}>
          🔒 Your identity will not be recorded. Only incident details will be used for safety analytics.
        </Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Report Type</Text>
        <View style={styles.typeContainer}>
          {incidentTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                incidentType === type && styles.selectedTypeButton,
              ]}
              onPress={() => setIncidentType(type)}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  incidentType === type && styles.selectedTypeButtonText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Location</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Where did this happen? (Optional)"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Description</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          multiline
          numberOfLines={6}
          placeholder="Please describe what happened. Be as specific as possible..."
          value={description}
          onChangeText={setDescription}
        />
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Additional Information</Text>
        <Text style={styles.infoText}>
          • No personal information will be collected with this report
        </Text>
        <Text style={styles.infoText}>
          • Your report will be used to improve safety analytics and warnings for other tourists
        </Text>
        <Text style={styles.infoText}>
          • Reports are aggregated and anonymized for analysis
        </Text>
      </View>
      
      <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
        <Text style={styles.submitButtonText}>Submit Anonymous Report</Text>
      </TouchableOpacity>
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
  privacyNotice: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  privacyText: {
    textAlign: 'center',
    color: '#1976d2',
    fontWeight: 'bold',
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
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  selectedTypeButton: {
    backgroundColor: '#2196F3',
  },
  typeButtonText: {
    color: '#333',
  },
  selectedTypeButtonText: {
    color: '#ffffff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AnonymousReporting;