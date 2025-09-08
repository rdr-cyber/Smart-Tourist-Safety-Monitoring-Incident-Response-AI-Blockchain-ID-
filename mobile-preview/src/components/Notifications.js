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

const NotificationCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-left: ${props => props.unread ? '4px solid #2196F3' : 'none'};
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const NotificationTitle = styled.div`
  font-weight: bold;
  color: #333;
`;

const NotificationTime = styled.div`
  font-size: 12px;
  color: #999;
`;

const NotificationMessage = styled.div`
  color: #666;
  margin-bottom: 10px;
`;

const CaseId = styled.div`
  font-size: 12px;
  color: #999;
`;

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #2196F3;
  text-decoration: none;
`;

const Notifications = () => {
  const notifications = [
    {
      id: '1',
      title: 'Nearest police dispatched',
      message: 'Police unit KLM-05 is on the way to your location',
      time: '2 min ago',
      caseId: 'CASE-2025-001245',
      unread: false,
    },
    {
      id: '2',
      title: 'ERSS call triggered',
      message: 'Emergency Response System activated for your incident report',
      time: '5 min ago',
      caseId: 'CASE-2025-001245',
      unread: true,
    },
    {
      id: '3',
      title: 'Hospital notified',
      message: 'Kochi General Hospital has been notified of your medical emergency',
      time: '10 min ago',
      caseId: 'CASE-2025-001243',
      unread: true,
    },
  ];

  return (
    <Container>
      <Header>Notifications</Header>
      
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} unread={notification.unread}>
          <NotificationHeader>
            <NotificationTitle>{notification.title}</NotificationTitle>
            <NotificationTime>{notification.time}</NotificationTime>
          </NotificationHeader>
          <NotificationMessage>{notification.message}</NotificationMessage>
          <CaseId>Case ID: {notification.caseId}</CaseId>
        </NotificationCard>
      ))}
      
      <BackLink to="/">← Back to Home</BackLink>
    </Container>
  );
};

export default Notifications;