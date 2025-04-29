import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText, Check, X } from "lucide-react";
import Pagination from "../../ui/Pagination";
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://intruck-backend-production.up.railway.app';

const ConfirmationOrderAdmin = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);
  
  // New states for cancellation and assignment
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [showCancellationForm, setShowCancellationForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [availableTrucks, setAvailableTrucks] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPendingOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token is missing. Please log in again.');
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/orders/pending`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const ordersData = Array.isArray(response.data) ? response.data : (response.data.orders || []);
      const filteredOrders = ordersData.filter(order => 
        order.status === 'PENDING' || 
        (order.tracking && order.tracking.status === 'PENDING')
      );
      
      setPendingOrders(filteredOrders);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching pending orders:', err);
      let errorMessage = 'Failed to load pending orders';
      
      if (err.response) {
        errorMessage = `Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`;
        if (err.response.status === 401 || err.response.status === 403) {
          errorMessage = 'Your session has expired. Please log in again.';
        }
      } else if (err.request) {
        errorMessage = 'No response from server. Check your connection.';
      } else {
        errorMessage = `Request error: ${err.message}`;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  const fetchAvailableDrivers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/admin/drivers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAvailableDrivers(response.data);
    } catch (err) {
      toast.error('Failed to fetch available drivers');
      console.error('Error fetching drivers:', err);
    }
  };

  const fetchAvailableTrucks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/admin/trucks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAvailableTrucks(response.data);
    } catch (err) {
      toast.error('Failed to fetch available trucks');
      console.error('Error fetching trucks:', err);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const handleCancelClick = (order) => {
    setSelectedOrder(order);
    setShowCancellationForm(true);
    setShowAssignmentForm(false);
  };

  const handleConfirmClick = async (order) => {
    setSelectedOrder(order);
    setShowAssignmentForm(true);
    setShowCancellationForm(false);
    await Promise.all([fetchAvailableDrivers(), fetchAvailableTrucks()]);
  };

  const handleCancelSubmit = async (e) => {
    e.preventDefault();
    if (!cancellationReason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/admin/orders/${selectedOrder.id}/update-status`, {
        status: 'CANCELLED',
        reason: cancellationReason
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success('Order cancelled successfully');
      setShowCancellationForm(false);
      setCancellationReason('');
      setSelectedOrder(null);
      fetchPendingOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel order');
      console.error('Error cancelling order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDriver || !selectedTruck) {
      toast.error('Please select both a driver and a truck');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');

      // First assign driver to truck
      await axios.put(`${API_BASE_URL}/admin/trucks/${selectedTruck.id}/assign-driver`, {
        driverId: selectedDriver.id,
        truckId: selectedTruck.id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Then update order status
      await axios.put(`${API_BASE_URL}/admin/orders/${selectedOrder.id}/update-status`, {
        status: 'IN_TRANSIT',
        truckNumber: selectedTruck.truckNumber
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success('Order confirmed and driver assigned successfully');
      setShowAssignmentForm(false);
      setSelectedDriver(null);
      setSelectedTruck(null);
      setSelectedOrder(null);
      fetchPendingOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to confirm order');
      console.error('Error confirming order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Data handling for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = pendingOrders.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size={50} color="#4A90E2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
        <button 
          onClick={() => fetchPendingOrders()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (pendingOrders.length === 0) {
    return (
      <div>
        <h1 className='text-xl lg:text-4xl font-bold text-primary mb-8'>Confirmation Orders</h1>
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No pending orders waiting for confirmation.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-xl lg:text-4xl font-bold text-primary mb-8'>Confirmation Orders</h1>
      
      {/* Cancellation Form Modal */}
      {showCancellationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Cancel Order</h2>
            <form onSubmit={handleCancelSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Cancellation Reason</label>
                <textarea
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows="4"
                  required
                  placeholder="Enter reason for cancellation"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCancellationForm(false);
                    setCancellationReason('');
                    setSelectedOrder(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                >
                  {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assignment Form Modal */}
      {showAssignmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Order</h2>
            <form onSubmit={handleConfirmSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Driver</label>
                <select
                  value={selectedDriver?.id || ''}
                  onChange={(e) => {
                    const driver = availableDrivers.find(d => d.id === e.target.value);
                    setSelectedDriver(driver);
                  }}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select a driver</option>
                  {availableDrivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.phoneNumber}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Truck</label>
                <select
                  value={selectedTruck?.id || ''}
                  onChange={(e) => {
                    const truck = availableTrucks.find(t => t.id === e.target.value);
                    setSelectedTruck(truck);
                  }}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select a truck</option>
                  {availableTrucks.map((truck) => (
                    <option key={truck.id} value={truck.id}>
                      {truck.truckNumber} - {truck.model}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignmentForm(false);
                    setSelectedDriver(null);
                    setSelectedTruck(null);
                    setSelectedOrder(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[12px] md:text-[14px] text-primary h-16">
              <th className="text-left py-6 px-4">Company</th>
              <th className="text-left py-6 px-4">ID</th>
              <th className="text-left py-6 px-4">Origin</th>
              <th className="text-left py-6 px-4"></th>
              <th className="text-left py-6 px-4">Destination</th>
              <th className="text-center py-6 px-4">Weight</th>
              <th className="text-right py-6 px-4">Price</th>
              <th className="text-center py-6 px-4">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white p-2">
            {paginatedData.map((order, index) => (
              <tr key={order.id || index} className="border-b hover:bg-gray-50 cursor-pointer">
                <td className="py-6 px-4 text-left font-medium truncate">
                  {order.user?.company || order.user?.name || "Unknown"}
                </td>
                <td className="py-6 px-4 text-left text-gray-700 truncate">
                  #{order.id || `ORDER-${index}`}
                </td>
                <td className="py-6 px-4 text-left text-gray-700 truncate">
                  {order.origin?.address || order.pickup_loc || "N/A"}
                </td>
                <td className="py-6 px-4 text-center">
                  <ArrowRight className="w-5 h-5 text-[#2e3192] inline-block" />
                </td>
                <td className="py-6 px-4 text-left text-gray-700 truncate">
                  {order.destination?.address || order.delivery_loc || "N/A"}
                </td>
                <td className="py-6 px-4 text-center">
                  <span className="text-[#2e3192] font-bold text-2xl">
                    {order.weight || 0}
                  </span>
                  <span className="text-gray-500 text-sm"> t</span>
                </td>
                <td className="py-6 px-4 text-right text-gray-700">
                  {order.price ? `MAD ${parseFloat(order.price).toLocaleString()}` : "N/A"}
                </td>
                <td className="py-6 px-4 text-center">
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => handleCancelClick(order)}
                      className="p-2 text-[#fb3748] border border-[#fb3748] rounded-md hover:bg-red-50 transition-colors"
                      title="Cancel Order"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleConfirmClick(order)}
                      className="p-2 text-[#20b950] border border-[#20b950] rounded-md hover:bg-green-50 transition-colors"
                      title="Confirm Order"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pendingOrders.length > itemsPerPage && (
        <div className="mt-6 pb-4">
          <Pagination 
            currentPage={currentPage}
            totalItems={pendingOrders.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ConfirmationOrderAdmin;