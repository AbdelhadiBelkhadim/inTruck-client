import React from 'react'

import logo from '../../assets/logo.png';
import Button from '../ui/primaryBtn'

import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

// change some thinks in this file and add some new thinks to it

const Footer = () => {
  return (
    <div className='container'>
        <div className='flex flex-col justify-between md:flex-row items-start gap-5 py-10'>
            <div className='mb-10'>
                <img src={logo} className='w-[160px] h-[48px]'/>

                <div className='flex gap-3 mt-5 mb-2'>
                <FaLocationDot className='w-[21px] h-[21px] text-primary'/>
                <p className='text-[14px]'>Agadir, Maroc</p>  
                </div>

                <div className='flex gap-3 mb-2'>
                <MdOutlineEmail className='w-[21px] h-[21px] text-primary'/>
                <p className='text-[14px]'>inTruck@inTruck.ma</p>
                </div>

                <div className='flex gap-3 mb-2'>
                <FaPhoneAlt className='w-[21px] h-[21px] text-primary'/>
                <p className='text-[14px]'>+212616044083</p>
                </div>
            </div>
            <div className='mb-8 '>
                <div className='flex justify-between gap-10 lg:gap-20'>
                  <div className='text-[11px] md:text-[14px]'>
                    <h3 className='text-base text-primary font-bold mb-3'>Service</h3>
                    <ul className='space-y-2'>
                      <li><a>Home</a></li>
                      <li><a>Our Services</a></li>
                      <li><a>Track Shipment</a></li>
                      <li><a>Contact Us</a></li>
                      <li><a>Privacy Policy</a></li>
                    </ul>  
                  </div>

                  <div className='text-[11px] md:text-[14px]'>
                    <h3 className='text-base text-primary font-bold mb-3'>Company</h3>
                    <ul className='space-y-2'>
                      <li><a>About Us</a></li>
                      <li><a>Track you Shipment</a></li>
                      <li><a>Our Team</a></li>
                      <li><a>FAQ</a></li>
                    </ul>  
                  </div>

                  <div className='text-[11px] md:text-[14px]'>
                    <h3 className='text-base text-primary font-bold mb-3'>Our Social Media</h3>
                    <ul className='space-y-2'>
                      <li><a>Facebook</a></li>
                      <li><a>Instagram</a></li>
                      <li><a>Tiwtter</a></li>
                    </ul>  
                  </div>
                </div>
            </div>

            <div className='flex flex-col items-start'>
              <h3 className='text-primary font-semibold'>Join a Newsletter</h3>
              <input placeholder='Enter your email' className='p-4 border-1 w-[263px] h-[49px] my-5 rounded-[9px]'/>
              {/* <button className='bg-primary p-4 rounded-2xl w-[128px] h-[53px] text-white font-semibold'>Send</button> change this Button */}
              
              {/* new button  */}
              <Button label="Send" type="enabled" size="medium"  />
            </div>

            <p className='my-10 text-gray-500 md:hidden'>Copyright inTruck</p>
        </div>
    </div>
  )
}

export default Footer