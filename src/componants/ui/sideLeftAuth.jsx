import React from 'react'
import Background from '../../assets/image 1.png'
import Truck from '../../assets/Truck.png'

const SideLeftAuth = ({h1}) => {
    return (
        <>
            <div className="relative w-full h-full hidden md:flex">
                <div className="flex justify-center md:w-full h-full bg-none bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}>
                    <div className="text-white text-[54px] text-center font-bold bg-primary rounded-b-full pb-20 pt-7 px-10 md:h-[200px]" >
                        <h1 className="mb-16 mx-4">{h1}</h1>
                    </div>
                    <div className="">
                        <img src={Truck} alt="" className="absolute bottom-0 right-0 left-0 md:bottom-[1px] md:left-[30px]" />
                    </div>
                </div>
            </div>
            <div className="relative flex items-center justify-center md:hidden">
                <div className="flex justify-center relative">
                    <div className="text-white text-[38px] text-center font-bold bg-primary rounded-b-full pb-20 pt-7 px-10 h-[150px]" >
                        <h1 className="">{h1}</h1>
                    </div>
                    <div className="absolute bottom-0 right-0 left-0">
                        <img src={Truck} alt="" className="absolute bottom-0 right-0 left-0 w-[280px] h-[166px]" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideLeftAuth;