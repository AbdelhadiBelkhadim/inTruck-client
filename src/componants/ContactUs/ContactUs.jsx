import React from 'react'
import groupContactUs from '../../assets/groupContactUs.png'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className='bg-primary text-white '>
        <div className='flex flex-col-reverse md:flex-row md:gap-8  md:pb-10 lg:ml-10'>
        <div className=''>
            <img src={groupContactUs} className='ml-20 rotate-270 md:rotate-0 w-[300px] h-[498px] md:w-[400px] md:h-[580px] -mb-25 md:mt-20 md:ml-2' />
        </div>
        <div>
        <div className='flex flex-col my-10'>
    <h2 className='text-semibold text-[40px] md:text-[70px] lg:text-[112px] text-center md:text-left mb-6'>Contact Us</h2>
    
    <div className='flex flex-col md:flex-row lg:gap-8 items-center '>
        <form className='flex flex-col gap-10 w-[90%] lg:w-[405px] lg:h-[520px] lg:gap-15 lg:text-[25px]'>
            <input placeholder='Full Name' className='border-b-2 p-2' />
            <input placeholder='E-mail' className='border-b-2 p-2'/>
            <input placeholder='Message'className='border-b-2 p-2' />
            <button className='bg-secondaire w-[196px] h-[40px] text-center text-[24px]  text-white rounded-2xl'>Contact Us</button>
        </form>
        
        <div className='flex flex-col gap-10 text-start p-2 '>
            <div className='flex justify-between items-center md:grid md:grid-rows-2 md:gap-8 md:ml-10  lg:text-[32px]'>
                <div>
                    <h3 className='font-semibold text-[25px]'>Based in</h3>
                    <p className='font-thin'>New York,<br/>California, Ohio</p>
                </div>
                
                <div>
                    <h3 className='font-semibold text-[25px]'>Contact</h3>
                    <p className='font-thin'>hi@green.com</p>
                </div>
            </div>

            <div className='text-white flex justify-center gap-20 md:p-4 md:gap-4 lg:gap-10 text-[48px] lg:mb-30 '>
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
            </div>
        </div>
        
        
    </div>
    
</div>
        </div>
        </div>
        
    </div>
  )
}

export default ContactUs