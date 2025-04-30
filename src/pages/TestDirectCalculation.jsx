import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { CalculateDirectDistance } from '../services/DirectDistanceService';
import { pricingConfig } from '../services/OricingConfig';

const TestDirectCalculation = () => {
  const [origin, setOrigin] = useState({ lat: 33.5731, lng: -7.5898 }); // Casablanca
  const [destination, setDestination] = useState({ lat: 34.0209, lng: -6.8416 }); // Rabat
  const [packageWeight, setPackageWeight] = useState(10);
  const [vehicleType, setVehicleType] = useState('car');
  const [isExpress, setIsExpress] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const packageDetails = {
        weight: packageWeight,
        dimensions: {
          length: 20,
          width: 15,
          height: 10
        },
        quantity: 1
      };
      
      const options = {
        vehicleType,
        express: isExpress
      };
      
      const calculationResult = await CalculateDirectDistance(
        origin, 
        destination, 
        packageDetails,
        options
      );
      
      console.log('Direct calculation result:', calculationResult);
      setResult(calculationResult);
    } catch (err) {
      console.error('Error in direct calculation:', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Direct Distance & Price Calculator Test</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-4">Input Parameters</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origin Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={origin.lat}
                    onChange={(e) => setOrigin({ ...origin, lat: parseFloat(e.target.value) })}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origin Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={origin.lng}
                    onChange={(e) => setOrigin({ ...origin, lng: parseFloat(e.target.value) })}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={destination.lat}
                    onChange={(e) => setDestination({ ...destination, lat: parseFloat(e.target.value) })}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={destination.lng}
                    onChange={(e) => setDestination({ ...destination, lng: parseFloat(e.target.value) })}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package Weight (kg)
                </label>
                <input
                  type="number"
                  min="1"
                  value={packageWeight}
                  onChange={(e) => setPackageWeight(Number(e.target.value))}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  {Object.entries(pricingConfig.vehicleTypes).map(([key, data]) => (
                    <option key={key} value={key}>
                      {data.description}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isExpress}
                    onChange={(e) => setIsExpress(e.target.checked)}
                    className="mr-2"
                  />
                  <span>Express Delivery (+{((pricingConfig.expressMultiplier - 1) * 100).toFixed(0)}%)</span>
                </label>
              </div>
            </div>
            
            <button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full bg-indigo-800 text-white py-2 px-4 rounded-md mt-6 disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Calculate'}
            </button>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
                {error}
              </div>
            )}
          </div>
          
          {result && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold mb-4">Calculation Results</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500">Calculation Method</h3>
                  <p className="font-medium">{result.calculated === 'google' ? 'Google Maps API' : 'Fallback (Haversine)'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm text-gray-500">Distance</h3>
                    <p className="font-medium">{result.distanceText || `${result.distance.toFixed(2)} km`}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Duration</h3>
                    <p className="font-medium">{result.duration}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500">Package Weight</h3>
                  <p className="font-medium">{packageWeight} kg</p>
                  <p className="text-xs text-gray-400">
                    Weight category: {
                      packageWeight <= 5 ? 'Light' :
                      packageWeight <= 20 ? 'Medium' : 'Heavy'
                    }
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500">Price Breakdown</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p><span className="font-medium">Base Price:</span> {pricingConfig.basePrice} DHM</p>
                    <p><span className="font-medium">Distance Charge:</span> {result.distance.toFixed(2)} km × {pricingConfig.pricePerKm} DHM = {(result.distance * pricingConfig.pricePerKm).toFixed(2)} DHM</p>
                    <p><span className="font-medium">Weight Factor:</span> {packageWeight <= 5 ? pricingConfig.weightPricing.light.multiplier : 
                       packageWeight <= 20 ? pricingConfig.weightPricing.medium.multiplier :
                       pricingConfig.weightPricing.heavy.multiplier}×</p>
                    <p><span className="font-medium">Vehicle Factor:</span> {pricingConfig.vehicleTypes[vehicleType].multiplier}×</p>
                    {isExpress && <p><span className="font-medium">Express Delivery:</span> {pricingConfig.expressMultiplier}×</p>}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg text-gray-700">Final Price</h3>
                  <p className="text-3xl font-bold text-indigo-800">{result.price.toFixed(2)} DHM</p>
                </div>
                
                <div className="pt-2">
                  <p className="text-xs text-gray-400">Raw calculation details: {JSON.stringify(result)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TestDirectCalculation; 