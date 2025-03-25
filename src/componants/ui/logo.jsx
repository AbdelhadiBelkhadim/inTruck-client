import React from 'react'
import logo from '../../assets/IT.png'
const Logo = ({logoWith, open }) => {
    return (
        <div id="logo" className="flex items-center space-x-2">

            <div className={`flex items-center justify-center`}>
                <img src={logo} alt="Logo" href='/' className={`${logoWith}`} />
            </div>
            <h1 className={`md:text-2xl text-primary font-bold ${open}`}>InTruck</h1>
        </div>
    )
}   

export default Logo