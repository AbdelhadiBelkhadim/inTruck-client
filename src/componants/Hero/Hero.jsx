import React from 'react'
import StartTrakingNow from '../Hero/StartTrakingNow'
import heroImg from '../../assets/heroImg.png'

const Hero = () => {
  return (
    <div className='container p-6 relative'>
        <div className='flex flex-col text-center lg:text-start gap-6 items-center lg:items-start lg:mt-18 '>
            <div className='lg:h-[288px] lg:w-[715px] text-primary'>
                <h1 className=' text-[22px] md:text-[40px] lg:text-[60px] leading-[33px] md:leading-[55px] lg:leading-[76px] lg:w-[735px] lg:h-[228px] font-black '>
                    Track your shipments with ease and <br className="hidden lg:block"/>efficiency
                </h1>
                <p className='text-[7px] md:text-[12px] lg:text-[18px]'>
                    Easily track your packages, shipments, and deliveries with our advanced<br/> tracking system. Stay updated in real time with accurate location details.
                </p>
            </div>
            <StartTrakingNow />
           
        </div>

        <div className="absolute right-0 bottom-0 md:bottom-auto top-45 w-full md:w-auto">
                <img
                    src={heroImg}
                    alt="Hero Illustration"
                    className="max-w-full h-auto"
                />
            </div>

        
    </div>
  )
}

export default Hero