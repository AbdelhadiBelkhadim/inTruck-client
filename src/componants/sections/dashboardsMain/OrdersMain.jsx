import React, { useEffect, useState } from "react";
import { Package, ChevronRight, ChevronDown, Truck, Calendar, MapPin } from "lucide-react";
import { getOrders } from "../../../api/api.js";
import DashboardHeader from "../../../componants/ui/DashboardHeader.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const OrdersMain = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Map the status to the appropriate color
  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-secondaire';
      case 'IN_TRANSIT':
        return 'bg-primary';
      case 'CONFIRMED':
        return 'bg-blue-500';
      case 'PENDING':
        return 'bg-yellow-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Format the status display
  const formatStatus = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'Delivered';
      case 'IN_TRANSIT':
        return 'On the road';
      case 'CONFIRMED':
        return 'Confirmed';
      case 'PENDING':
        return 'Pending';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return status;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrders();
        setOrders(response.orders || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message || "Failed to fetch orders. Please try again later.");
        toast.error(error.message || "Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Toggle expanded order
  const toggleOrderDetails = (orderId, e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) return (
    <div className="w-full flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (error) return (
    <div className="w-full p-4 md:p-6 bg-red-100 border border-red-300 rounded-lg">
      <p className="text-red-700">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
      >
        Retry
      </button>
    </div>
  );

  // Use provided orders or empty array
  const displayOrders = orders.length > 0 ? orders.map(order => ({
    id: order.id || 'N/A',
    from: order.pickup_loc || 'N/A',
    to: order.delivery_loc || 'N/A',
    weight: order.weight || '0',
    status: formatStatus(order.tracking?.status || 'PENDING'),
    statusColor: getStatusColor(order.tracking?.status || 'PENDING'),
    date: formatDate(order.createdAt),
    // Additional fields for expanded view
    pickupAddress: order.pickup_address || 'Address not available',
    deliveryAddress: order.delivery_address || 'Address not available',
    estimatedDelivery: formatDate(order.estimated_delivery_date),
    trackingNumber: order.tracking?.tracking_number || 'Not assigned',
    notes: order.notes || 'No additional notes',
    rawData: order // Store the raw order data for any additional fields
  })) : [];

  return (
    <div className='space-y-2 md:space-y-3 w-full p-4 md:p-0'>
      <DashboardHeader h1="Orders" />
      {displayOrders.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <Package size={40} className="mx-auto mb-4 text-gray-400" />
          <p className="text-lg text-gray-600">No orders found.</p>
          <Link 
            to="/new-order" 
            className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition"
          >
            Create New Order
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {displayOrders.map((order, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              {/* Order summary row */}
              <div className="p-3 md:p-4 rounded-xl flex items-center justify-between">
                <Link 
                  to={`/orders/${order.id}`} 
                  className="flex-1 flex items-center"
                >
                  <div className="flex justify-between items-center">
                    <div className="p-2 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                      <Package size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[10px] md:text-[16px]">#{order.id}</p>
                      <div className="flex items-center text-secondaire text-[10px] md:text-sm">
                        <span>{order.from}</span>
                        <span className="mx-1 md:mx-2">→</span>
                        <span>{order.to}</span>
                      </div>
                      <div className="text-gray-500 text-[10px] md:text-xs mt-1">
                        {order.date}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center">
                  <div className="md:flex items-center justify-between">
                    <div className="text-xl md:text-2xl font-bold text-indigo-800 mr-4 md:mr-8">
                      {order.weight}
                      <span className="text-[12px] md:text-[15px] text-secondaire">kg</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 md:w-3 h-2 md:h-3 ${order.statusColor} rounded-full mr-1 md:mr-2`}></div>
                      <span className="text-[10px] md:text-sm">{order.status}</span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => toggleOrderDetails(order.id, e)}
                    className="ml-2 md:ml-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label={expandedOrderId === order.id ? "Hide details" : "Show details"}
                  >
                    {expandedOrderId === order.id ? (
                      <ChevronDown size={16} className="text-gray-600" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Expanded details section (visible when expanded) */}
              {expandedOrderId === order.id && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pickup Location */}
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <MapPin size={16} className="text-primary mr-2" />
                        <h3 className="font-medium">Pickup</h3>
                      </div>
                      <p className="text-sm text-gray-600">{order.pickupAddress}</p>
                    </div>
                    
                    {/* Delivery Location */}
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <MapPin size={16} className="text-secondaire mr-2" />
                        <h3 className="font-medium">Delivery</h3>
                      </div>
                      <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                    </div>
                    
                    {/* Estimated Delivery */}
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <Calendar size={16} className="text-blue-500 mr-2" />
                        <h3 className="font-medium">Estimated Delivery</h3>
                      </div>
                      <p className="text-sm text-gray-600">{order.estimatedDelivery}</p>
                    </div>
                    
                    {/* Tracking Info */}
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <Truck size={16} className="text-green-500 mr-2" />
                        <h3 className="font-medium">Tracking</h3>
                      </div>
                      <p className="text-sm text-gray-600">#{order.trackingNumber}</p>
                    </div>
                  </div>
                  
                  {/* Notes section */}
                  {order.notes !== 'No additional notes' && (
                    <div className="mt-4 bg-white p-3 rounded-lg shadow-sm">
                      <h3 className="font-medium mb-2">Notes</h3>
                      <p className="text-sm text-gray-600">{order.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersMain;