import React from 'react'
import { NavLink } from 'react-router-dom'

import InputAuth from '../ui/authInput'
import Button from '../ui/secondaryBtn'
import SideLeftAuth from '../ui/sideLeftAuth'

import Bg from '../../assets/loginBg.png'


const login = () => {
  return (
    <div className="md:flex h-[100vh]">
      <div className="md:w-[40%] lg:w-[45%]">
        <SideLeftAuth h1='Login' src={Bg} />
      </div>
      <div className="SideRight flex items-center justify-center py-[15px] md:py-[47px] lg:py-[67px] px-[20px] md:px-[50px] lg:px-[80px] lg:w-[60%] h-auto">
        <div className="container space-y-[40px]">
          <h2 className="font-newsreader text-4xl text-primary font-bold text-center">Welcome Back!!</h2>
          <div className="space-y-[30px] md:space-y-[50px]">
            <div className="space-y-[20px] md:space-y-[30px]">
              <div className="Form space-y-[32px] md:space-y-[48px]">
                <div className="space-y-[30px] md:space-y-[50px]">
                  <InputAuth label='Email' type='Email' placeholder='Enter your Email' />
                  <InputAuth label='Password' type='password' placeholder='Enter Password' />
                </div>
                <div className="">
                  <Button label="Login" type="enabled" size="large" withprop='full' />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center relative bottom-0">
                <p className="text-[16px] text-gray-400 font-light">
                    Don’t have an account?
                    <NavLink to="/rejester" className="text-primary font-bold">
                        Sign Up
                    </NavLink>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login