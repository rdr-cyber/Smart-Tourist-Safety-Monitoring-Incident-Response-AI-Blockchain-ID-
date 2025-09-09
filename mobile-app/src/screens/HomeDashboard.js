import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import MapView, { Polygon, Marker, Circle } from 'react-native-maps';
import localizationService from '../services/localization';

const HomeDashboard = ({ navigation }) => {
  const [riskStatus, setRiskStatus] = useState('Safe'); // Safe, Caution, Alert
  const [riskScore, setRiskScore] = useState(20); // 0-100
  const [userLocation, setUserLocation] = useState({
    latitude: 9.9312,
    longitude: 76.2673,
  });

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

  // Geo-fencing alerts
  const [geoFenceAlerts, setGeoFenceAlerts] = useState([]);

  // Check if user is in a restricted area
  const checkGeoFence = (location) => {
    // In a real app, this would use more sophisticated geofencing logic
    // For demo purposes, we'll simulate alerts when entering restricted areas
    const inRestrictedArea = Math.random() > 0.95; // 5% chance for demo
    
    if (inRestrictedArea) {
      const newAlert = {
        id: Date.now(),
        title: localizationService.t('alert'),
        message: 'You are entering a restricted area. Please proceed with caution.',
        timestamp: new Date().toISOString(),
        type: 'warning'
      };
      
      setGeoFenceAlerts(prev => [newAlert, ...prev.slice(0, 4)]); // Keep only last 5 alerts
      
      // Show alert
      Alert.alert(
        localizationService.t('alert'),
        'You are entering a restricted area. Please proceed with caution.',
        [{ text: localizationService.t('ok') }]
      );
    }
  };

  // Function to trigger SOS
  const triggerSOS = () => {
    Alert.alert(
      localizationService.t('emergency_alert'),
      localizationService.t('send_sos_confirmation'),
      [
        {
          text: localizationService.t('cancel'),
          style: 'cancel',
        },
        {
          text: localizationService.t('send_sos'),
          onPress: () => {
            // Here we would integrate with the backend to send the SOS
            Alert.alert(localizationService.t('sos_sent'), localizationService.t('help_on_way'));
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

  // Simulate location updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate location change
      const newLocation = {
        latitude: userLocation.latitude + (Math.random() - 0.5) * 0.01,
        longitude: userLocation.longitude + (Math.random() - 0.5) * 0.01,
      };
      
      setUserLocation(newLocation);
      checkGeoFence(newLocation);
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [userLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{localizationService.t('home_title')}</Text>
      </View>
      
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>{localizationService.t('status')}: {localizationService.t(riskStatus.toLowerCase())}</Text>
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
          showsUserLocation={true}
          followsUserLocation={true}
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
            coordinate={userLocation}
            title="Your Location"
            pinColor="#2196F3"
          >
            <Circle
              center={userLocation}
              radius={100}
              fillColor="rgba(33, 150, 243, 0.3)"
              strokeColor="rgba(33, 150, 243, 0.8)"
              strokeWidth={2}
            />
          </Marker>
        </MapView>
      </View>
      
      {/* Quick access buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Identity')}
        >
          <Text style={styles.buttonText}>{localizationService.t('identity')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Report')}
        >
          <Text style={styles.buttonText}>{localizationService.t('report')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Text style={styles.buttonText}>{localizationService.t('alerts')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>{localizationService.t('settings')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Itinerary')}
        >
          <Text style={styles.buttonText}>{localizationService.t('itinerary')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Safe')}
        >
          <Text style={styles.buttonText}>{localizationService.t('digital_safe')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Safety')}
        >
          <Text style={styles.buttonText}>{localizationService.t('safety_ratings')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Detector')}
        >
          <Text style={styles.buttonText}>{localizationService.t('detector')}</Text>
        </TouchableOpacity>
      </View>
      
      {/* SOS Button - Floating */}
      <TouchableOpacity 
        style={styles.sosButton}
        onPress={triggerSOS}
      >
        <Text style={styles.sosButtonText}>{localizationService.t('sos')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
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
    margin: 5,
    minWidth: 100,
    alignItems: 'center',
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