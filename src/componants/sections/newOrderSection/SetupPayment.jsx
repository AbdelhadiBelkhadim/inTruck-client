import React, { useState } from 'react'
import { ArrowUpToLine, ChevronDown, ArrowLeft } from "lucide-react";
import Logo from '../../../assets/IT.png';
import { Link } from 'react-router-dom';

const SetupPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  return (
    <div className='bg-[#F2F2F2] w-full min-h-screen container mx-auto'>

      <div className='w-full h-full flex flex-col items-center justify-center'>
        {/* Main Content */}
        <div className="px-6 py-8 w-full max-w-3xl">
          <h1 className="text-[20px] md:text-3xl font-bold text-center mb-12">
            <span className="text-primary">Setup your </span>
            <span className="text-[#00b4d8]">Payment Method</span>
          </h1>

          {/* Form Fields */}
          <div className="space-y-8">
            {/* Cardholder Name Field */}
            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
              />
            </div>

            {/* Payment Method Field */}
            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Payment Method</label>
              <div className="flex items-center mb-1">
                <div className="relative w-full">
                  <button
                    className="flex items-center justify-between w-full px-4 py-2 text-left border-b border-primary focus:outline-none"
                    onClick={() => {}}
                  >
                    <span>{paymentMethod}</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card Number Field */}
            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
              />
            </div>

            {/* Expiry and CVV Fields */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[#00b4d8] text-[16px] md:text-lg mb-4">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-2 py-2 bg-transparent border-b border-primary focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[#00b4d8] md:text-lg mb-4">CVV</label>
                <input
                  type="text"
                  className="w-full px-2 py-2 bg-transparent border-b border-primary focus:outline-none"
                  placeholder="123"
                />
              </div>
            </div>
          
            <button className='bg-primary text-white text-[12px] md:text-[24px] px-4 py-2 rounded-sm hover:bg-[#00B4D8] transition duration-300 ease-in-out w-[124px] h-[28px] md:w-[367px] md:h-[53px] flex items-center justify-center my-20 mx-auto'>
              Complete Payment
            </button>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-6 right-6">
          <button className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
            <ArrowUpToLine className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SetupPayment
