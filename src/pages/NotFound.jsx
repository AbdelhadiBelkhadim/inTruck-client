import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/IT.png';

const NotFound = () => {
  return (
    <div className='bg-[#F2F2F2] w-full min-h-screen container mx-auto flex flex-col items-center justify-center'>
      {/* Main Content */}
      <div className="text-center px-6 py-8 w-full max-w-3xl">
        <h1 className="text-[40px] md:text-6xl font-bold text-[#00b4d8] mb-6">
          404
        </h1>
        <h2 className="text-[24px] md:text-4xl font-semibold text-primary mb-8">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className='bg-primary text-white text-[16px] md:text-[24px] px-6 py-3 rounded-sm hover:bg-[#00B4D8] transition duration-300 ease-in-out inline-block'
        >
          Go Back Home
        </Link>

        {/* Logo at bottom */}
        <div className="mt-20">
          <Link to="/">
          <div className="flex items-center justify-center">
            <img src={Logo} className='w-15 h-15'/>
            <h1 className="md:text-2xl text-primary font-bold ml-2">InTruck</h1>
          </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
