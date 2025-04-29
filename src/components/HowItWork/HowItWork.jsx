import React from 'react'
import HowCarte from './HowCarte'

const HowItWork = () => {
  return (
    <div id='howitwork' className='bg-primary '>
        <div className='container p-6'>
            <div className='text-center text-white font-black text-[36px] md:text-[85px]'>
                <h2 className=''>
                    How It Works
                </h2>
            </div>

            <div className=''>
                <HowCarte />
            </div>
            

            <div>

            </div>
        </div>
    </div>
  )
}

export default HowItWork