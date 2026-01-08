import React from 'react'
import heroImg from '../assets/heroImg.jpg'
import { assets } from '../assets/assets'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

    navigate("/rooms", {
      state: {
        destination,
        checkIn,
        checkOut,
        guests
      }
    })
  };


  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("http://localhost:3000/hotels")
        const result = await res.json();
        setHotel(result.hotels)
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
  console.log(hotel);

  console.log(availableLocations);




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
    // <div
    //   className='flex  items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen'
    //   style={{ backgroundImage: `url(${heroImg})` }}
    // >

    //   <div className="text-right md:text-left md:ml-16 mt-10 md:mt-0">
    //     {/* Tagline */}
    //     <p className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 text-white 
    //             px-5 py-2 rounded-full font-semibold tracking-wide w-fit 
    //             shadow-lg text-sm md:text-base">
    //       Discover Your Perfect Stay
    //     </p>
    //     {/* <button onClick={() => logout()}>Logout</button> */}
    //     {/* Heading */}
    //     <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mt-6 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
    //       Find Comfort, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400">Luxury</span>,
    //       and Serenity
    //     </h1>

    //     {/* Subtext */}
    //     <p className="max-w-lg mt-5 text-base md:text-lg text-white/80 leading-relaxed">
    //       Step into a world of elegance and ease. From cozy boutique escapes to
    //       breathtaking resorts, your ideal stay awaits. Let us turn your travel
    //       dreams into unforgettable memories.
    //     </p>

    //     {/* Optional CTA Button */}
    //     <button className="mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 
    //                  hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 
    //                  text-white font-semibold shadow-lg transition-all">
    //       Explore Destinations
    //     </button>
    //   </div>

    //   <form
    //     className="relative bottom-36  mt-80 mr-10
    //     bg-white/20 backdrop-blur text-white rounded-2xl px-8 py-6 shadow-xl 
    //     flex flex-col items-start justify-between gap-6 
    //     w-[30%] max-w-5xl mx-auto border border-white/30"
    //     onSubmit={handleSearch}
    //   >
    //     {/* Destination */}
    //     <div className="w-full">
    //       <div className="flex items-center gap-2">
    //         <img src={assets.locationIcon} alt="location" className="h-5 invert" />
    //         <label htmlFor="destinationInput" className="font-medium text-sm">
    //           Destination
    //         </label>
    //       </div>
    //       <input
    //         list="destinations"
    //         id="destinationInput"
    //         type="text"
    //         value={destination}
    //         onChange={(e) => setDestination(e.target.value)}
    //         placeholder="Where are you going?"
    //         required
    //         className="w-full rounded-md border border-white/40 bg-white/10 px-3 py-2 mt-2 
    //              text-sm text-white placeholder-white/70 outline-none 
    //              focus:ring-2 focus:ring-emerald-400"
    //       />
    //       <datalist id="destinations">
    //         {cities.map((city, index) => (
    //           <option value={city} key={index} />
    //         ))}
    //       </datalist>
    //     </div>
    //     {/* Check In */}
    //     <div className="w-full">
    //       <div className="flex items-center gap-2">
    //         <img src={assets.calenderIcon} alt="calendar" className="h-5 invert" />
    //         <label htmlFor="checkIn" className="font-medium text-sm">Check In</label>
    //       </div>
    //       <input
    //         id="checkIn"
    //         type="date"
    //         value={checkIn}
    //         onChange={(e) => setCheckIn(e.target.value)}
    //         className="w-full rounded-md border border-white/40 bg-white/10 px-3 py-2 mt-2 
    //              text-sm text-white outline-none focus:ring-2 focus:ring-emerald-400"
    //       />
    //     </div>

    //     {/* Check Out */}
    //     <div className="w-full">
    //       <div className="flex items-center gap-2">
    //         <img src={assets.calenderIcon} alt="calendar" className="h-5 invert" />
    //         <label htmlFor="checkOut" className="font-medium text-sm">Check Out</label>
    //       </div>
    //       <input
    //         id="checkOut"
    //         type="date"
    //         value={checkOut}
    //         onChange={(e) => setCheckOut(e.target.value)}
    //         className="w-full rounded-md border border-white/40 bg-white/10 px-3 py-2 mt-2 
    //              text-sm text-white outline-none focus:ring-2 focus:ring-emerald-400"
    //       />
    //     </div>

    //     {/* Guests */}
    //     <div className="w-full">
    //       <label htmlFor="guests" className="font-medium text-sm">Guests</label>
    //       <input
    //         min={1}
    //         max={8}
    //         id="guests"
    //         type="number"
    //         value={guests}
    //         onChange={(e) => setGuests(Number(e.target.value))}
    //         placeholder="0"
    //         className="w-full rounded-md border border-white/40 bg-white/10 px-3 py-2 mt-2 
    //              text-sm text-white placeholder-white/70 outline-none 
    //              focus:ring-2 focus:ring-emerald-400"
    //       />
    //     </div>

    //     {/* Search Button */}
    //     <button
    //       type="submit"
    //       disabled={loading}
    //       className="w-full flex items-center justify-center gap-2 
    //            bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 
    //            hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 
    //            transition-all text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-70"
    //     >
    //       <img src={assets.searchIcon} alt="search" className="h-6 invert" />
    //       <span>{loading ? "Searching..." : "Find Hotels"}</span>
    //     </button>
    //   </form>


    //   {/* Results Section */}
    //   {/* {!loading && (hotels.length > 0 || error) && (
    //     <div className="mt-16 w-[90%] md:w-[80%] lg:w-[70%] text-white">
    //       {error && <p className="text-red-400 text-center">{error}</p>}

    //       {!loading && hotels.length > 0 && (
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //           {hotels.map((hotel) => (
    //             <HotelCard key={hotel._id} hotel={hotel} />
    //           ))}
    //         </div>
    //       )}

    //       {!loading && hotels.length === 0 && !error && (
    //         <p className="text-center text-white/80">
    //           No hotels found. Try another search.
    //         </p>
    //       )}
    //     </div>
    //   )} */}




    // </div>
  //   <div
  //     className='flex  items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen'
  //     style={{ backgroundImage: `url(${heroImg})` }}
  //   >

  //     <div className="text-right md:text-left md:ml-16 mt-10 md:mt-0">
  //       {/* Tagline */}
  //       <p
  //         className="
  //         bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 
  //         text-white font-semibold tracking-wide shadow-lg rounded-full

  //         px-3 py-1.5 text-xs text-center mx-auto
  //         sm:px-4 sm:py-2 sm:text-sm
  //         md:px-5 md:py-2.5 md:text-base md:mx-0

  //         w-fit
  //       "
  //       >
  //         Discover Your Perfect Stay
  //       </p>



  //       <h1
  //         className="
  //   font-serif font-bold text-white leading-tight
  //   drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]

  //   text-2xl mt-4 text-center
  //   sm:text-3xl sm:mt-5
  //   md:text-5xl md:mt-6 md:text-left
  //   lg:text-6xl
  // "
  //       >
  //         Find Comfort,&nbsp;
  //         <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400">
  //           Luxury
  //         </span>
  //         , and Serenity
  //       </h1>



  //       <p
  //         className="
  //         max-w-lg mt-4 text-sm text-white/80 leading-relaxed text-center
  //         sm:text-base sm:mt-5
  //         md:text-lg md:text-left
  //       "
  //       >
  //         Step into a world of elegance and ease. From cozy boutique escapes to
  //         breathtaking resorts, your ideal stay awaits. Let us turn your travel
  //         dreams into unforgettable memories.
  //       </p>



  //       <button
  //         className="
  //         mt-6 w-full max-w-xs mx-auto
  //         px-5 py-2.5 text-sm rounded-lg
  //         bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500
  //         hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600
  //         text-white font-semibold shadow-lg transition-all

  //         sm:px-6 sm:py-3 sm:text-base sm:hidden
  //         md:mt-8 md:mx-0 md:w-auto
  //       "
  //       >
  //         Explore Destinations
  //       </button>

  //     </div>

  //     <form
  //       onSubmit={handleSearch}
  //       className="
  //         mt-8
  //         bg-white/20 backdrop-blur-md text-white
  //         rounded-2xl px-6 py-5 shadow-xl
  //         border border-white/30

  //         flex flex-row flex-wrap gap-4
  //         md:flex-row
  //         lg:flex-col lg:w-[320px]

  //         max-w-6xl mx-auto
  //       "
  //     >
  //       {/* Destination */}
  //       <div className="flex-1 min-w-[180px] lg:w-full">
  //         <label className="text-sm font-medium">Destination</label>
  //         <input
  //           list="destinations"
  //           value={destination}
  //           onChange={(e) => setDestination(e.target.value)}
  //           placeholder="Where are you going?"
  //           className="
  //             w-full mt-1 px-3 py-2
  //             rounded-md border border-white/40
  //             bg-white/10 text-sm text-white
  //             placeholder-white/70 outline-none
  //             focus:ring-2 focus:ring-emerald-400
  //           "
  //         />
  //         <datalist id="destinations">
  //           {availableLocations && availableLocations.map((city, index) => (
  //             <option key={index} value={city} />
  //           ))}
  //         </datalist>
  //       </div>

  //       {/* Check In */}
  //       <div className="flex-1 min-w-[140px] lg:w-full">
  //         <label className="text-sm font-medium">Check In</label>
  //         <input
  //           type="date"
  //           value={checkIn}
  //           onChange={(e) => setCheckIn(e.target.value)}
  //           className="
  //             w-full mt-1 px-3 py-2
  //             rounded-md border border-white/40
  //             bg-white/10 text-sm text-white
  //             outline-none focus:ring-2 focus:ring-emerald-400
  //           "
  //         />
  //       </div>

  //       {/* Check Out */}
  //       <div className="flex-1 min-w-[140px] lg:w-full">
  //         <label className="text-sm font-medium">Check Out</label>
  //         <input
  //           type="date"
  //           value={checkOut}
  //           onChange={(e) => setCheckOut(e.target.value)}
  //           className="
  //             w-full mt-1 px-3 py-2
  //             rounded-md border border-white/40
  //             bg-white/10 text-sm text-white
  //             outline-none focus:ring-2 focus:ring-emerald-400
  //           "
  //         />
  //       </div>

  //       {/* Guests */}
  //       <div className="flex-1 min-w-[120px] lg:w-full">
  //         <label className="text-sm font-medium">Guests</label>
  //         <input
  //           type="number"
  //           min={1}
  //           max={8}
  //           value={guests}
  //           onChange={(e) => setGuests(Number(e.target.value))}
  //           className="
  //             w-full mt-1 px-3 py-2
  //             rounded-md border border-white/40
  //             bg-white/10 text-sm text-white
  //             outline-none focus:ring-2 focus:ring-emerald-400
  //           "
  //         />
  //       </div>

  //       {/* Button */}
  //       <button
  //         type="submit"
  //         disabled={loading}
  //         className="
  //           flex items-center justify-center
  //           min-w-[160px] h-[42px]
  //           bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500
  //           hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600
  //           transition-all text-white font-semibold
  //           rounded-lg shadow-md
  //           disabled:opacity-70

  //           lg:w-full lg:mt-3
  //         "
  //       >
  //         {loading ? "Searching..." : "Find Hotels"}
  //       </button>
  //     </form>




  //     {/* Results Section */}
  //     {/* {!loading && (hotels.length > 0 || error) && (
  //       <div className="mt-16 w-[90%] md:w-[80%] lg:w-[70%] text-white">
  //         {error && <p className="text-red-400 text-center">{error}</p>}

  //         {!loading && hotels.length > 0 && (
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //             {hotels.map((hotel) => (
  //               <HotelCard key={hotel._id} hotel={hotel} />
  //             ))}
  //           </div>
  //         )}

  //         {!loading && hotels.length === 0 && !error && (
  //           <p className="text-center text-white/80">
  //             No hotels found. Try another search.
  //           </p>
  //         )}
  //       </div>
  //     )} */}




  //   </div>
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
