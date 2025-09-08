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

const PolicyCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const PolicyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PolicyTitle = styled.div`
  font-weight: bold;
  color: #333;
`;

const StatusBadge = styled.div`
  background: ${props => {
    switch (props.status) {
      case 'Approved': return '#4CAF50';
      case 'Processing': return '#FFC107';
      case 'Rejected': return '#F44336';
      default: return '#2196F3';
    }
  }};
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
`;

const ProviderText = styled.div`
  font-weight: bold;
  color: #2196F3;
  margin-bottom: 5px;
`;

const CoverageText = styled.div`
  color: #666;
  margin-bottom: 5px;
`;

const DateText = styled.div`
  color: #666;
  margin-bottom: 15px;
`;

const PolicyActions = styled.div`
  display: flex;
`;

const DetailsButton = styled.button`
  flex: 1;
  background: #2196F3;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 5px;
`;

const ContactButton = styled.button`
  flex: 1;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 5px;
`;

const ClaimsContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const ClaimsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const NewClaimButton = styled.button`
  background: #F44336;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const ClaimCard = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
`;

const ClaimHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ClaimType = styled.div`
  font-weight: bold;
  color: #333;
`;

const ClaimDate = styled.div`
  color: #666;
  margin-bottom: 5px;
`;

const ClaimAmount = styled.div`
  font-weight: bold;
  color: #2196F3;
`;

const BenefitsContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const BenefitEmoji = styled.div`
  font-size: 24px;
  margin-right: 15px;
`;

const BenefitText = styled.div`
  color: #666;
  flex: 1;
`;

const EmergencyContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const EmergencyTitle = styled.h3`
  margin-top: 0;
  color: #333;
`;

const EmergencyText = styled.div`
  color: #666;
  margin-bottom: 15px;
`;

const EmergencyButton = styled.button`
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

const InsuranceIntegration = () => {
  const [activePolicy] = useState({
    id: 'POL-2025-001245',
    provider: 'Global Travel Insurance Co.',
    coverage: 'Medical, Theft, Accident',
    startDate: '2025-09-01',
    endDate: '2025-12-31',
    status: 'Active',
  });

  const [claims] = useState([
    {
      id: 'CLM-2025-001245',
      date: '2025-09-05',
      type: 'Medical Emergency',
      status: 'Processing',
      amount: '$1,250',
    },
    {
      id: 'CLM-2025-001244',
      date: '2025-08-22',
      type: 'Lost Luggage',
      status: 'Approved',
      amount: '$850',
    },
  ]);

  const handleFileClaim = () => {
    const claimTypes = ['Medical Emergency', 'Theft/Robbery', 'Accident'];
    const selectedType = prompt(`Select the type of claim you want to file:\n${claimTypes.join('\n')}`);
    
    if (selectedType && claimTypes.includes(selectedType)) {
      alert(`Filing a ${selectedType} claim. Please provide the following information:\n\n1. Incident details\n2. Photos/documentation\n3. Police report (if applicable)\n4. Medical reports (if applicable)`);
    }
  };

  const handleViewPolicy = () => {
    alert(`Provider: ${activePolicy.provider}\nCoverage: ${activePolicy.coverage}\nStart Date: ${activePolicy.startDate}\nEnd Date: ${activePolicy.endDate}\nStatus: ${activePolicy.status}`);
  };

  const handleContactProvider = () => {
    const contactMethod = prompt('How would you like to contact your insurance provider?\n1. Call\n2. Email');
    
    if (contactMethod === '1') {
      alert('Calling provider...');
    } else if (contactMethod === '2') {
      alert('Opening email client...');
    }
  };

  return (
    <Container>
      <Header>Travel Insurance Integration</Header>
      
      <PolicyCard>
        <PolicyHeader>
          <PolicyTitle>Active Policy</PolicyTitle>
          <StatusBadge status={activePolicy.status}>{activePolicy.status}</StatusBadge>
        </PolicyHeader>
        <ProviderText>{activePolicy.provider}</ProviderText>
        <CoverageText>Coverage: {activePolicy.coverage}</CoverageText>
        <DateText>Valid: {activePolicy.startDate} to {activePolicy.endDate}</DateText>
        <PolicyActions>
          <DetailsButton onClick={handleViewPolicy}>View Details</DetailsButton>
          <ContactButton onClick={handleContactProvider}>Contact Provider</ContactButton>
        </PolicyActions>
      </PolicyCard>
      
      <ClaimsContainer>
        <ClaimsHeader>
          <SectionTitle>Recent Claims</SectionTitle>
          <NewClaimButton onClick={handleFileClaim}>+ New Claim</NewClaimButton>
        </ClaimsHeader>
        
        {claims.map((claim) => (
          <ClaimCard key={claim.id}>
            <ClaimHeader>
              <ClaimType>{claim.type}</ClaimType>
              <StatusBadge status={claim.status}>{claim.status}</StatusBadge>
            </ClaimHeader>
            <ClaimDate>Filed: {claim.date}</ClaimDate>
            <ClaimAmount>Amount: {claim.amount}</ClaimAmount>
          </ClaimCard>
        ))}
      </ClaimsContainer>
      
      <BenefitsContainer>
        <SectionTitle>Insurance Benefits</SectionTitle>
        <BenefitItem>
          <BenefitEmoji>📱</BenefitEmoji>
          <BenefitText>One-touch claim filing with automatic incident data</BenefitText>
        </BenefitItem>
        <BenefitItem>
          <BenefitEmoji>📸</BenefitEmoji>
          <BenefitText>Photo documentation automatically attached to claims</BenefitText>
        </BenefitItem>
        <BenefitItem>
          <BenefitEmoji>🏥</BenefitEmoji>
          <BenefitText>Direct connection to medical providers</BenefitText>
        </BenefitItem>
        <BenefitItem>
          <BenefitEmoji>⏱️</BenefitEmoji>
          <BenefitText>Faster processing with verified incident reports</BenefitText>
        </BenefitItem>
      </BenefitsContainer>
      
      <EmergencyContainer>
        <EmergencyTitle>Emergency Assistance</EmergencyTitle>
        <EmergencyText>
          In case of emergency, our integrated system will automatically notify your insurance provider and provide them with verified incident details.
        </EmergencyText>
        <EmergencyButton>Emergency Contact</EmergencyButton>
      </EmergencyContainer>
      
      <BackLink to="/">← Back to Home</BackLink>
    </Container>
  );
};

export default InsuranceIntegration;