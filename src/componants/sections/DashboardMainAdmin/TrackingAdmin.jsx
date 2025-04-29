import React, { useState, useEffect } from 'react';
import SearchBar from '../../ui/SearchBar';
import FilterMenu from '../../ui/FilterMenu';
import TableAdmin from '../../ui/TableAdmin';
import Pagination from '../../ui/Pagination';
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner';
import { toast } from 'react-toastify';
import { ArrowRight } from 'lucide-react';

const API_BASE_URL = 'https://intruck-backend-production.up.railway.app';

const TrackingAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const itemsPerPage = 6;

  const fetchInTransitOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token is missing. Please log in again.');
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/in-transit`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Transform the data to match the table structure
      const transformedOrders = response.data.map(order => ({
        company: order.user?.company || order.user?.name || "Unknown",
        id: `#${order.orderId}`,
        destination: order.destination?.address || order.delivery_loc || "N/A",
        state: "On the road",
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
      console.error('Error fetching in-transit orders:', err);
      let errorMessage = 'Failed to load in-transit orders';
      
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
    fetchInTransitOrders();
  }, []);

  // Filter options for the tracking status
  const filterOptions = [
    { value: 'all', label: 'All States' },
    { value: 'On the road', label: 'On the Road' },
    { value: 'Loading', label: 'Loading' },
  ];

  // Filter the data based on search term and selected filter
  const filteredData = orders.filter(item => {
    const matchesSearch = 
      item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if(selectedFilter === 'all') return matchesSearch;
    return matchesSearch && item.state === selectedFilter;
  });

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Authentication token is missing. Please log in again.');
        return;
      }

      await axios.put(`${API_BASE_URL}/admin/orders/${orderId}/update-status`, {
        status: newStatus
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success(`Order status updated to ${newStatus}`);
      // Refresh the orders list
      await fetchInTransitOrders();
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setIsUpdating(false);
    }
  };

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
          onClick={() => fetchInTransitOrders()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-xl lg:text-4xl font-bold text-primary'>Tracking</h1>

      <div className='flex space-x-1 my-10 items-center'>
        <SearchBar onSearch={handleSearch} />
        <FilterMenu 
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
        />
      </div>

      {orders.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No in-transit orders found.</p>
        </div>
      ) : (
        <>
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
                  <th className="text-center py-6 px-4">Status</th>
                  <th className="text-center py-6 px-4">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white p-2">
                {paginatedData.map((order, index) => (
                  <tr key={order.id || index} className="border-b hover:bg-gray-50">
                    <td className="py-6 px-4 text-left font-medium truncate">
                      {order.company}
                    </td>
                    <td className="py-6 px-4 text-left text-gray-700 truncate">
                      {order.id}
                    </td>
                    <td className="py-6 px-4 text-left text-gray-700 truncate">
                      {order.origin}
                    </td>
                    <td className="py-6 px-4 text-center">
                      <ArrowRight className="w-5 h-5 text-[#2e3192] inline-block" />
                    </td>
                    <td className="py-6 px-4 text-left text-gray-700 truncate">
                      {order.destination}
                    </td>
                    <td className="py-6 px-4 text-center">
                      <span className="text-[#2e3192] font-bold text-2xl">
                        {order.weight}
                      </span>
                      <span className="text-gray-500 text-sm"> t</span>
                    </td>
                    <td className="py-6 px-4 text-right text-gray-700">
                      {order.totalCoverage ? `MAD ${parseFloat(order.totalCoverage).toLocaleString()}` : "N/A"}
                    </td>
                    <td className="py-6 px-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {order.state}
                      </span>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <div className="flex gap-2 justify-end">
                        <select
                          value=""
                          onChange={(e) => {
                            if (e.target.value) {
                              handleStatusUpdate(order.id.replace('#', ''), e.target.value);
                            }
                          }}
                          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          disabled={isUpdating}
                        >
                          <option value="">Update Status</option>
                          <option value="DELIVERED">Mark as Delivered</option>
                          <option value="CANCELLED">Cancel Order</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

export default TrackingAdmin;