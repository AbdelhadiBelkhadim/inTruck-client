import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NextButton = ({ to, onClick, disabled = false, isLoading = false }) => {
  // Define classes for the button
  const baseClasses = "block w-32 mx-auto py-2 font-medium rounded-full text-center";
  const activeClasses = "bg-primary text-white hover:bg-blue-700";
  const disabledClasses = "bg-gray-400 text-gray-200 cursor-not-allowed";
  const buttonClasses = `${baseClasses} ${disabled ? disabledClasses : activeClasses}`;

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
  );

  // Button content - either "Next" or a loading spinner + "Calculating..."
  const buttonContent = isLoading ? (
    <>
      <LoadingSpinner /> 
      <span>Calculating...</span>
    </>
  ) : (
    'Next'
  );

  // If both to and onClick are provided, use to (Link) with priority
  if (to && !disabled && !isLoading) {
    return (
      <div className="fixed bottom-0 w-full max-w-3xl mb-6">
        <Link 
          to={to}
          className={buttonClasses}
        >
          {buttonContent}
        </Link>
      </div>
    );
  }
  
  // Fallback to onClick (button) or disabled state
  return (
    <div className="fixed bottom-0 w-full max-w-3xl mb-6">
      <button
        onClick={disabled || isLoading ? undefined : onClick}
        disabled={disabled || isLoading}
        className={`${buttonClasses} flex items-center justify-center`}
      >
        {buttonContent}
      </button>
    </div>
  );
};

NextButton.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default NextButton;