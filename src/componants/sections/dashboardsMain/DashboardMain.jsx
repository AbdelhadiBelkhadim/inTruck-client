import React from 'react';

import CountDev from '../count';
import Summary from '../summary';
import LastOrders from '../lastOrders';
import ShippingDetails from '../shipipingDetails';
import DashboardHeader from '../../../componants/ui/DashboardHeader';

import { Plus } from 'lucide-react';

const DashboardMain = () => {
  return (
    <div className="space-y-2 md:space-y-3 w-full p-4 md:p-0">
      {/* Header */}
      <DashboardHeader h1="Dashboard" />
      <div className="flex items-center justify-between py-1 md:hidden space-x-3 h-[100px]">
        {/* Recent Shipping*/}
        <div className={`bg-indigo-800 text-white p-2 rounded-xl w-[60%] h-full`}>
          <div className="flex justify-between items-center mb-1 space-x-1">
            <h3 className={`font-bold text-[10px]`}>Recent Shipping</h3>
            <span className={`bg-white text-primary rounded-full text-[8px] px-1 py-0.5`}>#FS54BDF45</span>
          </div>
          <div className="flex justify-between">
            <div className="">
              <p className="flex items-center font-semibold text-sm">04
                <p className="font-light text-xs">Mar</p>
              </p>
              <p className="font-medium text-[8px]">10:20 AM</p>
            </div>
            <div className="space-y-[3x]">
              <div className="">
                <p className="font-light text-[8px]">Senegal</p>
              </div>
              <div>
                <div className="flex items-end space-x-1">
                  <p className="text-xl font-bold">1859 </p>
                  <p className='text-[8px] font-light'>Km</p>
                </div>
                <p className="text-[8px] text-gray-300">Relative distance</p>
              </div>
            </div>
          </div>
        </div>
        {/* Create Delivery Button */}
        <div className={`bg-white border border-dashed border-indigo-800 rounded-xl p-2 flex flex-col items-center justify-center text-center w-[40%] h-full`}>
          <button className={`bg-indigo-800 text-white p-1 rounded-full cursor-pointer font-bold`}>
            <Plus size={13} />
          </button>
          <p className={`text-indigo-800 text-[6px]`}>Create a new delivery</p>
        </div>
      </div>
      <div className="hidden md:flex items-center py-1 space-x-3 h-fit w-full justify-between">
        {/* Recent Shipping */}
        <div className={`bg-indigo-800 text-white p-4 rounded-xl -1/2 lg:w-1/3 h-[130px]`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className={`font-bold ${open ? 'block' : 'hidden'}`}>Recent Shipping</h3>
            <span className={`bg-white text-primary rounded-full ${open ? 'text-xs px-2 py-1' : 'text-[11px] px-1.5 py-0.5'}`}>#FS54BDF45</span>
          </div>
          <div className="flex items-centeer justify-between">
            <div className="mb-4">
              <p className="text-sm">Destination</p>
              <p className="font-bold text-lg">Senegal</p>
            </div>
            <div>
              <p className="text-4xl font-bold">1859</p>
              <p className="text-sm text-gray-300">Relative distance / Km</p>
            </div>
            </div>
        </div>

        {/* Create Delivery Button */}
        <div className={`bg-white border border-dashed border-indigo-800 rounded-xl flex flex-col items-center justify-center w-1/2 lg:w-2/3 h-[130px]`}>
          <button className={`bg-indigo-800 text-white p-2 rounded-full ${open ? 'mb-2' : 'mb-0'} cursor-pointer`}>
            <Plus size={20} />
          </button>
          <p className={`text-indigo-800 text-sm ${open ? "flex" : "hidden"}`}>Create a new delivery</p>
        </div>
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