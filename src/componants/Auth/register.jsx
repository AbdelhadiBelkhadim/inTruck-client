import React from 'react'
import { NavLink } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

import SideLeftAuth from '../ui/sideLeftAuth'
import Company from './registerCases/companyCase'
import Individual from './registerCases/individualCase'

import Bg from '../../assets/signupBg.png'


const Register = () => {
    return (
        <>
            <div className="md:flex justify-between h-[100vh] md:h-screen">

                {/* SideLeft */}
                <div className="md:w-[50%]">
                    <SideLeftAuth h1="Sign Up" src={Bg} />
                </div>

                {/* SideRight */}
                <div className="SideRight px-2 md:px-[40px] lg:px-[85px] flex  justify-center md:w-[50%] md::w-[50%] flex-1 overflow-hidden my-3 md:my-6">
                    <div className='w-full flex-1 overflow-y-scroll scrollbar-hide'>
                        <h2 className="font-newsreader text-4xl text-primary font-bold text-center">Create Account</h2>
                        <div className=' space-y-[40px] md:space-y-[50px] lg:space-y-[70px] mt-[30px] md:mt-[50px] lg:mt-[70px]'>
                            <div className=''>
                                <div className="flex items-center justify-center space-x-[30px] md:space-x-[50px] lg:space-x-[70px]">
                                    <NavLink
                                        to="/register/company"
                                        className={({ isActive }) =>
                                            `flex items-center justify-center ${
                                                isActive ? "font-bold" : "font-light"
                                            }`
                                        }
                                    >
                                        <p className="text-primary text-[14px] md:text-[21px]">
                                            Company
                                        </p>
                                    </NavLink>
                                    <span className="bg-secondaire w-[2px] h-[40px]"></span>
                                    <NavLink
                                        to="/register/individual"
                                        className={({ isActive }) =>
                                            `flex items-center justify-center ${
                                                isActive ? "font-bold" : "font-light"
                                            }`
                                        }
                                    >
                                        <p className="text-primary text-[14px] md:text-[21px]">
                                            Individual
                                        </p>
                                    </NavLink>
                                </div>
                                <div className='mt-[30px] md:mt-[50px] lg:mt-[70px]'>
                                    <Routes>
                                        <Route index element={<Company />} />
                                        <Route path="individual" element={<Individual />} />
                                    </Routes>
                                </div>
                            </div>
                            <div className="flex items-center justify-center relative bottom-0 pb-3 md:pb-5">
                                <p className="text-[16px] text-gray-400 font-light">
                                    Already have an account?
                                    <NavLink to="/login" className="text-primary font-bold">
                                        Sign In
                                    </NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register
