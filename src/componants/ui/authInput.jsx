import React from 'react'

import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const AuthInput = ({label, name, type, placeholder,onChange , onBlur, errors, value, children}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="auth-input-container w-full max-w-[530px] ">
            <div className="relative w-full px-3 md:px-0">
                <label htmlFor={label} className={`absolute text-[14px] md:text-[20px] font-medium bottom-8.5 lg:bottom-[45px] left-[8px] bg-white px-3 py-0 ${errors ? 'text-red-500' : 'text-primary'}`}>{label}</label>
                {type === "password" && (
                    <button 
                        type="button" 
                        className="absolute right-7 md:right-8 top-1/4 md:top-[15px] text-[#73E8FF] text-xl md:text-2xl"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <BiHide /> : <BiShow />}
                    </button>
                )}
                <div className="flex items-center space-x-1">
                    <div className="text-secondaire text-xl md:text-2xl absolute left-5 top-1/4 md:top-[15px]">{children}</div>
                    <input  
                        name={name}
                        value={value}
                        id={label}
                        type={showPassword ? "text" : type} 
                        placeholder={placeholder} 
                        className={`text-[12px] md:text-[16px] font-medium text-secondaire outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${errors ? 'border-red-500' : 'border-primary'} rounded-[50px] border py-[12px] lg:py-[15px] w-full ${children ? 'px-[40px] md:px-[50px] lg:px-[60px]' : 'px-[20px] md:px-[30px] lg:px-[35px]'} focus:border-[#95aeb3]`}
                        onChange={onChange} 
                        onBlur={onBlur}
                    />
                </div>
            </div>
            {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
        </div>
    )
}


export default AuthInput