import React from "react";

import { MdLogout } from "react-icons/md";

const Header = ({ h1 }) => { 
    return (
        <div className={`flex items-center justify-between py-2 md:py-4 w-full`}>
        <h3 className={`text-3xl text-primary font-bold ${open ? 'block' : 'hidden'}`}>{h1}</h3>
        <a href="" className="hidden md:flex">
            <MdLogout className="text-lg md:text-3xl text-primary md:flex" />
        </a>
        </div>
    );
}

export default Header;
