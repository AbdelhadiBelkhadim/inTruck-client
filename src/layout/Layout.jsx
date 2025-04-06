import React from 'react';
import { Outlet } from 'react-router-dom'; // Ensure Outlet is imported
import App from '../App'

const Layout = () => {
  return (
    <div className='2xl:container'>
      <App />
        <Outlet /> {/* Render child routes */}
    </div>
  );
};

export default Layout;