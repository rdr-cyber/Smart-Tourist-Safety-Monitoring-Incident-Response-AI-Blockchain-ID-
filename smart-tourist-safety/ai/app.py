"""
Flask API for the Anomaly Detection Engine
This module exposes the AI/ML models as RESTful APIs
"""

from flask import Flask, request, jsonify
from anomaly_detection import AnomalyDetectionEngine
import json

app = Flask(__name__)

# Initialize the anomaly detection engine
engine = AnomalyDetectionEngine()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "Anomaly Detection Engine",
        "version": "1.0.0"
    })

@app.route('/detect/location-dropoff', methods=['POST'])
def detect_location_dropoff():
    """Detect location dropoff anomalies"""
    try:
        data = request.get_json()
        location_data = data.get('location_data', [])
        
        if not location_data:
            return jsonify({
                "error": "Missing location_data parameter"
            }), 400
        
        result = engine.detect_location_dropoff(location_data)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to detect location dropoff: {str(e)}"
        }), 500

@app.route('/detect/inactivity', methods=['POST'])
def detect_inactivity():
    """Detect prolonged inactivity anomalies"""
    try:
        data = request.get_json()
        location_data = data.get('location_data', [])
        threshold_minutes = data.get('threshold_minutes', 30)
        
        if not location_data:
            return jsonify({
                "error": "Missing location_data parameter"
            }), 400
        
        result = engine.detect_prolonged_inactivity(location_data, threshold_minutes)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to detect inactivity: {str(e)}"
        }), 500

@app.route('/detect/route-deviation', methods=['POST'])
def detect_route_deviation():
    """Detect route deviation anomalies"""
    try:
        data = request.get_json()
        current_path = data.get('current_path', [])
        planned_itinerary = data.get('planned_itinerary', [])
        
        if not current_path or not planned_itinerary:
            return jsonify({
                "error": "Missing current_path or planned_itinerary parameters"
            }), 400
        
        result = engine.detect_route_deviation(current_path, planned_itinerary)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to detect route deviation: {str(e)}"
        }), 500

@app.route('/train', methods=['POST'])
def train_models():
    """Train the anomaly detection models"""
    try:
        data = request.get_json()
        training_data = data.get('training_data', {})
        
        result = engine.train_models(training_data)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to train models: {str(e)}"
        }), 500

@app.route('/save-models', methods=['POST'])
def save_models():
    """Save trained models to disk"""
    try:
        data = request.get_json()
        filepath = data.get('filepath', 'models/anomaly_detection_model.pkl')
        
        result = engine.save_models(filepath)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to save models: {str(e)}"
        }), 500

@app.route('/load-models', methods=['POST'])
def load_models():
    """Load trained models from disk"""
    try:
        data = request.get_json()
        filepath = data.get('filepath', 'models/anomaly_detection_model.pkl')
        
        result = engine.load_models(filepath)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to load models: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)