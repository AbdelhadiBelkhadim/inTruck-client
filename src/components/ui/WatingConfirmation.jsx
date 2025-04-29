import React from 'react'
import { CiClock2 } from 'react-icons/ci'

const WatingConfirmation = () => {
  return (
    <div>
        <h1 className='text-primary font-semibold text-[25px] md:text-[40px] lg:text-[50px]'>Confirmation Orders</h1>
        <div className='flex items-center space-x-2 bg-primary rounded-2xl p-4'>
            <CiClock2 className='text-white w-10 h-10 font-bold' />
            <p className='text-white font-thin text-[12px] md:text-[20px]'>You have 5 deliveries wating for confirmation</p>
        </div>
    </div>
  )
}

export default WatingConfirmation