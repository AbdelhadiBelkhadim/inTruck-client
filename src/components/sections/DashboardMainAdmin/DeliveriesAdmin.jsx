import React, { useState, useEffect } from 'react';
import SearchBar from '../../ui/SearchBar';
import TableAdmin from '../../ui/TableAdmin';
import Pagination from '../../ui/Pagination';
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://intruck-backend-production.up.railway.app';

const DeliveriesAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchDeliveredOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token is missing. Please log in again.');
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/orders/delivered`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Transform the data to match the table structure
      const transformedOrders = response.data.map(order => ({
        company: order.user?.company || order.user?.name || "Unknown",
        id: `#${order.id}`,
        destination: order.destination?.address || order.delivery_loc || "N/A",
        state: 'Delivered',
        totalCoverage: order.price || 0,
        // Add additional fields that might be needed
        origin: order.origin?.address || order.pickup_loc || "N/A",
        weight: order.weight || 0,
        truckNumber: order.truckNumber || "N/A",
        driverName: order.driver?.name || "N/A"
      }));

      setOrders(transformedOrders);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching delivered orders:', err);
      let errorMessage = 'Failed to load delivered orders';
      
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
    fetchDeliveredOrders();
  }, []);

  // Filter the data based on search term
  const filteredData = orders.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          onClick={() => fetchDeliveredOrders()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-xl lg:text-4xl font-bold text-primary mb-10'>Deliveries</h1>
      <div className='mb-8'>
        <SearchBar onSearch={setSearchTerm} />
      </div>

      {orders.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No delivered orders found.</p>
        </div>
      ) : (
        <>
          <TableAdmin 
            data={paginatedData}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          {filteredData.length > itemsPerPage && (
            <div className="mt-6">
              <Pagination 
                currentPage={currentPage}
                totalItems={filteredData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DeliveriesAdmin;