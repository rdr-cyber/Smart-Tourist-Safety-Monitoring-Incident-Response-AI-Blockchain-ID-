import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';

const HomeDashboard = ({ navigation }) => {
  const [riskStatus, setRiskStatus] = useState('Safe'); // Safe, Caution, Alert
  const [riskScore, setRiskScore] = useState(20); // 0-100

  // Define safe zones and restricted areas
  const safeZones = [
    {
      id: 1,
      coordinates: [
        { latitude: 9.9312, longitude: 76.2673 },
        { latitude: 9.9312, longitude: 76.3073 },
        { latitude: 9.9712, longitude: 76.3073 },
        { latitude: 9.9712, longitude: 76.2673 },
      ],
    },
  ];

  const restrictedAreas = [
    {
      id: 1,
      coordinates: [
        { latitude: 9.9412, longitude: 76.2773 },
        { latitude: 9.9412, longitude: 76.2973 },
        { latitude: 9.9612, longitude: 76.2973 },
        { latitude: 9.9612, longitude: 76.2773 },
      ],
    },
  ];

  // Function to trigger SOS
  const triggerSOS = () => {
    Alert.alert(
      'Emergency SOS',
      'Are you sure you want to send an emergency alert?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send SOS',
          onPress: () => {
            // Here we would integrate with the backend to send the SOS
            Alert.alert('SOS Sent', 'Help is on the way!');
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Function to determine status color
  const getStatusColor = () => {
    if (riskScore < 30) return '#4CAF50'; // Green
    if (riskScore < 70) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>Status: {riskStatus}</Text>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
      </View>
      
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 9.9312,
            longitude: 76.2673,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Render safe zones */}
          {safeZones.map((zone) => (
            <Polygon
              key={zone.id}
              coordinates={zone.coordinates}
              fillColor="rgba(76, 175, 80, 0.3)"
              strokeColor="rgba(76, 175, 80, 0.8)"
              strokeWidth={2}
            />
          ))}
          
          {/* Render restricted areas */}
          {restrictedAreas.map((area) => (
            <Polygon
              key={area.id}
              coordinates={area.coordinates}
              fillColor="rgba(244, 67, 54, 0.3)"
              strokeColor="rgba(244, 67, 54, 0.8)"
              strokeWidth={2}
            />
          ))}
          
          {/* User location marker */}
          <Marker
            coordinate={{ latitude: 9.9312, longitude: 76.2673 }}
            title="Your Location"
            pinColor="#2196F3"
          />
        </MapView>
      </View>
      
      {/* Quick access buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Identity')}
        >
          <Text style={styles.buttonText}>Identity</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Report')}
        >
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Text style={styles.buttonText}>Alerts</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Itinerary')}
        >
          <Text style={styles.buttonText}>Itinerary</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Safe')}
        >
          <Text style={styles.buttonText}>Digital Safe</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Safety')}
        >
          <Text style={styles.buttonText}>Safety Ratings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Detector')}
        >
          <Text style={styles.buttonText}>Detector</Text>
        </TouchableOpacity>
      </View>
      
      {/* SOS Button - Floating */}
      <TouchableOpacity 
        style={styles.sosButton}
        onPress={triggerSOS}
      >
        <Text style={styles.sosButtonText}>SOS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  menuButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  sosButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  sosButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeDashboard;