import React from 'react'
import Logo from '../componants/ui/logo';
import { MdLogout, MdMenu } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { PiPackageDuotone } from "react-icons/pi";
import {ArrowUpToLine} from "lucide-react"

const NewOrder = () => {
  return (
    <div className='bg-[#F2F2F2] w-full h-full'>
        <header className="flex item-center justify-between p-2 shadow-b-md bg-white md:bg-transparent">
          <div className="md:hidden burgerMenu flex items-center justify-center px-2 py-1 rounded-md bg-primary text-white">
            <MdMenu size={20} />
          </div>
          <Logo logoWith={`w-[30px] md:w-auto`} open={`${open ? 'flex' : 'hidden'}`} />
          <div className="flex items-center justify-between space-x-4">
            <div className="profile md:hidden bg-primary rounded-lg flex items-center justify-between p-1">
              <div className="w-[15px] h-[15px] bg-secondaire rounded-[33px] flex items-center justify-center">
                <div className="font-normal text-white text-[7px] tracking-[0] leading-[normal] flex items-center justify-center">
                  OU
                </div>
              </div>
              <IoIosArrowDown className="text-white text-[12px]" />
            </div>
            <a href="" className="">
              <MdLogout className="text-lg md:text-3xl text-primary md:flex" />
            </a>
          </div>
        </header>

        <div className=' w-full h-full flex flex-col items-center justify-center'>
            <div className='my-6 text-center'>
                <h3 className='text-primary font-semibold text-[20px] md:text-[40px] lg:text-[55px]'>What are you sending <span className='text-[#00B4D8]'>today</span> ?</h3>
            </div>

            <div className='grid grid-col md:grid-cols-2 items-center justify-center gap-4 md:gap-6 lg:gap-12 mt-10'>
                <div className='w-[285px] h-[269px] p-6 rounded-sm flex flex-col items-center justify-center mt-4 border border-gray-300 shadow-md'> 
                    <PiPackageDuotone className='w-[161px] h-[167px]' />
                    <div className='flex flex-col items-center justify-center text-[27px] font-semibold text-[#00B4D8]'>
                        <h4>Shipment</h4>
                        <p className='text-primary text-[18px] font-normal'>(1000kg - 5000kg)</p>
                    </div>
                </div>


                <div className='w-[285px] h-[269px] p-6 rounded-sm flex flex-col items-center justify-center mt-4 border border-gray-300 shadow-md'> 
                    <PiPackageDuotone className='w-[161px] h-[167px]' />
                    <div className='flex flex-col items-center justify-center text-[27px] font-semibold text-[#00B4D8]'>
                        <h4>Shipment</h4>
                        <p className='text-primary text-[18px] font-normal'>(1000kg - 5000kg)</p>
                    </div>
                </div>



                <div className='w-[285px] h-[269px] p-6 rounded-sm flex flex-col items-center justify-center mt-4 border border-gray-300 shadow-md'> 
                    <PiPackageDuotone className='w-[161px] h-[167px]' />
                    <div className='flex flex-col items-center justify-center text-[27px] font-semibold text-[#00B4D8]'>
                        <h4>Shipment</h4>
                        <p className='text-primary text-[18px] font-normal'>(1000kg - 5000kg)</p>
                    </div>
                </div>


                <div className='w-[285px] h-[269px] p-6 rounded-sm flex flex-col items-center justify-center mt-4 border border-gray-300 shadow-md'> 
                    <PiPackageDuotone className='w-[161px] h-[167px]' />
                    <div className='flex flex-col items-center justify-center text-[27px] font-semibold text-[#00B4D8]'>
                        <h4>Shipment</h4>
                        <p className='text-primary text-[18px] font-normal'>(1000kg - 5000kg)</p>
                    </div>
                </div>
            </div>

            <button className='bg-primary text-white text-[12px] md:text-[24px]  px-4 py-2 rounded-sm hover:bg-[#00B4D8] transition duration-300 ease-in-out w-[124px] h-[28px] md:w-[367px] md:h-[53px] flex items-center justify-center my-20'>
                Next
            </button>


            {/* Back to Top Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
          <ArrowUpToLine className="w-6 h-6" />
        </button>
      </div>
            

        </div>
    </div>
  )
}

export default NewOrder