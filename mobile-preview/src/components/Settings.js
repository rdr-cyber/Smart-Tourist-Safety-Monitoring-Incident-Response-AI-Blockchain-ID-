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

const Section = styled.div`
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

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const SettingLabel = styled.div`
  color: #333;
`;

const Switch = styled.div`
  width: 50px;
  height: 25px;
  background: ${props => props.on ? '#4CAF50' : '#ccc'};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
`;

const SwitchHandle = styled.div`
  width: 21px;
  height: 21px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${props => props.on ? '27px' : '2px'};
  transition: left 0.2s;
`;

const InfoBox = styled.div`
  background: #e3f2fd;
  padding: 10px;
  border-radius: 5px;
  color: #1976d2;
  margin: 10px 0;
`;

const ActionButton = styled.button`
  width: 100%;
  background: #f44336;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
`;

const LanguageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LanguageButton = styled.button`
  background: ${props => props.selected ? '#2196F3' : '#e0e0e0'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: none;
  padding: 10px;
  margin: 5px;
  border-radius: 20px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  width: 100%;
  background: #4CAF50;
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

const Settings = () => {
  const [piiSharing, setPiiSharing] = useState(true);
  const [anonymousLogging, setAnonymousLogging] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'Hindi', 'Malayalam'];

  const handleSave = () => {
    alert('Settings saved!');
  };

  return (
    <Container>
      <Header>Settings & Privacy</Header>
      
      <Section>
        <SectionTitle>Privacy Preferences</SectionTitle>
        <SettingRow>
          <SettingLabel>Share PII with authorities</SettingLabel>
          <Switch on={piiSharing} onClick={() => setPiiSharing(!piiSharing)}>
            <SwitchHandle on={piiSharing} />
          </Switch>
        </SettingRow>
        
        <SettingRow>
          <SettingLabel>Anonymous incident logging</SettingLabel>
          <Switch on={anonymousLogging} onClick={() => setAnonymousLogging(!anonymousLogging)}>
            <SwitchHandle on={anonymousLogging} />
          </Switch>
        </SettingRow>
      </Section>
      
      <Section>
        <SectionTitle>Connectivity</SectionTitle>
        <SettingRow>
          <SettingLabel>Offline mode</SettingLabel>
          <Switch on={offlineMode} onClick={() => setOfflineMode(!offlineMode)}>
            <SwitchHandle on={offlineMode} />
          </Switch>
        </SettingRow>
        
        <InfoBox>
          When offline mode is enabled, incidents will be stored locally and 
          synced when connectivity resumes.
        </InfoBox>
        
        <ActionButton>Clear Local Incidents</ActionButton>
      </Section>
      
      <Section>
        <SectionTitle>Language</SectionTitle>
        <LanguageContainer>
          {languages.map((language) => (
            <LanguageButton
              key={language}
              selected={selectedLanguage === language}
              onClick={() => setSelectedLanguage(language)}
            >
              {language}
            </LanguageButton>
          ))}
        </LanguageContainer>
      </Section>
      
      <SaveButton onClick={handleSave}>Save Settings</SaveButton>
      
      <BackLink to="/">← Back to Home</BackLink>
    </Container>
  );
};

export default Settings;