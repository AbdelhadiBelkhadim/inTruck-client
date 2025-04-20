import React from 'react';
import PropTypes from 'prop-types';

const PickUpLocationMain = ({ formData, handleChange }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
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
      </div>
    </div>
  );
};

PickUpLocationMain.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PickUpLocationMain;