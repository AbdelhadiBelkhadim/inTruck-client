import React from 'react'
import { MoreVertical, Info } from 'lucide-react';

import TruckShipp from '../../assets/TruckShipp.png'


const ShippingDetails =({count}) => {
    return (
        <div className={`bg-white p-4 rounded-xl lg:col-span-2 md:col-span-2 relative ${count}`}>

              <div className="flex justify-between mb-4">
                <h2 className="md:text-[25px] font-bold text-primary">Shipping details</h2>
                <button>
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="flex-1 absolute top-10 right-6 sm:right-20">
                      <img src={TruckShipp} alt="Truck" className="h-8 md:h-12 ml-auto" />
                </div>
              
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-medium text-xs">
                  SA
                </div>
                <div>
                  <p className="font-bold">Said Azmour</p>
                  <p className="text-xs text-gray-500">Transportes inTruck, Ma</p>
                </div>
              </div>

              <div className="block md:flex justify-between md:space-x-2 space-y-2 md:space-y-0 border border-gray-200 rounded-2xl">
                {/* Left Section */}
                <div className="md:w-[33.33%] p-1 lg:p-3 space-y-1 md:space-y-2 lg:space-y-3">
                  <div className="space-y-4">
                    <h3 className="font-medium text-[12px] md:text-[10px] lg:text-[16px]">Shipping Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-[14px] md:text-[10px] lg:text-[14px]  ">
                      <div className="text-gray-500 font-medium">Exit</div>
                      <div className='font-semibold'>03/03/2025</div>
                      <div className="text-gray-500 font-medium">Arrival</div>
                      <div className='font-semibold'>15/03/2025</div>
                    </div>
                  </div>
                </div>
                <div className="bg-secondaire w-full h-[2px] md:hidden"></div>
                {/* Middle Section */}
                <div className="md:w-[33.33%] p-1 lg:p-3 md:border-x md:border-gray-200 h-[100%]">
                  <div className="mb-4">
                    <div className="flex md:block xl:flex justify-between mb-2 md:text-[12px] lg:text-[16px]">
                      <span>Order ID:</span>
                      <span className="font-bold">#FR156KL89K</span>
                    </div>
                    
                    <div>
                    <h3 className="font-medium mb-2">Status</h3>
                    <span className="bg-indigo-800 text-white px-2 py-1 rounded-lg text-sm">On the road</span>
                  </div>
                  </div>
                </div>
                <div className="bg-secondaire w-full h-[2px] md:hidden"></div>
                {/* Right Section */}
                <div className="md:w-[33.33%] p-1 lg:p-3">                  
                  <div className=''>
                    <h3>Full Coverage</h3>
                    <p className="text-3xl text-primary">15,000<span className="text-2xl">,00</span> <span className="text-secondaire text-2xl">Dh</span></p>
                  </div>
                </div>
              </div>
        </div>
    )
}

export default ShippingDetails;