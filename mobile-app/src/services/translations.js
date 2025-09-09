// Multilingual support for the Smart Tourist Safety app
// Supported languages: English, Hindi, Bengali, Tamil, Assamese, and others

const translations = {
  en: {
    // Home Dashboard
    home_title: "Tourist Safety Dashboard",
    status: "Status",
    safe: "Safe",
    caution: "Caution",
    alert: "Alert",
    identity: "Identity",
    report: "Report",
    alerts: "Alerts",
    settings: "Settings",
    itinerary: "Itinerary",
    digital_safe: "Digital Safe",
    safety_ratings: "Safety Ratings",
    detector: "Detector",
    sos: "SOS",
    send_sos_confirmation: "Are you sure you want to send an emergency alert?",
    cancel: "Cancel",
    send_sos: "Send SOS",
    sos_sent: "SOS Sent",
    help_on_way: "Help is on the way!",
    
    // Digital Identity
    digital_identity: "Digital Identity Wallet",
    verifiable_credential: "Verifiable Credential",
    qr_code_placeholder: "QR Code Placeholder",
    generate_qr: "Generate QR Code",
    credential_details: "Credential Details",
    name: "Name",
    nationality: "Nationality",
    issued_by: "Issued By",
    issued_date: "Issued Date",
    expiry_date: "Expiry Date",
    status_info: "Status",
    view_blockchain: "View Blockchain Info",
    verify_blockchain: "Verify on Blockchain",
    
    // Incident Reporting
    incident_reporting: "Incident Reporting",
    ai_detection: "AI Detection",
    manual_report: "Manual Report",
    incident_type: "Incident Type",
    location: "Location",
    description: "Description",
    media_upload: "Media Upload",
    submit_report: "Submit Report",
    
    // Notifications
    notifications: "Notifications",
    no_notifications: "No notifications",
    emergency_alert: "Emergency Alert",
    incident_update: "Incident Update",
    police_dispatch: "Police Dispatch",
    
    // Settings
    settings_title: "Settings",
    language: "Language",
    privacy: "Privacy Preferences",
    offline_mode: "Offline Mode",
    emergency_contacts: "Emergency Contacts",
    enable_notifications: "Enable Notifications",
    manage_contacts: "Manage Contacts",
    updated: "updated",
    invalid_language: "Invalid language selection",
    
    // Itinerary Scanner
    itinerary_scanner: "Itinerary Scanner",
    scan_itinerary: "Scan Itinerary",
    risk_assessment: "Risk Assessment",
    planned_route: "Planned Route",
    
    // Safety Ratings
    safety_ratings_title: "Safety Ratings",
    location_safety: "Location Safety",
    route_safety: "Route Safety",
    personal_safety: "Personal Safety",
    
    // Guide/Taxi Detector
    guide_detector: "Guide/Taxi Detector",
    scan_license: "Scan License",
    verify_provider: "Verify Provider",
    report_fraud: "Report Fraud",
    
    // Common
    ok: "OK",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    refresh: "Refresh",
    loading: "Loading...",
    error: "Error",
    success: "Success"
  },
  
  hi: {
    // Home Dashboard
    home_title: "पर्यटक सुरक्षा डैशबोर्ड",
    status: "स्थिति",
    safe: "सुरक्षित",
    caution: "सावधान",
    alert: "चेतावनी",
    identity: "पहचान",
    report: "रिपोर्ट",
    alerts: "चेतावनियाँ",
    settings: "सेटिंग्स",
    itinerary: "यात्रा कार्यक्रम",
    digital_safe: "डिजिटल सेफ",
    safety_ratings: "सुरक्षा रेटिंग",
    detector: "डिटेक्टर",
    sos: "एसओएस",
    send_sos_confirmation: "क्या आप वाकई आपातकालीन चेतावनी भेजना चाहते हैं?",
    cancel: "रद्द करें",
    send_sos: "एसओएस भेजें",
    sos_sent: "एसओएस भेजा गया",
    help_on_way: "मदद आ रही है!",
    
    // Digital Identity
    digital_identity: "डिजिटल पहचान वॉलेट",
    verifiable_credential: "सत्यापन योग्य क्रेडेंशियल",
    qr_code_placeholder: "क्यूआर कोड स्थानधारक",
    generate_qr: "क्यूआर कोड उत्पन्न करें",
    credential_details: "क्रेडेंशियल विवरण",
    name: "नाम",
    nationality: "राष्ट्रीयता",
    issued_by: "द्वारा जारी",
    issued_date: "जारी तिथि",
    expiry_date: "समाप्ति तिथि",
    status_info: "स्थिति",
    view_blockchain: "ब्लॉकचेन जानकारी देखें",
    verify_blockchain: "ब्लॉकचेन पर सत्यापित करें",
    
    // Incident Reporting
    incident_reporting: "घटना रिपोर्टिंग",
    ai_detection: "एआई पहचान",
    manual_report: "मैनुअल रिपोर्ट",
    incident_type: "घटना प्रकार",
    location: "स्थान",
    description: "विवरण",
    media_upload: "मीडिया अपलोड",
    submit_report: "रिपोर्ट सबमिट करें",
    
    // Notifications
    notifications: "सूचनाएं",
    no_notifications: "कोई सूचनाएं नहीं",
    emergency_alert: "आपातकालीन चेतावनी",
    incident_update: "घटना अपडेट",
    police_dispatch: "पुलिस प्रेषण",
    
    // Settings
    settings_title: "सेटिंग्स",
    language: "भाषा",
    privacy: "गोपनीयता प्राथमिकताएं",
    offline_mode: "ऑफ़लाइन मोड",
    emergency_contacts: "आपातकालीन संपर्क",
    enable_notifications: "सूचनाएं सक्षम करें",
    manage_contacts: "संपर्क प्रबंधित करें",
    updated: "अपडेट किया गया",
    invalid_language: "अमान्य भाषा चयन",
    
    // Itinerary Scanner
    itinerary_scanner: "यात्रा कार्यक्रम स्कैनर",
    scan_itinerary: "यात्रा कार्यक्रम स्कैन करें",
    risk_assessment: "जोखिम मूल्यांकन",
    planned_route: "नियोजित मार्ग",
    
    // Safety Ratings
    safety_ratings_title: "सुरक्षा रेटिंग",
    location_safety: "स्थान सुरक्षा",
    route_safety: "मार्ग सुरक्षा",
    personal_safety: "व्यक्तिगत सुरक्षा",
    
    // Guide/Taxi Detector
    guide_detector: "गाइड/टैक्सी डिटेक्टर",
    scan_license: "लाइसेंस स्कैन करें",
    verify_provider: "प्रदाता सत्यापित करें",
    report_fraud: "धोखाधड़ी की रिपोर्ट करें",
    
    // Common
    ok: "ठीक है",
    save: "सहेजें",
    delete: "हटाएं",
    edit: "संपादित करें",
    add: "जोड़ें",
    refresh: "रीफ्रेश करें",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता"
  },
  
  bn: {
    // Home Dashboard
    home_title: "পর্যটক নিরাপত্তা ড্যাশবোর্ড",
    status: "অবস্থা",
    safe: "নিরাপদ",
    caution: "সতর্কতা",
    alert: "সতর্ক",
    identity: "পরিচয়",
    report: "প্রতিবেদন",
    alerts: "সতর্কতা",
    settings: "সেটিংস",
    itinerary: "ভ্রমণ কার্যসূচি",
    digital_safe: "ডিজিটাল সেফ",
    safety_ratings: "নিরাপত্তা রেটিং",
    detector: "সনাক্তকারী",
    sos: "এসওএস",
    send_sos_confirmation: "আপনি কি নিশ্চিত যে আপনি একটি জরুরি সতর্কতা পাঠাতে চান?",
    cancel: "বাতিল করুন",
    send_sos: "এসওএস পাঠান",
    sos_sent: "এসওএস পাঠানো হয়েছে",
    help_on_way: "সাহায্য আসছে!",
    
    // Add more translations for other languages as needed
  },
  
  ta: {
    // Home Dashboard
    home_title: "சுற்றுலா பாதுகாப்பு டாஷ்போர்டு",
    status: "நிலை",
    safe: "பாதுகாப்பான",
    caution: "எச்சரிக்கை",
    alert: "விழிப்பூட்டல்",
    identity: "அடையாளம்",
    report: "அறிக்கை",
    alerts: "விழிப்பூட்டல்கள்",
    settings: "அமைப்புகள்",
    itinerary: "சுற்றுலாத் திட்டம்",
    digital_safe: "டிஜிட்டல் சேப்",
    safety_ratings: "பாதுகாப்பு மதிப்பீடுகள்",
    detector: "கண்டறிப்பான்",
    sos: "எஸ்ஓஎஸ்",
    send_sos_confirmation: "நீங்கள் உண்மையில் அவசர எச்சரிக்கையை அனுப்ப விரும்புகிறீர்களா?",
    cancel: "ரத்துசெய்",
    send_sos: "எஸ்ஓஎஸ் அனுப்பு",
    sos_sent: "எஸ்ஓஎஸ் அனுப்பப்பட்டது",
    help_on_way: "உதவி வருகிறது!",
    
    // Add more translations for other languages as needed
  },
  
  as: {
    // Home Dashboard
    home_title: "পৰ্যটক সুৰক্ষা ডেশ্ববৰ্ড",
    status: "অৱস্থা",
    safe: "সুৰক্ষিত",
    caution: "সাৱধান",
    alert: "সতৰ্ক",
    identity: "পৰিচয়",
    report: "প্ৰতিবেদন",
    alerts: "সতৰ্কবাৰ্তা",
    settings: "ছেটিংছ",
    itinerary: "ভ্ৰমণ কাৰ্যসূচী",
    digital_safe: "ডিজিটেল চেফ",
    safety_ratings: "সুৰক্ষা ৰেটিং",
    detector: "চনাক্তকাৰী",
    sos: "এছওএছ",
    send_sos_confirmation: "আপুনি সঁচাকৈয়ে এটা জৰুৰী সতৰ্কবাৰ্তা পঠিয়াব বিচাৰে নেকি?",
    cancel: "বাতিল কৰক",
    send_sos: "এছওএছ পঠিয়াওক",
    sos_sent: "এছওএছ পঠিয়াওক হৈছে",
    help_on_way: "সহায়তা আহিছে!",
    
    // Add more translations for other languages as needed
  }
};

export default translations;