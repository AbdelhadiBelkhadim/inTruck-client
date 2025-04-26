import React from 'react';
 import PropTypes from 'prop-types';
 
 const NextButton = ({ onClick, label = 'Next' }) => {
   return (
     <button
       className="bg-primary text-white text-[12px] md:text-[24px] px-4 py-2 rounded-lg hover:bg-[#00B4D8] transition duration-300 ease-in-out w-[124px] h-[28px] md:w-[367px] md:h-[53px] flex items-center justify-center my-20 mx-auto shadow-md"
       onClick={onClick}
     >
       {label}
     </button>
   );
 };
 
 NextButton.propTypes = {
   onClick: PropTypes.func,
   label: PropTypes.string,
 };
 
 export default NextButton;