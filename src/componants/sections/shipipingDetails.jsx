import React from 'react'
import { MoreVertical, Info } from 'lucide-react';

import TruckShipp from '../../assets/TruckShipp.png'


const ShippingDetails =() => {
    return (
        <div className="bg-white p-4 rounded-xl lg:col-span-2 md:col-span-2 relative">

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
                    <span className="bg-indigo-800 text-white px-2 py-1 rounded-lg text-sm">On the road</span>
                  </div>
                </div>

                <div className="bg-secondaire w-full h-[2px] md:hidden"></div>

                {/* Middle Section */}
                <div className="md:w-[33.33%] p-1 lg:p-3 md:border-x md:border-gray-200 h-[100%]">
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Order ID:</span>
                      <span className="font-bold">#FR156KL89K</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center text-[10px] md:text-[12px] lg:text-[13px]">
                        <div className="flex items-center space-x-3">
                          <div className=" text-gray-500">04 Mar</div>
                          <div className="flex items-center space-x-0.5">
                            <div className="w-3 h-3 bg-black rounded-full flex items-center justify-center"></div>
                            <div className="ml-2">Loading</div>
                          </div>
                        </div>
                        <div className="ml-auto">10:25 AM</div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className=" text-gray-500">05 Mar</div>
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

                <div className="bg-secondaire w-full h-[2px] md:hidden"></div>

                {/* Right Section */}
                <div className="md:w-[33.33%] p-1 lg:p-3">
                  <div className="">
                    <div className="flex items-center justify-between">
                      <h3 className="mb-1">Coverage</h3>
                      <button>
                        <Info size={16} />
                      </button>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex gap-2">
                        <span className="bg-secondaire text-white px-1 py-1 rounded-md text-[12px] ">Type C</span>
                        <span className="bg-primary text-white px-1 py-1 rounded-md text-[12px] ">Type D</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className='mt-[40%]'>
                    <h3>Full Coverage</h3>
                    <p className="text-3xl text-primary">15,000<span className="text-2xl">,00</span> <span className="text-secondaire text-2xl">Dh</span></p>
                  </div>
                </div>
              </div>
        </div>
    )
}

export default ShippingDetails;