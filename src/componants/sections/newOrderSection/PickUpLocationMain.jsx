import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import cityData from '../../../ma.json';

const PickUpLocationMain = ({ formData, handleChange, handleCitySelect }) => {
  const navigate = useNavigate();
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCities, setShowCities] = useState(false);
  const cityInputRef = useRef(null);

  // Function to handle input change and filter cities
  const handleInputChange = (e) => {
    // Call the parent handleChange function
    handleChange(e);

    const { name, value } = e.target;
    if (name === 'city') {
      const filtered = cityData.filter(city => 
        city.city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      
      setFilteredCities(filtered);
      setShowCities(filtered.length > 0);
    }
  };

  // Function to handle city selection
  const onCitySelect = (city) => {
    console.log('City selected in PickUpLocation:', city);
    
    // Create a synthetic event to pass to the parent handleChange
    const syntheticEvent = {
      target: {
        name: 'city',
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

  // Function to navigate to the next page
  const handleNext = () => {
    navigate('/new-order/delivery');
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

          <div className="relative" ref={cityInputRef}>
            <label className="block text-[#00b4d8] text-lg md:text-xl mb-4 text-center">City / Town</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              onFocus={() => setShowCities(filteredCities.length > 0)}
              className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
          
          {/* Next Button */}
          <div className="md:col-span-2 mt-8">
            <button
              onClick={handleNext}
              className="block w-full md:w-64 mx-auto py-3 font-medium rounded-md text-center bg-primary text-white hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PickUpLocationMain.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCitySelect: PropTypes.func,
};

export default PickUpLocationMain;