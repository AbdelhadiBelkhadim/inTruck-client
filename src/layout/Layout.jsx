import React from 'react';
import { Outlet } from 'react-router-dom'; // Ensure Outlet is imported
import Home from '../pages/Home';

const Layout = () => {
  return (
    <div>
        <Outlet /> {/* Render child routes */}
    </div>
  );
};

export default Layout;