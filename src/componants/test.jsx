import React from 'react'
import Rejester from './Auth/rejester'
import SideBar from './sections/sideBar'
import DashBoard from '../pages/Dashboard'


const Test = () => {
    return (
        <div className="b-gray-300 m-0 p-0">
            <Rejester />
            <SideBar />
            <DashBoard />
        </div>
    )
}

export default Test