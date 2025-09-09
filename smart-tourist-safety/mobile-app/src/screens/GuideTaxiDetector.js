import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

const GuideTaxiDetector = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('guide'); // 'guide' or 'taxi'

  // Mock data for guides and taxis
  const guides = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      type: 'guide',
      rating: 4.8,
      reviews: 124,
      verified: true,
      photoId: 'ID-2025-001245',
      flagged: false,
      license: 'GUIDE-2025-001245',
    },
    {
      id: '2',
      name: 'Ahmed Ali',
      type: 'guide',
      rating: 4.2,
      reviews: 87,
      verified: true,
      photoId: 'ID-2025-001246',
      flagged: false,
      license: 'GUIDE-2025-001246',
    },
    {
      id: '3',
      name: 'Unknown Guide',
      type: 'guide',
      rating: 2.1,
      reviews: 32,
      verified: false,
      photoId: 'Not Verified',
      flagged: true,
      license: 'None',
    },
  ];

  const taxis = [
    {
      id: '4',
      name: 'Kerala Tourism Taxi',
      type: 'taxi',
      rating: 4.9,
      reviews: 215,
      verified: true,
      photoId: 'KL-05-KLM-2025',
      flagged: false,
      license: 'TAXI-2025-001245',
    },
    {
      id: '5',
      name: 'Metro Cabs',
      type: 'taxi',
      rating: 4.5,
      reviews: 178,
      verified: true,
      photoId: 'KL-12-KLM-2025',
      flagged: false,
      license: 'TAXI-2025-001246',
    },
    {
      id: '6',
      name: 'Unregistered Taxi',
      type: 'taxi',
      rating: 1.8,
      reviews: 42,
      verified: false,
      photoId: 'Not Verified',
      flagged: true,
      license: 'None',
    },
  ];

  const allServices = [...guides, ...taxis];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a name or ID to search');
      return;
    }

    const results = allServices.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.photoId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.license.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (results.length === 0) {
      Alert.alert('No Results', 'No guides or taxis found with that name or ID');
    } else {
      const flagged = results.filter(service => service.flagged);
      if (flagged.length > 0) {
        Alert.alert(
          'Warning',
          `⚠️ CAUTION: ${flagged.length} of the results have been flagged by other users. Please verify credentials before proceeding.`
        );
      } else {
        Alert.alert(
          'Verification Result',
          '✅ All results are verified and have no negative reports.'
        );
      }
    }
  };

  const reportService = () => {
    Alert.alert(
      'Report Service',
      'Please provide details about why you want to report this guide/taxi',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Report',
          onPress: () => {
            Alert.alert(
              'Report Submitted',
              'Thank you for reporting. Our team will investigate this service provider.'
            );
          },
          style: 'destructive',
        },
      ]
    );
  };

  const getVerificationStatus = (verified, flagged) => {
    if (flagged) return 'Flagged';
    if (verified) return 'Verified';
    return 'Not Verified';
  };

  const getStatusColor = (verified, flagged) => {
    if (flagged) return '#F44336';
    if (verified) return '#4CAF50';
    return '#FFC107';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Guide & Taxi Detector</Text>
        <Text style={styles.subtitle}>
          Verify tour guides and taxis using crowdsourced reviews and photo ID verification
        </Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              searchType === 'guide' && styles.selectedTypeButton,
            ]}
            onPress={() => setSearchType('guide')}
          >
            <Text
              style={[
                styles.typeButtonText,
                searchType === 'guide' && styles.selectedTypeButtonText,
              ]}
            >
              Guides
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              searchType === 'taxi' && styles.selectedTypeButton,
            ]}
            onPress={() => setSearchType('taxi')}
          >
            <Text
              style={[
                styles.typeButtonText,
                searchType === 'taxi' && styles.selectedTypeButtonText,
              ]}
            >
              Taxis
            </Text>
          </TouchableOpacity>
        </View>
        
        <TextInput
          style={styles.searchInput}
          placeholder={`Search for ${searchType === 'guide' ? 'guides' : 'taxis'} by name, ID, or license...`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>How It Works</Text>
        <Text style={styles.infoText}>
          • Search by name, photo ID, or license number
        </Text>
        <Text style={styles.infoText}>
          • See verification status and user reviews
        </Text>
        <Text style={styles.infoText}>
          • Report suspicious guides or taxis
        </Text>
        <Text style={styles.infoText}>
          • Crowdsourced data helps protect other tourists
        </Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1,247</Text>
          <Text style={styles.statLabel}>Verified Guides</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>856</Text>
          <Text style={styles.statLabel}>Verified Taxis</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>23</Text>
          <Text style={styles.statLabel}>Flagged Services</Text>
        </View>
      </View>
      
      <View style={styles.reportContainer}>
        <Text style={styles.reportTitle}>Report a Suspicious Service</Text>
        <TouchableOpacity style={styles.reportButton} onPress={reportService}>
          <Text style={styles.reportButtonText}>Report Guide/Taxi</Text>
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
  searchContainer: {
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
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 10,
    alignItems: 'center',
  },
  selectedTypeButton: {
    backgroundColor: '#2196F3',
  },
  typeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  selectedTypeButtonText: {
    color: '#ffffff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  searchButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  searchButtonText: {
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
  statsContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  reportContainer: {
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
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  reportButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GuideTaxiDetector;