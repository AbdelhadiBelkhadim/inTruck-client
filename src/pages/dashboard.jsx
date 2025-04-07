import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MdLogout, MdMenu } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

import SideBar from '../componants/sections/sideBar';
import Logo from '../componants/ui/logo';
import TrackingMain from '../componants/sections/dashboardsMain/trackingMain';
import DashboardMain from '../componants/sections/dashboardsMain/DashboardMain'; // Import DashboardMain
import CargoMain from '../componants/sections/dashboardsMain/cargoMain'; // Import CargoMain
import HistoryMain from '../componants/sections/dashboardsMain/historyMain'; // Import HistoryMain
import DEliveriesMain from '../componants/sections/dashboardsMain/deliveriesMain'
import NotificationMain from '../componants/sections/dashboardsMain/notificationsMain'

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-[#F2F2F2] w-full h-full">
      <div className="lg:container space-y-2 md:space-y-4 lg:space-y-6">
        <header className="flex item-center justify-between p-2 shadow-b-md bg-white md:bg-transparent">
          <div className="md:hidden burgerMenu flex items-center justify-center px-2 py-1 rounded-md bg-primary text-white">
            <MdMenu size={20} />
          </div>
          <Logo logoWith={`w-[30px] md:w-auto`} open={`${open ? 'flex' : 'hidden'}`} />
          <div className="hidden md:flex items-center justify-center">
            <h1 className="text-4xl text-primary font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="profile md:hidden bg-primary rounded-lg flex items-center justify-between p-1">
              <div className="w-[15px] h-[15px] bg-secondaire rounded-[33px] flex items-center justify-center">
                <div className="font-normal text-white text-[7px] tracking-[0] leading-[normal] flex items-center justify-center">
                  OU
                </div>
              </div>
              <IoIosArrowDown className="text-white text-[12px]" />
            </div>
            <a href="" className="">
              <MdLogout className="text-lg md:text-3xl text-primary md:flex" />
            </a>
          </div>
        </header>
        <main className="flex gap-4 md:space-x-4 px-2">
          {/* Sidebar */}
          <div className="hidden md:flex">
            <SideBar open={open} setOpen={setOpen} />
          </div>
          {/* Main Content Area */}
          <div className="space-y-2 md:space-y-3 w-full p-4 md:p-0">
            <Routes>
              <Route path="/" element={<DashboardMain />} /> {/* Default DashboardMain */}
              <Route path="tracking" element={<TrackingMain />} /> {/* TrackingMain */}
              <Route path="cargo" element={<CargoMain />} /> {/* CargoMain */}
              <Route path="history" element={<HistoryMain />} /> {/* HistoryMain */}
              <Route path="deliveries" element={<DEliveriesMain />} /> {/* DeliveriesMain */}
              <Route path="notifications" element={<NotificationMain />} /> {/* NotificationsMain */}
              {/* Add other routes here */}
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;