import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Logo from "../ui/logo";
import Footer from "../sections/footer";
import { MdOutlineDashboard, MdHistoryToggleOff } from "react-icons/md";
import { LuPanelLeftClose } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";


import { Truck, Package, Clipboard, Bell, Plus } from 'lucide-react';

const SideBar = ({setOpen,open}) => {

  const [openProfile, setOpenProfile] = useState(true)

  const menuItem = [
    { to: "/dashboard/", icon: <MdOutlineDashboard size={20} />, label: "Dashboard" },
    { to: "/dashboard/tracking", icon: <Truck size={20} />, label: "Tracking" },
    { to: "/dashboard/cargo", icon: <Package size={20} />, label: "Cargo" },
    { to: "/dashboard/deliveries", icon: <Clipboard size={20} />, label: "Deliveries" },
    { to: "/dashboard/history", icon: <MdHistoryToggleOff size={20} />, label: "History" },
    { to: "/dashboard/notifications", icon: <Bell size={20} />, label: "Notifications", badge: 3 },
    ]

  return (
    <aside className={`space-y-4 px-4 ${open ? 'w-67' : 'w-28'} mb-4`}>
            <div className="space-y-6">
              {/* Close Button */}
              <div className="">
                <LuPanelLeftClose size={24} className={`text-primary cursor-pointer ${!open && ' rotate-180'}`} onClick={() => setOpen(!open)} />
              </div>
              {/* User Profile */}
              <div className={`relative flex items-center justify-between p-4 h-[85px] bg-white rounded-[14px] ${open ? 'w-67' : 'w-28'}`}>

                    <div className="w-[45px] h-[45px] top-[9px] left-[11px] bg-secondaire rounded-[33px] flex items-center justify-center">
                      <div className="font-normal text-white text-[18px] tracking-[0] leading-[normal] flex items-center justify-center" >
                        OU
                      </div>
                    </div>

                    <div className={``}>
                      <div className={`flex items-center space-x-5 justify-between w-full`}>
                        <div className={`relative font-medium ${open ? 'block' : 'hidden'}`}>
                            <div className="text-primary text-sm tracking-[0] leading-[normal]">
                            Ouhna Oussama
                            </div>
                            <div className=" text-secondaire text-[13px] tracking-[0] leading-[normal]">
                            STE Aftass , Morocco.
                            </div>
                        </div>
                
                        <IoIosArrowDown className="text-primary text-[24px]" onClick={() => setOpenProfile(!openProfile)} />
                      </div>
                    </div>
              
                    
              </div>

              {/* Navigation */}
              <nav className={`mb-4 bg-white p-4 rounded-xl ${open ? 'w-67' : 'w-28'}`}>
                <ul className="space-y-1">
                  {menuItem.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `relative p-3 hover:bg-cyan-400 hover:text-white rounded-lg ${open ? 'flex items-center gap-3' : 'flex items-center justify-center gap-0'} ${isActive ? "text-white bg-secondaire" : "bg-white text-primary"}`
                        }
                      >
                        {item.icon}
                        <span className={`${open ? 'flex' : 'hidden'}`}>{item.label}</span>
                        {item.badge && (
                          <span className={`ml-auto bg-cyan-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs ${open ? "relative" : "absolute right-[30%] top-0"}`}>
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Recent Shipping */}
              <div className={`bg-indigo-800 text-white p-4 rounded-xl ${open ? 'w-67' : 'w-28'}`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`font-bold ${open ? 'block' : 'hidden'}`}>Recent Shipping</h3>
                  <span className={`bg-white text-primary rounded-full ${open ? 'text-xs px-2 py-1' : 'text-[11px] px-1.5 py-0.5'}`}>#FS54BDF45</span>
                </div>
                <div className="mb-4">
                  <p className="text-sm">Destination</p>
                  <p className="font-bold text-lg">Senegal</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">1859</p>
                  <p className="text-sm text-gray-300">Relative distance / Km</p>
                </div>
              </div>

              {/* Create Delivery Button */}
              <div className={`bg-white border border-dashed border-indigo-800 rounded-xl p-4 mt-4 flex flex-col items-center justify-center ${open ? 'w-67' : 'w-28'}`}>
                <button className={`bg-indigo-800 text-white p-2 rounded-full ${open ? 'mb-2' : 'mb-0'} cursor-pointer`}>
                  <Plus size={20} />
                </button>
                <p className={`text-indigo-800 text-sm ${open ? "flex" : "hidden"}`}>Create a new delivery</p>
              </div>
            </div>
          </aside>
  );
};

export default SideBar;
