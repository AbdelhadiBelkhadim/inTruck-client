import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckingOrderIcon from '../../../assets/Artboard1.png';

const CheckingDoneMain = ({ orderSuccess = true, redirectDelay = 3000 }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Start countdown for redirection
    let timer;
    if (orderSuccess) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/dashboard', { state: { fromOrderCreation: true } });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup timer
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [navigate, orderSuccess]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="px-6 py-8 w-full max-w-3xl text-center">
        <h1 className="text-[20px] md:text-3xl font-bold text-center mb-8">
          {orderSuccess ? (
            <>
              <span className="text-[#00b4d8]">Order </span>
              <span className="text-primary">Created Successfully!</span>
            </>
          ) : (
            <>
              <span className="text-[#00b4d8]">Processing </span>
              <span className="text-primary">Your Order</span>
            </>
          )}
        </h1>

        <div className="mx-auto mb-8">
          <img
            src={CheckingOrderIcon}
            className="text-primary mx-auto w-[220px] h-auto"
            alt="Order Status Icon"
          />
        </div>

        {orderSuccess ? (
          <div className="text-center">
            <div className="bg-green-100 rounded-lg p-4 mb-6 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-800 font-medium">Your order has been created successfully!</p>
            </div>
            
            <p className="text-gray-600 mb-4">
              Thank you for your order. You will be redirected to the dashboard in {countdown} seconds...
            </p>
            
            <button 
              onClick={() => navigate('/dashboard', { state: { fromOrderCreation: true } })} 
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard Now
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <p className="text-gray-600">Processing your order, please wait...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckingDoneMain;