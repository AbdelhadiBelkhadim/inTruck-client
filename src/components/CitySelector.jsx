import React, { useState, useEffect } from 'react';
import { calculatePrice } from '../api/api';
import { calculateDirectDistance } from '../services/DirectDistanceService';
import cities from '../ma.json';

const CitySelector = ({ onCalculate, packageWeight }) => {
  const [pickupCity, setPickupCity] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [price, setPrice] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useDirectCalculation, setUseDirectCalculation] = useState(true); // Default to direct calculation

  // Sort cities by name for dropdown
  const sortedCities = [...cities].sort((a, b) => a.city.localeCompare(b.city));

  const handleCalculatePrice = async () => {
    // Find the selected cities in our data
    const pickupCityData = cities.find(city => city.city === pickupCity);
    const deliveryCityData = cities.find(city => city.city === deliveryCity);

    if (!pickupCityData || !deliveryCityData) {
      setError('Please select both pickup and delivery cities');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Format coordinates for API
      const pickupCoordinates = {
        lat: parseFloat(pickupCityData.lat),
        lng: parseFloat(pickupCityData.lng)
      };
      
      const deliveryCoordinates = {
        lat: parseFloat(deliveryCityData.lat),
        lng: parseFloat(deliveryCityData.lng)
      };

      // Default package details - use provided packageWeight or default to 10
      const packageDetails = { 
        weight: packageWeight || 10, 
        dimensions: { 
          length: 20, 
          width: 15, 
          height: 10 
        },
        quantity: 1 
      };
      
      let result;
      
      if (useDirectCalculation) {
        // Use direct Google Maps API calculation (without backend)
        result = await calculateDirectDistance(pickupCoordinates, deliveryCoordinates, packageDetails);
      } else {
        // Use the backend API (original method)
        result = await calculatePrice(pickupCoordinates, deliveryCoordinates, packageDetails);
      }
      
      console.log('Price result from API:', result);

      setPrice(result.price);
      setDistance(result.distance);
      
      // Pass results to parent component
      if (onCalculate) {
        onCalculate({
          price: result.price,
          distance: result.distance,
          distanceText: result.distanceText,
          duration: result.duration,
          pickupCity: pickupCity,
          deliveryCity: deliveryCity,
          pickupCoordinates,
          deliveryCoordinates,
          calculationMethod: useDirectCalculation ? 'direct' : 'backend'
        });
      }
      
    } catch (err) {
      console.error('Error calculating price:', err);
      setError('Failed to calculate price. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-bold mb-4">Select Locations</h2>
      
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={useDirectCalculation}
            onChange={(e) => setUseDirectCalculation(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Use direct calculation (bypass backend)</span>
        </label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="pickupCity" className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <select
            id="pickupCity"
            value={pickupCity}
            onChange={(e) => setPickupCity(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a city</option>
            {sortedCities.map(city => (
              <option key={`pickup-${city.city}`} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="deliveryCity" className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Location
          </label>
          <select
            id="deliveryCity"
            value={deliveryCity}
            onChange={(e) => setDeliveryCity(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a city</option>
            {sortedCities.map(city => (
              <option key={`delivery-${city.city}`} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <button
        onClick={handleCalculatePrice}
        disabled={loading || !pickupCity || !deliveryCity}
        className="w-full bg-indigo-800 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
      >
        {loading ? 'Calculating...' : 'Calculate Price'}
      </button>
      
      {error && (
        <div className="mt-3 text-red-500 text-sm">
          {error}
        </div>
      )}
      
      {price && distance && (
        <div className="mt-4 border-t pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Estimated Price</p>
              <p className="text-xl font-bold text-indigo-800">
                {typeof price === 'number' ? price.toFixed(2) : price} DHM
              </p>
              <p className="text-xs text-gray-400 mt-1">Raw value: {JSON.stringify(price)}</p>
              <p className="text-xs text-gray-400">Method: {useDirectCalculation ? 'Direct calculation' : 'Backend API'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Distance</p>
              <p className="text-xl font-bold">{distance.toFixed(2)} km</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySelector; 