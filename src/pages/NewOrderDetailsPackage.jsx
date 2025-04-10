import React, { useState } from 'react';
import Logo from '../assets/IT.png';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpToLine } from "lucide-react";

const NewOrderDetailsPackage = () => {
  const [packageContents, setPackageContents] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className='bg-[#F2F2F2] w-full min-h-screen container mx-auto'>
      {/* Navigation Header */}
      <div className="flex justify-between px-3 py-2">
        <button className="flex items-center text-[#00b4d8]">
          <ArrowLeft className="w-6 h-6 text-primary" />
          <span className="ml-1 text-lg font-medium underline">Back</span>
        </button>
        <Link to="/">
          <div id='/' className={`hidden md:flex items-center justify-center`}>
            <img src={Logo} className='w-15 h-15'/>
            <h1 className={`md:text-2xl text-primary font-bold ${open}`}>InTruck</h1>
          </div>
        </Link>
        <button className="text-primary text-lg font-medium underline">Cancel Order</button>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 md:mt-8">
        <h1 className="text-3xl font-bold text-center mb-16">
          <span className="text-[#2e3192]">What is in the </span>
          <span className="text-[#00b4d8]">package</span>
          <span className="text-[#2e3192]"> ?</span>
        </h1>

        {/* Form Fields */}
        <div className="space-y-16 text-center">
          {/* Package Contents Field */}
          <div className=''>
            <label className="block text-[#00b4d8] text-xl mb-4">What is in the package ?</label>
            <input
              type="text"
              value={packageContents}
              onChange={(e) => setPackageContents(e.target.value)}
              className="w-full px-2 py-2 bg-transparent border-b border-[#2e3192] focus:outline-none"
            />
          </div>

          {/* Additional Note Field */}
          <div>
            <label className="block text-[#00b4d8] text-xl mb-4">Additional Note (Optional)</label>
            <input
              type="text"
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
              placeholder="Any special instructions"
              className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-[#2e3192] focus:outline-none"
            />
          </div>
        </div>

        {/* Next Button */}
        <button className='bg-primary text-white text-[12px] md:text-[24px] px-4 py-2 rounded-sm hover:bg-[#00B4D8] transition duration-300 ease-in-out w-[124px] h-[28px] md:w-[367px] md:h-[53px] flex items-center justify-center my-20 mx-auto'>
          Next
        </button>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={scrollToTop}
          className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
        >
          <ArrowUpToLine className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default NewOrderDetailsPackage;