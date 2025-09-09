import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';

const ItineraryScanner = () => {
  const [itinerary, setItinerary] = useState('');
  const [riskAnalysis, setRiskAnalysis] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  // Mock risk data for demonstration
  const mockRiskData = [
    {
      id: '1',
      segment: 'Museum to Metro Station',
      time: '10:30 PM - 11:00 PM',
      riskLevel: 'High',
      description: 'Poorly lit area with limited pedestrian traffic',
      suggestion: 'Take the alternative route via Main Street or wait until morning',
    },
    {
      id: '2',
      segment: 'Hotel to Restaurant District',
      time: '8:00 PM - 9:30 PM',
      riskLevel: 'Medium',
      description: 'Moderate foot traffic but some areas are dimly lit',
      suggestion: 'Stick to well-lit main roads and avoid shortcuts',
    },
  ];

  const scanItinerary = () => {
    if (!itinerary.trim()) {
      Alert.alert('Error', 'Please enter your itinerary');
      return;
    }

    setIsScanning(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setRiskAnalysis(mockRiskData);
      setIsScanning(false);
      
      if (mockRiskData.length > 0) {
        Alert.alert(
          'Risk Analysis Complete',
          `Found ${mockRiskData.length} potential risk segments in your itinerary. Recommendations provided.`
        );
      } else {
        Alert.alert(
          'Risk Analysis Complete',
          'Your itinerary looks safe! No high-risk segments detected.'
        );
      }
    }, 2000);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return '#F44336';
      case 'Medium': return '#FFC107';
      case 'Low': return '#4CAF50';
      default: return '#2196F3';
    }
  };

  const renderRiskItem = ({ item }) => (
    <View style={styles.riskCard}>
      <View style={styles.riskHeader}>
        <Text style={styles.segmentText}>{item.segment}</Text>
        <View style={[styles.riskBadge, { backgroundColor: getRiskColor(item.riskLevel) }]}>
          <Text style={styles.riskBadgeText}>{item.riskLevel} Risk</Text>
        </View>
      </View>
      <Text style={styles.timeText}>{item.time}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>
      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionLabel}>Recommendation:</Text>
        <Text style={styles.suggestionText}>{item.suggestion}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Itinerary Risk Scanner</Text>
        <Text style={styles.subtitle}>
          Enter your planned route to identify potential safety risks and get recommendations
        </Text>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Itinerary</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={6}
          placeholder="Enter your planned places/activities with times, e.g.:
10:00 AM - Visit Museum
12:30 PM - Lunch at Restaurant
2:00 PM - Shopping District
6:00 PM - Metro Station"
          value={itinerary}
          onChangeText={setItinerary}
        />
        <TouchableOpacity
          style={styles.scanButton}
          onPress={scanItinerary}
          disabled={isScanning}
        >
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : 'Scan Itinerary'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {riskAnalysis.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Risk Analysis Results</Text>
          <FlatList
            data={riskAnalysis}
            renderItem={renderRiskItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      )}
      
      {riskAnalysis.length === 0 && !isScanning && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Your personalized safety analysis will appear here after scanning your itinerary.
          </Text>
          <Text style={styles.infoText}>
            We'll identify high-risk segments and suggest safer alternatives.
          </Text>
        </View>
      )}
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
  inputContainer: {
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  scanButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultsContainer: {
    margin: 10,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  riskCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  segmentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  riskBadgeText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  timeText: {
    fontSize: 16,
    color: '#2196F3',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  suggestionContainer: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 5,
  },
  suggestionLabel: {
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 5,
  },
  suggestionText: {
    color: '#1976d2',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
});

export default ItineraryScanner;