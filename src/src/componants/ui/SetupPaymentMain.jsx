import React, { useState } from 'react';
import { CheckCircle } from "lucide-react";

const SetupPaymentMain = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  // State for form validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData({ ...formData, [name]: formatted });
    } 
    // Format expiry date with slash
    else if (name === 'expiryDate') {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length > 2) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
      }
      setFormData({ ...formData, [name]: formatted });
    }
    // Limit CVV to 3-4 digits
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setFormData({ ...formData, [name]: formatted });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error on typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format must be MM/YY';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
      }, 1500);
    } else {
      setIsSubmitting(false);
    }
  };

  // Reset form after successful submission
  const handleNewPayment = () => {
    setFormData({
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
    setIsSubmitted(false);
  };

  // Success message component
  const SuccessMessage = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      <div className="text-green-500">
        <CheckCircle size={80} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Payment Method Added!</h2>
      <p className="text-gray-600">Your payment information has been securely saved.</p>
      <button
        className="px-6 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors duration-300"
        onClick={handleNewPayment}
      >
        Add Another Payment Method
      </button>
    </div>
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="px-6 py-8 w-full max-w-3xl">
        <h1 className="text-[20px] md:text-3xl font-bold text-center mb-12">
          <span className="text-primary">Setup your </span>
          <span className="text-[#00b4d8]">Payment Method</span>
        </h1>

        {isSubmitted ? (
          <SuccessMessage />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Cardholder Name Field */}
            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Cardholder Name</label>
              <input
                type="text"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-2 py-2 text-gray-700 bg-transparent border-b ${errors.cardholderName ? 'border-red-500' : 'border-primary'} focus:outline-none`}
              />
              {errors.cardholderName && (
                <p className="mt-1 text-red-500 text-sm">{errors.cardholderName}</p>
              )}
            </div>

            {/* Card Number Field */}
            <div>
              <label className="block text-[#00b4d8] text-lg md:text-2xl mb-4 text-center">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className={`w-full px-2 py-2 text-gray-700 bg-transparent border-b ${errors.cardNumber ? 'border-red-500' : 'border-primary'} focus:outline-none`}
              />
              {errors.cardNumber && (
                <p className="mt-1 text-red-500 text-sm">{errors.cardNumber}</p>
              )}
            </div>

            {/* Expiry and CVV Fields */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[#00b4d8] text-[16px] md:text-lg mb-4">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={`w-full px-2 py-2 bg-transparent border-b ${errors.expiryDate ? 'border-red-500' : 'border-primary'} focus:outline-none text-gray-700`}
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-red-500 text-sm">{errors.expiryDate}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-[#00b4d8] text-[16px] md:text-lg mb-4">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={`w-full px-2 py-2 bg-transparent border-b ${errors.cvv ? 'border-red-500' : 'border-primary'} focus:outline-none text-gray-700`}
                  placeholder="123"
                  maxLength="4"
                />
                {errors.cvv && (
                  <p className="mt-1 text-red-500 text-sm">{errors.cvv}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg text-white font-medium ${
                  isSubmitting ? 'bg-gray-400' : 'bg-primary hover:bg-blue-700'
                } transition-colors duration-300 flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Save Payment Method'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SetupPaymentMain;