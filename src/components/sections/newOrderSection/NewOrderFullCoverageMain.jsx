import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiCash } from "react-icons/gi";
import { BsCreditCard2BackFill } from "react-icons/bs";
import PropTypes from 'prop-types';
import { CalculateDirectDistance } from '../../../services/DirectDistanceService';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center my-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    <span className="ml-3 text-lg text-primary">Calculating price...</span>
  </div>
);

const NewOrderFullCoverageMain = ({ formData, handleChange }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    // Calculate price based on distance and weight
    async function calculatePrice() {
      if (
        formData.pickupCoordinates?.lat &&
        formData.pickupCoordinates?.lng &&
        formData.deliveryCoordinates?.lat &&
        formData.deliveryCoordinates?.lng
      ) {
        setIsLoading(true);
        try {
          // Package details
          const packageDetails = {
            weight: formData.weight || 1,
            dimensions: {
              length: formData.length || 20,
              width: formData.width || 20,
              height: formData.height || 20
            },
            quantity: formData.quantity || 1
          };

          // Calculate price with direct calculation
          const result = await CalculateDirectDistance(
            formData.pickupCoordinates,
            formData.deliveryCoordinates,
            packageDetails
          );

          // Set price and update formData
          setPrice(result.price);
          handleChange({
            target: {
              name: 'calculatedPrice',
              value: result.price
            }
          });
          handleChange({
            target: {
              name: 'amount',
              value: result.price
            }
          });
          
          // Save distance info
          handleChange({
            target: {
              name: 'distance',
              value: result.distance
            }
          });
          handleChange({
            target: {
              name: 'distanceText',
              value: result.distanceText
            }
          });
          handleChange({
            target: {
              name: 'duration',
              value: result.duration
            }
          });
        } catch (error) {
          console.error('Error calculating price:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }

    calculatePrice();
  }, [formData.pickupCoordinates, formData.deliveryCoordinates, formData.weight, formData.quantity]);

  const handlePaymentSelect = (paymentMethod) => {
    // Update payment method
    handleChange({
      target: {
        name: 'paymentMethod',
        value: paymentMethod
      }
    });

    // If cash on delivery selected, navigate to check page
    if (paymentMethod === 'cash') {
      setTimeout(() => navigate('/new-order/check'), 300);
    }

    if (paymentMethod === 'card') {
      setTimeout(() => navigate('/new-order/payment'), 300);
    }
  };

  // Format price to display
  const formattedPrice = price ? price.toFixed(2) : (formData.calculatedPrice || 0).toFixed(2);

  if (isLoading) {
    return (
      <div className="px-6 mt-12 h-full flex flex-col">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-8">
          <span className="text-primary">Payment</span> <span className="text-[#00b4d8]">Method</span>
        </h1>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="px-6 mt-12 h-full flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-8">
        <span className="text-primary">Payment</span> <span className="text-[#00b4d8]">Method</span>
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-primary mb-4">Order Total</h2>
        <p className="text-3xl font-bold text-[#00b4d8]">{formattedPrice} DHM</p>
      </div>

      {/* Payment options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 w-full max-w-2xl">
        <div
          className={`bg-white rounded-xl p-6 shadow-lg flex flex-col items-center cursor-pointer ${
            formData.paymentMethod === "cash" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handlePaymentSelect("cash")}
        >
          <div className="w-20 h-20 text-primary mb-4 flex items-center justify-center">
            <GiCash className="w-16 h-16" />
          </div>
          <div className="text-center">
            <h2 className="text-primary text-xl font-semibold">
              Cash on <span className="text-[#00b4d8]">delivery</span>
            </h2>
            <p className="text-gray-500 mt-2">Pay when your package arrives</p>
          </div>
        </div>

        <div
          className={`bg-white rounded-xl p-6 shadow-lg flex flex-col items-center cursor-pointer ${
            formData.paymentMethod === "card" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handlePaymentSelect("card")}
        >
          <div className="w-20 h-20 text-primary mb-4 flex items-center justify-center">
            <BsCreditCard2BackFill className="w-16 h-16" />
          </div>
          <div className="text-center">
            <h2 className="text-primary text-xl font-semibold">
              Pay with <span className="text-[#00b4d8]">card</span>
            </h2>
            <p className="text-gray-500 mt-2">Secure online payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

NewOrderFullCoverageMain.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default NewOrderFullCoverageMain;