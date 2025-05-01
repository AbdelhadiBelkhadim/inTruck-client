import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPayment } from '../../../api/Api';
import { useNavigate } from 'react-router-dom';

// Use your own publishable key (test or live)
const stripePromise = loadStripe('99');

const CheckoutForm = ({ formData, handleChange }) => {
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setProcessing(true);

    const amount = formData.calculatedPrice || formData.amount || 0;

    if (amount <= 0) {
      setError("Invalid payment amount. Please return to previous steps.");
      setProcessing(false);
      return;
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: { name },
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }

    try {
      const response = await createPayment({
        paymentMethodId: paymentMethod.id,
        amount,
      });

      const { clientSecret } = response.data;
      if (!clientSecret) throw new Error('Missing client secret from backend');

      const confirmResult = await stripe.confirmCardPayment(clientSecret);

      if (confirmResult.error) {
        setError(`Payment failed: ${confirmResult.error.message}`);
      } else if (confirmResult.paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        setError(null);

        handleChange({ target: { name: 'paymentMethod', value: 'card' } });

        setTimeout(() => {
          navigate('/new-order/check');
        }, 2000);
      }
    } catch (err) {
      setError(`Payment error: ${err.message}`);
    }

    setProcessing(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Cardholder Name */}
      <div>
        <label className="block text-blue-400 text-lg md:text-2xl mb-4 text-center">Cardholder Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-2 py-2 text-gray-700 bg-transparent border-b border-primary focus:outline-none"
          required
        />
      </div>

      {/* Payment Amount */}
      <div>
        <label className="block text-blue-400 text-lg md:text-2xl mb-4 text-center">Amount to Pay</label>
        <div className="w-full px-2 py-2 text-gray-700 bg-transparent border-b border-primary text-center font-bold">
          {(formData.calculatedPrice || formData.amount || 0).toFixed(2)} DH
        </div>
      </div>

      {/* Card Details */}
      <div>
        <label className="block text-blue-400 text-lg md:text-2xl mb-4 text-center">Card Details</label>
        <div className="p-3 border-b border-primary">
          <CardElement options={cardElementOptions} />
        </div>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Your card information is secured with Stripe.
        </p>
      </div>

      {/* Error */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Success */}
      {succeeded && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">
          Payment successful! Proceeding to next step...
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!stripe || processing || succeeded}
        className="bg-primary text-white text-sm md:text-2xl px-4 py-2 rounded-sm hover:bg-blue-400 transition duration-300 ease-in-out w-full md:w-96 h-12 md:h-14 flex items-center justify-center my-12 mx-auto"
      >
        {processing ? 'Processing...' : succeeded ? 'Payment Complete' : 'Complete Payment'}
      </button>
    </form>
  );
};

const SetupPayment = ({ formData, handleChange }) => {
  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="px-6 py-8 w-full max-w-3xl">
          <h1 className="text-xl md:text-3xl font-bold text-center mb-12">
            <span className="text-primary">Setup your </span>
            <span className="text-blue-400">Payment Method</span>
          </h1>

          <Elements stripe={stripePromise}>
            <CheckoutForm formData={formData} handleChange={handleChange} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default SetupPayment;
