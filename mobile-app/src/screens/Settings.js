import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Picker,
} from 'react-native';
import localizationService from '../services/localization';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(localizationService.getCurrentLanguage());

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleOfflineMode = () => {
    setOfflineMode(!offlineMode);
  };

  const changeLanguage = (language) => {
    if (localizationService.setLanguage(language)) {
      setSelectedLanguage(language);
      Alert.alert(
        localizationService.t('success'),
        `${localizationService.t('language')} ${localizationService.t('updated')}`,
        [{ text: localizationService.t('ok') }]
      );
    } else {
      Alert.alert(
        localizationService.t('error'),
        localizationService.t('invalid_language'),
        [{ text: localizationService.t('ok') }]
      );
    }
  };

  const languages = localizationService.getSupportedLanguages();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{localizationService.t('settings_title')}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{localizationService.t('language')}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLanguage}
            style={styles.picker}
            onValueChange={(itemValue) => changeLanguage(itemValue)}
          >
            {languages.map((lang) => (
              <Picker.Item key={lang.code} label={lang.name} value={lang.code} />
            ))}
          </Picker>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{localizationService.t('notifications')}</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>{localizationService.t('enable_notifications')}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNotifications}
            value={notificationsEnabled}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{localizationService.t('privacy')}</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>{localizationService.t('offline_mode')}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={offlineMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleOfflineMode}
            value={offlineMode}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{localizationService.t('emergency_contacts')}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{localizationService.t('manage_contacts')}</Text>
        </TouchableOpacity>
      </View>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Settings;