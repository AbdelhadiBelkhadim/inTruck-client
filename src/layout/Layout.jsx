import React from 'react';
import { Outlet } from 'react-router-dom'; // Ensure Outlet is imported
import App from '../App'

const Layout = () => {
  return (
    <div className='2xl:container w-full h-full flex flex-col justify-between'>
      <App />
        <Outlet /> {/* Render child routes */}
    </div>
  );
};

export default Layout;