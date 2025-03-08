import React from 'react'
import BackGround from '../../assets/Group 5.png'

const Quotes = () => {
  return (
    <div className='relative my-10'>
        <img src={BackGround} className='' />
        <q className='absolute top-1/2 font-semibold left-1/16 text-center text-white text-[17px] md:text-[35px] lg:text-[54px]'> Track with Confidence, Deliver with Speed! </q>
    </div>
  )
}

export default Quotes