import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import logo from '../../assets/IT.png';

const Logo = ({ logoWith, open }) => {
  return (
    <Link to="/"> {/* Wrap the logo with a Link to navigate to the home page */}
      <div id="logo" className="flex items-center space-x-2">
        <div className={`flex items-center justify-center`}>
          <img src={logo} alt="Logo" className={`${logoWith}`} />
        </div>
        <h1 className={`md:text-2xl text-primary font-bold ${open}`}>InTruck</h1>
      </div>
    </Link>
  );
};

export default Logo;