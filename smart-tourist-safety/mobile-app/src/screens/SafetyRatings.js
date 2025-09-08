import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const SafetyRatings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  // Mock location data with safety scores
  const locations = [
    {
      id: '1',
      name: 'Fort Kochi Beach',
      safetyScore: 85,
      safetyRating: 'Safe',
      description: 'Popular tourist destination with good lighting and police presence',
      bestTime: '9:00 AM - 7:00 PM',
      nightSafety: 'Moderate',
    },
    {
      id: '2',
      name: 'Jew Town, Mattancherry',
      safetyScore: 72,
      safetyRating: 'Mostly Safe',
      description: 'Historic area with narrow streets. Be cautious after dark',
      bestTime: '10:00 AM - 6:00 PM',
      nightSafety: 'Low',
    },
    {
      id: '3',
      name: 'Marine Drive, Kochi',
      safetyScore: 92,
      safetyRating: 'Very Safe',
      description: 'Well-lit waterfront promenade with heavy foot traffic',
      bestTime: 'Any time',
      nightSafety: 'High',
    },
    {
      id: '4',
      name: 'Broadway, Ernakulam',
      safetyScore: 65,
      safetyRating: 'Caution Advised',
      description: 'Busy commercial area. Pickpocketing reported in the past',
      bestTime: '10:00 AM - 8:00 PM',
      nightSafety: 'Low',
    },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredLocations([]);
    } else {
      const filtered = locations.filter(location =>
        location.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };

  const getSafetyColor = (rating) => {
    switch (rating) {
      case 'Very Safe': return '#4CAF50';
      case 'Safe': return '#8BC34A';
      case 'Mostly Safe': return '#FFC107';
      case 'Caution Advised': return '#FF9800';
      case 'Avoid': return '#F44336';
      default: return '#2196F3';
    }
  };

  const renderLocationItem = ({ item }) => (
    <View style={styles.locationCard}>
      <View style={styles.locationHeader}>
        <Text style={styles.locationName}>{item.name}</Text>
        <View style={[styles.safetyBadge, { backgroundColor: getSafetyColor(item.safetyRating) }]}>
          <Text style={styles.safetyBadgeText}>{item.safetyScore}/100</Text>
        </View>
      </View>
      <Text style={styles.safetyRatingText}>{item.safetyRating}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Best Time: {item.bestTime}</Text>
        <Text style={styles.detailText}>Night Safety: {item.nightSafety}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI-Based Safety Ratings</Text>
        <Text style={styles.subtitle}>
          Safety scores for tourist locations based on incidents, reviews, and local data
        </Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a location..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      
      {searchQuery.trim() !== '' ? (
        <FlatList
          data={filteredLocations}
          renderItem={renderLocationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No locations found. Try a different search.</Text>
            </View>
          }
        />
      ) : (
        <View>
          <View style={styles.popularContainer}>
            <Text style={styles.sectionTitle}>Popular Locations</Text>
            <FlatList
              data={locations}
              renderItem={renderLocationItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
          
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Safety Rating Legend</Text>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
              <Text>Very Safe (85-100)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#8BC34A' }]} />
              <Text>Safe (70-84)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FFC107' }]} />
              <Text>Mostly Safe (55-69)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
              <Text>Caution Advised (40-54)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
              <Text>Avoid (0-39)</Text>
            </View>
          </View>
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
  },
  emptyContainer: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  popularContainer: {
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
  locationCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  safetyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  safetyBadgeText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  safetyRatingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 5,
  },
  legendContainer: {
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
  legendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default SafetyRatings;