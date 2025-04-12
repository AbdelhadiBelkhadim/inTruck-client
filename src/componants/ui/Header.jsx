import React from 'react';
import Logo from '../ui/logo';
import { MdLogout, MdMenu } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  return (
    <header className="flex item-center justify-between p-2 shadow-b-md bg-white md:bg-transparent">
      <div className="md:hidden burgerMenu flex items-center justify-center px-2 py-1 rounded-md bg-primary text-white">
        <MdMenu size={20} />
      </div>
      <Logo logoWith={`w-[30px] md:w-auto`} open={`${open ? 'flex' : 'hidden'}`} />
      <div className="flex items-center justify-between space-x-4">
        <div className="profile md:hidden bg-primary rounded-lg flex items-center justify-between p-1">
          <div className="w-[15px] h-[15px] bg-secondaire rounded-[33px] flex items-center justify-center">
            <div className="font-normal text-white text-[7px] tracking-[0] leading-[normal] flex items-center justify-center">
              OU
            </div>
          </div>
          <IoIosArrowDown className="text-white text-[12px]" />
        </div>
        <a href="" className="">
          <MdLogout className="text-lg md:text-3xl text-primary md:flex" />
        </a>
      </div>
    </header>
  );
};

export default Header;