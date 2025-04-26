import React, { useState } from 'react';
import { PiPackageLight ,PiPackage ,PiPackageDuotone ,PiPackageFill } from "react-icons/pi";

const NewOrderMain = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const icons = [
    {icon:<PiPackageLight size={150} />, shepment:'(1000kg - 5000kg)', isSelected: selectedIndex === 0},
    {icon:<PiPackage size={150} />, shepment:'(5000kg - 10000kg)', isSelected: selectedIndex === 1},
    {icon:<PiPackageDuotone size={150} />, shepment:'(10000kg - 15000kg)', isSelected: selectedIndex === 2},
    {icon:<PiPackageFill size={150} />, shepment:'(15000kg - 28800kg)', isSelected: selectedIndex === 3},
  ];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="my-6 text-center">
        <h3 className="text-primary font-semibold text-[20px] md:text-[40px] lg:text-[55px]">
          What are you sending <span className="text-[#00B4D8]">today</span>?
        </h3>
      </div>

      <div className="grid grid-col md:grid-cols-2 items-center justify-center gap-4 md:gap-6 lg:gap-12 mt-10">
        {icons.map((item, index) => {
          const isSelected = item.isSelected;
          return (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-[285px] h-[269px] p-6 rounded-sm flex flex-col items-center justify-center mt-4 border shadow-md transition duration-300 ease-in-out cursor-pointer
                ${isSelected ? 'bg-[#00B4D8] border-[#0077b6] text-white' : 'border-gray-300 hover:bg-[#90e0ef] hover:border-[#00b4d8] hover:text-[#0077b6] hover:scale-105'}
              `}
            >
              <div className='w-full h-full flex items-center justify-center text-secondaire'>
                {item.icon}
              </div>
              <div className="flex flex-col items-center justify-center text-[27px] font-semibold">
                <h4>{isSelected ? <span className="text-white">Shepment</span> : <span className="text-[#00B4D8]">Shipment</span>}</h4>
                <p className={`text-[18px] font-normal ${isSelected ? 'text-white' : 'text-primary'}`}>{item.shepment}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewOrderMain;
