// Direct distance calculation service with price calculation
import { fetchWithCorsProxy, fetchWithJsonp } from './CorsProxyService';
import { pricingConfig } from './OricingConfig';

// You'll need to replace this with your own API key
// Note: Exposing API keys in frontend code has security implications
// For production, you should use a backend proxy
const GOOGLE_API_KEY = 'AIzaSyB-MOWdko_-tiDvHk5VqdOxrdMnv1a2Eis'; 

/**
 * Calculate distance and price directly from Google Maps API
 * @param {Object} origin - Origin coordinates {lat, lng}
 * @param {Object} destination - Destination coordinates {lat, lng}
 * @param {Object} packageDetails - Package details including weight
 * @param {Object} options - Additional options for pricing
 * @returns {Promise<Object>} - Distance, duration and price information
 */
export const CalculateDirectDistance = async (origin, destination, packageDetails, options = {}) => {
  try {
    console.log('Calculating direct distance with:', { origin, destination, packageDetails, options });
    
    // Try to get direct distance using Google Maps API
    const googleMapsResult = await tryGoogleMapsAPI(origin, destination);
    
    if (googleMapsResult) {
      // Successfully got response from Google Maps API
      const { distanceKm, distanceText, durationText } = googleMapsResult;
      
      // Calculate price using pricing configuration
      const price = pricingConfig.calculatePrice(distanceKm, packageDetails, options);
      
      return {
        distance: distanceKm,
        distanceText,
        duration: durationText,
        price,
        calculated: 'google'
      };
    } else {
      // Google Maps API failed, use fallback calculation
      return calculateFallbackDistance(origin, destination, packageDetails, options);
    }
  } catch (error) {
    console.error('Error in distance calculation:', error);
    
    // Fallback to a local calculation
    return calculateFallbackDistance(origin, destination, packageDetails, options);
  }
};

/**
 * Try to get distance using Google Maps API
 * @param {Object} origin - Origin coordinates
 * @param {Object} destination - Destination coordinates
 * @returns {Object|null} - Distance data or null if failed
 */
const tryGoogleMapsAPI = async (origin, destination) => {
  try {
    // Construct the Google Maps Distance Matrix API URL
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${GOOGLE_API_KEY}`;
    
    let response;
    try {
      // Try using the CORS proxy first
      response = await fetchWithCorsProxy(url);
      console.log('Google Maps API response via CORS proxy:', response);
    } catch (corsError) {
      console.error('CORS proxy failed:', corsError);
      
      try {
        // Try using JSONP as fallback
        const jsonpUrl = url.replace('/json', '/js');
        response = await fetchWithJsonp(jsonpUrl);
        console.log('Google Maps API response via JSONP:', response);
      } catch (jsonpError) {
        console.error('JSONP fallback failed:', jsonpError);
        return null;
      }
    }
    
    // Check if the response is valid
    if (response.status !== 'OK') {
      console.error(`Google Maps API error: ${response.status} - ${response.error_message || 'Unknown error'}`);
      return null;
    }
    
    // Extract distance and duration information
    const route = response.rows[0]?.elements[0];
    if (!route || route.status !== 'OK') {
      console.error(`Route calculation error: ${route?.status || 'Unknown'}`);
      return null;
    }
    
    const distanceKm = route.distance.value / 1000; // Convert meters to kilometers
    const distanceText = route.distance.text;
    const durationText = route.duration.text;
    
    return {
      distanceKm,
      distanceText,
      durationText
    };
  } catch (error) {
    console.error('Error in Google Maps API call:', error);
    return null;
  }
};

/**
 * Fallback calculation using Haversine formula when Google Maps API fails
 * This calculates direct distance (as the crow flies), not road distance
 */
const calculateFallbackDistance = (origin, destination, packageDetails, options = {}) => {
  console.log('Using fallback distance calculation');
  
  // Use Haversine formula to calculate direct distance
  const R = 6371; // Earth's radius in km
  const dLat = (destination.lat - origin.lat) * Math.PI / 180;
  const dLng = (destination.lng - origin.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(origin.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distanceKm = R * c; // Distance in km
  
  // Adjust road distance (roads aren't straight lines)
  // A common approximation is to multiply by 1.3-1.5
  const roadFactor = 1.3;
  const adjustedDistanceKm = distanceKm * roadFactor;
  
  // Calculate estimated duration (very rough estimate)
  const avgSpeedKmH = 60; // Average speed in km/h
  const durationHours = adjustedDistanceKm / avgSpeedKmH;
  const hours = Math.floor(durationHours);
  const minutes = Math.round((durationHours - hours) * 60);
  const durationText = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${minutes} min` : `${minutes} min`;
  
  // Calculate price using pricing configuration
  const price = pricingConfig.calculatePrice(adjustedDistanceKm, packageDetails, options);
  
  return {
    distance: adjustedDistanceKm,
    distanceText: `${adjustedDistanceKm.toFixed(2)} km`,
    duration: durationText,
    price,
    calculated: 'fallback'
  };
}; 