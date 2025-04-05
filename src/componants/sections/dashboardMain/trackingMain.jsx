import React from 'react'
import { Search, Filter, MoreVertical} from "lucide-react"

const TrackingMain = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-8 text-primary'>
        Tracking
      </h1>

      <div className="flex gap-2 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-3 px-4 text-[#00B4D8] bg-white font-semibold border border-gray-300 rounded-md focus:outline-none"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
              <Search className="w-5 h-5" />
            </button>
          </div>
          <button className="bg-primary text-white p-3 rounded-md">
            <Filter className="" />
          </button>
        </div>

        {/* Table */}
        <div className="">
          <table className="">
            <thead>
              <tr className="w-full text-[12px] md:text-[18px] text-primary">
                <th className="p-5 md:p-auto lg:p-15 ">ID</th>
                <th className="p-5 md:p-auto lg:p-15 ">DESTINATION</th>
                <th className="p-5 md:p-auto lg:p-15 ">STATE</th>
                <th className="p-5 md:p-auto lg:p-15 truncate">Total Coverage</th>
              </tr>
            </thead>

            <tbody className="bg-white border border-gray-300 rounded-md hidden">
              <tr className="border-t border-gray-200 text-center hover:bg-primary cursor-pointer hover:text-white">
                  <td className="py-4 px-4 text-[10px] ">#DJFJSAD526SAD9</td>
                  <td className="py-4 px-4 text-[10px] text-thin ">Tanger</td>
                  <td className="py-4 px-4">
                    <span className="bg-primary text-white text-center p-2 rounded-2xl w-[69px] h-[29px] text-[10px] truncate">On the road</span>
                  </td>
                  <td className="py-4 px-4 text-dark">
                    $ 15,000<span className="text-gray-400 text-sm">.00</span>
                  </td>
                  <td className="py-4 px-4">
                    <button>
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
            </tbody>  
            
          </table>
        </div>

    </div>
  )
}

export default TrackingMain