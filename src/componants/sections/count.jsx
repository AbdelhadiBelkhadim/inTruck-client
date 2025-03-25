import React from "react";

const Countdev = () => {
  return (
    <div className="flex md:items-center lg:items-end justify-between md:py-5 lg:py-8 md:px-3 relative bg-white rounded-[28px] border border-solid border-[#d9d9d9] lg:col-start-3 lg:order-last">
      <div className="text-center w-[49%] p-2">
        <h5 className="md:text-[14px] lg:text-[18px]">Signed deliveries</h5>
        <span className="flex items-center justify-center">
          <p className="md:text-[60px] lg:text-[70px] text-primary font-bold">25</p>
        </span>
      </div>
      <div className="w-[1px] h-full bg-gray-300 "></div>
      <div className="text-center w-[49%] p-2">
        <h5 className="md:text-[14px] lg:text-[18px]">Total Loads</h5>
        <span className="flex items-center justify-center">
          <p className="md:text-[60px] lg:text-[70px] text-primary font-bold">31</p>
        </span>
      </div>
    </div>
  );
};


export default Countdev ;