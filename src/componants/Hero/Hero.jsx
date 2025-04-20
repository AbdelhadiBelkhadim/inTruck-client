import React from 'react';

import heroImg from '../../assets/hero.png';
import Button from '../ui/PrimaryBtn'


const Hero = () => {
  return (
    <div  className="relative w-full h-screen lg:h-[794px] flex items-center justify-center text-center lg:text-left overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Hero Illustration"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content on top of the background */}
      <div className="absolute container flex flex-col items-center lg:items-start text-white gap-6 ">
        <div className="lg:h-[288px] lg:w-[715px] text-white lg:mt-20">
          <h1 className="text-[22px] md:text-[40px] lg:text-[60px] leading-[33px] md:leading-[55px] lg:leading-[76px] font-black">
            Track your shipments with ease and <br className="hidden lg:block" /> efficiency
          </h1>
          <p className="text-[7px] md:text-[12px] lg:text-[18px]">
            Easily track your packages, shipments, and deliveries with our advanced <br /> tracking system. Stay updated in real time with accurate location details.
          </p>
        </div>
        {/* <StartTrakingNow /> */}
        <Button label="Start Now" type="enabled" size="medium"  />
      </div>
    </div>
  );
};

export default Hero;