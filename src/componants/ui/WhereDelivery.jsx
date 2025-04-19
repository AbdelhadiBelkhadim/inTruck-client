import React from 'react';
import PropTypes from 'prop-types';

const WhereDelivery = ({ formData, handleChange }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="px-6 py-8 w-full max-w-3xl">
        <h1 className="text-[20px] md:text-2xl font-bold text-center mb-12">
          <span className="text-primary">Where is the </span>
          <span className="text-[#00b4d8]">package</span>
          <span className="text-primary"> being delivered to?</span>
        </h1>

        {/* Form Fields */}
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-4">
          {/* Postcode */}
          <div>
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
          <div>
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
      </div>
    </div>
  );
};

WhereDelivery.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default WhereDelivery;