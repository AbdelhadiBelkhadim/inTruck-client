import React, { useState, useEffect } from 'react';
import { getAvailableTrucks, getAvailableDrivers, assignDriverToTruck } from '../../api/orderService';
import { toast } from 'react-toastify';
import { Button } from './button';
import { Select } from './select';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { RefreshCw } from 'lucide-react';

const DriverAssignmentForm = ({ onAssignmentComplete }) => {
  const [truckId, setTruckId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [availableTrucks, setAvailableTrucks] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const trucksData = await getAvailableTrucks();
      const driversData = await getAvailableDrivers();
      
      setAvailableTrucks(trucksData);
      setAvailableDrivers(driversData);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        'Failed to fetch data. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!truckId || !driverId) {
      toast.error('Please select both a truck and a driver');
      return;
    }

    setIsSubmitting(true);
    try {
      await assignDriverToTruck(truckId, { driverId });
      toast.success('Driver assigned to truck successfully');
      
      // Reset form
      setTruckId('');
      setDriverId('');
      
      // Refresh data
      await fetchData();
      
      // Notify parent component if callback exists
      if (onAssignmentComplete) {
        onAssignmentComplete();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        'Failed to assign driver. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Assign Driver to Truck</span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={fetchData} 
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="truck" className="block text-sm font-medium">
              Select Truck
            </label>
            <Select
              id="truck"
              value={truckId}
              onChange={(e) => setTruckId(e.target.value)}
              disabled={isLoading || isSubmitting || availableTrucks.length === 0}
              required
            >
              <option value="">Select a truck</option>
              {availableTrucks.map((truck) => (
                <option key={truck._id} value={truck._id}>
                  {truck.registrationNumber} - {truck.model}
                </option>
              ))}
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="driver" className="block text-sm font-medium">
              Select Driver
            </label>
            <Select
              id="driver"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              disabled={isLoading || isSubmitting || availableDrivers.length === 0}
              required
            >
              <option value="">Select a driver</option>
              {availableDrivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.firstName} {driver.lastName}
                </option>
              ))}
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || isSubmitting || !truckId || !driverId}
          >
            {isSubmitting ? 'Assigning...' : 'Assign Driver to Truck'}
          </Button>
          
          {availableTrucks.length === 0 && !isLoading && (
            <p className="text-sm text-yellow-600">No available trucks found.</p>
          )}
          
          {availableDrivers.length === 0 && !isLoading && (
            <p className="text-sm text-yellow-600">No available drivers found.</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default DriverAssignmentForm; 