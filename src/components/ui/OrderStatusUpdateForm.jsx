import React, { useState } from 'react';
import { updateOrderStatus, getAvailableTrucks, getAvailableDrivers } from '../../api/orderService';
import { toast } from 'react-toastify';
import { Button } from './button';
import { Select } from './select';
import { Textarea } from './textarea';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from './label';
import { useEffect } from 'react';

const ORDER_STATUSES = {
  ACCEPTED: 'CONFIRMED',  // Map ACCEPTED to CONFIRMED for the backend
  CANCELLED: 'CANCELLED',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED'
};

const OrderStatusUpdateForm = ({ orderId, currentStatus, onStatusUpdated }) => {
  const [status, setStatus] = useState(currentStatus || '');
  const [reason, setReason] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  const [driverId, setDriverId] = useState('');
  const [availableTrucks, setAvailableTrucks] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // When status changes to IN_TRANSIT, fetch both trucks and drivers
    if (status === ORDER_STATUSES.IN_TRANSIT || status === ORDER_STATUSES.ACCEPTED) {
      fetchAvailableTrucks();
      fetchAvailableDrivers();
    }
  }, [status]);

  const fetchAvailableTrucks = async () => {
    setIsLoading(true);
    try {
      const trucksData = await getAvailableTrucks();
      setAvailableTrucks(trucksData);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        'Failed to fetch available trucks. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailableDrivers = async () => {
    setIsLoadingDrivers(true);
    try {
      const driversData = await getAvailableDrivers();
      setAvailableDrivers(driversData);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        'Failed to fetch available drivers. Please try again.'
      );
    } finally {
      setIsLoadingDrivers(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!status) {
      toast.error('Please select a status');
      return;
    }

    if (status === ORDER_STATUSES.CANCELLED && !reason) {
      toast.error('Please provide a reason for cancellation');
      return;
    }

    if ((status === ORDER_STATUSES.ACCEPTED || status === ORDER_STATUSES.IN_TRANSIT) && !truckNumber) {
      toast.error('Please select a truck for this order');
      return;
    }

    // Map our UI status values to the backend expected values
    const data = { 
      status: status === ORDER_STATUSES.ACCEPTED ? 'CONFIRMED' : status 
    };
    
    if (status === ORDER_STATUSES.CANCELLED) {
      data.reason = reason;
    }
    
    if (status === ORDER_STATUSES.ACCEPTED || status === ORDER_STATUSES.IN_TRANSIT) {
      data.truckNumber = truckNumber;
      
      // Add driverId if selected
      if (driverId) {
        data.driverId = driverId;
      }
    }

    setIsSubmitting(true);
    try {
      await updateOrderStatus(orderId, data);
      toast.success(`Order status updated to ${status}`);
      
      // Reset form
      setReason('');
      setTruckNumber('');
      setDriverId('');
      
      // Notify parent component
      if (onStatusUpdated) {
        onStatusUpdated(status);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        'Failed to update order status. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Update Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Select Status</Label>
            <RadioGroup 
              value={status} 
              onValueChange={setStatus}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="accepted" value={ORDER_STATUSES.ACCEPTED} />
                <Label htmlFor="accepted">Accept Order</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="cancelled" value={ORDER_STATUSES.CANCELLED} />
                <Label htmlFor="cancelled">Cancel Order</Label>
              </div>
              {currentStatus === ORDER_STATUSES.ACCEPTED && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="in-transit" value={ORDER_STATUSES.IN_TRANSIT} />
                  <Label htmlFor="in-transit">Mark as In Transit</Label>
                </div>
              )}
              {currentStatus === ORDER_STATUSES.IN_TRANSIT && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="delivered" value={ORDER_STATUSES.DELIVERED} />
                  <Label htmlFor="delivered">Mark as Delivered</Label>
                </div>
              )}
            </RadioGroup>
          </div>
          
          {(status === ORDER_STATUSES.ACCEPTED || status === ORDER_STATUSES.IN_TRANSIT) && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="truck">Select Truck</Label>
                <Select
                  id="truck"
                  value={truckNumber}
                  onChange={(e) => setTruckNumber(e.target.value)}
                  disabled={isLoading || isSubmitting || availableTrucks.length === 0}
                  required
                >
                  <option value="">Select a truck</option>
                  {availableTrucks.map((truck) => (
                    <option key={truck._id || truck.id} value={truck.truckNumber}>
                      {truck.truckNumber} - {truck.model}
                    </option>
                  ))}
                </Select>
                {availableTrucks.length === 0 && !isLoading && (
                  <p className="text-sm text-yellow-600">No available trucks found.</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="driver">Assign Driver (Optional)</Label>
                <Select
                  id="driver"
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  disabled={isLoadingDrivers || isSubmitting || availableDrivers.length === 0}
                >
                  <option value="">Select a driver (optional)</option>
                  {availableDrivers.map((driver) => (
                    <option key={driver._id || driver.id} value={driver._id || driver.id}>
                      {driver.firstName || driver.name} {driver.lastName || ''} 
                      {driver.phoneNumber ? ` - ${driver.phoneNumber}` : ''}
                    </option>
                  ))}
                </Select>
                {availableDrivers.length === 0 && !isLoadingDrivers && (
                  <p className="text-sm text-yellow-600">No available drivers found.</p>
                )}
              </div>
            </div>
          )}
          
          {status === ORDER_STATUSES.CANCELLED && (
            <div className="space-y-2">
              <Label htmlFor="reason">Cancellation Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for cancellation"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={
              isSubmitting || 
              !status || 
              (status === ORDER_STATUSES.CANCELLED && !reason) || 
              ((status === ORDER_STATUSES.ACCEPTED || status === ORDER_STATUSES.IN_TRANSIT) && !truckNumber)
            }
          >
            {isSubmitting ? 'Updating...' : 'Update Order Status'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderStatusUpdateForm; 