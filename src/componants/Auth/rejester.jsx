import React from 'react'
import { NavLink } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

import SideLeftAuth from '../ui/sideLeftAuth'
import Company from '../Auth/rejesterCases/companyCase'
import Individual from '../Auth/rejesterCases/indvidualCase'

import Bg from '../../assets/signupBg.png'


const Rejester = () => {
    return (
        <>
            <div className="md:flex h-[100vh]">

                {/* SideLeft */}
                <div className="md:w-[40%] lg:w-[45%]">
                    <SideLeftAuth h1="Sign Up" src={Bg} />
                </div>

                {/* SideRight */}
                <div className="SideRight px-2 md:px-[70px] lg:px-[85px] flex  justify-center lg:w-[50%]">
                    <div className=''>
                        <h2 className="font-newsreader text-4xl text-primary font-bold text-center">Create Account</h2>
                        <div>
                            <div className=''>
                                <div className="flex items-center justify-between">
                                    <NavLink
                                        to="/rejester/company"
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
                                        to="/rejester/individual"
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
                                        <Route path="company" element={<Company />} />
                                        <Route path="individual" element={<Individual />} />
                                    </Routes>
                                </div>
                            </div>
                            <div className="flex items-center justify-center relative bottom-0">
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

export default Rejester

