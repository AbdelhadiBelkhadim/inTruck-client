import React from 'react';
import { Link } from 'react-router-dom';

const NextButton = ({ to, onClick }) => {
  // If both to and onClick are provided, use to (Link) with priority
  if (to) {
    return (
      <div className="fixed bottom-0 w-full max-w-3xl mb-6">
        <Link 
          to={to}
          className="block w-32 mx-auto py-2 bg-primary text-white font-medium rounded-full text-center"
        >
          Next
        </Link>
      </div>
    );
  }
  
  // Fallback to onClick (button) if no to prop is provided
  return (
    <div className="fixed bottom-0 w-full max-w-3xl mb-6">
      <button
        onClick={onClick}
        className="block w-32 mx-auto py-2 bg-primary text-white font-medium rounded-full text-center"
      >
        Next
      </button>
    </div>
  );
};

export default NextButton;