import React from 'react'
import { MoreVertical, Info } from 'lucide-react';

import TruckShipp from '../../assets/TruckShipp.png'


const ShippingDetails =() => {
    return (
        <div className="bg-white p-4 rounded-xl lg:col-span-2 md:col-span-2 relative">

              <div className="flex justify-between mb-4">
                <h2 className="md:text-[25px] font-bold text-indigo-800">Shipping details</h2>
                <button>
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="flex-1 absolute top-10 right-20">
                      <img src={TruckShipp} alt="Truck" className="h-12 ml-auto" />
                </div>
              
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                  SA
                </div>
                <div>
                  <p className="font-bold">Said Azmour</p>
                  <p className="text-xs text-gray-500">Transportes inTruck, Ma</p>
                </div>
              </div>

              <div className="block md:flex items-start justify-between p-1 md:p-2 lg:p-4 md:space-x-2 space-y-2 md:space-y-0 border border-gray-200 rounded-2xl">
                {/* Left Section */}
                <div className="w-[32%] space-y-1 md:space-y-2 lg:space-y-3">

                  <div className="space-y-4">
                    <h3 className="font-medium text-[12px] md:text-[16px] lg:text-[16px]">Shipping Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500 text-[14px] font-medium">Exit</div>
                      <div className='text-[14px] font-semibold'>03/03/2025</div>
                      <div className="text-gray-500 text-[14px] font-medium">Arrival</div>
                      <div className='text-[14px] font-semibold'>15/03/2025</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Status</h3>
                    <span className="bg-indigo-800 text-white px-3 py-1 rounded-lg text-sm">On the road</span>
                  </div>
                </div>

                <div className="bg-gray-300 w-full h-[2px] md:w-[2px] md:h-full"></div>

                {/* Middle Section */}
                <div className="w-[32%]">
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Order ID:</span>
                      <span className="font-bold">#FR156KL89K</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-16 text-xs text-gray-500">04 Mar</div>
                        <div className="w-4 h-4 bg-indigo-800 rounded-full"></div>
                        <div className="ml-2">Loading</div>
                        <div className="ml-auto">10:25 AM</div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-16 text-xs text-gray-500">05 Mar</div>
                        <div className="w-4 h-4 border-2 border-indigo-800 bg-white rounded-full"></div>
                        <div className="ml-2">Exit</div>
                        <div className="ml-auto">12:25 AM</div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-16"></div>
                        <div className="w-4 h-4 border-2 border-gray-300 bg-white rounded-full"></div>
                        <div className="ml-2 text-gray-500">Arrival</div>
                        <div className="ml-auto text-gray-500">--:--</div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-16"></div>
                        <div className="w-4 h-4 border-2 border-gray-300 bg-white rounded-full"></div>
                        <div className="ml-2 text-gray-500">Download</div>
                        <div className="ml-auto text-gray-500">--:--</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-300 w-full h-[2px] md:w-[2px] md:h-full"></div>

                {/* Right Section */}
                <div className="w-[32%]">
                  <div className="flex items-center justify-between">
                    <h3 className="mb-1">Coverage</h3>
                    <button>
                      <Info size={16} />
                    </button>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex gap-2">
                      <span className="bg-cyan-500 text-white px-2 py-1 rounded-md text-sm">Type C</span>
                      <span className="bg-indigo-800 text-white px-2 py-1 rounded-md text-sm">Type D</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3>Full Coverage</h3>
                    <p className="text-2xl font-bold">15,000<span className="text-lg">,00</span> <span className="text-cyan-500">Dh</span></p>
                  </div>
                </div>
              </div>
        </div>
    )
}

export default ShippingDetails;