<<<<<<< HEAD
import React from 'react'
import DashboardHeader from '../componants/ui/DashboardHeader'

const Profile = () => {
  return (
    <div>
      {/* Header */}
      <DashboardHeader h1="Profile" />

      <main className='bg-white rounded-[14px] p-4 md:p-6 lg:p-10 grid grid-cols-1 mb-5'>
        {/* Profile info */}
        <div className="mb-12 flex items-center justify-center md:justify-start">
            <div className="flex items-center gap-4">
              <div className="bg-[#00b4d8] text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
                OU
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold">Oussama OUHNA</h2>
                <p className="text-[#00b4d8]">STE Aftass, Morocco</p>
              </div>
            </div>
          </div>

        <div id="profile-info" className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-8 md:space-y-15"> 
            {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className={`auth-input-container w-full max-w-[530px] ${index === 6 ? 'md:col-span-2' : ''}`}> 
                    <div className="relative w-full px-3 md:px-0">
                        <label htmlFor={`profileInfo${index}`} className="absolute text-[14px] md:text-[15px] font-semibold bottom-8 lg:bottom-[45px] left-[8px] bg-white px-3 py-0 text-primary">
                            {["Company Name", "Registration Number (RC)", "Tax Identification Number (IF)", "Company Email", "Company Phone Number", "Company Address", "Responsible Person’s Full Name"][index]}
                        </label>
                        <input  
                            name={`profileInfo${index}`}
                            id={`profileInfo${index}`}
                            type="text" 
                            placeholder={`Enter your profile information ${index + 1}`} 
                            className="text-[12px] md:text-[16px] font-medium text-secondaire outline-none appearance-none border border-primary rounded-[50px] py-[12px] lg:py-[15px] px-[15px] md:px-[20px] lg:px-[25px] w-full"
                        />
                    </div>
                </div>
            ))}
        
        </div>

      </main>
    </div>
  )
}
=======
import React from "react";

const Profile = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <div className="mb-4">
            <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                Username
            </label>
            <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="border border-gray-300 p-2 rounded w-full"
                required
            />
            </div>
            <div className="mb-4">
            <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                Email
            </label>
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="border border-gray-300 p-2 rounded w-full"
                required
            />
            </div>
            <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
            Update Profile
            </button>
        </form>
        </div>
    );
    }
>>>>>>> 3ef20d25bbe72b3b05c6c763e4b5d2122095d35d


export default Profile;