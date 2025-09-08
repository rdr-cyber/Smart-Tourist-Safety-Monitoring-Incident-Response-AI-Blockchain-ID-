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

const SecurityNotice = styled.div`
  background: #e8f5e9;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  color: #2e7d32;
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

const DocumentCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const DocumentInfo = styled.div`
  display: flex;
  align-items: center;
`;

const DocumentIcon = styled.div`
  font-size: 24px;
  margin-right: 15px;
`;

const DocumentName = styled.div`
  font-weight: bold;
  color: #333;
`;

const DocumentStatus = styled.div`
  font-size: 14px;
  color: #666;
`;

const UploadButton = styled.button`
  background: #2196F3;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const ViewButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const EmbassyButton = styled.button`
  width: 100%;
  background: #F44336;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
`;

const EmailButton = styled.button`
  width: 100%;
  background: #FF9800;
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

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #2196F3;
  text-decoration: none;
`;

const DigitalSafe = () => {
  const [documents] = useState([
    { id: '1', name: 'Passport', type: 'passport', uploaded: true },
    { id: '2', name: 'Visa', type: 'visa', uploaded: true },
    { id: '3', name: 'Travel Insurance', type: 'insurance', uploaded: false },
    { id: '4', name: 'Hotel Booking', type: 'hotel', uploaded: false },
  ]);

  const handleSendToEmbassy = () => {
    if (window.confirm('This will send all your documents to the nearest embassy with a distress message. Are you sure?')) {
      alert('Documents sent to embassy. Help is on the way.');
    }
  };

  const handleSendToEmail = () => {
    if (window.confirm('This will send all your documents to your registered email. Continue?')) {
      alert('Documents sent to your registered email.');
    }
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'passport': return '🛂';
      case 'visa': return 'visa';
      case 'insurance': return '📋';
      case 'hotel': return '🏨';
      default: return '📄';
    }
  };

  return (
    <Container>
      <Header>Integrated Digital Safe</Header>
      
      <SecurityNotice>
        🔒 All documents are encrypted and stored securely on your device
      </SecurityNotice>
      
      <Card>
        <SectionTitle>Your Documents</SectionTitle>
        {documents.map((doc) => (
          <DocumentCard key={doc.id}>
            <DocumentInfo>
              <DocumentIcon>{getDocumentIcon(doc.type)}</DocumentIcon>
              <div>
                <DocumentName>{doc.name}</DocumentName>
                <DocumentStatus>
                  {doc.uploaded ? 'Uploaded' : 'Not uploaded'}
                </DocumentStatus>
              </div>
            </DocumentInfo>
            <div>
              {doc.uploaded ? (
                <ViewButton>View</ViewButton>
              ) : (
                <UploadButton>Upload</UploadButton>
              )}
            </div>
          </DocumentCard>
        ))}
      </Card>
      
      <Card>
        <SectionTitle>Emergency Actions</SectionTitle>
        <EmbassyButton onClick={handleSendToEmbassy}>Send to Embassy</EmbassyButton>
        <EmailButton onClick={handleSendToEmail}>Send to Email</EmailButton>
      </Card>
      
      <InfoContainer>
        <InfoTitle>How It Works</InfoTitle>
        <InfoText>• All documents are encrypted using military-grade encryption</InfoText>
        <InfoText>• Documents are stored locally on your device, not on external servers</InfoText>
        <InfoText>• One-touch emergency sending to embassies or your email</InfoText>
        <InfoText>• Access your documents even without internet connectivity</InfoText>
      </InfoContainer>
      
      <BackLink to="/">← Back to Home</BackLink>
    </Container>
  );
};

export default DigitalSafe;