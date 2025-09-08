// API service for connecting to the backend server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `API request failed with status ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

// Incident Management API
export const incidentApi = {
  // Get all incidents
  getAllIncidents: () => apiRequest('/incidents'),
  
  // Get incident by ID
  getIncidentById: (id) => apiRequest(`/incidents/${id}`),
  
  // Create new incident
  createIncident: (incidentData) => apiRequest('/incidents', {
    method: 'POST',
    body: JSON.stringify(incidentData),
  }),
  
  // Update incident
  updateIncident: (id, incidentData) => apiRequest(`/incidents/${id}`, {
    method: 'PUT',
    body: JSON.stringify(incidentData),
  }),
};

// Tourist Verification API
export const touristApi = {
  // Get all tourists
  getAllTourists: () => apiRequest('/tourists'),
  
  // Get tourist by ID
  getTouristById: (id) => apiRequest(`/tourists/${id}`),
};

// Location Safety API
export const locationApi = {
  // Get all locations with safety scores
  getAllLocations: () => apiRequest('/locations'),
};

// Response Units API
export const unitApi = {
  // Get all response units
  getAllUnits: () => apiRequest('/units'),
};

// Export the base API functions
export default {
  incidentApi,
  touristApi,
  locationApi,
  unitApi,
};