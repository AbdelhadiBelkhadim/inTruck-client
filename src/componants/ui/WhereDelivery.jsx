import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cityData from '../../ma.json';

const WhereDelivery = ({ formData, handleChange, handleCitySelect }) => {
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCities, setShowCities] = useState(false);
  const cityInputRef = useRef(null);

  const handleChangeWithAutocomplete = (e) => {
    // Call the parent handleChange function
    handleChange(e);

    const { name, value } = e.target;
    if (name === 'deliveryCity') {
      const filtered = cityData.filter(city => 
        city.city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      
      setFilteredCities(filtered);
      setShowCities(filtered.length > 0);
    }
  };

  const onCitySelect = (city) => {
    console.log('City selected in WhereDelivery:', city);
    
    // Create a synthetic event to pass to the parent handleChange
    const syntheticEvent = {
      target: {
        name: 'deliveryCity',
        value: city.city
      }
    };
    handleChange(syntheticEvent);
    setShowCities(false);
    
    // Call the parent handleCitySelect function to update coordinates
    if (handleCitySelect) {
      console.log('Calling handleCitySelect with coordinates:', { lat: parseFloat(city.lat), lng: parseFloat(city.lng) });
      handleCitySelect(city);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cityInputRef.current && !cityInputRef.current.contains(event.target)) {
        setShowCities(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              name="deliveryPostcode"
              value={formData.deliveryPostcode || ''}
              onChange={handleChange}
              className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Address</label>
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress || ''}
              onChange={handleChange}
              className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
            />
          </div>

          {/* Address 2 and City */}
          <div>
            <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Address 2 (Optional)</label>
            <input
              type="text"
              name="deliveryAddress2"
              value={formData.deliveryAddress2 || ''}
              onChange={handleChange}
              className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
            />
          </div>

          <div className="relative" ref={cityInputRef}>
            <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">City / Town</label>
            <input
              type="text"
              name="deliveryCity"
              value={formData.deliveryCity || ''}
              onChange={handleChangeWithAutocomplete}
              onFocus={() => setShowCities(filteredCities.length > 0)}
              className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
            />
            {showCities && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {filteredCities.map((city, index) => (
                  <div 
                    key={index} 
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onCitySelect(city)}
                  >
                    {city.city}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Receiver Name and Phone */}
          <div>
            <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Name of Receiver</label>
            <input
              type="text"
              name="receiverName"
              value={formData.receiverName || ''}
              onChange={handleChange}
              className="w-full px-2 py-2 text-gray-400 bg-transparent border-b border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Receiver Phone Number</label>
            <input
              type="tel"
              name="receiverPhone"
              value={formData.receiverPhone || ''}
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
  handleCitySelect: PropTypes.func,
};

export default WhereDelivery;