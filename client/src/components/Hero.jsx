import React from 'react'
import heroImg from '../assets/heroImg.jpg'
import { assets } from '../assets/assets'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Hero() {


  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [hotel, setHotel] = useState([])

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const [availableLocations, setAvailableLocations] = useState([]);


  const navigate = useNavigate();

const handleSearch = async (e) => {
  e.preventDefault();

  if (!destination) return alert("Please select a destination");

  navigate(`/rooms?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
};



  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await api.get("/hotel/hotels")
        // console.log(res.data.hotels);
        
        setHotel(res.data.hotels)
      } catch (error) {

      }
    }
    fetchHotels();
  }, [])



  // for locations
  useEffect(() => {
    const locations = [...new Set(hotel.map(h => h.location))];
    setAvailableLocations(locations);
  }, [hotel]);
  // console.log(hotel);

  // console.log(availableLocations);





  return (
  
    <div

      className='flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center min-h-screen py-20'
      style={{ backgroundImage: `url(${heroImg})` }}
    >

      {/* TOP SECTION: TEXT CONTENT */}

      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Tagline */}
        <p
          className="
          bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400
          text-white font-semibold tracking-wide shadow-lg rounded-full
          px-4 py-2 text-sm
          md:text-base
          w-fit mb-6
        "
        >
          Discover Your Perfect Stay
        </p>

        {/* Heading */}
        <h1
          className="
          font-serif font-bold text-white leading-tight
          drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]
          text-3xl
          md:text-5xl
          lg:text-6xl mb-6
        "
        >
          Find Comfort,&nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400">
            Luxury
          </span>
          , and Serenity
        </h1>

        {/* Subtext */}
        <p
          className="
          hidden lg:block
          max-w-lg text-base text-white/90 leading-relaxed
          md:text-lg mb-8
        "
        >
          Step into a world of elegance and ease. From cozy boutique escapes to
          breathtaking resorts, your ideal stay awaits. Let us turn your travel
          dreams into unforgettable memories.
        </p>

        {/* Optional CTA Button (Hidden on larger screens based on your previous code) */}
        <button
          className="
          px-6 py-3 text-base rounded-lg
          bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500
          hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600
          text-white font-semibold shadow-lg transition-all
          hidden  "
        
        >
          Explore Destinations
        </button>
      </div>


      {/* BOTTOM SECTION: SEARCH FORM */}
      <form
        onSubmit={handleSearch}
        // Changed: Removed lg:flex-col and lg:w-[320px]. Increased max-w. Added items-end for vertical alignment.
        className="
          w-full max-w-6xl mx-auto
          bg-white/20 backdrop-blur-md text-white
          rounded-2xl px-6 py-6 shadow-xl
          border border-white/30
          flex flex-row flex-wrap gap-4 justify-between items-end
          mt-4
        "
      >
        {/* Destination - Changed: removed lg:w-full */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium block mb-1 ml-1">Destination</label>
          <input
            list="destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you going?"
            className="
              w-full px-4 py-3
              rounded-lg border border-white/40
              bg-white/10 text-sm text-white
              placeholder-white/70 outline-none
              focus:ring-2 focus:ring-emerald-400 transition-all
            "
          />
          <datalist id="destinations">
            {availableLocations && availableLocations.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>

        {/* Check In - Changed: removed lg:w-full */}
        <div className="flex-1 min-w-[150px]">
          <label className="text-sm font-medium block mb-1 ml-1">Check In</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="
             w-full px-4 py-3
              rounded-lg border border-white/40
              bg-white/10 text-sm text-white
              outline-none focus:ring-2 focus:ring-emerald-400 transition-all
            "
          />
        </div>

        {/* Check Out - Changed: removed lg:w-full */}
        <div className="flex-1 min-w-[150px]">
          <label className="text-sm font-medium block mb-1 ml-1">Check Out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="
              w-full px-4 py-3
              rounded-lg border border-white/40
              bg-white/10 text-sm text-white
              outline-none focus:ring-2 focus:ring-emerald-400 transition-all
            "
          />
        </div>

        {/* Guests - Changed: removed lg:w-full */}
        <div className="flex-1 min-w-[120px]">
          <label className="text-sm font-medium block mb-1 ml-1">Guests</label>
          <input
            type="number"
            min={1}
            max={8}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="
             w-full px-4 py-3
              rounded-lg border border-white/40
              bg-white/10 text-sm text-white
              outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-center
            "
          />
        </div>

        {/* Button - Changed: removed lg:w-full, lg:mt-3 */}
        <button
          type="submit"
          disabled={loading}
          className="
            flex-1 min-w-[160px]
            px-6 py-3 h-[46px]
            bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500
            hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600
            transition-all text-white font-bold text-sm tracking-wider
            rounded-lg shadow-lg
            disabled:opacity-70
            uppercase
          "
        >
          {loading ? "Searching..." : "Find Hotels"}
        </button>
      </form>

    </div>
  )
}

export default Hero
