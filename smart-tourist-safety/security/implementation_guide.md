# Security Implementation Guide

## Overview

This guide provides technical implementation details for the security measures outlined in the privacy policy, ensuring the Smart Tourist Safety System meets the highest standards of data protection and security.

## Encryption Implementation

### 1. Data at Rest Encryption

#### Database Encryption
```javascript
// Example implementation using Node.js crypto module
const crypto = require('crypto');

class DataEncryption {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.key = process.env.ENCRYPTION_KEY; // 256-bit key
  }
  
  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }
  
  decrypt(encryptedData, iv, authTag) {
    const decipher = crypto.createDecipher(this.algorithm, this.key, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

#### File Storage Encryption
- Use hardware security modules (HSMs) for key management
- Implement envelope encryption for large files
- Regular key rotation every 90 days

### 2. Data in Transit Encryption

#### HTTPS/TLS Configuration
```nginx
# Nginx configuration for strong TLS
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # TLS 1.3 only
    ssl_protocols TLSv1.3;
    ssl_ciphers ECDHE+AESGCM:ECDHE+CHACHA20;
    ssl_prefer_server_ciphers off;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    # Other security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Content-Security-Policy "default-src 'self'";
}
```

#### API Communication Security
```javascript
// Client-side API security
const axios = require('axios');
const https = require('https');

// Configure HTTPS agent with certificate validation
const httpsAgent = new https.Agent({
  rejectUnauthorized: true,
  ca: fs.readFileSync('/path/to/ca-cert.pem')
});

const secureApiClient = axios.create({
  baseURL: 'https://api.smartsafetysystem.in',
  httpsAgent: httpsAgent,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'SmartTouristSafetyApp/1.0'
  }
});

// Add authentication interceptor
secureApiClient.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Authentication and Authorization

### 1. Multi-Factor Authentication (MFA)

#### Tourist Authentication
```javascript
// MFA implementation for tourist login
class TouristAuth {
  async login(touristId, password) {
    // Verify password
    const isValid = await this.verifyPassword(touristId, password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    
    // Generate and send OTP
    const otp = this.generateOTP();
    await this.sendOTP(touristId, otp);
    
    // Store OTP hash for verification
    await this.storeOTPHash(touristId, this.hashOTP(otp));
    
    return { 
      status: 'OTP_SENT', 
      message: 'OTP sent to registered mobile number' 
    };
  }
  
  async verifyOTP(touristId, otp) {
    const storedHash = await this.getOTPHash(touristId);
    const providedHash = this.hashOTP(otp);
    
    if (storedHash !== providedHash) {
      throw new Error('Invalid OTP');
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { touristId, role: 'tourist' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return { 
      status: 'SUCCESS', 
      token,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    };
  }
}
```

#### Authority Authentication
```javascript
// Role-based access control for authorities
class AuthorityAuth {
  constructor() {
    this.roles = {
      POLICE: ['view_incidents', 'update_incident_status', 'dispatch_units'],
      TOURISM_DEPT: ['verify_tourist', 'revoke_identity', 'view_analytics'],
      MEDICAL: ['view_health_data', 'update_medical_status'],
      ADMIN: ['*'] // Full access
    };
  }
  
  async authorize(token, requiredPermission) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userRole = decoded.role;
      
      // Check if role has required permission
      const permissions = this.roles[userRole];
      if (!permissions) {
        throw new Error('Invalid role');
      }
      
      // Admin has all permissions
      if (permissions.includes('*')) {
        return true;
      }
      
      // Check specific permission
      if (!permissions.includes(requiredPermission)) {
        throw new Error('Insufficient permissions');
      }
      
      return true;
    } catch (error) {
      throw new Error('Authorization failed: ' + error.message);
    }
  }
}
```

### 2. Blockchain Identity Verification

#### Smart Contract Security
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecureTouristIdentity {
{
    // Events for audit trail
    event IdentityCreated(
        string indexed touristId,
        address indexed creator,
        uint256 timestamp
    );
    
    event IdentityVerified(
        string indexed touristId,
        address indexed verifier,
        uint256 timestamp
    );
    
    event IdentityRevoked(
        string indexed touristId,
        address indexed revoker,
        uint256 timestamp
    );
    
    // Only authorized entities can perform actions
    modifier onlyAuthorized() {
        require(authorities[msg.sender], "Not authorized");
        _;
    }
    
    // Prevent reentrancy attacks
    bool private locked;
    modifier noReentrancy() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }
    
    // Create identity with access control
    function createIdentity(
        string memory _touristId,
        string memory _hashedData
    ) public onlyAuthorized noReentrancy {
        require(bytes(identities[_touristId].touristId).length == 0, "Identity exists");
        
        identities[_touristId] = DigitalIdentity({
            touristId: _touristId,
            hashedData: _hashedData,
            isActive: true,
            createdAt: block.timestamp,
            createdBy: msg.sender
        });
        
        emit IdentityCreated(_touristId, msg.sender, block.timestamp);
    }
}
```

## IoT Device Security

### 1. Device Authentication

#### Certificate-Based Authentication
```python
# Python implementation for IoT device authentication
import jwt
import hashlib
import hmac
from cryptography import x509
from cryptography.hazmat.primitives import hashes

class IoTDeviceAuth:
    def __init__(self):
        self.device_registry = {}
        
    def register_device(self, device_id, certificate):
        """
        Register device with certificate
        """
        try:
            # Parse and validate certificate
            cert = x509.load_pem_x509_certificate(certificate.encode())
            
            # Verify certificate is valid
            cert.verify(cert.public_key())
            
            # Store device info
            self.device_registry[device_id] = {
                'certificate': cert,
                'public_key': cert.public_key(),
                'registered_at': time.time()
            }
            
            return True
        except Exception as e:
            print(f"Device registration failed: {e}")
            return False
    
    def authenticate_device(self, device_id, signature, data):
        """
        Authenticate device using signature
        """
        if device_id not in self.device_registry:
            return False
            
        try:
            # Verify signature using device's public key
            public_key = self.device_registry[device_id]['public_key']
            public_key.verify(
                signature,
                data.encode(),
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            
            return True
        except Exception as e:
            print(f"Device authentication failed: {e}")
            return False
```

### 2. Secure Data Transmission

#### MQTT with TLS
```python
# Secure MQTT client for IoT devices
import paho.mqtt.client as mqtt
import ssl

class SecureMQTTClient:
    def __init__(self, broker, port=8883):
        self.client = mqtt.Client()
        self.broker = broker
        self.port = port
        self.configure_tls()
        
    def configure_tls(self):
        """
        Configure TLS for secure MQTT connection
        """
        self.client.tls_set(
            ca_certs="/path/to/ca.crt",
            certfile="/path/to/client.crt",
            keyfile="/path/to/client.key",
            cert_reqs=ssl.CERT_REQUIRED,
            tls_version=ssl.PROTOCOL_TLSv1_3,
            ciphers=None
        )
        
        # Verify server hostname
        self.client.tls_insecure_set(False)
        
    def connect(self):
        """
        Connect to MQTT broker
        """
        try:
            self.client.connect(self.broker, self.port, 60)
            self.client.loop_start()
            return True
        except Exception as e:
            print(f"MQTT connection failed: {e}")
            return False
```

## Data Privacy Controls

### 1. Consent Management

#### Granular Consent System
```javascript
// Consent management for tourist data
class ConsentManager {
  constructor() {
    this.consentTypes = [
      'location_tracking',
      'health_monitoring',
      'incident_reporting',
      'emergency_contacts',
      'analytics'
    ];
  }
  
  async setConsent(touristId, consentType, granted) {
    // Validate consent type
    if (!this.consentTypes.includes(consentType)) {
      throw new Error('Invalid consent type');
    }
    
    // Store consent record
    const consentRecord = {
      touristId,
      consentType,
      granted,
      timestamp: new Date().toISOString(),
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent()
    };
    
    await this.storeConsentRecord(consentRecord);
    
    // Update user profile
    await this.updateUserProfile(touristId, consentType, granted);
    
    return consentRecord;
  }
  
  async getConsent(touristId, consentType) {
    // Retrieve current consent status
    const consent = await this.getConsentRecord(touristId, consentType);
    return consent ? consent.granted : false;
  }
  
  async withdrawAllConsent(touristId) {
    // Withdraw all consents
    for (const consentType of this.consentTypes) {
      await this.setConsent(touristId, consentType, false);
    }
    
    // Delete personal data (as per retention policy)
    await this.scheduleDataDeletion(touristId);
    
    return { status: 'SUCCESS', message: 'All consents withdrawn' };
  }
}
```

### 2. Data Anonymization

#### K-Anonymity Implementation
```python
# Data anonymization for analytics
import pandas as pd
from sklearn.preprocessing import LabelEncoder

class DataAnonymizer:
    def __init__(self, k=5):
        self.k = k
        self.label_encoders = {}
        
    def anonymize_location_data(self, df):
        """
        Apply k-anonymity to location data
        """
        # Generalize location data
        df['location_generalized'] = df.apply(
            lambda row: self.generalize_location(
                row['latitude'], 
                row['longitude']
            ), 
            axis=1
        )
        
        # Remove precise coordinates
        df_anonymized = df.drop(['latitude', 'longitude'], axis=1)
        
        # Ensure k-anonymity
        df_anonymized = self.ensure_k_anonymity(df_anonymized)
        
        return df_anonymized
    
    def generalize_location(self, lat, lng):
        """
        Generalize location to reduce precision
        """
        # Round to 2 decimal places (about 1km precision)
        lat_generalized = round(lat, 2)
        lng_generalized = round(lng, 2)
        return f"{lat_generalized},{lng_generalized}"
    
    def ensure_k_anonymity(self, df):
        """
        Ensure each group has at least k records
        """
        # Group by quasi-identifiers
        quasi_identifiers = ['age_group', 'nationality', 'location_generalized']
        grouped = df.groupby(quasi_identifiers)
        
        # Filter groups with less than k records
        filtered_groups = []
        for name, group in grouped:
            if len(group) >= self.k:
                filtered_groups.append(group)
            else:
                # Suppress small groups or generalize further
                suppressed_group = group.copy()
                suppressed_group['location_generalized'] = 'SUPPRESSED'
                filtered_groups.append(suppressed_group)
        
        return pd.concat(filtered_groups, ignore_index=True)
```

## Audit and Monitoring

### 1. Security Event Logging

#### Centralized Logging
```javascript
// Security event logging system
class SecurityLogger {
  constructor() {
    this.logLevels = {
      INFO: 1,
      WARN: 2,
      ERROR: 3,
      CRITICAL: 4
    };
  }
  
  logEvent(eventType, severity, details, userId = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      eventType,
      severity,
      details,
      userId,
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent(),
      sessionId: this.getSessionId()
    };
    
    // Send to centralized logging system
    this.sendToLogAggregator(logEntry);
    
    // Alert for high-severity events
    if (this.logLevels[severity] >= this.logLevels.WARN) {
      this.sendAlert(logEntry);
    }
    
    return logEntry;
  }
  
  logAccessControl(userId, resource, action, granted) {
    this.logEvent(
      'ACCESS_CONTROL',
      granted ? 'INFO' : 'WARN',
      {
        resource,
        action,
        granted,
        reason: granted ? 'Access granted' : 'Access denied'
      },
      userId
    );
  }
  
  logDataAccess(userId, dataType, recordId) {
    this.logEvent(
      'DATA_ACCESS',
      'INFO',
      {
        dataType,
        recordId,
        purpose: 'Legitimate business need'
      },
      userId
    );
  }
}
```

### 2. Intrusion Detection

#### Behavioral Anomaly Detection
```python
# Anomaly detection for security monitoring
import numpy as np
from sklearn.ensemble import IsolationForest
from datetime import datetime, timedelta

class IntrusionDetector:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1)
        self.access_patterns = {}
        self.baseline_data = None
        
    def train_baseline(self, historical_data):
        """
        Train model on historical access patterns
        """
        features = self.extract_features(historical_data)
        self.model.fit(features)
        self.baseline_data = features
        
    def detect_anomaly(self, access_event):
        """
        Detect anomalous access patterns
        """
        features = self.extract_features([access_event])
        anomaly_score = self.model.decision_function(features)[0]
        is_anomaly = self.model.predict(features)[0] == -1
        
        if is_anomaly:
            self.trigger_alert(access_event, anomaly_score)
            
        return {
            'is_anomaly': is_anomaly,
            'score': anomaly_score,
            'timestamp': datetime.now().isoformat()
        }
    
    def extract_features(self, access_events):
        """
        Extract features for anomaly detection
        """
        features = []
        for event in access_events:
            feature_vector = [
                event.get('hour_of_day', 0),
                event.get('day_of_week', 0),
                event.get('access_count_last_hour', 0),
                event.get('unique_resources_accessed', 0),
                event.get('failed_attempts', 0),
                event.get('geolocation_distance', 0)
            ]
            features.append(feature_vector)
        return np.array(features)
    
    def trigger_alert(self, event, score):
        """
        Trigger security alert for anomalous activity
        """
        alert = {
            'type': 'SECURITY_ANOMALY',
            'severity': 'HIGH' if score < -0.5 else 'MEDIUM',
            'event': event,
            'score': score,
            'timestamp': datetime.now().isoformat()
        }
        
        # Send to security team
        self.send_security_alert(alert)
        
        # Log the incident
        self.log_security_incident(alert)
```

## Compliance Automation

### 1. Data Subject Request Handling

#### Automated Data Access and Deletion
```javascript
// Data subject request automation
class DataSubjectRequestHandler {
  async handleDataAccessRequest(touristId) {
    // Verify identity
    await this.verifyTouristIdentity(touristId);
    
    // Collect all personal data
    const personalData = await this.collectPersonalData(touristId);
    
    // Generate report
    const report = this.generateDataReport(personalData);
    
    // Send to tourist
    await this.sendReportToTourist(touristId, report);
    
    // Log the request
    await this.logRequest(touristId, 'DATA_ACCESS', 'COMPLETED');
    
    return {
      status: 'SUCCESS',
      message: 'Data access report sent to tourist',
      reportId: this.generateReportId()
    };
  }
  
  async handleDataDeletionRequest(touristId) {
    // Verify identity
    await this.verifyTouristIdentity(touristId);
    
    // Get consent for deletion
    const consent = await this.getDeletionConsent(touristId);
    if (!consent) {
      throw new Error('Deletion consent not provided');
    }
    
    // Schedule data deletion
    const deletionJob = await this.scheduleDataDeletion(touristId);
    
    // Confirm deletion
    await this.confirmDeletion(touristId, deletionJob);
    
    // Log the request
    await this.logRequest(touristId, 'DATA_DELETION', 'COMPLETED');
    
    return {
      status: 'SUCCESS',
      message: 'Data deletion scheduled and confirmed',
      deletionId: deletionJob.id
    };
  }
}
```

### 2. Privacy Impact Assessment Automation

#### Automated PIA Tool
```python
# Automated Privacy Impact Assessment
class PrivacyImpactAssessment:
    def __init__(self):
        self.risk_factors = [
            'data_sensitivity',
            'data_volume',
            'processing_frequency',
            'retention_period',
            'third_party_sharing',
            'cross_border_transfer'
        ]
        
    def assess_new_feature(self, feature_spec):
        """
        Assess privacy impact of new features
        """
        assessment = {
            'feature_name': feature_spec.get('name'),
            'assessment_date': datetime.now().isoformat(),
            'risk_factors': {},
            'overall_risk': 'LOW',
            'recommendations': [],
            'compliance_status': 'PENDING'
        }
        
        # Assess each risk factor
        for factor in self.risk_factors:
            score = self.assess_risk_factor(feature_spec, factor)
            assessment['risk_factors'][factor] = score
            
            # Update overall risk
            if score > 7:
                assessment['overall_risk'] = 'HIGH'
            elif score > 4 and assessment['overall_risk'] != 'HIGH':
                assessment['overall_risk'] = 'MEDIUM'
        
        # Generate recommendations
        assessment['recommendations'] = self.generate_recommendations(
            assessment['risk_factors']
        )
        
        return assessment
    
    def assess_risk_factor(self, feature_spec, factor):
        """
        Assess individual risk factors
        """
        risk_scores = {
            'data_sensitivity': self.assess_data_sensitivity(feature_spec),
            'data_volume': self.assess_data_volume(feature_spec),
            'processing_frequency': self.assess_processing_frequency(feature_spec),
            'retention_period': self.assess_retention_period(feature_spec),
            'third_party_sharing': self.assess_third_party_sharing(feature_spec),
            'cross_border_transfer': self.assess_cross_border_transfer(feature_spec)
        }
        
        return risk_scores.get(factor, 0)
    
    def generate_recommendations(self, risk_factors):
        """
        Generate privacy recommendations based on risk factors
        """
        recommendations = []
        
        if risk_factors.get('data_sensitivity', 0) > 7:
            recommendations.append('Implement additional encryption for sensitive data')
            
        if risk_factors.get('data_volume', 0) > 7:
            recommendations.append('Consider data minimization techniques')
            
        if risk_factors.get('processing_frequency', 0) > 7:
            recommendations.append('Implement rate limiting for data processing')
            
        if risk_factors.get('retention_period', 0) > 7:
            recommendations.append('Review and minimize data retention periods')
            
        if risk_factors.get('third_party_sharing', 0) > 5:
            recommendations.append('Review third-party data processing agreements')
            
        if risk_factors.get('cross_border_transfer', 0) > 5:
            recommendations.append('Ensure compliance with cross-border transfer restrictions')
            
        return recommendations
```

## Security Testing and Validation

### 1. Penetration Testing Framework

#### Automated Security Testing
```python
# Security testing automation
import requests
import json
from urllib.parse import urljoin

class SecurityTester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        
    def test_authentication(self):
        """
        Test authentication mechanisms
        """
        results = []
        
        # Test weak password
        result = self.test_weak_password()
        results.append(result)
        
        # Test session management
        result = self.test_session_management()
        results.append(result)
        
        # Test MFA bypass
        result = self.test_mfa_bypass()
        results.append(result)
        
        return results
    
    def test_input_validation(self):
        """
        Test input validation and injection prevention
        """
        results = []
        
        # Test SQL injection
        result = self.test_sql_injection()
        results.append(result)
        
        # Test XSS
        result = self.test_xss()
        results.append(result)
        
        # Test command injection
        result = self.test_command_injection()
        results.append(result)
        
        return results
    
    def test_api_security(self):
        """
        Test API security controls
        """
        results = []
        
        # Test rate limiting
        result = self.test_rate_limiting()
        results.append(result)
        
        # Test authorization
        result = self.test_authorization()
        results.append(result)
        
        # Test data exposure
        result = self.test_data_exposure()
        results.append(result)
        
        return results
```

This security implementation guide provides a comprehensive framework for ensuring the Smart Tourist Safety System meets the highest standards of data protection and security while complying with Indian Data Protection laws.