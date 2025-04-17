
import React from 'react';

import CountDev from '../count';
import Summary from '../summary';
import LastOrders from '../lastOrders';
import ShippingDetails from '../shipipingDetails'; // Fixed typo
import DashboardHeader from '../../../componants/ui/DashboardHeader';

import { Plus } from 'lucide-react';

const DashboardMain = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="space-y-2 md:space-y-3 w-full p-4 md:p-0">
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
            <div className={`bg-white border border-dashed border-indigo-800 rounded-xl p-2 flex flex-col items-center justify-center text-center ${count === 0 ? 'w-full' : 'w-[40%]'} h-full`}>
              <button
                className="bg-indigo-800 text-white p-1 rounded-full cursor-pointer font-bold"
                onClick={() => setCount(count + 1)}
              >
                <Plus size={13} />
              </button>
              <p className="text-indigo-800 text-[6px]">Create a new delivery</p>
            </div>
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
              <button
                className={`bg-indigo-800 text-white p-2 rounded-full ${open ? 'mb-2' : 'mb-0'} cursor-pointer`}
                onClick={() => setCount(count + 1)}
              >
                <Plus size={20} />
              </button>
              <p className={`text-indigo-800 text-sm ${open ? 'flex' : 'hidden'}`}>
                Create a new delivery
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="md:grid-cols-2 md:grid lg:grid-cols-3 space-y-4 md:space-y-0 md:gap-2 lg:gap-4">
            <ShippingDetails count={count === 0 ? 'hidden' : 'block'} />
            <Summary />
            <CountDev />
            <LastOrders count={count === 0 ? 'hidden' : 'block'} />
          </div>
        </div>
    </div>
  );
};

export default DashboardMain;