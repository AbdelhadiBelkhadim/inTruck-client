import React, { useState } from 'react';
import { ChevronDown } from "lucide-react";

const NewOrderDetailsMain = () => {
  const [heightUnit, setHeightUnit] = useState('Cm');
  const [widthUnit, setWidthUnit] = useState('Cm');
  const [weightUnit, setWeightUnit] = useState('Kg');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="px-6 py-8 w-full max-w-3xl">
        <h1 className="text-[20px] md:text-3xl font-bold text-center mb-12">
          <span className="text-primary">Provide more details about</span>
          <br className="lg:hidden" />
          <span className="text-primary">your </span>
          <span className="text-[#00b4d8]">Shipment</span>
          <span className="text-primary"> ?</span>
        </h1>

        {/* Form Fields */}
        <div className="space-y-8">
          {/* Height Field */}
          <div>
            <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Height of Package</label>
            <div className="flex items-center mb-1">
              <div className="relative w-24">
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-left border-b border-primary focus:outline-none"
                  onClick={() => {}}
                >
                  <span>{heightUnit}</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                placeholder={`Height in ${heightUnit}`}
                className="flex-1 ml-4 px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Width Field */}
          <div>
            <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Width of Package</label>
            <div className="flex items-center mb-1">
              <div className="relative w-24">
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-left border-b border-primary focus:outline-none"
                  onClick={() => {}}
                >
                  <span>{widthUnit}</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                placeholder={`Width in ${widthUnit}`}
                className="flex-1 ml-4 px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Weight and Quantity Fields */}
          <div className="flex gap-4">
            <div className="flex-1 w-[50%]">
              <label className="block text-[#00b4d8] text-[16px] md:text-lg mb-4">Weight of Package</label>
              <div className="flex items-center mb-1 border-b border-primary">
                <div className="relative w-24">
                  <button
                    className="flex items-center justify-between px-2 py-2 text-left focus:outline-none"
                    onClick={() => {}}
                  >
                    <span>{weightUnit}</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Weight"
                  className="flex-1 px-2 py-2 text-gray-400 placeholder:text-left bg-transparent focus:outline-none"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-[#00b4d8] md:text-lg mb-4">Quantity</label>
              <input
                type="integer"
                className="w-full px-2 py-2 bg-transparent border-b border-primary focus:outline-none"
                placeholder=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderDetailsMain;