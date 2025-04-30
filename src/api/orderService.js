import api from './Aapi';

// Order related endpoints
export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

/**
 * Updates the status of an order
 * @param {string} orderId - The ID of the order to update
 * @param {Object} data - The data to update
 * @param {string} data.status - The new status (PENDING, CONFIRMED, IN_TRANSIT, DELIVERED, CANCELLED)
 * @param {string} [data.reason] - Required when status is CANCELLED
 * @param {string} [data.truckNumber] - Required when status is IN_TRANSIT
 * @param {string} [data.driverId] - Optional driver ID to assign when status is IN_TRANSIT
 * @returns {Promise<Object>} - The updated order data
 */
export const updateOrderStatus = async (orderId, data) => {
  try {
    const response = await api.put(`/orders/${orderId}/update-status`, data);
    return response.data;
  } catch (error) {
    // Extract and throw a more informative error message
    const errorMessage = error.response?.data?.message || 
      error.message || 
      'Failed to update order status';
    
    throw new Error(errorMessage);
  }
};

/**
 * Gets available trucks for assigning to orders
 * Uses the same endpoint as in api.js for consistency
 * @returns {Promise<Array>} - List of available trucks
 */
export const getAvailableTrucks = async () => {
  try {
    // Use the correct endpoint from api.js
    const response = await api.get('/admin/trucks/available');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
      error.message || 
      'Failed to fetch available trucks';
    
    throw new Error(errorMessage);
  }
};

export const assignDriverToTruck = async (truckId, driverId) => {
  try {
    const response = await api.put(`/trucks/${truckId}/assign-driver`, { driverId });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
      error.message || 
      'Failed to assign driver to truck';
    
    throw new Error(errorMessage);
  }
};

// Driver related endpoints
export const getAvailableDrivers = async () => {
  try {
    const response = await api.get('/admin/drivers/available');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
      error.message || 
      'Failed to fetch available drivers';
    
    throw new Error(errorMessage);
  }
}; 