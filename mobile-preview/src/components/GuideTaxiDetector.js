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

const TypeSelector = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const TypeButton = styled.button`
  flex: 1;
  background: ${props => props.selected ? '#2196F3' : '#e0e0e0'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: none;
  padding: 10px;
  text-align: center;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
`;

const SearchButton = styled.button`
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

const InfoContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const InfoTitle = styled.h3`
  margin-top: 0;
  color: #333;
`;

const InfoText = styled.div`
  color: #666;
  margin-bottom: 5px;
`;

const StatsContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const StatCard = styled.div`
  flex: 1;
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin: 0 5px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #2196F3;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const ReportContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const ReportTitle = styled.h3`
  margin-top: 0;
  text-align: center;
  color: #333;
`;

const ReportButton = styled.button`
  width: 100%;
  background: #F44336;
  color: white;
  border: none;
  padding: 15px;
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

const GuideTaxiDetector = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('guide');

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter a name or ID to search');
      return;
    }

    // Mock search results
    const results = [
      { name: 'Rajesh Kumar', type: 'guide', verified: true, flagged: false },
      { name: 'Ahmed Ali', type: 'guide', verified: true, flagged: false },
      { name: 'Unknown Guide', type: 'guide', verified: false, flagged: true },
    ];

    const flagged = results.filter(service => service.flagged);
    if (flagged.length > 0) {
      alert(`⚠️ CAUTION: ${flagged.length} of the results have been flagged by other users. Please verify credentials before proceeding.`);
    } else {
      alert('✅ All results are verified and have no negative reports.');
    }
  };

  const handleReport = () => {
    if (window.confirm('Please provide details about why you want to report this guide/taxi')) {
      alert('Thank you for reporting. Our team will investigate this service provider.');
    }
  };

  return (
    <Container>
      <Header>Guide & Taxi Detector</Header>
      
      <SearchContainer>
        <TypeSelector>
          <TypeButton
            selected={searchType === 'guide'}
            onClick={() => setSearchType('guide')}
          >
            Guides
          </TypeButton>
          <TypeButton
            selected={searchType === 'taxi'}
            onClick={() => setSearchType('taxi')}
          >
            Taxis
          </TypeButton>
        </TypeSelector>
        
        <SearchInput
          placeholder={`Search for ${searchType === 'guide' ? 'guides' : 'taxis'} by name, ID, or license...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <SearchButton onClick={handleSearch}>Verify</SearchButton>
      </SearchContainer>
      
      <InfoContainer>
        <InfoTitle>How It Works</InfoTitle>
        <InfoText>• Search by name, photo ID, or license number</InfoText>
        <InfoText>• See verification status and user reviews</InfoText>
        <InfoText>• Report suspicious guides or taxis</InfoText>
        <InfoText>• Crowdsourced data helps protect other tourists</InfoText>
      </InfoContainer>
      
      <StatsContainer>
        <StatCard>
          <StatNumber>1,247</StatNumber>
          <StatLabel>Verified Guides</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>856</StatNumber>
          <StatLabel>Verified Taxis</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>23</StatNumber>
          <StatLabel>Flagged Services</StatLabel>
        </StatCard>
      </StatsContainer>
      
      <ReportContainer>
        <ReportTitle>Report a Suspicious Service</ReportTitle>
        <ReportButton onClick={handleReport}>Report Guide/Taxi</ReportButton>
      </ReportContainer>
      
      <BackLink to="/">← Back to Home</BackLink>
    </Container>
  );
};

export default GuideTaxiDetector;