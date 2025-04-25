import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../ui/Logo";
import { MdOutlineDashboard, MdLogout, MdOutlineCancel } from "react-icons/md";
import { LuPanelLeftClose } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { Truck, Clipboard, Bell } from "lucide-react";

const menuItem = [
  { to: "/dashboard", icon: <MdOutlineDashboard size={20} />, label: "Dashboard" },
  { to: "/dashboard/tracking", icon: <Truck size={20} />, label: "Tracking" },
  { to: "/dashboard/deliveries", icon: <Clipboard size={20} />, label: "Deliveries" },
  { to: "/dashboard/cancelled", icon: <MdOutlineCancel size={20} />, label: "Cancelled" },
  { to: "/dashboard/notifications", icon: <Bell size={20} />, label: "Notifications", badge: 3 },
];

const SideBar = ({ setOpen, open }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (userData) {
      if (userData.userType === "company") {
        setUserProfile({
          name: userData.company.name || "Unknown Company",
          initials: userData.company.name?.split(" ").map(n => n[0]).join("") || "UC",
          company: userData.company.name || "Unknown Company",
          adress: userData.company.address || "Unknown Address"
        });
      } else {
        setUserProfile({
          name: userData.individual.fullName || "Unknown User",
          initials: userData.individual.fullName?.split(" ").map(n => n[0]).join("") || "UU",
          adress: userData.individual.address || "Unknown Address"
        });
      }

    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    window.location.href = '/login';
  };

  return (
    <aside className={`space-y-4 ${open ? "w-fit" : "w-fit"} mb-4`}>
      <div className={`space-y-6 ${open ? "w-67" : "w-28"}`}>
        {/* Close Button */}
        <div className="flex items-center justify-between">
          <Logo logoWith={`w-[30px] md:w-auto`} open={`${open ? "flex" : "hidden"}`} />
          <LuPanelLeftClose
            size={24}
            className={`text-primary cursor-pointer ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <NavLink
          to="/dashboard/profile"
          className={`relative flex items-center justify-between p-4 h-[85px] bg-white rounded-[14px] ${
            open ? "w-67" : "w-28"
          }`}
        >
          {/* User Profile */}
            <div className="flex items-center justify-between h-full">
              <div className="w-[45px] h-[45px] bg-secondaire rounded-[33px] flex items-center justify-center">
                <div className="font-normal text-white text-[18px] tracking-[0] leading-[normal]">
                  {userProfile?.initials || "UK"}
                </div>
              </div>
              
              <div className={`flex-1 ${open ? "ml-3" : "hidden"}`}>
                <div className="text-primary text-sm font-medium">
                  {userProfile?.name}
                </div>
                <div className="text-secondaire text-[13px]">
                  {userProfile?.company}
                  {userProfile?.adress || userProfile?.company || "Unknown Address"}
                </div>
              </div>
              
            </div>
        </NavLink>
        {/* Navigation */}
        <nav className={`mb-4 bg-white p-4 rounded-xl ${open ? "w-67" : "w-28"}`}>
          <ul className="space-y-1">
            {menuItem.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `relative p-3 hover:bg-cyan-400 hover:text-white rounded-lg ${
                      open ? "flex items-center gap-3" : "flex items-center justify-center gap-0"
                    } ${isActive ? "text-white bg-secondaire" : "bg-white text-primary"}`
                  }
                >
                  {item.icon}
                  <span className={`${open ? "flex" : "hidden"}`}>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-auto bg-cyan-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        open ? "relative" : "absolute right-[30%] top-0"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`w-full p-3 rounded-lg flex items-center hover:bg-red-50 text-primary ${
            open ? "justify-start gap-3" : "justify-center"
          }`}
        >
          <MdLogout size={20} />
          <span className={`${open ? "block" : "hidden"}`}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const SideNavMenu = ({ onClick }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserProfile({
        name: userData.name || userData.email || "Unknown User",
        company: userData.company?.name || "Unknown Company"
      });
    }
  }, []);

  return (
    <div className="block md:hidden flex-col w-full h-full bg-primary/5 p-3 rounded-xl">
      {/* User Profile Mobile */}
      <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-lg">
        <NavLink to="/dashboard/profile" className="flex items-center gap-3" onClick={onClick}>
          <div className="w-[35px] h-[35px] bg-secondaire rounded-full flex items-center justify-center">
            <div className="font-normal text-white text-[14px]">
              {userProfile?.name?.split(" ").map(n => n[0]).join("") || "UU"}
            </div>
          </div>
          <div className="text-sm">
            <div className="text-primary font-medium">
              {userProfile?.name || "User"}
            </div>
            <div className="text-secondaire text-xs">
              {userProfile?.company || "Company"}
            </div>
          </div>
        </NavLink>
      </div>

      {/* Navigation Menu */}
      <nav className="mb-4 bg-white p-3 rounded-xl">
        <ul className="space-y-2">
          {menuItem.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                onClick={onClick}
                className={({ isActive }) =>
                  `relative p-2 hover:bg-cyan-400 hover:text-white rounded-lg flex items-center gap-3 ${
                    isActive ? "text-white bg-secondaire" : "bg-white text-primary"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-cyan-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto bg-white p-3 rounded-xl">
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('id');
            window.location.href = '/login';
          }}
          className="flex items-center gap-3 p-2 text-primary hover:bg-red-50 rounded-lg w-full"
        >
          <MdLogout size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export { SideNavMenu, SideBar };