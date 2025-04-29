import React from 'react';
import { Truck, FileWarning } from 'lucide-react';
import { FaCheck } from 'react-icons/fa6';

const Summary = ({ dashboardData }) => {
  // Get the count for each status or default to 0
  const inTransitCount = dashboardData?.IN_TRANSIT || 0;
  const deliveredCount = dashboardData?.DELIVERED || 0;
  const pendingCount = dashboardData?.PENDING || 0;
  const canceledCount = dashboardData?.CANCELED || 0;

  return (
    <div className="bg-white p-4 rounded-xl lg:col-start-3">
      <h2 className="text-lg font-bold text-indigo-800 mb-4">Summary</h2>
      
      <div className="space-y-3">
        <div className="bg-primary text-white p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center">
            <Truck size={20} className="mr-2" />
            <span className='text-[14px]'>On the Road</span>
          </div>
          <span className="bg-white text-indigo-800 px-3 py-1 rounded-lg font-bold">{inTransitCount}</span>
        </div>
        
        <div className="bg-secondaire text-white p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center">
            <FaCheck size={20} className="mr-2" />
            <span className='text-[14px]'>Delivered</span>
          </div>
          <span className="bg-white text-indigo-800 px-3 py-1 rounded-lg font-bold">{deliveredCount}</span>
        </div>

          <div className="bg-red-500 text-white p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
              <FileWarning size={20} className="mr-2" />
              <span className='text-[14px]'>Canceled</span>
            </div>
            <span className="bg-white text-indigo-800 px-3 py-1 rounded-lg font-bold">{canceledCount}</span>
          </div>

      </div>
    </div>
  );
};

export default Summary;