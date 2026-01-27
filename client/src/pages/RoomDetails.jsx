import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { facilityIcons, roomCommonData } from "../assets/assets";
import StartRating from "../components/StartRating";
import api from '../services/api';

function RoomDetails() {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await api.get(
          `/hotel/rooms/${id}`,
          { withCredentials: true }
        );

        const roomData = res.data.room;

        setRoom(roomData);
        setHotel(roomData.hotelId);
        setMainImage(roomData.roomImages?.[0]);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [id]);


const handleBooking = async (e) => {
  e.preventDefault();
  setError("");

  // Frontend validations
  if (new Date(checkIn) >= new Date(checkOut)) {
    setError("Check-out date must be after check-in date");
    return;
  }

  if (guests > room.capacity) {
    setError(`Maximum ${room.capacity} guests allowed`);
    return;
  }

  try {
    setLoading(true);

    await api.post(
      "/bookings/book-room",
      {
        roomId: room._id,
        hotelId: hotel._id,
        checkIn,
        checkOut,
        guests,
      },
      { withCredentials: true }
    );

    alert("Booking confirmed! Email sent");
  } catch (err) {
    setError(err.response?.data?.message || "Booking failed");
  } finally {
    setLoading(false);
  }
};


  if (!room || !hotel) {
    return (
      <div className="py-32 text-center text-gray-500 h-screen">
        Loading room details...
      </div>
    );
  }
//   console.log(hotel);
  // console.log(room?.hotelId?.ownerId?.email)
;
  
  

  return (
    <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32">

      {/* Title */}
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {hotel.name}
          <span className="text-sm font-inter"> ({room.roomType})</span>
        </h1>
        <span className="text-xs px-3 py-1.5 bg-orange-500 text-white rounded-full">
          20% OFF
        </span>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-1 mt-2">
        <StartRating />
        <p className="ml-2">200+ Reviews</p>
      </div>

      {/* Images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2">
          <img
            src={mainImage}
            alt="Room"
            className="w-full h-100 object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:w-1/2">
          {room.roomImages?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Room"
              onClick={() => setMainImage(img)}
              className={`h-48 w-full object-cover rounded-xl cursor-pointer shadow-md
                ${mainImage === img && "outline outline-3 outline-orange-500"}`}
            />
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-10 flex flex-col md:flex-row justify-between">
        <div>
          <h2 className="text-3xl font-playfair">
            Experience Luxury Like Never Before
          </h2>

          <div className="flex flex-wrap gap-4 mt-4">
            {room.amenities?.map((item, i) => {
              const amenity = item.trim();
              return (
                <div key={i} className="flex gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                  <img src={facilityIcons[amenity]} className="w-5 h-5" />
                  <p className="text-xs">{amenity}</p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-2xl font-medium">₹{room.pricePerNight}/Night</p>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleBooking}
        className="mt-16 p-6 bg-white shadow-xl rounded-xl max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6"
      >
        <div className="flex flex-wrap gap-6 text-gray-500">
          <input 
          className="border-2 border-gray-400   p-2 rounded-xl"
          type="date" required onChange={e => setCheckIn(e.target.value)} />
          <input 
          className="border-2  border-gray-400  p-2 rounded-xl"
          type="date" required onChange={e => setCheckOut(e.target.value)} />
          <input
          className="border-2 border-gray-400 p-2 rounded-xl "
            type="number"
            min="1"
            required
            value={guests}
            onChange={e => setGuests(e.target.value)}
          />
        </div>

        <button 
        disabled={loading}
        className={`px-10 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-md ${  loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-emerald-500 to-sky-500 hover:scale-105"} `
    
    }>
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </form>

      {/* Hosted By */}
      <div className="mt-20">
        <p className="text-xl">
          Hosted by <span className="text-2xl font-bold">{hotel.name}</span>
        </p>

        <a
          href={`mailto:${room?.hotelId?.ownerId?.email}`}
          className="inline-block mt-4 px-6 py-2 text-white rounded bg-gradient-to-r from-emerald-500 to-sky-500"
        >
          Contact Now
        </a>
      </div>
    </div>
  );
}

export default RoomDetails;
