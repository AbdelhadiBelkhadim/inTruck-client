import React from 'react'
import {  ArrowLeft } from "lucide-react";
import Logo from '../assets/IT.png';
import { Link } from 'react-router-dom';
import { FaShippingFast } from "react-icons/fa";

const CheckingOrder = () => {
  return (
    <div className='bg-[#F2F2F2] w-full min-h-screen container mx-auto'>
      {/* Navigation Header */}
      <div className="flex justify-between px-3 mb-10 py-2">
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
        <button className="text-primary text-lg font-medium underline">Cancel</button>
      </div>

      <div className='w-full h-full flex flex-col items-center justify-center '>
        {/* Main Content */}
        <div className="px-6 py-8 w-full max-w-3xl">
          <h1 className="text-[20px] md:text-3xl font-bold text-center mb-12">
            <span className="text-[#00b4d8]">Checking </span>
            <span className="text-primary">Order </span>
          </h1>

          <div className='mx-auto '>
          <FaShippingFast  className='text-primary mx-auto w-50 h-40'/>
          <div className="w-1/2 mx-auto my-8 flex h-2 rounded-full overflow-hidden">
        <div className="bg-[#2e3192] w-1/3 h-full"></div>
        <div className="bg-[#d9d9d9] w-2/3 h-full"></div>
      </div>
          </div>

         
      </div>
    </div>
    </div>
  )
}

export default CheckingOrder
