import React from 'react';
import CheckingOrderIcon from '../../assets/ArtBoard 2.png'; // Adjusted path if necessary

const CheckingOrderMain = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="px-6 py-8 w-full max-w-3xl">
        <h1 className="text-[20px] md:text-3xl font-bold text-center mb-12">
          <span className="text-[#00b4d8]">Checking </span>
          <span className="text-primary">Order</span>
        </h1>

        <div className="mx-auto">
          <img
            src={CheckingOrderIcon}
            alt="Checking Order Icon"
            className="text-primary mx-auto w-70 h-70"
          />
          <div className="w-1/2 mx-auto my-8 flex h-2 rounded-full overflow-hidden">
            <div className="bg-[#2e3192] w-1/3 h-full"></div>
            <div className="bg-[#d9d9d9] w-2/3 h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckingOrderMain;