import React, { useState } from 'react';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import Button from '../ui/primaryBtn'
import Booking from './Booking';
import Getstart from './Getstart';

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
        <div  className="shadow-2xs p-4 fixed top-0 left-0 right-0 z-50 bg-white">
            <div className="container flex justify-between items-center text-center">
                <div id="id='home'" className="cursor-pointer">
                    <img src={logo} alt="Logo" className="w-[107px] h-[32px] md:w-[187px] md:h-[55px] lg:w-[200px] lg:h-[60px]" />
                </div>

                <div className="hidden lg:flex items-center gap-10">
                    <ul className="flex items-center gap-10">
                        {NavLinks.map(({ id, name, link }) => (
                            <li key={id}>
                                <Link
                                    to={link} // Use react-scroll Link
                                    smooth={true}
                                    duration={500}
                                    offset={-80}
                                    className="cursor-pointer hover:text-primary text-lg font-semibold"
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                        <li><Button label="Get Start" type="enabled1" size="medium"  /></li>
                        <li><Button label="Booking" type="enabled" size="medium" /></li>
                    </ul>
                </div>

                <div className="lg:hidden">
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
                                <Link
                                    to={link} // Use react-scroll Link
                                    smooth={true}
                                    duration={500}
                                    onClick={toggleMenu} // Close menu on click
                                    className="cursor-pointer hover:text-primary text-xl font-semibold"
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                        <li><Getstart /></li>
                        <li><Booking /></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
