import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';

const IncidentReporting = () => {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);

  const incidentTypes = [
    'Medical Emergency',
    'Lost/Harassed',
    'Accident',
    'Theft',
    'Other',
  ];

  const handleAIAnalysis = () => {
    // In a real app, this would connect to AI models for analysis
    Alert.alert(
      'AI Analysis',
      'AI detected potential distress. Would you like to report this incident?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Report', 
          onPress: () => {
            setIncidentType('AI Detected Distress');
            setDescription('Potential fall or abnormal movement detected by AI');
          }
        },
      ]
    );
  };

  const submitReport = () => {
    if (!incidentType) {
      Alert.alert('Error', 'Please select an incident type');
      return;
    }

    // In a real app, this would send the report to the backend
    Alert.alert(
      'Report Submitted',
      'Your incident report has been sent. Help is on the way!',
      [{ text: 'OK' }]
    );
    
    // Reset form
    setIncidentType('');
    setDescription('');
    setMedia(null);
  };

  const selectMedia = () => {
    // In a real app, this would open the camera or gallery
    Alert.alert(
      'Media Upload',
      'In a real app, this would allow you to take a photo or select from gallery',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Report Incident</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Detection</Text>
        <TouchableOpacity style={styles.aiButton} onPress={handleAIAnalysis}>
          <Text style={styles.aiButtonText}>Check for AI Detected Distress</Text>
        </TouchableOpacity>
        <Text style={styles.aiDescription}>
          AI can automatically detect falls, abnormal movements, and other distress signals
        </Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Manual Report</Text>
        <Text style={styles.label}>Select Incident Type:</Text>
        
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
        
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          placeholder="Describe the incident..."
          value={description}
          onChangeText={setDescription}
        />
        
        <Text style={styles.label}>Media (Optional):</Text>
        <TouchableOpacity style={styles.mediaButton} onPress={selectMedia}>
          <Text style={styles.mediaButtonText}>Add Photo/Video</Text>
        </TouchableOpacity>
        
        {media && (
          <Image source={{ uri: media }} style={styles.mediaPreview} />
        )}
      </View>
      
      <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
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
  aiButton: {
    backgroundColor: '#9C27B0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  aiButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  aiDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
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
    minHeight: 80,
    textAlignVertical: 'top',
  },
  mediaButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  mediaButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mediaPreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#F44336',
    padding: 20,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default IncidentReporting;