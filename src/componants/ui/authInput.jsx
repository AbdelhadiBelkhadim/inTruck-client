import React from 'react'

import { BiShow } from "react-icons/bi";

const AuthInput = ({label, type, placeholder,onChange ,errors, children}) => {
    return (
        <div className="auth-input-container">
            <div className={`relative rounded-[50px] border py-[8px] md:py-[15px] px-[35px] lg:w-[530px] md:max-w-[530px] my-2 md:my-4 ${errors ? 'border-red-500' : 'border-primary'}`} onChange={onChange}>
                <label htmlFor={label} className="absolute text-primary text-[16px] md:text-[20px] font-medium bottom-6 md:bottom-[43px] left-[8px] bg-white px-3">{label}</label>
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-[10px] w-full">
                        {children}
                        <input 
                            id={label}
                            type={type} 
                            placeholder={placeholder} 
                            className={`text-[14px] md:text-[16px] font-medium text-secondaire border-none outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full`}
                            onChange={onChange}
                        />
                    </div>
                    {type === "password" && (
                        <button type="button" className="absolute right-3 text-gray-500">
                            <BiShow size={20} />
                        </button>
                    )}
                </div>` `
            </div>
            {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
        </div>
    )
}


export default AuthInput