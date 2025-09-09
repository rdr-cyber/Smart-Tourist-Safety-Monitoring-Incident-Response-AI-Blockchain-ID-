import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Settings = () => {
  const [piiSharing, setPiiSharing] = useState(true);
  const [anonymousLogging, setAnonymousLogging] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'Hindi', 'Malayalam'];

  const saveSettings = () => {
    // In a real app, this would save settings to persistent storage
    Alert.alert('Settings Saved', 'Your preferences have been updated');
  };

  const clearLocalIncidents = () => {
    Alert.alert(
      'Clear Local Incidents',
      'This will delete all locally stored incident reports. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings & Privacy</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Preferences</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Share PII with authorities</Text>
          <Switch
            value={piiSharing}
            onValueChange={setPiiSharing}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Anonymous incident logging</Text>
          <Switch
            value={anonymousLogging}
            onValueChange={setAnonymousLogging}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connectivity</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Offline mode</Text>
          <Switch
            value={offlineMode}
            onValueChange={setOfflineMode}
          />
        </View>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            When offline mode is enabled, incidents will be stored locally and 
            synced when connectivity resumes.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={clearLocalIncidents}
        >
          <Text style={styles.actionButtonText}>Clear Local Incidents</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.languageContainer}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language}
              style={[
                styles.languageButton,
                selectedLanguage === language && styles.selectedLanguageButton,
              ]}
              onPress={() => setSelectedLanguage(language)}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  selectedLanguage === language && styles.selectedLanguageButtonText,
                ]}
              >
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#1976d2',
  },
  actionButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  selectedLanguageButton: {
    backgroundColor: '#2196F3',
  },
  languageButtonText: {
    color: '#333',
  },
  selectedLanguageButtonText: {
    color: '#ffffff',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Settings;