import React from 'react'
import Features1 from '../../assets/Features1.png'
import Features2 from '../../assets/Features2.png'
import Features3 from '../../assets/Features3.png'
import Features4 from '../../assets/Features4.png'



const FCartes = [
    {
        img: Features1,
        header: 'Fast & Reliable',
        description: 'Track your shipments in real-time with high accuracy.',
    },
    {
        img: Features2,
        header: 'Instant',
        description: 'Get notified about shipment updates via email or SMS.',
    },
    {
        img: Features3,
        header: 'Live Map Tracking',
        description: `Monitor your shipment's exact location on an interactive map..`,
    },

    {
        img: Features4,
        header: 'Secure & Private',
        description: 'Track your shipments in real-time with high accuracy.',
    }
];
const FeaturesCartes = () => {
  return (
    
    <div className='grid grid-cols-2 md:flex gap-5 justify-center mt-6 '>
        {
            FCartes.map((carte, index) => (
                    <div key={index} className='shadow-2xl relative text-white bg-primary rounded-b-3xl  rounded-t-full w-[126px] h-[332px] md:w-[185px] md:h-[450px] lg:w-[199px] lg:h-[482px] flex flex-col gap-5 justify-center items-center text-center'>
                        <div className='bg-white flex items-center justify-center w-[112px] h-[112px] md:w-[130px] md:h-[130px] lg:w-[174px] lg:h-[174px] rounded-full absolute top-2 md:top-4'>
                            <img src={carte.img} />
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