import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TestimonialsCarte from './TestimonialsCarte';
import profile1 from '../../assets/profile1.png';
import profile2 from '../../assets/profile2.png';
import profile3 from '../../assets/profile3.png';

const testimonials = [
  {
    img: profile1,
    name: 'Hannah Schmitt',
    title: 'Lead Designer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.',
  },
  {
    img: profile2,
    name: 'Imane Fikri',
    title: 'Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.',
  },
  {
    img: profile3,
    name: 'Amal Rachidi',
    title: 'UI/UX',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.',
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div>
      <h1 className='font-semibold text-primary text-center my-20 text-[36px] md:text-[85px]'>Testimonials</h1>

      {/* Navigation Section */}
      <div className='flex justify-between items-center text-primary px-12 md:px-30 lg:px-80'>
        <button onClick={prevTestimonial} className='text-[15px] md:text-[26px] font-semibold'>
          <FaArrowLeft />
        </button>
        <p className='text-[14px] md:text-[26px] font-semibold'>What Our Clients Say About Us</p>
        <button onClick={nextTestimonial} className='text-[15px] md:text-[26px] font-semibold'>
          <FaArrowRight />
        </button>
      </div>

      {/* Testimonials Display */}
      <div className="flex justify-center items-center w-full">
        <div className="hidden md:flex md:justify-center md:items-center md:w-full ">
          <div className="w-[90%] h-[90%] transform scale-90">
            <TestimonialsCarte testimonial={testimonials[(index - 1 + testimonials.length) % testimonials.length]} />
          </div>
          <div className="w-full h-full">
            <TestimonialsCarte testimonial={testimonials[index]} />
          </div>
          <div className="w-[90%] h-[90%] transform scale-90">
            <TestimonialsCarte testimonial={testimonials[(index + 1) % testimonials.length]} />
          </div>
        </div>

        <div className="md:hidden">
          <TestimonialsCarte testimonial={testimonials[index]} />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;