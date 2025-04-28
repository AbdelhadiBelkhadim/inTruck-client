import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiPackageLight, PiPackage, PiPackageDuotone, PiPackageFill } from "react-icons/pi";

const NewOrderMain = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const packageWeights = [
    { min: 1000, max: 5000 },
    { min: 5000, max: 10000 },
    { min: 10000, max: 15000 },
    { min: 15000, max: 28800 }
  ];

  const icons = [
    {icon:<PiPackageLight size={150} />, shipment:'(1000kg - 5000kg)'},
    {icon:<PiPackage size={150} />, shipment:'(5000kg - 10000kg)'},
    {icon:<PiPackageDuotone size={150} />, shipment:'(10000kg - 15000kg)'},
    {icon:<PiPackageFill size={150} />, shipment:'(15000kg - 28800kg)'},
  ];

  const handlePackageSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      // Get the weight range from the selected package
      const packageWeight = packageWeights[selectedIndex];
      
      // Save to sessionStorage for the next step
      sessionStorage.setItem('orderDetails', JSON.stringify({
        packageSize: selectedIndex,
        packageWeight: (packageWeight.min + packageWeight.max) / 2,
      }));
      
      navigate('/new-order/package');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="my-6 text-center">
        <h3 className="text-primary font-semibold text-[20px] md:text-[40px] lg:text-[55px]">
          What are you sending <span className="text-[#00B4D8]">today</span>?
        </h3>
      </div>

      <div className="grid grid-col md:grid-cols-2 items-center justify-center gap-4 md:gap-6 lg:gap-12 mt-10">
        {icons.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <div
              key={index}
              onClick={() => handlePackageSelect(index)}
              className={`w-[285px] h-[269px] p-6 rounded-sm flex flex-col items-center justify-center mt-4 border shadow-md transition duration-300 ease-in-out cursor-pointer
                ${isSelected ? 'bg-[#00B4D8] border-[#0077b6] text-white' : 'border-gray-300 hover:bg-[#90e0ef] hover:border-[#00b4d8] hover:text-[#0077b6] hover:scale-105'}
              `}
            >
              <div className='w-full h-full flex items-center justify-center text-secondaire'>
                {item.icon}
              </div>
              <div className="flex flex-col items-center justify-center text-[27px] font-semibold">
                <h4>{isSelected ? <span className="text-white">Shipment</span> : <span className="text-[#00B4D8]">Shipment</span>}</h4>
                <p className={`text-[18px] font-normal ${isSelected ? 'text-white' : 'text-primary'}`}>{item.shipment}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedIndex === null}
        className="mt-12 w-full max-w-md bg-primary text-white py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default NewOrderMain;
