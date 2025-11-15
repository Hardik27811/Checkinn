import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { NavLink ,useParams ,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../../context/UserContext'



const Sidebar = () => {
    const {logout} = useUser()
    const navigate = useNavigate()
    const sidebarLinks = [
        {name:"Dashboard" , path: "/owner/" , icon: assets.dashboardIcon},
        {name:"Add Room" , path: "/owner/add-room" , icon: assets.addIcon},
        {name:"List Room" , path: "/owner/list-room" , icon: assets.listIcon},
    ]
   
  return (
    <div className='md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4
    flex flex-col transition-all duration-300'>
        {sidebarLinks.map((item , index)=>(
            <NavLink to={item.path} key={index} end='/owner' 
            className={({isActive})=>`flex items-center py-3 px-4 md:px-8 gap-3 
                ${isActive ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600 ":
                    "hover:bg-gray-100/90 border-white text-gray-700"}`}>
                        <img src={item.icon} alt={item.name} className='min-h-6min-w-6 ' />
                        <p className='md:block hidden text-center'>{item.name}</p>
            </NavLink>
        ))}
        <div  
        onClick={()=>{logout();navigate("/login")}}
        className={`flex items-center py-3 px-4 md:px-8 gap-3 
                "border-r-4 md:border-r-[6px] cursor-default  text-gray-600 bg-blue-600/10 border-4  ml-5 max-w-fit justify-center  rounded-4xl mt-4 hover:text-red-600 ":
                    "hover:bg-gray-100/90  text-gray-700"}`}>Logout</div>
    </div>
  )
}


export default Sidebar