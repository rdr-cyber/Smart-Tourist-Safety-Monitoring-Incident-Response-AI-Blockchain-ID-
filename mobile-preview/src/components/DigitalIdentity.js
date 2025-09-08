import React from 'react';
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

const QRPlaceholder = styled.div`
  height: 200px;
  background: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  color: #666;
`;

const Button = styled.button`
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

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 5px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

const Value = styled.span`
  color: #333;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusText = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const StatusIndicator = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #4CAF50;
`;

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #2196F3;
  text-decoration: none;
`;

const DigitalIdentity = () => {
  return (
    <Container>
      <Header>Digital Identity Wallet</Header>
      
      <Card>
        <h3>Verifiable Credential</h3>
        <QRPlaceholder>
          <div>QR Code Placeholder</div>
        </QRPlaceholder>
        <Button>Generate QR Code</Button>
      </Card>
      
      <Card>
        <h3>Credential Details</h3>
        <DetailRow>
          <Label>Name:</Label>
          <Value>John Smith</Value>
        </DetailRow>
        <DetailRow>
          <Label>Nationality:</Label>
          <Value>American</Value>
        </DetailRow>
        <DetailRow>
          <Label>Issued By:</Label>
          <Value>Tourism Department</Value>
        </DetailRow>
        <DetailRow>
          <Label>Issued Date:</Label>
          <Value>2025-09-01</Value>
        </DetailRow>
        <DetailRow>
          <Label>Expiry Date:</Label>
          <Value>2025-12-31</Value>
        </DetailRow>
      </Card>
      
      <Card>
        <h3>Status</h3>
        <StatusContainer>
          <StatusText>Verified by Tourism Dept</StatusText>
          <StatusIndicator />
        </StatusContainer>
      </Card>
      
      <BackLink to="/">← Back to Home</BackLink>
    </Container>
  );
};

export default DigitalIdentity;