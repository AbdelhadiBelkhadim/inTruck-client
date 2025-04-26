import React, { useState } from 'react';
import Layout from '../layout/Layout';
import DashboardHeader from '../componants/ui/DashboardHeader';
import CitySelector from '../componants/CitySelector';

const DistanceCalculator = () => {
  const [calculationResult, setCalculationResult] = useState(null);
  const [packageWeight, setPackageWeight] = useState(10);

  const handleCalculationResult = (result) => {
    console.log('Calculation result in DistanceCalculator:', {
      price: result.price,
      priceType: typeof result.price,
      rawPrice: JSON.stringify(result.price)
    });
    setCalculationResult(result);
  };

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <DashboardHeader h1="Distance & Price Calculator" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold mb-4">Package Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="packageWeight" className="block text-sm font-medium text-gray-700 mb-1">
                    Package Weight (kg)
                  </label>
                  <input
                    id="packageWeight"
                    type="number"
                    min="1"
                    value={packageWeight}
                    onChange={(e) => setPackageWeight(Number(e.target.value))}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
            
            <CitySelector 
              onCalculate={handleCalculationResult} 
              packageWeight={packageWeight} 
            />
          </div>
          
          {calculationResult && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold mb-4">Delivery Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500">Route</h3>
                  <p className="font-medium">{calculationResult.pickupCity} → {calculationResult.deliveryCity}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm text-gray-500">Distance</h3>
                    <p className="font-medium">{calculationResult.distanceText}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Duration</h3>
                    <p className="font-medium">{calculationResult.duration}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500">Package Weight</h3>
                  <p className="font-medium">{packageWeight} kg</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500">Estimated Price</h3>
                  <p className="text-2xl font-bold text-indigo-800">
                    {typeof calculationResult.price === 'number' 
                      ? calculationResult.price.toFixed(2) 
                      : calculationResult.price} DHM
                  </p>
                  <p className="text-xs text-gray-500">Based on distance and package weight</p>
                  <p className="text-xs text-gray-400">Debug: {JSON.stringify(calculationResult.price)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <h3 className="text-sm text-gray-500">Pickup Coordinates</h3>
                    <p className="font-mono text-xs">Lat: {calculationResult.pickupCoordinates.lat}</p>
                    <p className="font-mono text-xs">Lng: {calculationResult.pickupCoordinates.lng}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Delivery Coordinates</h3>
                    <p className="font-mono text-xs">Lat: {calculationResult.deliveryCoordinates.lat}</p>
                    <p className="font-mono text-xs">Lng: {calculationResult.deliveryCoordinates.lng}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    className="bg-indigo-800 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors w-full"
                    onClick={() => {
                      // Store the calculation details in session storage before navigating
                      sessionStorage.setItem('orderDetails', JSON.stringify({
                        ...calculationResult,
                        packageWeight
                      }));
                      window.location.href = '/new-order';
                    }}
                  >
                    Create Delivery Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DistanceCalculator; 