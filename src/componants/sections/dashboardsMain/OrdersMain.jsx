import React, { useEffect, useState } from "react";
import { Package } from "lucide-react";

import { getOrders } from "../../../api/api.js";
import DashboardHeader from "../../../componants/ui/DashboardHeader.jsx";

const OrdersMain = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map the status to the appropriate color
  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-secondaire";
      case "IN_TRANSIT":
        return "bg-primary";
      case "PENDING":
        return "bg-yellow-500";
      case "CANCELED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Format the status display
  const formatStatus = (status) => {
    switch (status) {
      case "DELIVERED":
        return "Delivered";
      case "IN_TRANSIT":
        return "On the road";
      case "PENDING":
        return "Pending";
      case "CANCELED":
        return "Canceled";
      default:
        return status;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.orders || []);
      } catch (error) {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Prepare orders for display
  const displayOrders =
    orders.length > 0
      ? orders.map((order) => ({
          id: order.id ? `#${order.id}` : "#N/A",
          from: order.pickup_loc || "N/A",
          to: order.delivery_loc || "N/A",
          weight: order.weight || "0",
          status: formatStatus(order.tracking?.status || "PENDING"),
          statusColor: getStatusColor(order.tracking?.status || "PENDING"),
        }))
      : [
          {
            id: "No Orders",
            from: "N/A",
            to: "N/A",
            weight: "0",
            status: "No orders available",
            statusColor: "bg-gray-500",
          },
        ];

  return (
    <div className="space-y-2 md:space-y-3 w-full p-4 md:p-0">
      <DashboardHeader h1="Orders" />
      {displayOrders.length === 1 && displayOrders[0].id === "No Orders" ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-3">
          {displayOrders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-1 md:p-4 rounded-xl flex items-center justify-between shadow-md"
            >
              <div className="flex items-center">
                <div className="p-2 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                  <Package size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[10px] md:text-[16px]">
                    {order.id}
                  </p>
                  <div className="flex items-center text-secondaire text-[10px] md:text-sm">
                    <span>{order.from}</span>
                    <span className="mx-1 md:mx-2">→</span>
                    <span>{order.to}</span>
                  </div>
                </div>
              </div>
              <div className="md:flex items-center justify-between">
                <div className="text-xl md:text-3xl font-bold text-indigo-800 mr-8">
                  {order.weight}
                  <span className="text-[12px] md:text-[15px] text-secondaire">
                    t
                  </span>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-2 md:w-3 h-2 md:h-3 ${order.statusColor} rounded-full mr-1 md:mr-2`}
                  ></div>
                  <span className="text-[10px] md:text-sm">{order.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersMain;