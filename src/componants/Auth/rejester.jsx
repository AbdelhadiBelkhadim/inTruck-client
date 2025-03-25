import React from 'react'

import SideLeftAuth from '../ui/sideLeftAuth'
import Input from '../ui/authInput'
import Buttons from '../ui/secondaryBtn'
import Icon from '../../assets/icons/smart-phone-01 - 24px.png'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";


const Rejester = () => {
    return (
        <>
            <div className="md:flex h-[100vh]">
                <div className="md:w-[40%] lg:w-[45%]">
                    <SideLeftAuth h1='Sign Up' />
                </div>
                <div className="SideRight flex items-center justify-center py-[15px] md:py-[47px] lg:py-[67px] px-[20px] md:px-[50px] lg:px-[80px] lg:w-[60%] h-auto">
                    <div className="container space-y-[40px]">
                        <h2 className="text-4xl text-primary font-bold text-center">Creat Account</h2>
                        <div className="space-y-[30px] md:space-y-[50px]">
                            <div className="space-y-[20px] md:space-y-[30px]">
                                <div className="Form space-y-[32px] md:space-y-[48px]">
                                    <div className="space-y-[18px] md:space-y-[24px]">
                                        <div className="">
                                            <Input label='Phone' type='number' placeholder='Enter your phone no' icon={Icon} />
                                        </div>
                                        <div className="">
                                            <Input label='Phone' type='number' placeholder='Enter your phone no' icon={Icon} />
                                        </div>
                                        <div className="">
                                            <Input label='Phone' type='number' placeholder='Enter your phone no' icon={Icon} />
                                        </div>
                                        
                                    </div>
                                    <div className="">
                                    <Buttons label="Login" type="enabled" size="large" withprop='full' /> 
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center justify-center space-x-1">
                                        <div className="w-[10px] h-[2px] bg-gray-600"></div>
                                        <p className='text-gray-600 text-lg font-medium'>Or</p>
                                        <div className="w-[10px] h-[2px] bg-gray-600"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center justify-center space-x-1">
                                        <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12">
                                            <i className="">
                                                <FcGoogle />
                                            </i>
                                        </div>
                                        <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12">
                                            <i className="text-blue-500">
                                                <FaFacebook />
                                            </i>
                                        </div>
                                        <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12">
                                            <i className="">
                                                <FaApple />
                                            </i>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center relative bottom-0">
                                <p className="text-[18px] text-gray-400 font-light">Already have an account?<span className="text-primary font-medium">Sign In</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rejester