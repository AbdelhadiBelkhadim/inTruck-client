import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAvailableTrucks, getAvailableDrivers, assignDriverToTruck } from '../../api/orderService';

const DriverAssignmentForm = ({ onSuccess }) => {
  const [truckId, setTruckId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [availableTrucks, setAvailableTrucks] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [trucks, drivers] = await Promise.all([
        getAvailableTrucks(),
        getAvailableDrivers()
      ]);
      
      console.log('Available Drivers:', drivers);
      setAvailableTrucks(trucks);
      setAvailableDrivers(drivers);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!truckId || !driverId) {
      toast.error('Please select both a truck and a driver');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await assignDriverToTruck(truckId, { driverId });
      
      toast.success('Driver assigned to truck successfully');
      
      // Reset form
      setTruckId('');
      setDriverId('');
      
      // Refresh data
      await fetchData();
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to assign driver to truck');
      console.error('Error assigning driver:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-primary mb-4">Assign Driver to Truck</h2>
      
      {loading ? (
        <div className="text-center py-4">
          <p>Loading data...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-primary mb-2">
              Select Truck <span className="text-red-500">*</span>
            </label>
            {availableTrucks.length > 0 ? (
              <select
                value={truckId}
                onChange={(e) => setTruckId(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={isSubmitting}
              >
                <option value="">Select a truck</option>
                {availableTrucks.map((truck) => (
                  <option key={truck.id} value={truck.id}>
                    {truck.truckNumber} - {truck.model} ({truck.truckType})
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500">No available trucks found</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-bold text-primary mb-2">
              Select Driver <span className="text-red-500">*</span>
            </label>
            {availableDrivers.length > 0 ? (
              <select
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={isSubmitting}
              >
                <option value="">Select a driver</option>
                {availableDrivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.fullName}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500">No available drivers found</p>
            )}
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={`bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting || !availableTrucks.length || !availableDrivers.length}
            >
              {isSubmitting ? 'Assigning...' : 'Assign Driver'}
            </button>
          </div>
          
          <div className="mt-4">
            <button
              type="button"
              onClick={fetchData}
              className="text-primary underline hover:text-primary-dark text-sm"
              disabled={loading || isSubmitting}
            >
              Refresh data
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DriverAssignmentForm; 