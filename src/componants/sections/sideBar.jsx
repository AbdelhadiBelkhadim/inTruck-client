import React , {useState} from "react";
import { NavLink, Link } from "react-router-dom";

import Logo from "../ui/logo";
import Footer from "../sections/footer";

import { MdOutlineDashboard, MdHistoryToggleOff, MdLogout } from "react-icons/md";
import { LuPanelLeftClose } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { Truck, Package, Clipboard, Bell } from "lucide-react";


const menuItem = [
  { to: "/dashboard", icon: <MdOutlineDashboard size={20} />, label: "Dashboard" },
  { to: "/dashboard/tracking", icon: <Truck size={20} />, label: "Tracking" },
  { to: "/dashboard/deliveries", icon: <Clipboard size={20} />, label: "Deliveries" },
  { to: "/dashboard/notifications", icon: <Bell size={20} />, label: "Notifications", badge: 3 },
];

const SideBar = ({setOpen, open}) => {
  const [openProfile, setOpenProfile] = useState(true);
  
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

        {/* User Profile */}
        <NavLink
          to="/dashboard/profile"
          className={`relative flex items-center justify-between p-4 h-[85px] bg-white rounded-[14px] ${
            open ? "w-67" : "w-28"
          }`}
        >
          <div className="w-[45px] h-[45px] top-[9px] left-[11px] bg-secondaire rounded-[33px] flex items-center justify-center">
            <div className="font-normal text-white text-[18px] tracking-[0] leading-[normal] flex items-center justify-center">
              OU
            </div>
          </div>
          <div className={``}>
            <div className={`flex items-center space-x-5 justify-between w-full`}>
              <div className={`relative font-medium ${open ? "block" : "hidden"}`}>
                <div className="text-primary text-sm tracking-[0] leading-[normal]">
                  Ouhna Oussama
                </div>
                <div className=" text-secondaire text-[13px] tracking-[0] leading-[normal]">
                  STE Aftass , Morocco.
                </div>
              </div>
              <IoIosArrowDown
                className="text-primary text-[24px]"
                onClick={() => setOpenProfile(!openProfile)}
              />
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
                      open
                        ? "flex items-center gap-3"
                        : "flex items-center justify-center gap-0"
                    } ${
                      isActive ? "text-white bg-secondaire" : "bg-white text-primary"
                    }`
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
      </div>
    </aside>
  );
};

const SideNavMenu = ({onClick}) => {
  
  return (
    <div className="block md:hidden flex-col w-full h-full bg-primary/5 p-3 rounded-xl">
      {/* User Profile Mobile */}
      <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-lg">
        <NavLink to="/profile" className="flex items-center gap-3">
          <div className="w-[35px] h-[35px] bg-secondaire rounded-full flex items-center justify-center">
            <div className="font-normal text-white text-[14px]">
              OU
            </div>
          </div>
          <div className="text-sm">
            <div className="text-primary font-medium">Ouhna Oussama</div>
            <div className="text-secondaire text-xs">STE Aftass, Morocco</div>
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
                smooth={true}
                duration={500}
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
        <Link to="/logout" className="flex items-center gap-3 p-2 text-primary hover:bg-red-50 rounded-lg">
          <MdLogout size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}

export {
  SideNavMenu,
  SideBar
};