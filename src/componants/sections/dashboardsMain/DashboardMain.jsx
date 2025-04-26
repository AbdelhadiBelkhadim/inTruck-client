import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// import CountDev from '../Count';/
import Summary from '../Summary';
import LastOrders from '../LastOrders';
import ShippingDetails from '../ShipipingDetails'; // Fixed typo
import DashboardHeader from '../../ui/DashboardHeader';

import { Plus, User } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUserData(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-full rounded-xl"></div>;
  }

  if (!userData) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-center space-x-2">
          <User className="text-gray-400" />
          <p className="text-gray-400">User profile not available</p>
        </div>
      </div>
    );
  }

  const isCompany = userData.userType === 'COMPANY';
  const name = isCompany 
    ? userData.company?.companyName 
    : userData.individual?.fullName;
  const address = isCompany 
    ? userData.company?.address 
    : userData.individual?.address;
  const phone = userData.phone || 'No phone specified';
  const email = userData.email || 'No email specified';

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-bold text-lg mb-3">User Profile</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="bg-indigo-800 text-white rounded-full p-2 h-10 w-10 flex items-center justify-center font-bold">
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <p className="font-medium">{name || 'Unknown User'}</p>
            <p className="text-xs text-gray-500">{isCompany ? 'Company' : 'Individual'}</p>
          </div>
        </div>
        <div className="space-y-1 pt-2">
          <p className="text-sm"><span className="font-medium">Email:</span> {email}</p>
          <p className="text-sm"><span className="font-medium">Phone:</span> {phone}</p>
          {address && <p className="text-sm"><span className="font-medium">Address:</span> {address}</p>}
        </div>
        <div className="pt-2">
          <Link to="/profile" className="text-indigo-800 text-sm font-medium">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

const DashboardMain = () => {
  const location = useLocation();
  const [count, setCount] = React.useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Check if the user was redirected from order creation
  useEffect(() => {
    if (location.state?.fromOrderCreation) {
      setShowSuccess(true);
      // Hide the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Removed unused function

  return (
    <div className="space-y-2 md:space-y-3 w-full p-4 md:p-0">
      {/* Success notification */}
      {showSuccess && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded shadow-sm animate-fade-in">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Your order has been successfully created! Our team will process it shortly.
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <DashboardHeader h1="Dashboard" />
      {/* Main Content Area */}
        <div className="space-y-2 md:space-y-3 w-full">
          {/* Mobile View */}
          <div className="flex items-center justify-between py-0.5 md:hidden space-x-3 h-[100px]">
            {/* Recent Shipping */}
            <div className={`bg-indigo-800 text-white p-2 rounded-xl w-[60%] h-full ${count === 0 ? 'hidden' : 'block'}`}>
              <div className="flex justify-between items-center mb-2 space-x-1">
                <h3 className="font-bold text-[10px]">Recent Shipping</h3>
                <span className="bg-white text-primary rounded-full text-[6px] px-1 py-0.5">
                  #FS54BDF45
                </span>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="flex items-center font-semibold text-sm">
                    04 <span className="font-light text-xs ml-1">Mar</span>
                  </p>
                  <p className="font-medium text-[6px]">10:20 AM</p>
                </div>
                <div className="space-y-[2px]">
                  <div>
                    <p className="font-light text-[6px]">Senegal</p>
                  </div>
                  <div>
                    <div className="flex items-end space-x-1">
                      <p className="text-lg font-bold">1859</p>
                      <p className="text-[6px] font-light">Km</p>
                    </div>
                    <p className="text-[6px] text-gray-300">Relative distance</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Create Delivery Button */}
            <Link to='/new-order'>
              <div className={`bg-white border border-dashed border-indigo-800 rounded-xl p-2 flex flex-col items-center justify-center text-center ${count === 0 ? 'w-full' : 'w-[40%]'} h-full`}>
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
            <div className={`bg-indigo-800 text-white p-2 lg:p-4 rounded-xl w-1/2 lg:w-1/3 h-[130px] ${count === 0 ? 'hidden' : 'block'}`}>
              <div className="flex justify-between items-center mb-1 lg:mb-2">
                <h3 className="font-bold">Recent Shipping</h3>
                <span className="bg-white text-primary rounded-full text-[10px] lg:text-xs px-2 py-1">
                  #FS54BDF45
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="mb-2 lg:mb-4">
                  <p className="text-[10px] lg:text-sm">Destination</p>
                  <p className="font-bold text-sm lg:text-lg">Senegal</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-4xl font-bold">1859</p>
                  <p className="text-[10px] lg:text-sm text-gray-300">Relative distance / Km</p>
                </div>
              </div>
            </div>
            {/* Create Delivery Button */}
            <div className={`bg-white border border-dashed border-indigo-800 rounded-xl flex flex-col items-center justify-center ${count === 0 ? 'w-full' : 'w-1/2 lg:w-2/3'} h-[130px] `}>
              <Link to='/new-order' className='flex flex-col items-center justify-center'>
                <button
                  className={`bg-indigo-800 text-white p-2 rounded-full ${open ? 'mb-2' : 'mb-0'} cursor-pointer`}
                  onClick={() => setCount(count + 1)}
                >
                  <Plus size={20} />
                </button>
                <p className={`text-indigo-800 text-sm ${open ? 'flex' : 'hidden'}`}>
                  Create a new delivery
                </p>
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="md:grid-cols-2 md:grid lg:grid-cols-3 space-y-4 md:space-y-0 md:gap-2 lg:gap-4">
            <UserProfile />
            <ShippingDetails count={count === 0 ? 'hidden' : 'block'} />
            <Summary />
            {/* <CountDev /> */}
            <LastOrders count={count === 0 ? 'hidden' : 'block'} />
          </div>
        </div>
    </div>
  );
};

export default DashboardMain;
