import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";


const Testimonials = () => {
  return (
    <div>
      <h1 className='font-semibold text-primary text-center my-20 text-[85px]'>Testimonials</h1>
      <div className='flex justify-between items-center text-primary px-80'>
        <FaArrowLeft />
        <p className='text-[26px] font-semibold'>What Our Clients Say About Us</p>
        <FaArrowRight />
      </div>
    </div>
  )
}

export default Testimonials