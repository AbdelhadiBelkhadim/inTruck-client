import React , {useState} from 'react'


import { ChevronDown, Grid, Truck, Package, Clipboard, Clock, Bell, Plus, LogOut, MoreVertical, Info } from 'lucide-react';
import { MdLogout , MdMenu } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

import SideBar from '../componants/sections/sideBar'
import CountDev from '../componants/sections/count.jsx'
import Summary from '../componants/sections/summary.jsx'
import LastOrders from '../componants/sections/lastOrders.jsx'
import ShippingDetails from '../componants/sections/shipipingDetails.jsx'
import Logo from '../componants/ui/logo.jsx'


const Dashboard = () => {

  const [open, setOpen] = useState(true)
    return (
        <div className='bg-[#F2F2F2] w-full h-full'>
          <div className="lg:container space-y-2 md:space-y-4 lg:space-y-6">
            <header className="flex item-center justify-between p-2 shadow-b-md bg-white md:bg-transparent">
              <div className="md:hidden burgerMenu flex items-center justify-center px-2 py-1 rounded-md bg-primary text-white">
                <MdMenu size={20} />
              </div>
              <Logo logoWith={`w-[30px] md:w-auto`} open={open} />
              <div className="hidden md:flex items-center justify-center">
                <h1 className="text-4xl text-primary font-bold">Dashboard</h1>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="profile md:hidden bg-primary rounded-lg flex items-center justify-between p-1">
                  <div className="w-[15px] h-[15px] bg-secondaire rounded-[33px] flex items-center justify-center">
                    <div className="font-normal text-white text-[7px] tracking-[0] leading-[normal] flex items-center justify-center" >
                      OU
                    </div>
                  </div>
                  <IoIosArrowDown className="text-white text-[12px]"  />
                                      
                </div>
                <a href="" className="">
                  <MdLogout className='text-lg md:text-3xl text-primary md:flex' />
                </a>
              </div>
            </header>
            <main className="flex gap-4 md:space-x-4 px-2">
              {/* Sidebar */}
              <div className="hidden md:flex">
                <SideBar open={open} setOpen={setOpen} />
              </div>
              {/* Main Content Area */}
              <div className="space-y-2 md:space-y-3 w-full p-4 md:p-0">
                <div className="flex item-center justify-between">
                  <h3 className="text-xl text-primary font-bold">Dashboard</h3>
                </div>
                <div className="md:grid-cols-2 md:grid lg:grid-cols-3 space-y-4 md:space-y-0 md:gap-2 lg:gap-4 ">
                  {/* Shipping Details Card */}
                  <ShippingDetails />

                  {/* Summary Section */}
                  <Summary />

                  {/* section 4 */}
                  <CountDev />

                  {/* Last Orders Section */}
                  <LastOrders />
                  
                </div>
              </div>
            </main>
          </div>
        </div>
    )
}

export default Dashboard