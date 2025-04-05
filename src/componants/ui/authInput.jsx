import React from 'react'

import { BiShow } from "react-icons/bi";

const AuthInput = ({label, type, placeholder, children}) => {
    return (
        <div className="relative rounded-[50px] border border-primary py-[15px] px-[35px] max-w-[530px] mx-[10px] my-6">
            <label htmlFor={label} className="absolute text-primary text-[20px] font-medium bottom-[45px] left-[8px] bg-white px-3">{label}</label>
            <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-[10px] w-full">
                    {children}
                    <input 
                        type={type} 
                        placeholder={placeholder} 
                        className="text-[14px] md:text-[16px] font-medium text-secondaire border-none outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full" 
                    />
                </div>
                
            </div>
        </div>
    )
}


export default AuthInput