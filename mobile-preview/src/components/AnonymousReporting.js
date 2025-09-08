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

const PrivacyNotice = styled.div`
  background: #e3f2fd;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  color: #1976d2;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h3`
  margin-top: 0;
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

const Input = styled.input`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-family: inherit;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  min-height: 120px;
  font-family: inherit;
`;

const InfoText = styled.div`
  color: #666;
  margin-bottom: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #2196F3;
  text-decoration: none;
`;

const AnonymousReporting = () => {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const incidentTypes = [
    'Scam',
    'Theft',
    'Harassment',
    'Unsafe Area',
    'Other',
  ];

  const handleSubmit = () => {
    if (!incidentType) {
      alert('Please select an incident type');
      return;
    }

    if (!description.trim()) {
      alert('Please provide a description');
      return;
    }

    alert('Thank you for your anonymous report. It will help improve safety analytics for other tourists.');
    
    // Reset form
    setIncidentType('');
    setDescription('');
    setLocation('');
  };

  return (
    <Container>
      <Header>Anonymous Incident Reporting</Header>
      
      <PrivacyNotice>
        🔒 Your identity will not be recorded. Only incident details will be used for safety analytics.
      </PrivacyNotice>
      
      <Card>
        <SectionTitle>Report Type</SectionTitle>
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
      </Card>
      
      <Card>
        <SectionTitle>Location</SectionTitle>
        <Input
          placeholder="Where did this happen? (Optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Card>
      
      <Card>
        <SectionTitle>Description</SectionTitle>
        <TextArea
          placeholder="Please describe what happened. Be as specific as possible..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Card>
      
      <Card>
        <SectionTitle>Additional Information</SectionTitle>
        <InfoText>• No personal information will be collected with this report</InfoText>
        <InfoText>• Your report will be used to improve safety analytics and warnings for other tourists</InfoText>
        <InfoText>• Reports are aggregated and anonymized for analysis</InfoText>
      </Card>
      
      <SubmitButton onClick={handleSubmit}>Submit Anonymous Report</SubmitButton>
      
      <BackLink to="/">← Back to Home</BackLink>
    </Container>
  );
};

export default AnonymousReporting;