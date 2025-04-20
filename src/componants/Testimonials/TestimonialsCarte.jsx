import React from 'react';
import Vector5 from '../../assets/Vector5.png';
import Vector6 from '../../assets/Vector6.png';

const TestimonialsCarte = ({ testimonial }) => {
  return (
    <div className="relative flex justify-center items-center my-15 w-[250px] h-[250px] md:w-[423px] md:h-[454px] ">
      <img src={Vector6} className="absolute inset-0 mx-auto" />

      <div className="relative">
        <img src={Vector5} className="relative z-10 mr-15 drop-shadow-2xl" />

        <div  className="absolute -top-5 md:left-55 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-20 text-center flex flex-col justify-center items-center w-full "
        >
          <img src={testimonial.img} alt={testimonial.name} className=" rounded-full  border-4 border-white shadow-md w-[58px] h-[58px] md:w-[100px] md:h-[100px]"
          />

          <h3 className="text-[13px] md:text-lg font-bold text-blue-900 mt-4">
            {testimonial.name}
          </h3>
          <p className="text-sm text-gray-500">{testimonial.title}</p>
          <p className="text-gray-700 mt-3 mb-40 w-[205px] h-[99px] md:w-[317px] md:h-[166px] text-[11px] md:text-[18px]">
            {testimonial.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarte;
