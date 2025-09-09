// Localization service for the Smart Tourist Safety app
import translations from './translations';

class LocalizationService {
  constructor() {
    this.defaultLanguage = 'en';
    this.currentLanguage = this.getDefaultLanguage();
    this.supportedLanguages = ['en', 'hi', 'bn', 'ta', 'as']; // English, Hindi, Bengali, Tamil, Assamese
  }

  // Get the default language from device settings
  getDefaultLanguage() {
    // In a real app, this would get the device language
    // For now, we'll default to English
    const deviceLanguage = 'en'; // This would be detected from the device
    return this.supportedLanguages.includes(deviceLanguage) ? deviceLanguage : this.defaultLanguage;
  }

  // Set the current language
  setLanguage(language) {
    if (this.supportedLanguages.includes(language)) {
      this.currentLanguage = language;
      // In a real app, you would save this to persistent storage
      return true;
    }
    return false;
  }

  // Get the current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Get supported languages
  getSupportedLanguages() {
    return this.supportedLanguages.map(lang => ({
      code: lang,
      name: this.getLanguageName(lang)
    }));
  }

  // Get language name
  getLanguageName(languageCode) {
    const languageNames = {
      en: 'English',
      hi: 'हिंदी',
      bn: 'বাংলা',
      ta: 'தமிழ்',
      as: 'অসমীয়া'
    };
    return languageNames[languageCode] || languageCode;
  }

  // Get translated string
  t(key) {
    // Try to get translation in current language
    if (translations[this.currentLanguage] && translations[this.currentLanguage][key]) {
      return translations[this.currentLanguage][key];
    }
    
    // Fallback to English
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    
    // If no translation found, return the key
    return key;
  }

  // Get all translations for current language
  getTranslations() {
    return {
      ...translations.en, // Default to English
      ...(translations[this.currentLanguage] || {}) // Override with current language
    };
  }
}

// Create a singleton instance
const localizationService = new LocalizationService();

export default localizationService;