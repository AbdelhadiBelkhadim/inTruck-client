import React from 'react'
import FeaturesCartes from './FeaturesCartes'

const Features = () => {
  return (
    <div className='my-10'>
        <div className='container p-6'>
            <div className='text-primary text-center '>
                <h2 className='font-black text-[36px] md:text-[85px]'>
                    Features
                </h2>
                <p>
                    Our tracking system offers real-time updates, secure package monitoring, and instant notifications. 
                </p>
            </div>

            <div className='flex justify-center items-center'>
                <FeaturesCartes />
            </div>
            
        </div>
    </div>
  )
}

export default Features