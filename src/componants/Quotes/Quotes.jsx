import React from 'react';

const Quotes = ({ img, text }) => {
  return (
    <div className='relative '>
      <img src={img} className='' alt='Background' />
      <q className='absolute top-1/2 font-semibold left-1/16 text-center text-white text-[17px] md:text-[35px] lg:text-[54px]'>
        {text}
      </q>
    </div>
  );
};

export default Quotes;
