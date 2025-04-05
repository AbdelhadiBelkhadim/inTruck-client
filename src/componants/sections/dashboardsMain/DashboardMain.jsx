import React from 'react';
import CountDev from '../count';
import Summary from '../summary';
import LastOrders from '../lastOrders';
import ShippingDetails from '../shipipingDetails';

const DashboardMain = () => {
  return (
    <div className="space-y-2 md:space-y-3 w-full p-4 md:p-0">
      <div className="flex item-center justify-between">
        <h3 className="text-xl text-primary font-bold">Dashboard</h3>
      </div>
      <div className="md:grid-cols-2 md:grid lg:grid-cols-3 space-y-4 md:space-y-0 md:gap-2 lg:gap-4">
        {/* Shipping Details Card */}
        <ShippingDetails />

        {/* Summary Section */}
        <Summary />

        {/* CountDev Section */}
        <CountDev />

        {/* Last Orders Section */}
        <LastOrders />
      </div>
    </div>
  );
};

export default DashboardMain;
