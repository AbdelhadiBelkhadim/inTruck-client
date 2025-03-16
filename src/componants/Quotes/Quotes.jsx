import React from 'react';

const Quotes = ({ img, text }) => {
  return (
    <div className='relative '>
      <img src={img} className='' alt='Background' />
      <q className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-center text-white text-[12px] md:text-[30px] lg:text-[48px] whitespace-nowrap '>
        {text}
      </q>
    </div>
  );
};

export default Quotes;
