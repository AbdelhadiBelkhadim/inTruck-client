import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MdLogout, MdMenu } from "react-icons/md";
import Layout from '../layout/Layout'; // Import Layout component
import { SideBar, SideNavMenu } from '../componants/sections/SideBar';
import Logo from '../componants/ui/Logo';
import TrackingMain from '../componants/sections/dashboardsMain/TrackingMain';
import DashboardMain from '../componants/sections/dashboardsMain/DashboardMain'; // Import DashboardMain
import DeliveriesMain from '../componants/sections/dashboardsMain/DeliveriesMain';
import NotificationMain from '../componants/sections/dashboardsMain/NotificationsMain';
import Profile from './Profile';
import CancelledMain from '../componants/sections/dashboardsMain/CancelledMain';

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="w-full  min-h-screen bg-[#F2F2F2]">
      <div className="md:flex justify-between md:px-4 space-y-2 md:space-y-0 md:space-x-4 lg:space-x-6">
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-2 shadow-md bg-white md:bg-transparent md:hidden">
          <Logo open={`${open ? 'flex' : 'hidden'}`} />
          <div
            className="burgerMenu flex items-center justify-center px-2 py-1 rounded-md bg-primary text-white cursor-pointer"
            onClick={toggleMobileMenu}
          >
            <MdMenu size={20} />
          </div>
          <div className="hidden md:flex items-center justify-center">
            <h1 className="text-4xl text-primary font-bold">Dashboard</h1>
          </div>
        </header>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="relative h-full">
              <div className="absolute right-0 top-0 h-full w-4/5 bg-white shadow-xl animate-slide-in">
                <div className="p-4 flex justify-end">
                  <div
                    className="p-2 rounded-full bg-gray-100 cursor-pointer"
                    onClick={toggleMobileMenu}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <SideNavMenu onClick={toggleMobileMenu} />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:flex">
          <SideBar open={open} setOpen={setOpen} />
        </div>

        {/* Main Content Area */}
        <main className="w-full">
          <div className="space-y-2 md:space-y-3 w-full p-4 md:p-0">
            <Routes>
              <Route path="profile" element={<Profile />} />
              <Route index element={<DashboardMain />} /> {/* Default page at /dashboard */}
              <Route path="tracking" element={<TrackingMain />} /> {/* TrackingMain */}
              <Route path="deliveries" element={<DeliveriesMain />} /> {/* DeliveriesMain */}
              <Route path="cancelled" element={<CancelledMain />} /> {/* CancelledMain */}
              <Route path="notifications" element={<NotificationMain />} /> {/* NotificationsMain */}
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;