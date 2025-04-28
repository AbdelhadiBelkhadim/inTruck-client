import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateOrderStatus, getAvailableTrucks, getAvailableDrivers } from '../../api/orderService';

const OrderStatusUpdateForm = ({ orderId, currentStatus, onSuccess }) => {
  const [status, setStatus] = useState('');
  const [reason, setReason] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  const [driverId, setDriverId] = useState('');
  const [availableTrucks, setAvailableTrucks] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTrucks, setLoadingTrucks] = useState(false);
  const [loadingDrivers, setLoadingDrivers] = useState(false);

  // Define status options with proper values and labels
  const statusOptions = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'IN_TRANSIT', label: 'In Transit' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'CANCELLED', label: 'Cancelled' }
  ];

  // Get valid next statuses based on current status
  const getValidNextStatuses = () => {
    switch (currentStatus) {
      case 'PENDING':
        return ['CONFIRMED', 'CANCELLED'];
      case 'CONFIRMED':
        return ['IN_TRANSIT', 'CANCELLED'];
      case 'IN_TRANSIT':
        return ['DELIVERED', 'CANCELLED'];
      case 'DELIVERED':
        return [];
      case 'CANCELLED':
        return [];
      default:
        return ['PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'];
    }
  };

  // Filter status options based on valid next statuses
  const validStatusOptions = statusOptions.filter(
    option => getValidNextStatuses().includes(option.value)
  );

  // Set initial status based on valid options
  useEffect(() => {
    if (validStatusOptions.length > 0 && !status) {
      setStatus(validStatusOptions[0].value);
    }
  }, [validStatusOptions, status]);

  useEffect(() => {
    // If status is IN_TRANSIT, fetch available trucks and drivers
    if (status === 'IN_TRANSIT') {
      fetchAvailableTrucks();
      fetchAvailableDrivers();
    }
  }, [status]);

  const fetchAvailableTrucks = async () => {
    try {
      setLoadingTrucks(true);
      const trucks = await getAvailableTrucks();
      setAvailableTrucks(trucks);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch available trucks');
    } finally {
      setLoadingTrucks(false);
    }
  };

  const fetchAvailableDrivers = async () => {
    try {
      setLoadingDrivers(true);
      const drivers = await getAvailableDrivers();
      setAvailableDrivers(drivers);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch available drivers');
    } finally {
      setLoadingDrivers(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Prepare update data with required status
      const updateData = { status };
      
      // Add reason if status is CANCELLED
      if (status === 'CANCELLED') {
        if (!reason.trim()) {
          toast.error('Please provide a reason for cancellation');
          setLoading(false);
          return;
        }
        updateData.reason = reason.trim();
      }
      
      // Add truck and driver info if status is IN_TRANSIT
      if (status === 'IN_TRANSIT') {
        if (!truckNumber) {
          toast.error('Please select a truck');
          setLoading(false);
          return;
        }
        updateData.truckNumber = truckNumber;
        
        if (driverId) {
          updateData.driverId = driverId;
        }
      }
      
      await updateOrderStatus(orderId, updateData);
      toast.success(`Order status updated to ${status}`);
      
      // Reset form fields
      if (status === 'CANCELLED') {
        setReason('');
      } else if (status === 'IN_TRANSIT') {
        setTruckNumber('');
        setDriverId('');
      }
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(status);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  // Check if we have no valid status options
  if (validStatusOptions.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-600">
          This order status cannot be updated further.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-primary mb-4">Update Order Status</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold text-primary mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={loading || validStatusOptions.length === 0}
          >
            {validStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Conditional field for CANCELLED status */}
        {status === 'CANCELLED' && (
          <div className="mb-4">
            <label className="block text-sm font-bold text-primary mb-2">
              Reason for Cancellation <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows="3"
              placeholder="Enter reason for cancellation"
              required
              disabled={loading}
            />
          </div>
        )}
        
        {/* Conditional fields for IN_TRANSIT status */}
        {status === 'IN_TRANSIT' && (
          <>
            {/* Truck selection */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-primary mb-2">
                Select Truck <span className="text-red-500">*</span>
              </label>
              {loadingTrucks ? (
                <p className="text-gray-500">Loading available trucks...</p>
              ) : availableTrucks.length > 0 ? (
                <select
                  value={truckNumber}
                  onChange={(e) => setTruckNumber(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={loading}
                >
                  <option value="">Select a truck</option>
                  {availableTrucks.map((truck) => (
                    <option key={truck.id} value={truck.truckNumber}>
                      {truck.truckNumber} - {truck.model} ({truck.truckType})
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-red-500">No available trucks found</p>
              )}
            </div>
            
            {/* Driver selection */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-primary mb-2">
                Assign Driver <span className="text-gray-500">(Optional)</span>
              </label>
              {loadingDrivers ? (
                <p className="text-gray-500">Loading available drivers...</p>
              ) : availableDrivers.length > 0 ? (
                <select
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                >
                  <option value="">Select a driver (optional)</option>
                  {availableDrivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} {driver.lastName || ''} - {driver.phoneNumber || 'No phone'}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-yellow-500">No available drivers found</p>
              )}
            </div>
          </>
        )}
        
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className={`bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={loading || 
              (status === 'CANCELLED' && !reason.trim()) ||
              (status === 'IN_TRANSIT' && !truckNumber)
            }
          >
            {loading ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderStatusUpdateForm; 