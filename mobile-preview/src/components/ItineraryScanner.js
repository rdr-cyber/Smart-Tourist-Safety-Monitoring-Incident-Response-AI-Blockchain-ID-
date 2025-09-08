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

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const Label = styled.div`
  font-weight: bold;
  margin: 10px 0 5px 0;
  color: #333;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  min-height: 120px;
  font-family: inherit;
`;

const ScanButton = styled.button`
  width: 100%;
  background: #2196F3;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const RiskCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-left: 4px solid ${props => {
    switch (props.riskLevel) {
      case 'High': return '#F44336';
      case 'Medium': return '#FFC107';
      case 'Low': return '#4CAF50';
      default: return '#2196F3';
    }
  }};
`;

const RiskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SegmentText = styled.div`
  font-weight: bold;
  color: #333;
`;

const RiskBadge = styled.div`
  background: ${props => {
    switch (props.riskLevel) {
      case 'High': return '#F44336';
      case 'Medium': return '#FFC107';
      case 'Low': return '#4CAF50';
      default: return '#2196F3';
    }
  }};
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
`;

const TimeText = styled.div`
  color: #2196F3;
  margin-bottom: 10px;
`;

const DescriptionText = styled.div`
  color: #666;
  margin-bottom: 10px;
`;

const SuggestionContainer = styled.div`
  background: #e3f2fd;
  padding: 10px;
  border-radius: 5px;
`;

const SuggestionLabel = styled.div`
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 5px;
`;

const SuggestionText = styled.div`
  color: #1976d2;
`;

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #2196F3;
  text-decoration: none;
`;

const ItineraryScanner = () => {
  const [itinerary, setItinerary] = useState('');
  const [riskAnalysis, setRiskAnalysis] = useState([]);

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

  const handleScan = () => {
    if (!itinerary.trim()) {
      alert('Please enter your itinerary');
      return;
    }
    
    setRiskAnalysis(mockRiskData);
    alert(`Risk analysis complete! Found ${mockRiskData.length} potential risk segments.`);
  };

  return (
    <Container>
      <Header>Itinerary Risk Scanner</Header>
      
      <Card>
        <Label>Your Itinerary</Label>
        <TextArea
          placeholder="Enter your planned places/activities with times, e.g.:
10:00 AM - Visit Museum
12:30 PM - Lunch at Restaurant
2:00 PM - Shopping District
6:00 PM - Metro Station"
          value={itinerary}
          onChange={(e) => setItinerary(e.target.value)}
        />
        <ScanButton onClick={handleScan}>Scan Itinerary</ScanButton>
      </Card>
      
      {riskAnalysis.length > 0 && (
        <div>
          <h3>Risk Analysis Results</h3>
          {riskAnalysis.map((risk) => (
            <RiskCard key={risk.id} riskLevel={risk.riskLevel}>
              <RiskHeader>
                <SegmentText>{risk.segment}</SegmentText>
                <RiskBadge riskLevel={risk.riskLevel}>{risk.riskLevel} Risk</RiskBadge>
              </RiskHeader>
              <TimeText>{risk.time}</TimeText>
              <DescriptionText>{risk.description}</DescriptionText>
              <SuggestionContainer>
                <SuggestionLabel>Recommendation:</SuggestionLabel>
                <SuggestionText>{risk.suggestion}</SuggestionText>
              </SuggestionContainer>
            </RiskCard>
          ))}
        </div>
      )}
      
      <BackLink to="/">← Back to Home</BackLink>
    </Container>
  );
};

export default ItineraryScanner;