import React from 'react'
import heroImg from '../assets/heroImg.jpg'
import { assets, cities } from '../assets/assets'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
function Hero() {

  const { logout } = useUser()
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cities = ["New Delhi", "Mumbai", "Jaipur", "Goa", "Bangalore"];
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/search-hotels", {
        destination,
        checkIn,
        checkOut,
        guests,
      });
      setHotels(res.data.hotels || []);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get('http://localhost:3000/auth/user')
        if (res.status === 200) {
          console.log("data fetch sucessfullu");

        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchdata()
  }, [])



  return (
    <div
      className='flex  items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen'
      style={{ backgroundImage: `url(${heroImg})` }}
    >

      <div className="text-right md:text-left md:ml-16 mt-10 md:mt-0">
        {/* Tagline */}
        <p className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 text-white 
                px-5 py-2 rounded-full font-semibold tracking-wide w-fit 
                shadow-lg text-sm md:text-base">
          Discover Your Perfect Stay
        </p>
        <button onClick={() => logout()}>Logout</button>
        {/* Heading */}
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mt-6 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          Find Comfort, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400">Luxury</span>,
          and Serenity
        </h1>

        {/* Subtext */}
        <p className="max-w-lg mt-5 text-base md:text-lg text-white/80 leading-relaxed">
          Step into a world of elegance and ease. From cozy boutique escapes to
          breathtaking resorts, your ideal stay awaits. Let us turn your travel
          dreams into unforgettable memories.
        </p>

        {/* Optional CTA Button */}
        <button className="mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 
                     hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 
                     text-white font-semibold shadow-lg transition-all">
          Explore Destinations
        </button>
      </div>

      <form
        className="relative bottom-36  mt-80 mr-10
        bg-white/20 backdrop-blur text-white rounded-2xl px-8 py-6 shadow-xl 
        flex flex-col items-start justify-between gap-6 
        w-[30%] max-w-5xl mx-auto border border-white/30"
        onSubmit={handleSearch}
      >
        {/* Destination */}
        <div className="w-full">
          <div className="flex items-center gap-2">
            <img src={assets.locationIcon} alt="location" className="h-5 invert" />
            <label htmlFor="destinationInput" className="font-medium text-sm">
              Destination
            </label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you going?"
            required
            className="w-full rounded-md border border-white/40 bg-white/10 px-3 py-2 mt-2 
                 text-sm text-white placeholder-white/70 outline-none 
                 focus:ring-2 focus:ring-emerald-400"
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>
        {/* Check In */}
        <div className="w-full">
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="calendar" className="h-5 invert" />
            <label htmlFor="checkIn" className="font-medium text-sm">Check In</label>
          </div>
          <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full rounded-md border border-white/40 bg-white/10 px-3 py-2 mt-2 
                 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Check Out */}
        <div className="w-full">
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="calendar" className="h-5 invert" />
            <label htmlFor="checkOut" className="font-medium text-sm">Check Out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full rounded-md border border-white/40 bg-white/10 px-3 py-2 mt-2 
                 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Guests */}
        <div className="w-full">
          <label htmlFor="guests" className="font-medium text-sm">Guests</label>
          <input
            min={1}
            max={8}
            id="guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            placeholder="0"
            className="w-full rounded-md border border-white/40 bg-white/10 px-3 py-2 mt-2 
                 text-sm text-white placeholder-white/70 outline-none 
                 focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 
               bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 
               hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 
               transition-all text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-70"
        >
          <img src={assets.searchIcon} alt="search" className="h-6 invert" />
          <span>{loading ? "Searching..." : "Find Hotels"}</span>
        </button>
      </form>


      {/* Results Section */}
      {!loading && (hotels.length > 0 || error) && (
        <div className="mt-16 w-[90%] md:w-[80%] lg:w-[70%] text-white">
          {error && <p className="text-red-400 text-center">{error}</p>}

          {!loading && hotels.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          )}

          {!loading && hotels.length === 0 && !error && (
            <p className="text-center text-white/80">
              No hotels found. Try another search.
            </p>
          )}
        </div>
      )}




    </div>

  )
}

export default Hero
