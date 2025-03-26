import React from 'react';
import { Outlet } from 'react-router-dom'; // Ensure Outlet is imported

const Layout = () => {
  return (
    <div>
        <Outlet /> {/* Render child routes */}
    </div>
  );
};

export default Layout;