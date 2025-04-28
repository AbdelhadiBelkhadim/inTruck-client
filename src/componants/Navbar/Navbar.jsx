import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { X } from 'lucide-react';

import logo from '../../assets/logo.png';
import Button from '../ui/PrimaryBtn';

const NavLinks = [
    { id: 1, name: 'Home', link: 'home' },
    { id: 2, name: 'How it work', link: 'howitwork' },
    { id: 3, name: 'Features', link: 'features' },
    { id: 4, name: 'Contact us', link: 'contactus' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="shadow-2xs p-4 fixed top-0 left-0 right-0 z-50 bg-white">
            <div className="container flex justify-between items-center text-center">
                <div className="cursor-pointer">
                    <img src={logo} alt="Logo" className="w-[107px] h-[32px] md:w-[187px] md:h-[55px] lg:w-[200px] lg:h-[60px]" />
                </div>

                {/* Desktop Navigation - Unchanged */}
                <div className="hidden lg:flex items-center gap-10">
                    <ul className="flex items-center gap-10">
                        {NavLinks.map(({ id, name, link }) => (
                            <li key={id}>
                                <Link
                                    to={link}
                                    smooth={true}
                                    duration={500}
                                    offset={-80}
                                    className="cursor-pointer hover:text-primary text-lg font-semibold"
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                        <NavLink to='/login' ><Button label="Login" type="enabled1" size="small"  /></NavLink>
                        <NavLink to='/register/company'><Button label="Get Stared" type="enabled" size="small" /></NavLink>
                    </ul>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-2xl text-primary">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Menu Sidebar - Modified Section */}
                {isMenuOpen && (
                    <div className="lg:hidden fixed inset-0 bg-black/30 z-50" onClick={toggleMenu}>
                        <div 
                            className="fixed left-0 top-0 h-full w-3/4 bg-white shadow-xl p-6 transform transition-transform duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Section */}
                            <div className="flex justify-between items-center mb-8">
                                <img src={logo} alt="Logo" className="w-[120px] h-[40px]" />
                                <button 
                                    onClick={toggleMenu}
                                    className="p-2 text-primary rounded-md hover:bg-gray-100"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Navigation Items - Left Aligned */}
                            <ul className="space-y-4 text-left">
                                {NavLinks.map(({ id, name, link }) => (
                                    <li key={id}>
                                        <Link
                                            to={link}
                                            smooth={true}
                                            duration={500}
                                            offset={-80}
                                            onClick={toggleMenu}
                                            className="block p-3 rounded-lg hover:bg-gray-100 text-lg font-medium
                                                       active:bg-primary active:text-white transition-colors"
                                            activeClass="bg-primary text-white"
                                        >
                                            {name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Buttons - Same Size */}
                            <div className="mt-8 space-y-4 w-full">
                                <NavLink 
                                    to='/login' 
                                    onClick={toggleMenu}
                                    className="block w-full"
                                >
                                    <Button 
                                        label="Login" 
                                        type="enabled1" 
                                        size="small" 
                                        className="w-full justify-center"
                                    />
                                </NavLink>
                                <NavLink 
                                    to='/register/company' 
                                    onClick={toggleMenu}
                                    className="block w-full"
                                >
                                    <Button 
                                        label="Get Started" 
                                        type="enabled" 
                                        size="small" 
                                        className="w-full justify-center"
                                    />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;