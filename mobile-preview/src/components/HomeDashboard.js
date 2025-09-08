import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const StatusText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const StatusIndicator = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${props => {
    if (props.riskScore < 30) return '#4CAF50';
    if (props.riskScore < 70) return '#FFC107';
    return '#F44336';
  }};
`;

const MapContainer = styled.div`
  flex: 1;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MapPlaceholder = styled.div`
  text-align: center;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  background: white;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
`;

const MenuButton = styled(Link)`
  background: #2196F3;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
  margin: 5px;
  font-size: 12px;
  text-align: center;
  min-width: 70px;
`;

const SOSButton = styled.button`
  position: absolute;
  bottom: 80px;
  right: 20px;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background: #F44336;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  cursor: pointer;
`;

const HomeDashboard = () => {
  const [riskScore] = useState(20);

  const getStatusText = () => {
    if (riskScore < 30) return 'Safe';
    if (riskScore < 70) return 'Caution';
    return 'Alert';
  };

  return (
    <Container>
      <StatusBar riskScore={riskScore}>
        <StatusText>Status: {getStatusText()}</StatusText>
        <StatusIndicator riskScore={riskScore} />
      </StatusBar>
      
      <MapContainer>
        <MapPlaceholder>
          <div>Interactive Map</div>
          <div>Safe zones and restricted areas</div>
        </MapPlaceholder>
        <SOSButton>SOS</SOSButton>
      </MapContainer>
      
      <ButtonContainer>
        <MenuButton to="/identity">Identity</MenuButton>
        <MenuButton to="/report">Report</MenuButton>
        <MenuButton to="/notifications">Alerts</MenuButton>
        <MenuButton to="/settings">Settings</MenuButton>
        <MenuButton to="/itinerary">Itinerary</MenuButton>
        <MenuButton to="/safe">Digital Safe</MenuButton>
        <MenuButton to="/safety">Safety Ratings</MenuButton>
        <MenuButton to="/detector">Detector</MenuButton>
      </ButtonContainer>
    </Container>
  );
};

export default HomeDashboard;