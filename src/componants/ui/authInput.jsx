import React from 'react'

const AuthInput = ({label, type, placeholder, icon, children}) => {
    return (
        <div className="relative rounded-[50px] border-[2px] border-primary py-[10px] px-[35px] w-auto m-[10px]">
            <label htmlFor={label} className="absolute text-primary text-[20px] font-bold bottom-[35px] left-[56px] bg-white px-3">{label}</label>
            <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-[10px]">
                    <img src={icon} alt="" />
                    <input type={type} placeholder={placeholder} className="text-[18px] text-secondaire border-none outline-none ppearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
                <button onClick='' className="text-secondaire text-2xl cursor-auto" >{children}</button>
            </div>
        </div>
    )
}


export default AuthInput