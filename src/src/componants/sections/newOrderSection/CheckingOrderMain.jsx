import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckingOrderIcon from '../../../assets/Artboard2.png';

const CheckingOrderMain = ({ formData, isLoading, error, handleSubmit }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const formatPrice = (price) => {
    if (typeof price === 'string' && price.includes('dh')) {
      const match = price.match(/\d+/);
      return match ? match[0] + ' Dh' : '0 Dh';
    }
    return (Number(price) || 0).toFixed(2) + ' Dh';
  };

  const formatAddress = (address, address2 = '') => {
    return `${address}${address2 ? ', ' + address2 : ''}`;
  };

  // Payment method display text
  const paymentMethodText = formData.paymentMethod === 'card' 
    ? 'Online Payment' 
    : 'Cash on Delivery';

  const handleConfirmAndSubmit = () => {
    if (!isConfirmed) {
      setIsConfirmed(true);
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="w-full py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-8">
          <span className="text-primary">Review Your </span>
          <span className="text-[#00b4d8]">Order</span>
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">Shipment Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#00b4d8] mb-2">Pickup Information</h3>
              <p className="mb-1"><span className="font-medium">Address:</span> {formatAddress(formData.address, formData.address2)}</p>
              <p className="mb-1"><span className="font-medium">City:</span> {formData.city}</p>
              <p className="mb-1"><span className="font-medium">Postcode:</span> {formData.postcode}</p>
              <p className="mb-1"><span className="font-medium">Contact:</span> {formData.contactName}</p>
              <p className="mb-1"><span className="font-medium">Phone:</span> {formData.contactPhone}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#00b4d8] mb-2">Delivery Information</h3>
              <p className="mb-1"><span className="font-medium">Address:</span> {formatAddress(formData.deliveryAddress, formData.deliveryAddress2)}</p>
              <p className="mb-1"><span className="font-medium">City:</span> {formData.deliveryCity}</p>
              <p className="mb-1"><span className="font-medium">Postcode:</span> {formData.deliveryPostcode}</p>
              <p className="mb-1"><span className="font-medium">Recipient:</span> {formData.receiverName}</p>
              <p className="mb-1"><span className="font-medium">Phone:</span> {formData.receiverPhone}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">Package Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="mb-1"><span className="font-medium">Type:</span> {formData.packageType}</p>
              <p className="mb-1"><span className="font-medium">Weight:</span> {formData.weight} kg</p>
              <p className="mb-1"><span className="font-medium">Dimensions:</span> {formData.length}x{formData.width}x{formData.height} cm</p>
              <p className="mb-1"><span className="font-medium">Description:</span> {formData.description}</p>
              <p className="mb-1"><span className="font-medium">Fragile:</span> {formData.fragile ? 'Yes' : 'No'}</p>
            </div>
            
            <div>
              <p className="mb-1"><span className="font-medium">Distance:</span> {formData.distanceText || `${formData.distance} km`}</p>
              <p className="mb-1"><span className="font-medium">Estimated Duration:</span> {formData.duration || 'Not available'}</p>
              <p className="mb-1"><span className="font-medium">Coverage:</span> {formData.hasCoverage ? `Yes - ${formData.coverageAmount} Dh` : 'No'}</p>
              <p className="mb-1"><span className="font-medium">Base Price:</span> {formatPrice(formData.calculatedPrice)}</p>
              <p className="mb-1 mt-3 font-semibold text-lg text-[#00b4d8]">
                <span className="font-bold">Total Price:</span> {formatPrice(formData.amount)}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">Payment Details</h2>
          <p className="mb-1"><span className="font-medium">Payment Method:</span> {paymentMethodText}</p>
        </div>

        <div className="mt-10">
          {isConfirmed ? (
            <div className="text-center mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800 font-medium">Please confirm that all details are correct before proceeding.</p>
            </div>
          ) : null}
          
          <button
            onClick={handleConfirmAndSubmit}
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white font-medium text-lg ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : isConfirmed 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-primary hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                <span>Processing...</span>
              </div>
            ) : isConfirmed ? (
              'Confirm & Submit Order'
            ) : (
              'Review Order Details'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

CheckingOrderMain.propTypes = {
  formData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export default CheckingOrderMain;