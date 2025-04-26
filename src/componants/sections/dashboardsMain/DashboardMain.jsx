import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import CountDev from '../Count';
import Summary from '../Summary';
import LastOrders from '../LastOrders';
import ShippingDetails from '../ShipipingDetails'; // Fixed typo
import DashboardHeader from '../../../componants/ui/DashboardHeader';

import { Plus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

const DashboardMain = () => {
  const [count, setCount] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    user: null,
    lastDelivered: null,
    recentShipped: null,
    lastOrders: [],
    totalOrders: 0,
    statusCounts: {},
    statusPercentages: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch dashboard data when component mounts
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setDashboardData(response.data);
        
        // Set count based on whether there are orders
        if (response.data.lastOrders && response.data.lastOrders.length > 0) {
          setCount(1);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Determine if we have a recent shipping to display
  const hasRecentShipping = dashboardData.recentShipped !== null;

  return (
    <div className="space-y-2 md:space-y-3 w-full p-4 md:p-0">
      {/* Header */}
      <DashboardHeader h1="Dashboard" />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading dashboard data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      ) : (
        /* Main Content Area */
        <div className="space-y-2 md:space-y-3 w-full">
          {/* Mobile View */}
          <div className="flex items-center justify-between py-0.5 md:hidden space-x-3 h-[100px]">
            {/* Recent Shipping */}
            <div className={`bg-indigo-800 text-white p-2 rounded-xl w-[60%] h-full ${hasRecentShipping ? 'block' : 'hidden'}`}>
              <div className="flex justify-between items-center mb-2 space-x-1">
                <h3 className="font-bold text-[10px]">Recent Shipping</h3>
                <span className="bg-white text-primary rounded-full text-[6px] px-1 py-0.5">
                  #{dashboardData.recentShipped?.id || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="flex items-center font-semibold text-sm">
                    {new Date(dashboardData.recentShipped?.createdAt).getDate() || '--'}{' '}
                    <span className="font-light text-xs ml-1">
                      {dashboardData.recentShipped ? new Date(dashboardData.recentShipped.createdAt).toLocaleString('default', { month: 'short' }) : 'N/A'}
                    </span>
                  </p>
                  <p className="font-medium text-[6px]">
                    {dashboardData.recentShipped ? new Date(dashboardData.recentShipped.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                  </p>
                </div>
                <div className="space-y-[2px]">
                  <div>
                    <p className="font-light text-[6px]">{dashboardData.recentShipped?.destinationCountry || 'N/A'}</p>
                  </div>
                  <div>
                    <div className="flex items-end space-x-1">
                      <p className="text-lg font-bold">{dashboardData.recentShipped?.distance || '0'}</p>
                      <p className="text-[6px] font-light">Km</p>
                    </div>
                    <p className="text-[6px] text-gray-300">Relative distance</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Create Delivery Button */}
            <Link to='/new-order'>
              <div className={`bg-white border border-dashed border-indigo-800 rounded-xl p-2 flex flex-col items-center justify-center text-center ${hasRecentShipping ? 'w-[40%]' : 'w-full'} h-full`}>
                <button
                  className="bg-indigo-800 text-white p-1 rounded-full cursor-pointer font-bold"
                  onClick={() => setCount(count + 1)}
                >
                  <Plus size={13} />
                </button>
                <p className="text-indigo-800 text-[6px]">Create a new delivery</p>
              </div>
            </Link>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center py-1 space-x-3 h-fit w-full justify-between">
            {/* Recent Shipping */}
            <div className={`bg-indigo-800 text-white p-2 lg:p-4 rounded-xl w-1/2 lg:w-1/3 h-[130px] ${hasRecentShipping ? 'block' : 'hidden'}`}>
              <div className="flex justify-between items-center mb-1 lg:mb-2">
                <h3 className="font-bold">Recent Shipping</h3>
                <span className="bg-white text-primary rounded-full text-[10px] lg:text-xs px-2 py-1">
                  #{dashboardData.recentShipped?.id || 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="mb-2 lg:mb-4">
                  <p className="text-[10px] lg:text-sm">Destination</p>
                  <p className="font-bold text-sm lg:text-lg">{dashboardData.recentShipped?.destinationCountry || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-4xl font-bold">{dashboardData.recentShipped?.distance || '0'}</p>
                  <p className="text-[10px] lg:text-sm text-gray-300">Relative distance / Km</p>
                </div>
              </div>
            </div>
            {/* Create Delivery Button */}
            <div className={`bg-white border border-dashed border-indigo-800 rounded-xl flex flex-col items-center justify-center ${hasRecentShipping ? 'w-1/2 lg:w-2/3' : 'w-full'} h-[130px] `}>
              <Link to='/new-order' className='flex flex-col items-center justify-center'>
                <button
                  className="bg-indigo-800 text-white p-2 rounded-full mb-2 cursor-pointer"
                  onClick={() => setCount(count + 1)}
                >
                  <Plus size={20} />
                </button>
                <p className="text-indigo-800 text-sm">
                  Create a new delivery
                </p>
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="md:grid-cols-2 md:grid lg:grid-cols-3 space-y-4 md:space-y-0 md:gap-2 lg:gap-4">
            <ShippingDetails 
              count={hasRecentShipping ? 'block' : 'hidden'} 
              data={{
                statusCounts: dashboardData.statusCounts || {},
                statusPercentages: dashboardData.statusPercentages || {}
              }}
            />
            <Summary totalOrders={dashboardData.totalOrders} />
            {/* <CountDev /> */}
            <LastOrders 
              count={dashboardData.lastOrders?.length > 0 ? 'block' : 'hidden'} 
              orders={dashboardData.lastOrders || []}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMain;