import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api' ;


const HotelRoomsPage = () => {
  const [hotel, setHotel] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const fetchHotel = async () => {
        const res = await api.get("/hotel/hotels", {
          withCredentials: true
        })
        setHotel(res.data.hotels)
      }
      fetchHotel();
    } catch (error) {

    }
  }, [])
  // console.log(hotel);


  return (
    <> 
    {hotel && hotel.map((hotel) => (<div key={hotel._id} className="mt-34 mb-20 px-10 " > 
    <div onClick={()=>navigate(`/rooms?hotelId=${hotel._id}`)} className="mb-10 text-center flex flex-col items-center justify-center"> 
      <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1> 
      <p className="text-gray-600">{hotel.location}</p> 
      {hotel.hotelImage?.[0] &&
       (<img src={hotel.hotelImage[0]} alt={hotel.name} 
       className="w-3xl max-h-[400px] object-cover mt-4 rounded-2xl shadow-lg" />
       )} 
      <p className="text-gray-700 mt-3">{hotel.description}</p> 
      <div>{}</div>
      </div> 
      </div>))} 
      </>
  )
};

export default HotelRoomsPage;
