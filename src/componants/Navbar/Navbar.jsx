import React, { useState } from 'react';

import {
  FaBars,
  FaTimes,
} from 'react-icons/fa';

import logo from '../../assets/logo.png';
import Booking from './Booking';
import Getstart from './Getstart';

const NavLinks = [
    {
        id: 1,
        name: 'Home',
        link: '/',
    },
    {
        id: 2,
        name: 'How it work',
        link: '/#',
    },
    {
        id: 3,
        name: 'Features',
        link: '/#',
    },
    {
        id: 4,
        name: 'Contact us',
        link: '/#',
    },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className=" shadow-2xs p-4 fixed top-0 left-0 right-0 z-50 bg-white">
            <div className="container flex justify-between items-center text-center">
                <div id="Logo">
                    <img src={logo} alt="Logo" href='/' className='w-[107px] h-[32px] md:w-[187px] md:h-[55px] lg:w-[200px] lg:h-[60px]' />
                </div>

                <div className="hidden lg:flex items-center gap-10">
                    <ul className="flex items-center gap-10">
                        {NavLinks.map(({ id, name, link }) => (
                            <li key={id}>
                                <a
                                    href={link}
                                    className="inline-block hover:text-primary  text-lg font-semibold"
                                >
                                    {name}
                                </a>
                            </li>
                        ))}
                        <li>
                            <Getstart />
                        </li>
                        <li>
                            <Booking />
                        </li>
                    </ul>
                </div>

                <div className="lg:hidden ">
                    <button onClick={toggleMenu} className="text-2xl text-primary">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden mt-4">
                    <ul className="flex flex-col items-center gap-4">
                        {NavLinks.map(({ id, name, link }) => (
                            <li key={id}>
                                <a
                                    href={link}
                                    className="inline-block hover:text-primary text-xl font-semibold"
                                >
                                    {name}
                                </a>
                            </li>
                        ))}
                        <li>
                            <Getstart />
                        </li>
                        <li>
                            <Booking />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;