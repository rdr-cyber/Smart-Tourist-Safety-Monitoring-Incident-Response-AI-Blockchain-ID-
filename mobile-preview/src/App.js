import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import HomeDashboard from './components/HomeDashboard';
import DigitalIdentity from './components/DigitalIdentity';
import IncidentReporting from './components/IncidentReporting';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import ItineraryScanner from './components/ItineraryScanner';
import DigitalSafe from './components/DigitalSafe';
import AnonymousReporting from './components/AnonymousReporting';
import SafetyRatings from './components/SafetyRatings';
import GuideTaxiDetector from './components/GuideTaxiDetector';
import InsuranceIntegration from './components/InsuranceIntegration';

const MobileFrame = styled.div`
  width: 360px;
  height: 700px;
  margin: 20px auto;
  border: 10px solid #222;
  border-radius: 30px;
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  overflow: hidden;
  position: relative;
`;

const MobileHeader = styled.div`
  height: 60px;
  background: #2196F3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const MobileContent = styled.div`
  height: calc(100% - 60px);
  overflow-y: auto;
`;

const App = () => {
  return (
    <Router>
      <MobileFrame>
        <MobileHeader>
          Tourist Safety App
        </MobileHeader>
        <MobileContent>
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/identity" element={<DigitalIdentity />} />
            <Route path="/report" element={<IncidentReporting />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/itinerary" element={<ItineraryScanner />} />
            <Route path="/safe" element={<DigitalSafe />} />
            <Route path="/anonymous" element={<AnonymousReporting />} />
            <Route path="/safety" element={<SafetyRatings />} />
            <Route path="/detector" element={<GuideTaxiDetector />} />
            <Route path="/insurance" element={<InsuranceIntegration />} />
          </Routes>
        </MobileContent>
      </MobileFrame>
    </Router>
  );
};

export default App;