import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../ui/DashboardHeader';
import SearchBarWithFilter from '../../ui/SearchBarWithFilter';
import Table from '../../ui/Table';
import { getCancelledOrders } from '../../../api/api';
import { MapPin, Truck, Clock, Package, XCircle } from 'lucide-react';

const CancelledMain = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch cancelled orders from API
  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        setLoading(true);
        const data = await getCancelledOrders();
        
        if (data && data.cancelledOrders) {
          // Transform the API data into the format needed for the table
          const formattedOrders = data.cancelledOrders.map(order => {
            // Extract price with multiple fallbacks
            let priceDisplay = 'N/A';
            if (order.payment?.amount) {
              priceDisplay = `${order.payment.amount} ${order.payment.currency || 'DHM'}`;
            } else if (order.price) {
              priceDisplay = typeof order.price === 'object' 
                ? `${order.price.amount || order.price} ${order.price.currency || 'DHM'}`
                : `${order.price} DHM`;
            } else if (order.totalPrice) {
              priceDisplay = `${order.totalPrice} DHM`;
            }
            
            return {
              id: order.id,
              destination: order.deliveryLocation || order.delivery_loc,
              status: 'Cancelled',
              totalCoverage: `${order.distance || '0'} km`,
              price: priceDisplay,
              truckId: order.truck?.id || 'Not assigned',
              cancelledDate: order.tracking?.updatedAt ? new Date(order.tracking.updatedAt).toLocaleDateString() : 'Unknown',
              createdAt: new Date(order.createdAt).toLocaleDateString(),
              cancelDetails: {
                cancelledAt: order.tracking?.updatedAt ? new Date(order.tracking.updatedAt).toLocaleDateString() : 'Unknown',
                cancelReason: order.cancelReason || order.tracking?.notes || 'Not specified',
                pickupLocation: order.pickupLocation || order.pickup_loc || 'Not available',
                deliveryLocation: order.deliveryLocation || order.delivery_loc || 'Not available',
                price: priceDisplay
              }
            };
          });
          
          console.log('Formatted cancelled orders:', formattedOrders);
          setCancelledOrders(formattedOrders);
          setTableData(formattedOrders);
        }
      } catch (err) {
        console.error('Error fetching cancelled orders:', err);
        if (err.response?.status === 404) {
          setCancelledOrders([]); // Set empty array for 404 (no orders found)
        } else {
          setError('Failed to load cancelled orders data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCancelledOrders();
  }, []);

  useEffect(() => {
    if (cancelledOrders.length > 0) {
      let filtered = [...cancelledOrders];
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(item => 
          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.destination.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setTableData(filtered);
      setCurrentPage(1); // Reset to first page on search/filter change
    }
  }, [searchTerm, cancelledOrders]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Map data to include "state" field for Table component styling
  const mappedData = tableData.map(item => ({
    ...item,
    state: item.status
  }));

  const paginatedData = mappedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const CancelDetails = ({ order }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Order #{order.id}</h3>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          {order.status}
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
            <XCircle className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Cancelled On</p>
              <p className="font-medium">{order.cancelDetails.cancelledAt}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-indigo-800 mr-2" />
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="font-medium">{order.cancelDetails.pickupLocation}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-indigo-800 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">{order.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Cancellation Reason</p>
            <p className="font-medium">{order.cancelDetails.cancelReason}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-medium text-gray-600">{order.price}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <DashboardHeader h1="Cancelled Orders" />

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
            placeholder="Search by order ID or destination"
          />
          
          {cancelledOrders.length === 0 ? (
            <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">No cancelled orders found</h3>
              <p className="text-gray-500 mb-4">You don't have any cancelled deliveries.</p>
              <a href="/new-order" className="bg-indigo-800 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150">
                Create a new delivery
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Mobile view: cards */}
              <div className="md:hidden space-y-4">
                {paginatedData.map((order) => (
                  <CancelDetails key={order.id} order={order} />
                ))}
              </div>
              
              {/* Desktop view: table */}
              <div className="hidden md:block">
                <Table 
                  data={paginatedData}
                  totalItems={tableData.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CancelledMain;