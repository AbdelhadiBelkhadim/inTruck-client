import React, { useState, useEffect } from 'react';
import Table from '../../ui/Table';
import SearchBarWithFilter from '../../ui/SearchBarWithFilter';
import DashboardHeader from '../../ui/DashboardHeader';
import { getTrackingOrders } from '../../../api/api';
import { MapPin, Truck, Clock, Package } from 'lucide-react';

const TrackingMain = () => {
  const [trackingOrders, setTrackingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch tracking orders from API
  useEffect(() => {
    const fetchTrackingOrders = async () => {
      try {
        setLoading(true);
        const data = await getTrackingOrders();
        
        if (data && data.trackingOrders) {
          // Transform the API data into the format needed for the table
          const formattedOrders = data.trackingOrders.map(order => {
            // Extract price with multiple fallbacks
            return {
              id: order.id,
              destination: order.deliveryLocation || order.delivery_loc,
              state: order.status,
              totalCoverage: `${order.price}.00 Dh`,
              price: order.price,
              truckId: order.truck?.id || 'Not assigned',
              createdAt: new Date(order.createdAt).toLocaleDateString(),
              trackingDetails: {
                status: order.tracking?.status || 'PENDING',
                currentLocation: order.tracking?.currentLocation || 'Not available',
                estimatedDelivery: order.tracking?.estimatedDelivery ? 
                  new Date(order.tracking.estimatedDelivery).toLocaleDateString() : 'Not available',
                lastUpdated: order.tracking?.updatedAt ? 
                  new Date(order.tracking.updatedAt).toLocaleDateString() : 'Not available',
                price: order.price
              }
            };
          });
          
          console.log('Formatted tracking orders:', formattedOrders);
          setTrackingOrders(formattedOrders);
          setTableData(formattedOrders);
        }
      } catch (err) {
        console.error('Error fetching tracking orders:', err);
        if (err.response?.status === 404) {
          setTrackingOrders([]); // Set empty array for 404 (no orders found)
        } else {
          setError('Failed to load tracking data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingOrders();
  }, []);

  useEffect(() => {
    if (trackingOrders.length > 0) {
      let filtered = [...trackingOrders];
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(item => 
          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.destination.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply state filter
      if (filterState !== 'all') {
        filtered = filtered.filter(item => item.state === filterState);
      }
      
      setTableData(filtered);
    }
  }, [searchTerm, filterState, trackingOrders]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate paginated data
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (state) => {
    setFilterState(state);
  };

  const TrackingDetails = ({ order }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Order #{order.id}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          order.state === 'On the road' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {order.state}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-indigo-800 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-medium">{order.destination}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Truck className="h-5 w-5 text-indigo-800 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Truck ID</p>
              <p className="font-medium">{order.truckId}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Package className="h-5 w-5 text-indigo-800 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Coverage Distance</p>
              <p className="font-medium">{order.totalCoverage}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-indigo-800 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Current Location</p>
              <p className="font-medium">{order.trackingDetails.currentLocation}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-indigo-800 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-medium">{order.trackingDetails.estimatedDelivery}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-indigo-800 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">{order.trackingDetails.lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="font-medium">{order.createdAt}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-medium text-indigo-800">{order.trackingDetails.price}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      {/* Header */}
      <DashboardHeader h1="Tracking" />

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-200 h-40 rounded-xl"></div>
          ))}
        </div>
      ) : (
        <>
          <SearchBarWithFilter 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filterOptions={[
              { value: 'all', label: 'All States' },
              { value: 'On the road', label: 'On the road' },
              { value: 'Processing', label: 'Processing' }
            ]}
          />
          
          {trackingOrders.length === 0 ? (
            <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <Truck className="h-8 w-8 text-indigo-800" />
              </div>
              <h3 className="font-bold text-lg mb-2">No tracking orders found</h3>
              <p className="text-gray-500 mb-4">You don't have any active shipments in transit or pending.</p>
              <a href="/new-order" className="bg-indigo-800 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150">
                Create a new delivery
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Mobile view: cards */}
              <div className="md:hidden space-y-4">
                {paginatedData.map((order) => (
                  <TrackingDetails key={order.id} order={order} />
                ))}
              </div>
              
              {/* Desktop view: table */}
              <div className="hidden md:block">
                <Table 
                  data={paginatedData}
                  onPageChange={handlePageChange}
                  totalItems={tableData.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrackingMain;
