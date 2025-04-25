import React, { useState } from 'react';
import { ChevronDown } from "lucide-react";
import { GiCash } from "react-icons/gi";
import { BsCreditCard2BackFill } from "react-icons/bs";

const NewOrderFullCoverageMain = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="px-6 mt-12 h-full flex flex-col">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-16">
        <span className="text-[#2e3192]">Full</span> <span className="text-[#00b4d8]">Coverage</span>
      </h1>

      {/* Amount selector */}
      <div className="border-2 mx-auto w-90 lg:w-120 lg:h-20 border-[#2e3192] rounded-lg p-3 flex items-center mb-12">
        <div className="flex items-center text-[#2e3192] text-xl font-semibold">
          <span>Dh</span>
          <ChevronDown className="h-6 w-6 ml-1" />
        </div>
        <div className="text-[#ea4335] w-full text-center text-2xl font-semibold">
          <h2>15,000.00 Dh</h2>
        </div>
      </div>

      {/* Payment options */}
      <div className="grid grid-cols-2 lg:mx-20 gap-4 md:gap-8 lg:gap-16 my-16">
        <div
          className={`bg-white rounded-xl p-6 shadow-lg flex flex-col md:flex-row items-center cursor-pointer md:gap-4 ${
            selectedOption === "cash" ? "ring-2 ring-[#2e3192]" : ""
          }`}
          onClick={() => setSelectedOption("cash")}
        >
          <div className="w-6 h-6 rounded-full border-2 border-gray-300 self-start mb-4">
            {selectedOption === "cash" && <div className="w-4 h-4 bg-[#2e3192] rounded-full m-0.5"></div>}
          </div>
          <div className="w-16 h-16 text-[#2e3192] mb-4 flex items-center justify-center">
            <GiCash className="w-12 h-12" />
          </div>
          <div className="text-center">
            <h2 className="text-[#2e3192] text-xl font-semibold">
              Cash on <span className="text-[#00b4d8]">delivery</span>
            </h2>
          </div>
        </div>

        <div
          className={`bg-white rounded-xl p-6 shadow-lg flex flex-col md:flex-row items-center cursor-pointer md:gap-4 ${
            selectedOption === "card" ? "ring-2 ring-[#2e3192]" : ""
          }`}
          onClick={() => setSelectedOption("card")}
        >
          <div className="w-6 h-6 rounded-full border-2 border-gray-300 self-start mb-4">
            {selectedOption === "card" && <div className="w-4 h-4 bg-[#2e3192] rounded-full m-0.5"></div>}
          </div>
          <div className="w-16 md:w-20 h-16 text-[#2e3192] mb-4 flex items-center justify-center">
            <BsCreditCard2BackFill className="w-12 h-12" />
          </div>
          <div className="text-center">
            <h2 className="text-[#2e3192] text-xl font-semibold">
              Pay with <span className="text-[#00b4d8]">card</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderFullCoverageMain;