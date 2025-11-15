import {React,useState,useEffect} from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function FeaturedDestination() {
    const navigate= useNavigate()
      const [hotel,setHotel] = useState([])
    useEffect(()=>{
        try {
            const fetchHotel = async ()=>{
                const res = await axios.get("http://localhost:3000/hotels",{
                    withCredentials : true
                })
                setHotel(res.data.hotels)
            } 
            fetchHotel();
        } catch (error) {
            
        }
    },[])
    // console.log(hotel);
  

    
     
  return (
  <div className="relative flex flex-col items-center px-6 md:px-16 lg:px-24 py-20">


    <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 to-white -z-10"></div>

    {/* Glassmorphism container */}
    <div className="w-full max-w-7xl bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl p-10 flex flex-col items-center">

      {/* Title */}
      <Title 
        title="Featured Destinations" 
        subTitle="Discover our handpicked selection of luxury stays across the globe — where comfort meets unforgettable experiences." 
        className="text-center text-white"
      />

      {/* Cards */}
      <div className="flex  flex-wrap items-center justify-center gap-14 mt-12">
        {hotel.slice(0,4).map((room,index)=>(
          <HotelCard key={room._id} room={room} index={index}/>
        ))}
      </div>

      {/* Button */}
      <button 
        onClick={()=>{navigate('/rooms'); scrollTo(0,0)}}
        className="mt-16 px-6 py-3 text-sm font-semibold 
        bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 
        hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 
        text-white rounded-xl shadow-lg transition-all 
        cursor-pointer self-center flex items-center gap-2"
      >
        <span>View All Destinations</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </button>
    </div>
  </div>
)

}

export default FeaturedDestination