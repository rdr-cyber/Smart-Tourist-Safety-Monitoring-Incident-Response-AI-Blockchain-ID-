import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.h2`
  text-align: center;
  color: #333;
`;

const SearchContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
`;

const LocationCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-left: 4px solid #2196F3;
`;

const LocationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const LocationName = styled.div`
  font-weight: bold;
  color: #333;
`;

const SafetyBadge = styled.div`
  background: ${props => {
    switch (props.rating) {
      case 'Very Safe': return '#4CAF50';
      case 'Safe': return '#8BC34A';
      case 'Mostly Safe': return '#FFC107';
      case 'Caution Advised': return '#FF9800';
      case 'Avoid': return '#F44336';
      default: return '#2196F3';
    }
  }};
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
`;

const SafetyRatingText = styled.div`
  font-weight: bold;
  color: #2196F3;
  margin-bottom: 10px;
`;

const DescriptionText = styled.div`
  color: #666;
  margin-bottom: 10px;
`;

const DetailsContainer = styled.div`
  background: #f0f8ff;
  padding: 10px;
  border-radius: 5px;
`;

const DetailText = styled.div`
  color: #1976d2;
  margin-bottom: 5px;
`;

const LegendContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const LegendTitle = styled.h3`
  margin-top: 0;
  color: #333;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const LegendColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${props => props.color};
  margin-right: 10px;
`;

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #2196F3;
  text-decoration: none;
`;

const SafetyRatings = () => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const legendItems = [
    { color: '#4CAF50', label: 'Very Safe (85-100)' },
    { color: '#8BC34A', label: 'Safe (70-84)' },
    { color: '#FFC107', label: 'Mostly Safe (55-69)' },
    { color: '#FF9800', label: 'Caution Advised (40-54)' },
    { color: '#F44336', label: 'Avoid (0-39)' },
  ];

  return (
    <Container>
      <Header>AI-Based Safety Ratings</Header>
      
      <SearchContainer>
        <SearchInput
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      
      {searchQuery ? (
        filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <LocationCard key={location.id}>
              <LocationHeader>
                <LocationName>{location.name}</LocationName>
                <SafetyBadge rating={location.safetyRating}>
                  {location.safetyScore}/100
                </SafetyBadge>
              </LocationHeader>
              <SafetyRatingText>{location.safetyRating}</SafetyRatingText>
              <DescriptionText>{location.description}</DescriptionText>
              <DetailsContainer>
                <DetailText>Best Time: {location.bestTime}</DetailText>
                <DetailText>Night Safety: {location.nightSafety}</DetailText>
              </DetailsContainer>
            </LocationCard>
          ))
        ) : (
          <LocationCard>
            <div style={{ textAlign: 'center', color: '#666' }}>
              No locations found. Try a different search.
            </div>
          </LocationCard>
        )
      ) : (
        <div>
          <h3>Popular Locations</h3>
          {locations.map((location) => (
            <LocationCard key={location.id}>
              <LocationHeader>
                <LocationName>{location.name}</LocationName>
                <SafetyBadge rating={location.safetyRating}>
                  {location.safetyScore}/100
                </SafetyBadge>
              </LocationHeader>
              <SafetyRatingText>{location.safetyRating}</SafetyRatingText>
              <DescriptionText>{location.description}</DescriptionText>
              <DetailsContainer>
                <DetailText>Best Time: {location.bestTime}</DetailText>
                <DetailText>Night Safety: {location.nightSafety}</DetailText>
              </DetailsContainer>
            </LocationCard>
          ))}
          
          <LegendContainer>
            <LegendTitle>Safety Rating Legend</LegendTitle>
            {legendItems.map((item, index) => (
              <LegendItem key={index}>
                <LegendColor color={item.color} />
                <span>{item.label}</span>
              </LegendItem>
            ))}
          </LegendContainer>
        </div>
      )}
      
      <BackLink to="/">← Back to Home</BackLink>
    </Container>
  );
};

export default SafetyRatings;