import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData } from '../../../api/api.js'

import Summary from '../Summary';
import LastOrders from '../LastOrders';
import ShippingDetails from '../ShipipingDetails'; // Fixed typo
import DashboardHeader from '../../../componants/ui/DashboardHeader';
import LoadingSpinner from '../../../componants/LoadingSpinner.jsx'
import Count from '../count.jsx';

import { Plus } from 'lucide-react';

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
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await getDashboardData();
        setDashboardData(response);

        if (response.lastOrders && response.lastOrders.length > 0) {
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

  const distance = Math.floor(dashboardData.lastOrders[0]?.shipment_range || 0);
  const hasRecentShipping = dashboardData.recentShipped !== null;

  return (
    <div className="space-y-2 md:space-y-3 w-full p-4 md:p-0">
      {/* Header */}
      <DashboardHeader h1="Dashboard" />

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner size={50} color="#4A90E2" />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      ) : (
        /* Main Content Area with SCROLLING */
        <div className="space-y-2 md:space-y-3 w-full h-[calc(100vh-100px)] overflow-y-auto pr-2">
          {/* Mobile View */}
          <div className="flex items-center justify-between py-0.5 md:hidden space-x-3 h-[100px]">
            {/* Recent Shipping */}
            <div className={`bg-indigo-800 text-white p-2 rounded-xl w-[60%] h-full ${hasRecentShipping ? 'block' : 'hidden'}`}>
              <div className="flex justify-between items-center mb-2 space-x-1">
                <h3 className="font-bold text-[10px]">Recent Shipping</h3>
                <span className="bg-white text-primary rounded-full text-xs px-1 py-0.5">
                  #{dashboardData.lastOrders[0]?.id || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="flex items-center font-semibold text-sm">
                    {new Date(dashboardData.lastOrders[0]?.createdAt).getDate() || '--'}{' '}
                    <span className="font-light text-xs ml-1">
                      {dashboardData.lastOrders[0] ? new Date(dashboardData.lastOrders[0].createdAt).toLocaleString('default', { month: 'short' }) : 'N/A'}
                    </span>
                  </p>
                  <p className="font-medium text-[6px]">
                    {dashboardData.lastOrders[0] ? new Date(dashboardData.lastOrders[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                  </p>
                </div>
                <div className="space-y-[2px]">
                  <div>
                    <p className="font-light text-xs">{dashboardData.lastOrders[0]?.destinationCountry || 'N/A'}</p>
                  </div>
                  <div>
                    <div className="flex items-end space-x-1">
                      <p className="text-sm font-bold">{distance || '0'}</p>
                      <p className="text-xs font-light">Km</p>
                    </div>
                    <p className="text-xs text-gray-300">Relative distance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Delivery Button */}
            <Link className='w-full h-full' to='/new-order'>
              <div className="bg-white border border-dashed border-indigo-800 rounded-xl p-2 flex flex-col items-center justify-center text-center w-full h-full">
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
                <span className="bg-white text-primary rounded-full text-xs lg:text-xs px-2 py-1">
                  #{dashboardData.lastOrders[0]?.id || 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="mb-2 lg:mb-4">
                  <p className="text-[10px] font-bold lg:text-sm">Destination</p>
                  <p className="text-xs lg:text-xs">{dashboardData.lastOrders[0]?.delivery_loc || 'N/A'}</p>
                </div>
                
              </div>
            </div>

            {/* Create Delivery Button */}
            <div className={`bg-white border border-dashed border-indigo-800 rounded-xl flex flex-col items-center justify-center ${hasRecentShipping ? 'w-1/2 lg:w-2/3' : 'w-full'} h-[130px]`}>
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
              data={dashboardData}
            />
            <Summary dashboardData={dashboardData} />
            <LastOrders 
              count={dashboardData.lastOrders?.length > 0 ? 'block' : 'hidden'} 
              orders={dashboardData.lastOrders || []}
            />
            <Count />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMain;
