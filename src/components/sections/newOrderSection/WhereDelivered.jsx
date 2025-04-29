import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import cityData from '../../../ma.json';
import { ArrowUpToLine, ArrowLeft } from "lucide-react";
// import NewOrderHeader from '../components/ui/NewOrderHead';

const WhereDelivered = ({ formData, handleChange, handleCitySelect }) => {
  const navigate = useNavigate();
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCities, setShowCities] = useState(false);
  const cityInputRef = useRef(null);

  // Function to handle input change and filter cities
  const handleInputChange = (e) => {
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

  // Function to handle city selection
  const onCitySelect = (city) => {
    console.log('City selected in WhereDelivered:', city);
    
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

  // Function to navigate to the next page
  const handleNext = () => {
    navigate('/new-order/coverage');
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
    <div className='bg-[#F2F2F2] w-full min-h-screen container  mx-auto'>
      {/* Navigation Header */}
      

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
            <div className="md:col-span-2">
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Enter Postcode</label>
              <input
                type="text"
                name="deliveryPostcode"
                value={formData.deliveryPostcode}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Address</label>
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Address 2 and City */}
            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Address 2 (Optional)</label>
              <input
                type="text"
                name="deliveryAddress2"
                value={formData.deliveryAddress2}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="relative" ref={cityInputRef}>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">City / Town</label>
              <input
                type="text"
                name="deliveryCity"
                value={formData.deliveryCity}
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

            {/* Receiver Name and Phone */}
            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Name of Receiver</label>
              <input
                type="text"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Receiver Phone Number</label>
              <input
                type="tel"
                name="receiverPhone"
                value={formData.receiverPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-8">
            <button
              onClick={handleNext}
              className="block w-full md:w-64 mx-auto py-3 font-medium rounded-md text-center bg-primary text-white hover:bg-blue-700 transition-colors"
            >
              Next
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

WhereDelivered.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCitySelect: PropTypes.func
};

export default WhereDelivered
