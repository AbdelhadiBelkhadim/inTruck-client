import React, { useState, useEffect } from 'react';
import { 
  CardElement, 
  useStripe, 
  useElements,
  Elements 
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Remember to replace with your actual publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

const PaymentForm = ({ amount, userId, orderId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    async function fetchPaymentIntent() {
      try {
        setLoading(true);
        const response = await fetch('/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount, userId, orderId }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching payment intent:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPaymentIntent();
  }, [amount, userId, orderId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until it's available
      return;
    }
    
    setProcessing(true);
    setError(null);
    
    const cardElement = elements.getElement(CardElement);
    
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          // You can add billing details here if you collect them
          // name: 'Jane Doe',
        },
      },
    });
    
    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      setSucceeded(true);
      setProcessing(false);
      // Call any callback function passed from parent component
      if (onSuccess) onSuccess(paymentIntent);
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Enter Payment Details</h3>
        {loading ? (
          <div className="text-gray-600">Loading payment form...</div>
        ) : (
          <>
            <div className="py-3 mb-4 border-b border-gray-200">
              <p className="text-lg font-semibold text-gray-700">Amount to Pay: ${amount.toFixed(2)}</p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="card-element" className="block mb-2 text-sm text-gray-600">
                Credit or debit card
              </label>
              <div className="p-3 border border-gray-200 rounded bg-gray-50">
                <CardElement 
                  id="card-element" 
                  options={cardStyle} 
                />
              </div>
            </div>
            
            {error && (
              <div className="text-red-600 text-sm mb-4" role="alert">
                {error}
              </div>
            )}
            
            <button
              disabled={processing || !stripe || succeeded}
              id="submit"
              className={`w-full py-3 px-4 rounded text-white font-medium ${
                processing || !stripe || succeeded
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 transition duration-200'
              }`}
            >
              {processing ? 'Processing...' : 'Pay Now'}
            </button>
            
            {succeeded && (
              <div className="mt-4 p-3 text-center text-green-700 bg-green-50 border border-green-200 rounded">
                Payment succeeded!
              </div>
            )}
          </>
        )}
      </div>
    </form>
  );
};

// The actual payment page component that wraps everything with Stripe
const PaymentPage = ({ amount = 49.99, userId, orderId }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Complete Your Purchase</h2>
        <Elements stripe={stripePromise}>
          <PaymentForm 
            amount={amount} 
            userId={userId} 
            orderId={orderId}
            onSuccess={(paymentIntent) => {
              console.log('Payment successful!', paymentIntent);
              // You can redirect or show a success page here
            }}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;