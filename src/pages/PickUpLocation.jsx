import React, { useState } from 'react'
import { ArrowUpToLine, ArrowLeft } from "lucide-react";
import Logo from '../assets/IT.png';
import { Link } from 'react-router-dom';

const PickUpLocation = () => {
  const [formData, setFormData] = useState({
    postcode: '',
    address: '',
    address2: '',
    city: '',
    contactName: '',
    contactPhone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
          <div className='hidden md:flex items-center justify-center'>
            <img src={Logo} alt="InTruck Logo" className='w-15 h-15'/>
            <h1 className='md:text-2xl text-primary font-bold'>InTruck</h1>
          </div>
        </Link>
        <button className="text-primary text-lg font-medium underline">Cancel Order</button>
      </div>

      <div className='w-full h-full flex flex-col items-center justify-center'>
        <div className="px-6 py-8 w-full max-w-3xl">
          <h1 className="text-[20px] md:text-3xl font-bold text-center mb-12">
            <span className="text-primary">Where is the </span>
            <span className="text-[#00b4d8]">pickup location</span>
            <span className="text-primary">?</span>
          </h1>

          {/* Form Fields */}
          <div className="space-y-8 md:grid md:grid-cols-2 md:gap-6">
            {/* Postcode */}
            <div className="md:col-span-2">
              <label className="block text-[#00b4d8] text-lg md:text-xl mb-4 text-center">Enter Postcode</label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-[#00b4d8] text-lg md:text-xl mb-4 text-center">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Address 2 and City */}
            <div>
              <label className="block text-[#00b4d8] text-lg md:text-xl mb-4 text-center">Address 2 (Optional)</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-[#00b4d8] text-lg md:text-xl mb-4 text-center">City / Town</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Contact Name and Phone */}
            <div>
              <label className="block text-[#00b4d8] text-lg md:text-xl mb-4 text-center">Contact Name</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-[#00b4d8] text-lg md:text-xl mb-4 text-center">Contact Phone Number</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button className='bg-primary text-white text-[12px] md:text-[24px] px-4 py-2 rounded-lg hover:bg-[#00B4D8] transition duration-300 ease-in-out w-[124px] h-[28px] md:w-[367px] md:h-[53px] flex items-center justify-center my-20 mx-auto shadow-md'>
            Next
          </button>
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-6 right-6">
          <button className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-[#00B4D8] transition-colors">
            <ArrowUpToLine className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PickUpLocation
