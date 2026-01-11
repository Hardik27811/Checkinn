import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const HotelRoomsPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      try {
       
        const hotelRes = await axios.get('https://checkinn-rh1m.onrender.com/hotels', {
          withCredentials: true,
        });
        const hotels = hotelRes.data.hotels;
        const selectedHotel = hotels.find((h) => h._id === id);
        setHotel(selectedHotel);

   
        const roomsRes = await axios.get('https://checkinn-rh1m.onrender.com/rooms', {
          withCredentials: true,
        });
        console.log(roomsRes);
        

       
        const matchedRooms = roomsRes.data.rooms.filter((room) =>
          selectedHotel.rooms.includes(room._id)
        );
        setRooms(matchedRooms);
      } catch (error) {
        console.error('Error fetching hotel or rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelAndRooms();
  }, [id]);

  if (loading) return <div className="mt-40 text-center">Loading...</div>;
  if (!hotel) return <div className="mt-40 text-center">Hotel not found</div>;
  console.log(rooms);
  

  return (
    <div className="mt-34 mb-20 px-10 " >
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
        <p className="text-gray-600">{hotel.location}</p>
        {hotel.hotelImage?.[0] && (
          <img
            src={hotel.hotelImage[0]}
            alt={hotel.name}
            className="w-full max-h-[400px] object-cover mt-4 rounded-2xl shadow-lg"
          />
        )}
        <p className="text-gray-700 mt-3">{hotel.description}</p>
      </div>

     {/* Rooms Section  */}
      <h2 className="text-3xl  mt-30 font-semibold mb-24">Available Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room._id}
              className="border-none rounded-2xl shadow hover:shadow-2xl transition duration-200 overflow-hidden"
              onClick={()=>{navigate(`/rooms/${room._id}`);scrollTo(0,0)}}

            >
              <img
                src={room.roomImages?.[0]}
                alt={room.name}
                className="w-full h-58 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-1">Type: {room.roomType}</p>
                <p className="text-gray-700 mb-1">Capacity: {room.capacity} persons</p>
                <p className="text-green-700 font-bold mb-2">
                  ₹{room.pricePerNight} / night
                </p>
                <button className="w-full flex items-center justify-center gap-2 
               bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 
               hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 
               transition-all text-white font-semibold px-6 py-3 rounded-lg shadow-md">
                  View Deatails
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available for this hotel.</p>
        )}
      </div>
    </div>
  );
};

export default HotelRoomsPage;
