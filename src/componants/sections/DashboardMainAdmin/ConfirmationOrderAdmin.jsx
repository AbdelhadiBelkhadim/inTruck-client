import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText, Check, X } from "lucide-react";
import Pagination from "../../ui/Pagination";
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner';

const API_BASE_URL = 'https://intruck-backend-production.up.railway.app';

const ConfirmationOrderAdmin = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);

  const fetchPendingOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token is missing. Please log in again.');
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/tracking`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Pending orders data:', response.data);
      setPendingOrders(response.data);
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

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const handleConfirmOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token is missing.');
        return;
      }

      await axios.post(`${API_BASE_URL}/admin/orders/${orderId}/confirm`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Refresh the orders list after confirmation
      fetchPendingOrders();
    } catch (err) {
      console.error('Error confirming order:', err);
      alert(`Failed to confirm order: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication token is missing.');
        return;
      }

      await axios.post(`${API_BASE_URL}/admin/orders/${orderId}/cancel`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Refresh the orders list after cancellation
      fetchPendingOrders();
    } catch (err) {
      console.error('Error canceling order:', err);
      alert(`Failed to cancel order: ${err.response?.data?.message || 'Unknown error'}`);
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
                  {order.origin?.address || "N/A"}
                </td>
                <td className="py-6 px-4 text-center">
                  <ArrowRight className="w-5 h-5 text-[#2e3192] inline-block" />
                </td>
                <td className="py-6 px-4 text-left text-gray-700 truncate">
                  {order.destination?.address || "N/A"}
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
                      onClick={() => handleCancelOrder(order.id)}
                      className="p-2 text-[#fb3748] border border-[#fb3748] rounded-md hover:bg-red-50 transition-colors"
                      title="Cancel Order"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleConfirmOrder(order.id)}
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