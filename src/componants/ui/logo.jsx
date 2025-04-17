import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import logo from '../../assets/IT.png';

const Logo = ({open }) => {
  return (
    <Link to="/"> {/* Wrap the logo with a Link to navigate to the home page */}
      <div id="logo" className="flex items-center space-x-2">
        <div className={`flex items-center justify-center`}>
          <img src={logo} alt="Logo" className={`w-[30px] md:w-[50px]`} />
        </div>
        <h1 className={`md:text-2xl text-primary font-bold ${open} overflow-hidden transition-all`}>InTruck</h1>
      </div>
    </Link>
  );
};

export default Logo;