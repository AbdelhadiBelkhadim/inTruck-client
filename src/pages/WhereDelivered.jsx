import React, { useState } from 'react'
import { ArrowUpToLine, ArrowLeft } from "lucide-react";
import Logo from '../assets/IT.png';
import { Link } from 'react-router-dom';

const WhereDelivered = () => {
  const [formData, setFormData] = useState({
    postcode: '',
    address: '',
    address2: '',
    city: '',
    receiverName: '',
    receiverPhone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='bg-[#F2F2F2] w-full min-h-screen container  mx-auto'>
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

      <div className='w-full h-full flex flex-col items-center justify-center'>
        {/* Main Content */}
        <div className="px-6 py-8 w-full max-w-3xl">
          <h1 className="text-[20px] md:text-2xl font-bold text-center mb-12">
            <span className="text-primary">Where is the </span>
            <span className="text-[#00b4d8]">package</span>
            <span className="text-primary"> being delivered to?</span>
          </h1>

          {/* Form Fields */}
          <div className="space-y-8 md:grid md:grid-cols-2 md:gap-4">
            {/* Postcode */}
            <div className="">
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Enter Postcode</label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
              />
            </div>

            {/* Address */}
            <div className="">
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
              />
            </div>

            {/* Address 2 and City */}
            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Address 2 (Optional)</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">City / Town</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
              />
            </div>

            {/* Receiver Name and Phone */}
            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Name of Receiver</label>
              <input
                type="text"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleChange}
                className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Receiver Phone Number</label>
              <input
                type="tel"
                name="receiverPhone"
                value={formData.receiverPhone}
                onChange={handleChange}
                className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
              />
            </div>
        </div>

        <button className='bg-primary text-white text-[12px] md:text-[24px] px-4 py-2 rounded-sm hover:bg-[#00B4D8] transition duration-300 ease-in-out w-[124px] h-[28px] md:w-[367px] md:h-[53px] flex items-center justify-center my-20 mx-auto'>
              Next
            </button>
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

export default WhereDelivered
