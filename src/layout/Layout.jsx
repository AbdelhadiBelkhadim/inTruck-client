// src/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='2xl:container w-full h-full flex flex-col justify-between'>
        <Outlet /> {/* ✅ This renders the routed content */}
    </div>
  );
};

export default Layout;
