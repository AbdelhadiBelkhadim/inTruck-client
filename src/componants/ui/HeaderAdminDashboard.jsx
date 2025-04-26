import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { Menu, LayoutDashboard, Truck, ListTodo, CircleDot, Bell, Clock, LogOut, X } from "lucide-react";
import { NavLink, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, name: 'Dashboard', path: '/admin' },
  { icon: Truck, name: 'Trucking', path: '/admin/tracking' },
  { icon: ListTodo, name: 'Deliveries', path: '/admin/deliveries' },
  { icon: CircleDot, name: 'Cancelled', path: '/admin/cancelled' },
  { icon: Bell, name: 'Notifications', path: '/admin/send-message' },
  { icon: Clock, name: 'Confirmation Order', path: '/admin/confirmation-order' },
];

const HeaderAdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between mb-6 h-[50px]">
      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden shadow-xl`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Logo />
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 text-primary rounded-md hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-2">
          {/* Profile Section */}
          <NavLink 
            to="/admin/profile" 
            onClick={() => setMenuOpen(false)}
            className="w-full mb-4 p-3 rounded-lg hover:bg-gray-100 flex items-center space-x-3"
          >
            <div className="w-[40px] h-[40px] bg-secondaire rounded-full flex items-center justify-center">
              <div className="font-normal text-white text-[16px]">OU</div>
            </div>
            <div>
              <div className="text-primary text-sm">Ouhna Oussama</div>
              <div className="text-secondaire text-xs">STE Aftass , Morocco.</div>
            </div>
          </NavLink>

          {/* Menu Items */}
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`w-full flex items-center p-3 rounded-lg mb-1 text-sm ${
                  isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            );
          })}

          {/* Add Button */}
          <NavLink
            to="/admin/add-new"
            onClick={() => setMenuOpen(false)}
            className="w-full bg-[#2e3192] text-white p-3 rounded-lg mt-4 flex items-center justify-center text-sm"
          >
            <Truck className="w-5 h-5 mr-3" />
            Add new (Driver/Truck)
          </NavLink>
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* Main Header Content */}
      <div className="flex items-center justify-between w-full max-lg:px-4">
        <Logo />

        <div className="flex items-center gap-4 max-lg:gap-3">
          {/* Desktop Menu */}
          <div
            ref={containerRef}
            className="hidden lg:flex items-center space-x-4 h-[50px] bg-white rounded-xl p-1 overflow-x-auto whitespace-nowrap"
          >
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={`flex items-center h-full rounded-md transition-all duration-200 whitespace-nowrap text-sm ${
                    isActive ? 'bg-[#00b4d8] text-white px-3 py-1' : 'text-[#2e3192] px-2 py-1'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {isActive && <span className="ml-2">{item.name}</span>}
                </NavLink>
              );
            })}
          </div>

          {/* Add Button - Desktop */}
          <NavLink 
            to="/admin/add-new"
            className="hidden lg:flex items-center h-[50px]"
          >
            <button className="bg-[#2e3192] text-white px-2 py-1 rounded-md flex items-center h-full text-sm">
              <Truck className="w-4 h-4 mr-1" />
              <span>Add new (Driver/Truck)</span>
            </button>
          </NavLink>

          {/* Profile Section - Desktop */}
          <NavLink to="/admin/profile" className="hidden lg:flex items-center h-[50px]">
            <div className="flex items-center space-x-5 bg-white h-[50px] rounded-xl px-4">
              <div className="w-[40px] h-[40px] bg-secondaire rounded-full flex items-center justify-center">
                <div className="font-normal text-white text-[16px]">OU</div>
              </div>
              <div>
                <div className="text-primary text-xs">Ouhna Oussama</div>
                <div className="text-secondaire text-[11px]">STE Aftass , Morocco.</div>
              </div>
            </div>
          </NavLink>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="bg-primary p-2 rounded-md flex items-center justify-center h-[40px] w-[40px] text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Logout Button */}
          <button className="text-primary p-1 rounded-md flex items-center h-full">
            <LogOut className="w-8 h-8 max-lg:w-6 max-lg:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdminDashboard;