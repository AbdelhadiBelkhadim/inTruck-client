import React, { useState } from 'react';
import HeaderAdminDashboard from '../componants/ui/HeaderAdminDashboard';
import { Package, Truck, Users } from 'lucide-react';
import MainAdmin from '../componants/sections/DashboardMainAdmin/MainAdmin';
import TrackingAdmin from '../componants/sections/DashboardMainAdmin/TrackingAdmin';
import DeliveriesAdmin from '../componants/sections/DashboardMainAdmin/DeliveriesAdmin';
import CancelledAdmin from '../componants/sections/DashboardMainAdmin/CancelledAdmin';
import SendMessageAdmin from '../componants/sections/DashboardMainAdmin/SendMessageAdmin';
import ConfirmationOrderAdmin from '../componants/sections/DashboardMainAdmin/ConfirmationOrderAdmin';
import AvailableDrivers from '../componants/sections/DashboardMainAdmin/AvailableDrivers';
import TrucksActive from '../componants/sections/DashboardMainAdmin/TrucksActive';
import Revenue from '../componants/sections/DashboardMainAdmin/Revenue';
import AddNewDT from '../componants/sections/DashboardMainAdmin/AddNewDT';

const DashboardAdmin = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [count] = useState(5); // Moved to main component
  const [statsData] = useState([
    {
      icon: Package,
      value: 12,
      title: 'Deliveries Today',
    },
    {
      icon: Truck,
      value: 8,
      title: 'Trucks Active',
    },
    {
      icon: Users,
      value: 14,
      title: 'Available Drivers',
    },
    {
      value: 100513.00,
      title: 'Revenue Today',
      currency: 'MAD'
    }
  ]);

  

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-4">
      <HeaderAdminDashboard activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
      
      <main className="mt-6 bg-white p-6 rounded-lg">
        {/*<MainAdmin statsData={statsData} count={count} />*/}
        {/*<TrackingAdmin  />*/}
        {/*<DeliveriesAdmin  />*/}
        {/*<CancelledAdmin  />*/}
        {/*<SendMessageAdmin  />*/}
        { /*<ConfirmationOrderAdmin />*/}
        {/*<AvailableDrivers  />*/}
        {/*<TrucksActive  />*/}
        {/*<Revenue  />*/}
        <AddNewDT />
      </main>

      
      
    </div>
  );
};

export default DashboardAdmin;