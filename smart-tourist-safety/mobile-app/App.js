import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeDashboard from './src/screens/HomeDashboard';
import DigitalIdentity from './src/screens/DigitalIdentity';
import IncidentReporting from './src/screens/IncidentReporting';
import Notifications from './src/screens/Notifications';
import Settings from './src/screens/Settings';
import ItineraryScanner from './src/screens/ItineraryScanner';
import DigitalSafe from './src/screens/DigitalSafe';
import AnonymousReporting from './src/screens/AnonymousReporting';
import SafetyRatings from './src/screens/SafetyRatings';
import GuideTaxiDetector from './src/screens/GuideTaxiDetector';
import InsuranceIntegration from './src/screens/InsuranceIntegration';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeDashboard} 
          options={{ title: 'Tourist Safety' }}
        />
        <Stack.Screen 
          name="Identity" 
          component={DigitalIdentity} 
          options={{ title: 'Digital Identity' }}
        />
        <Stack.Screen 
          name="Report" 
          component={IncidentReporting} 
          options={{ title: 'Report Incident' }}
        />
        <Stack.Screen 
          name="Notifications" 
          component={Notifications} 
          options={{ title: 'Notifications' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={Settings} 
          options={{ title: 'Settings' }}
        />
        <Stack.Screen 
          name="Itinerary" 
          component={ItineraryScanner} 
          options={{ title: 'Itinerary Scanner' }}
        />
        <Stack.Screen 
          name="Safe" 
          component={DigitalSafe} 
          options={{ title: 'Digital Safe' }}
        />
        <Stack.Screen 
          name="Anonymous" 
          component={AnonymousReporting} 
          options={{ title: 'Anonymous Report' }}
        />
        <Stack.Screen 
          name="Safety" 
          component={SafetyRatings} 
          options={{ title: 'Safety Ratings' }}
        />
        <Stack.Screen 
          name="Detector" 
          component={GuideTaxiDetector} 
          options={{ title: 'Guide/Taxi Detector' }}
        />
        <Stack.Screen 
          name="Insurance" 
          component={InsuranceIntegration} 
          options={{ title: 'Travel Insurance' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;