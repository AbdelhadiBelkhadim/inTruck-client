import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";



const Profile = ({withP}) => {

const [open, setOpen] = useState(true)

  return (
    <div className={`relative w-72 h-[85px] bg-white rounded-[14px] ${withP}`}>
      <div className="absolute top-[18px] left-[64px]">
      <div className={`flex items-center space-x-8 justify-between w-full`}>
        <div className="relative ">
            <div className="font-normal text-primary text-base tracking-[0] leading-[normal]">
            Ouhna Oussama
            </div>
            <div className="font-normal text-secondaire text-[13px] tracking-[0] leading-[normal]">
            STE Aftass , Morocco.
            </div>
        </div>

        <IoIosArrowDown className="text-primary text-[24px]" onClick={() => setOpen(!open)} />
      </div>
      </div>

      <div className="absolute w-[45px] h-[45px] top-[9px] left-[11px] bg-secondaire rounded-[33px] flex items-center justify-center">
        <div className="font-normal text-white text-[18px] tracking-[0] leading-[normal] flex items-center justify-center" >
          OU
        </div>
      </div>
    </div>
  );
};


export default Profile;