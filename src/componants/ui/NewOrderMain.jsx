import React, { useState } from 'react';
import { PiPackageDuotone } from "react-icons/pi";

const NewOrderMain = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="my-6 text-center">
        <h3 className="text-primary font-semibold text-[20px] md:text-[40px] lg:text-[55px]">
          What are you sending <span className="text-[#00B4D8]">today</span>?
        </h3>
      </div>

      <div className="grid grid-col md:grid-cols-2 items-center justify-center gap-4 md:gap-6 lg:gap-12 mt-10">
        {[...Array(4)].map((_, index) => {
          const isSelected = selectedIndex === index;
          return (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-[285px] h-[269px] p-6 rounded-sm flex flex-col items-center justify-center mt-4 border shadow-md transition duration-300 ease-in-out cursor-pointer
                ${isSelected ? 'bg-[#00B4D8] border-[#0077b6] text-white' : 'border-gray-300 hover:bg-[#90e0ef] hover:border-[#00b4d8] hover:text-[#0077b6] hover:scale-105'}
              `}
            >
              <PiPackageDuotone className={`w-[161px] h-[167px] ${isSelected ? 'text-white' : 'text-[#00B4D8]'}`} />
              <div className="flex flex-col items-center justify-center text-[27px] font-semibold">
                <h4>{isSelected ? <span className="text-white">Shipment</span> : <span className="text-[#00B4D8]">Shipment</span>}</h4>
                <p className={`text-[18px] font-normal ${isSelected ? 'text-white' : 'text-primary'}`}> (1000kg - 5000kg)</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewOrderMain;
