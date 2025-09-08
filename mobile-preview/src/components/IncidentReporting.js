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

const AIButton = styled.button`
  width: 100%;
  background: #9C27B0;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-weight: bold;
  margin: 10px 0 5px 0;
  color: #333;
`;

const TypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TypeButton = styled.button`
  background: ${props => props.selected ? '#2196F3' : '#e0e0e0'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: none;
  padding: 10px;
  margin: 5px;
  border-radius: 20px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  min-height: 80px;
  font-family: inherit;
`;

const MediaButton = styled.button`
  width: 100%;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #F44336;
  color: white;
  border: none;
  padding: 20px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin: 20px 0;
`;

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #2196F3;
  text-decoration: none;
`;

const IncidentReporting = () => {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');

  const incidentTypes = [
    'Medical Emergency',
    'Lost/Harassed',
    'Accident',
    'Theft',
    'Other',
  ];

  const handleSubmit = () => {
    alert('Incident report submitted!');
  };

  return (
    <Container>
      <Header>Report Incident</Header>
      
      <Card>
        <h3>AI Detection</h3>
        <AIButton>Check for AI Detected Distress</AIButton>
        <div style={{ textAlign: 'center', color: '#666' }}>
          AI can automatically detect falls, abnormal movements, and other distress signals
        </div>
      </Card>
      
      <Card>
        <h3>Manual Report</h3>
        <Label>Select Incident Type:</Label>
        <TypeContainer>
          {incidentTypes.map((type) => (
            <TypeButton
              key={type}
              selected={incidentType === type}
              onClick={() => setIncidentType(type)}
            >
              {type}
            </TypeButton>
          ))}
        </TypeContainer>
        
        <Label>Description:</Label>
        <TextArea
          placeholder="Describe the incident..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <Label>Media (Optional):</Label>
        <MediaButton>Add Photo/Video</MediaButton>
      </Card>
      
      <SubmitButton onClick={handleSubmit}>Submit Report</SubmitButton>
      
      <BackLink to="/">← Back to Home</BackLink>
    </Container>
  );
};

export default IncidentReporting;