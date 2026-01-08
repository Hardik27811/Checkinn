import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route,Routes ,useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import { MyBookings } from './pages/MyBookings'
import HotelReg from './components/HotelReg'
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import Addroom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'
import Experience from './pages/Experience'
import About from './pages/About'

import Login from './pages/auth/Login'
import AdminLayout from './pages/admin/AdminLayout'
import HotelRoomsPage from './pages/HotelRoomsPage'
import UserProfile from './pages/UserProfile'
import ExclusiveOffersPage from './pages/ExclusiveOffersPage'

function App() {


  const isOwnerPath= useLocation().pathname.includes("owner")

  return (
        <div>
         {!isOwnerPath && <Navbar/>}

         {false && <HotelReg/>}
         <div className='min-h-[70vh]'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/rooms' element={<AllRooms/>}/>
              <Route path='/hotelrooms/:id' element={<HotelRoomsPage/>} />
              <Route path='/rooms/:id' element={<RoomDetails/>}/>
              <Route path='/my-bookings' element={<MyBookings/>}/>
              <Route path='/user-profile' element={<UserProfile/>}/>
              <Route path='/experience' element={<Experience/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/exclusiveOffersPage' element={<ExclusiveOffersPage/>}/>
              <Route path='/login' element={<Login/>} />
              <Route path='/owner' element={<Layout/>}>
                <Route index element={<Dashboard/>} />
                <Route path='add-room' element={<Addroom/>} />
                <Route path='list-room' element={<ListRoom/>} />
              </Route>
              <Route path='/admin' element={<AdminLayout/>}>
              </Route>

            </Routes>
         </div>
        <Footer/>
     
        </div>
  )
}

export default App
