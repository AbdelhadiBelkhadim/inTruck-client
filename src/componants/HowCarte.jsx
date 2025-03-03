import React from 'react';
import MaskGroup1 from '../assets/MaskGroup1.png';
import MaskGroup2 from '../assets/MaskGroup2.png';
import MaskGroup3 from '../assets/MaskGroup3.png';

const HowCartes = [
    {
        img: MaskGroup1,
        header: 'Order Processing',
        description: 'We analyze and confirm your order details for a smooth transaction.',
    },
    {
        img: MaskGroup2,
        header: 'Packaging',
        description: 'Your package is securely packed and prepared for shipping.',
    },
    {
        img: MaskGroup3,
        header: 'Delivery',
        description: 'Our team ensures safe and timely delivery to your location.',
    },
];

const HowCarte = () => {
    return (
        <div className='p-10'>
        <div className="grid sm:grid-col-3 md:flex gap-5 justify-center mt-6">
            {HowCartes.map((carte, index) => (
                <div 
                    key={index} 
                    className="bg-white relative rounded-3xl w-[357px] h-[182px] md:w-[510px] md:h-[260px] lg:w-[511px] lg:h-[332px] shadow-lg  text-center flex flex-col items-center"
                >
                    <img 
                        src={carte.img} 
                        alt={carte.header} 
                        className={`absolute ${index === 1 ? "right-0" : "left-0"} md:top-0 rounded-3xl w-[176px] h-full md:w-full md:h-[170px] object-cover`}
                    />
                    <h3 className={`absolute ${index === 1 ? "right-8" : "left-8"} top-18 md:top-20 lg:top-20 font-bold text-lg lg:text-3xl text-white w-[122px] lg:w-[288px]`}>{carte.header}</h3>
                    <p className={`absolute ${index === 1 ? "left-0" : "right-0"} top-4 md:top-38 md:-right-5 lg:right-2 lg:top-50 text-primary text-semibold p-6 w-[188px] h-[143px] md:w-[220px] md:h-[180px] lg:w-[332px] lg:h-[172px]`}>{carte.description}</p>
                </div>
            ))}
        </div>
        </div>

    );
};

export default HowCarte;
