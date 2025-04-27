import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-red-500 text-5xl mb-4">
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg text-center mb-6">
        You don't have permission to access this page. Admin privileges are required.
      </p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Unauthorized; 