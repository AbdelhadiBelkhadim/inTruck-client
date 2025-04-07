import React from 'react'

import { BiShow } from "react-icons/bi";

const AuthInput = ({label, type, placeholder,onChange , onBlur, errors, value, children}) => {
    return (
        // <div className="auth-input-container">
        //     <div className={`relative rounded-[50px] border py-[8px] md:py-[15px] px-[35px] lg:w-[530px] md:max-w-[530px] my-2 md:my-4 ${errors ? 'border-red-500' : 'border-primary'}`} onChange={onChange}>
        //         <label htmlFor={label} className="absolute text-primary text-[16px] md:text-[20px] font-medium bottom-6 md:bottom-[43px] left-[8px] bg-white px-3">{label}</label>
        //         <div className="relative flex items-center justify-between">
        //             <div className="flex items-center space-x-[10px] w-full">
        //                 {children}
        //                 <input 
        //                     id={label}
        //                     type={type} 
        //                     placeholder={placeholder} 
        //                     className={`text-[14px] md:text-[16px] font-medium text-secondaire border-none outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full`}
        //                     onChange={onChange}
        //                 />
        //             </div>
        //             {type === "password" && (
        //                 <button type="button" className="absolute right-3 text-gray-500">
        //                     <BiShow size={20} />
        //                 </button>
        //             )}
        //         </div>` `
        //     </div>
        //     {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
        // </div>
        <div className="auth-input-container w-full max-w-[530px] ">
            <div className="relative w-full">
                <label htmlFor={label} className={`absolute text-[14px] md:text-[20px] font-medium bottom-6.5 md:bottom-8.5 lg:bottom-[50px] left-[8px] bg-white px-3 py-0 ${errors ? 'text-red-500' : 'text-primary'}`}>{label}</label>
                <div className="">{children}</div>
                {type === "password" && (
                    <button type="button" className="absolute right-3 md:right-4 top-1/4 text-gray-500 text-xl md:text-2xl lg:text-3xl">
                        <BiShow />
                    </button>
                )}
                <input  
                    value={value}
                    id={label}
                    type={type} 
                    placeholder={placeholder} 
                    className={`text-[12px] md:text-[16px] font-medium text-secondaire outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${errors ? 'border-red-500' : 'border-primary'} rounded-[50px] border py-[8px] md:py-[12px] lg:py-[15px] px-[20px] md:px-[30px] lg:px-[35px] w-full`}
                    onChange={onChange} 
                    onBlur={onBlur}
                />
            </div>
            {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
        </div>
    )
}


export default AuthInput