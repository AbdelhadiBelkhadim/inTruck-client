import React from 'react'
import { Truck ,FileWarning } from 'lucide-react';
import { FaCheck } from 'react-icons/fa6';

const Summary = () => {
    return (
        <div className="bg-white p-4 rounded-xl lg:col-start-3">
              <h2 className="text-lg font-bold text-indigo-800 mb-4">Summary</h2>
              
              <div className="space-y-3">
                <div className="bg-primary text-white p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center">
                    <Truck size={20} className="mr-2" />
                    <span className='text-[14px]'>On the Road</span>
                  </div>
                  <span className="bg-white text-indigo-800 px-3 py-1 rounded-lg font-bold">10</span>
                </div>
                
                <div className="bg-secondaire text-white p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center">
                    <FaCheck size={20} className="mr-2" />
                    <span className='text-[14px]'>Delivered</span>
                  </div>
                  <span className="bg-white text-indigo-800 px-3 py-1 rounded-lg font-bold">10</span>
                </div>

                <div className="bg-Accent text-white p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center">
                    <FileWarning size={20} className="mr-2" />
                    <span className='text-[14px]'>Accidents</span>
                  </div>
                  <span className="bg-white text-indigo-800 px-3 py-1 rounded-lg font-bold">10</span>
                </div>
            </div>
            </div>
    )
}

export default Summary