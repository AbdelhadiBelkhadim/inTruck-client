import React, { useState } from 'react';
import { Package, Truck, Users } from 'lucide-react';
import StatsCard from '../../ui/StatsCard';
import Summary from '../../sections/Summary';
import LastOrders from '../../sections/LastOrders';
import WatingConfirmation from '../../ui/WatingConfirmation';


const MainAdmin = () => {
  const [count] = useState(5);
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
      value: 100513.0,
      title: 'Revenue Today',
      currency: 'MAD',
    },
  ]);

  return (
    <div>
      <div>
        <h1 className="text-xl lg:text-3xl font-bold text-primary">Welcome, Admin</h1>
        <p className="mt-2 text-primary text-[11px] lg:text-[31px]">
          Here's what's happening today in your application
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            value={stat.value}
            title={stat.title}
            currency={stat.currency}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:flex md:flex-row-reverse md:gap-4 mt-4">
        <div className="md:flex-1">
          <Summary />
        </div>
        {count !== 0 && (
          <div className="md:flex-1">
            <LastOrders />
          </div>
        )}
      </div>

      <WatingConfirmation />
    </div>
  );
};

export default MainAdmin;
