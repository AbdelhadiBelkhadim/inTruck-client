import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const NewOrderDetailsPackageMain = ({ formData, handleChange }) => {
  const navigate = useNavigate();
  
  // Load saved package size from sessionStorage if available
  React.useEffect(() => {
    try {
      const savedDetails = sessionStorage.getItem('orderDetails');
      if (savedDetails) {
        const details = JSON.parse(savedDetails);
        // If we have package weight from previous step, set it
        if (details.packageWeight && !formData.weight) {
          handleChange({
            target: {
              name: 'weight',
              value: details.packageWeight / 1000 // Convert from kg to tons
            }
          });
        }
      }
    } catch (error) {
      console.error('Error loading saved package details:', error);
    }
  }, []);

  const handleNext = () => {
    navigate('/new-order/pickup');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="px-6 py-8 w-full max-w-3xl">
        <h1 className="text-[20px] md:text-3xl font-bold text-center mb-12">
          <span className="text-primary">Tell us more about </span>
          <span className="text-[#00b4d8]">your package</span>
        </h1>

        <div className="space-y-8">
          {/* Package Type */}
          <div className="md:col-span-2">
            <label className="block text-[#00b4d8] text-lg md:text-xl mb-4 text-center">Package Type</label>
            <select
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="standard">Standard</option>
              <option value="fragile">Fragile</option>
              <option value="liquid">Liquid</option>
              <option value="hazardous">Hazardous Materials</option>
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-[#00b4d8] text-lg md:text-xl mb-4 text-center">Weight (tons)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[#00b4d8] text-lg mb-2 text-center">Length (cm)</label>
              <input
                type="number"
                name="length"
                value={formData.length || ''}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-[#00b4d8] text-lg mb-2 text-center">Width (cm)</label>
              <input
                type="number"
                name="width"
                value={formData.width || ''}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-[#00b4d8] text-lg mb-2 text-center">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height || ''}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-[#00b4d8] text-lg md:text-xl mb-4 text-center">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity || '1'}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Fragile Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fragile"
              name="fragile"
              checked={formData.fragile || false}
              onChange={(e) => handleChange({
                target: {
                  name: 'fragile',
                  value: e.target.checked
                }
              })}
              className="w-5 h-5 text-primary border-2 border-primary rounded focus:ring-primary"
            />
            <label htmlFor="fragile" className="ml-2 text-gray-700">This package contains fragile items</label>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-[#00b4d8] text-lg md:text-xl mb-4 text-center">Package Description</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 text-gray-700 bg-white border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Describe what's inside your package..."
            ></textarea>
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
      </div>
    </div>
  );
};

NewOrderDetailsPackageMain.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default NewOrderDetailsPackageMain;