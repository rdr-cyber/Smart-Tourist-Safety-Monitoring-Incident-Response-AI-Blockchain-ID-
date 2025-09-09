"""
Anomaly Detection Engine for Smart Tourist Safety Monitoring System
This module implements AI/ML models for detecting unusual tourist behavior
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
import joblib
import json
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

class AnomalyDetectionEngine:
    """
    AI Engine for detecting anomalies in tourist behavior patterns
    """
    
    def __init__(self):
        self.location_dropoff_model = IsolationForest(contamination=0.1, random_state=42)
        self.inactivity_model = IsolationForest(contamination=0.1, random_state=42)
        self.route_deviation_model = IsolationForest(contamination=0.1, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
        
    def preprocess_location_data(self, location_data):
        """
        Preprocess location data for anomaly detection
        :param location_data: List of location points with timestamps
        :return: Processed features for anomaly detection
        """
        if len(location_data) < 2:
            return None
            
        # Convert to DataFrame
        df = pd.DataFrame(location_data)
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df = df.sort_values('timestamp')
        
        # Calculate features
        df['time_diff'] = df['timestamp'].diff().dt.total_seconds().fillna(0)
        df['distance'] = np.sqrt((df['latitude'].diff())**2 + (df['longitude'].diff())**2).fillna(0)
        df['speed'] = df['distance'] / (df['time_diff'] + 1e-6)  # Avoid division by zero
        
        # Remove first row which has NaN values
        df = df.iloc[1:].reset_index(drop=True)
        
        # Extract features
        features = df[['latitude', 'longitude', 'time_diff', 'distance', 'speed']].values
        
        return features
    
    def detect_location_dropoff(self, location_data):
        """
        Detect sudden stoppage or location drop-off
        :param location_data: List of recent location points
        :return: Anomaly score and detection result
        """
        features = self.preprocess_location_data(location_data)
        if features is None:
            return {"anomaly": False, "score": 0, "confidence": 0}
        
        # Scale features
        scaled_features = self.scaler.fit_transform(features)
        
        # Detect anomalies
        anomaly_scores = self.location_dropoff_model.decision_function(scaled_features)
        predictions = self.location_dropoff_model.predict(scaled_features)
        
        # Check if the latest point is anomalous
        latest_anomaly = predictions[-1] == -1
        latest_score = anomaly_scores[-1]
        
        # Calculate confidence (how far from the threshold)
        confidence = abs(latest_score)
        
        return {
            "anomaly": bool(latest_anomaly),
            "score": float(latest_score),
            "confidence": float(confidence),
            "timestamp": datetime.now().isoformat(),
            "type": "location_dropoff"
        }
    
    def detect_prolonged_inactivity(self, location_data, threshold_minutes=30):
        """
        Detect prolonged inactivity based on location data
        :param location_data: List of location points
        :param threshold_minutes: Threshold for inactivity in minutes
        :return: Anomaly detection result
        """
        if len(location_data) < 2:
            return {"anomaly": False, "score": 0, "confidence": 0}
        
        # Convert to DataFrame
        df = pd.DataFrame(location_data)
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df = df.sort_values('timestamp')
        
        # Calculate time differences
        df['time_diff'] = df['timestamp'].diff().dt.total_seconds() / 60  # Convert to minutes
        
        # Check for prolonged inactivity
        max_inactivity = df['time_diff'].max()
        is_inactive = max_inactivity > threshold_minutes
        
        # Calculate score based on how much it exceeds threshold
        score = max(0, (max_inactivity - threshold_minutes) / threshold_minutes)
        confidence = min(1.0, score)
        
        return {
            "anomaly": bool(is_inactive),
            "score": float(score),
            "confidence": float(confidence),
            "max_inactivity_minutes": float(max_inactivity),
            "threshold_minutes": threshold_minutes,
            "timestamp": datetime.now().isoformat(),
            "type": "prolonged_inactivity"
        }
    
    def detect_route_deviation(self, current_path, planned_itinerary):
        """
        Detect significant deviation from planned itinerary
        :param current_path: List of actual location points
        :param planned_itinerary: List of planned location points
        :return: Anomaly detection result
        """
        if len(current_path) < 2 or len(planned_itinerary) < 2:
            return {"anomaly": False, "score": 0, "confidence": 0}
        
        # Convert to arrays
        current_coords = np.array([[p['latitude'], p['longitude']] for p in current_path])
        planned_coords = np.array([[p['latitude'], p['longitude']] for p in planned_itinerary])
        
        # Calculate centroid of each path
        current_centroid = np.mean(current_coords, axis=0)
        planned_centroid = np.mean(planned_coords, axis=0)
        
        # Calculate distance between centroids
        centroid_distance = np.linalg.norm(current_centroid - planned_centroid)
        
        # Calculate path lengths
        current_length = np.sum(np.linalg.norm(np.diff(current_coords, axis=0), axis=1))
        planned_length = np.sum(np.linalg.norm(np.diff(planned_coords, axis=0), axis=1))
        
        # Calculate deviation metrics
        centroid_deviation = centroid_distance / (np.linalg.norm(planned_centroid) + 1e-6)
        length_deviation = abs(current_length - planned_length) / (planned_length + 1e-6)
        
        # Combined deviation score
        deviation_score = 0.6 * centroid_deviation + 0.4 * length_deviation
        
        # Determine if it's an anomaly (threshold can be adjusted)
        is_deviation = deviation_score > 0.3
        confidence = min(1.0, deviation_score)
        
        return {
            "anomaly": bool(is_deviation),
            "score": float(deviation_score),
            "confidence": float(confidence),
            "centroid_deviation": float(centroid_deviation),
            "length_deviation": float(length_deviation),
            "timestamp": datetime.now().isoformat(),
            "type": "route_deviation"
        }
    
    def train_models(self, training_data):
        """
        Train the anomaly detection models with historical data
        :param training_data: Dictionary with training data for each model
        """
        # Train location dropoff model
        if 'location_data' in training_data:
            all_features = []
            for location_sequence in training_data['location_data']:
                features = self.preprocess_location_data(location_sequence)
                if features is not None:
                    all_features.append(features)
            
            if all_features:
                combined_features = np.vstack(all_features)
                scaled_features = self.scaler.fit_transform(combined_features)
                self.location_dropoff_model.fit(scaled_features)
        
        # For other models, we would similarly train with appropriate data
        # This is a simplified implementation
        
        self.is_trained = True
        return {"status": "success", "message": "Models trained successfully"}
    
    def save_models(self, filepath):
        """
        Save trained models to disk
        :param filepath: Path to save models
        """
        model_data = {
            'location_dropoff_model': self.location_dropoff_model,
            'inactivity_model': self.inactivity_model,
            'route_deviation_model': self.route_deviation_model,
            'scaler': self.scaler,
            'is_trained': self.is_trained
        }
        
        joblib.dump(model_data, filepath)
        return {"status": "success", "message": f"Models saved to {filepath}"}
    
    def load_models(self, filepath):
        """
        Load trained models from disk
        :param filepath: Path to load models from
        """
        try:
            model_data = joblib.load(filepath)
            self.location_dropoff_model = model_data['location_dropoff_model']
            self.inactivity_model = model_data['inactivity_model']
            self.route_deviation_model = model_data['route_deviation_model']
            self.scaler = model_data['scaler']
            self.is_trained = model_data['is_trained']
            return {"status": "success", "message": "Models loaded successfully"}
        except Exception as e:
            return {"status": "error", "message": f"Failed to load models: {str(e)}"}

# Example usage
if __name__ == "__main__":
    # Initialize the anomaly detection engine
    engine = AnomalyDetectionEngine()
    
    # Example location data (latitude, longitude, timestamp)
    example_location_data = [
        {"latitude": 27.175015, "longitude": 78.042155, "timestamp": "2025-09-08T10:00:00Z"},
        {"latitude": 27.175120, "longitude": 78.042210, "timestamp": "2025-09-08T10:05:00Z"},
        {"latitude": 27.175230, "longitude": 78.042315, "timestamp": "2025-09-08T10:10:00Z"},
        {"latitude": 27.175340, "longitude": 78.042420, "timestamp": "2025-09-08T10:15:00Z"},
        # Simulate a sudden drop-off
        {"latitude": 27.175340, "longitude": 78.042420, "timestamp": "2025-09-08T10:30:00Z"},
    ]
    
    # Detect location dropoff
    dropoff_result = engine.detect_location_dropoff(example_location_data)
    print("Location Dropoff Detection:", dropoff_result)
    
    # Detect prolonged inactivity
    inactivity_result = engine.detect_prolonged_inactivity(example_location_data, threshold_minutes=15)
    print("Prolonged Inactivity Detection:", inactivity_result)
    
    # Example planned itinerary
    planned_itinerary = [
        {"latitude": 27.175015, "longitude": 78.042155},
        {"latitude": 27.174015, "longitude": 78.041155},
        {"latitude": 27.173015, "longitude": 78.040155},
    ]
    
    # Detect route deviation
    route_deviation_result = engine.detect_route_deviation(example_location_data, planned_itinerary)
    print("Route Deviation Detection:", route_deviation_result)