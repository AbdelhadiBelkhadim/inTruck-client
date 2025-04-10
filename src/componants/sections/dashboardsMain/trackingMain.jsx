import React from 'react'
import { Search, Filter, MoreVertical , ArrowUpToLine, ChevronLeft, ChevronRight} from "lucide-react"

const TrackingMain = () => {
  return (
    <div className='border-gray-300 h-svh'>
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
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className=''>
            <tr className="text-[12px] md:text-[16px] lg:text-[18px] text-primary h-16 text-center">
                <th  className="px-1 py-4">ID</th>
                <th  className="px-1 py-4">DESTINATION</th>
                <th  className="px-1 py-4">STATE</th>
                <th  className="px-1 py-4 truncate">Total Coverage</th>
              </tr>
            </thead>

            <tbody className="bg-white border rounded-md">
              <tr className="border-t border-gray-200 text-center hover:bg-primary cursor-pointer hover:text-white text-[10px] md:text-[12px]">
                  <td className="py-4 px-4 font-semibold ">#DJFJSAD526SAD9</td>
                  <td className="py-4 px-4 text-thin ">Tanger</td>
                  <td className="py-4 px-4">
                    <span className="bg-[#00B4D8] text-white text-center p-2 rounded-2xl truncate ">On the road</span>
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

           {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button className="p-2 text-primary">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-md">1</button>
          <button className="w-10 h-10 flex items-center justify-center text-dark rounded-md">2</button>
          <button className="w-10 h-10 flex items-center justify-center text-dark rounded-md">3</button>
          <button className="w-10 h-10 flex items-center justify-center text-dark rounded-md">4</button>
          <button className="p-2 text-primary">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        


        {/* Back to Top Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
          <ArrowUpToLine className="w-6 h-6" />
        </button>
      </div>

    </div>
  )
}

export default TrackingMain