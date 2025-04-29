import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderAdminDashboard from '../components/ui/HeaderAdminDashboard';
// Import all your components
import MainAdmin from '../components/sections/DashboardMainAdmin/MainAdmin';
import DeliveriesAdmin from '../components/sections/DashboardMainAdmin/DeliveriesAdmin';
import CancelledAdmin from '../components/sections/DashboardMainAdmin/CancelledAdmin';
import ConfirmationOrderAdmin from '../components/sections/DashboardMainAdmin/ConfirmationOrderAdmin';
import AvailableDrivers from '../components/sections/DashboardMainAdmin/AvailableDrivers';
import TrucksActive from '../components/sections/DashboardMainAdmin/TrucksActive';
import Revenue from '../components/sections/DashboardMainAdmin/Revenue';
import AddNewDT from '../components/sections/DashboardMainAdmin/AddNewDT';
import TrackingAdmin from '../components/sections/DashboardMainAdmin/TrackingAdmin';

const DashboardAdmin = () => {
  return (
    <div className="min-h-screen bg-[#f2f2f2] p-4">
      <HeaderAdminDashboard />
      
      <main className="mt-6 bg-white p-6 rounded-lg">
        <Routes>
          <Route index element={<MainAdmin />} />
          <Route path="tracking" element={<TrackingAdmin />} />
          <Route path="deliveries" element={<DeliveriesAdmin />} />
          <Route path="cancelled" element={<CancelledAdmin />} />
          <Route path="confirmation-order" element={<ConfirmationOrderAdmin />} />
          <Route path="available-drivers" element={<AvailableDrivers />} />
          <Route path="trucks-active" element={<TrucksActive />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="add-new" element={<AddNewDT />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardAdmin;