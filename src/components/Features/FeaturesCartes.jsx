import React from 'react';

import { TbTruckDelivery, TbBellRinging , TbMapPinSearch } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";

// change imges to icons 

const FCartes = [
    {
        icon: TbTruckDelivery,
        header: 'Fast & Reliable',
        description: 'Track your shipments in real-time with high accuracy.',
    },
    {
        icon: TbBellRinging,
        header: 'Instant',
        description: 'Get notified about shipment updates via email or SMS.',
    },
    {
        icon: TbMapPinSearch,
        header: 'Live Map Tracking',
        description: `Monitor your shipment's exact location on an interactive map..`,
    },

    {
        icon: MdOutlineSecurity,
        header: 'Secure & Private',
        description: 'Track your shipments in real-time with high accuracy.',
    }
];
const FeaturesCartes = () => {
  return (
    
    <div className='grid grid-cols-2 md:flex gap-5 justify-center mt-6 '>
        {
            FCartes.map((carte, index) => (
                    <div key={index} className='shadow-2xl relative text-white bg-primary rounded-t-[100px] rounded-b-3xl   w-[126px] h-[332px] md:w-[185px] md:h-[450px] lg:w-[199px] lg:h-[482px] flex flex-col gap-5 justify-center items-center text-center'>
                        <div className='bg-white flex items-center justify-center w-[112px] h-[112px] md:w-[130px] md:h-[130px] lg:w-[174px] lg:h-[174px] rounded-full absolute top-2 md:top-4'>
                            <carte.icon size={80} className='text-black font-normal' />
                        </div>
                        <h2 className='mt-25 md:mt-20 lg:mt-35 font-bold text-[25px] md:text-[30px] lg:text-[36px] '>{carte.header}</h2>
                        <p className='text-[13px] md:text-[18px] w-[110px] h-[79px] md:w-[166px] md:h-[108px]'>{carte.description}</p>

                    </div>
            )
        )
        }
    </div>
  )
}

export default FeaturesCartes