import React from 'react'
import { Bell } from "lucide-react"


const Notification = () => {
  return (
    <div>
        {/* Notifications */}
      <div className="flex-1 p-4 space-y-4">
        {/* Notification 1 */}
        <div className="bg-white rounded-lg p-4 relative">
          <div className="flex">
            <div className="bg-[#e1e4ea] h-10 w-10 rounded-full p-2.5  mr-4">
              <Bell className="h-5 w-5 text-[#99a0ae] text-center " />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#0e121b]">Security Update: Token Management</h3>
              <p className="text-[#525866] mt-1">
                Secure your integration with the new token management system to safeguard your API keys.
              </p>
              <p className="text-[#99a0ae] text-sm mt-2">Today at 9:42 AM</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 h-2 w-2 bg-[#335cff] rounded-full"></div>
        </div>   
      </div>
    </div>
  )
}

export default Notification