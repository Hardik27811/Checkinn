import React, { useEffect, useState } from 'react'
import { facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import StartRating from '../components/StartRating'
import { assets } from '../assets/assets'
import axios from 'axios'
// import { checkout } from '../../../server/routes/hotelRoutes'

const CheckBox = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type="radio" name='sortOption' checked={selected} onChange={() => onChange(label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

function AllRooms() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [openFilters, setOpenFilters] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [hotel, setHotel] = useState([])
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [availableLocations, setAvailableLocations] = useState([]);
    const [hotelLocations,setHotelLocations] = useState([]);

    console.log(state);
    
useEffect(() => {
  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError("");

      let res;

      // If user has entered a destination → use search endpoint
      if (state?.destination) {
        const payload = {
          destination: state.destination,
        };

        // Only add dates if both are provided and valid (not empty strings)
        if (state.checkIn && state.checkOut) {
          payload.checkIn = state.checkIn;
          payload.checkOut = state.checkOut;
        }

        // Only add guests if it's a valid number > 0
        if (state.guests && Number(state.guests) > 0) {
          payload.guests = Number(state.guests);
        }

        res = await axios.post(
          "https://checkinn-rh1m.onrender.com/search-hotels",
          payload,
          { withCredentials: true }
        );
      } else {
        // No destination → show all hotels (fallback)
        res = await axios.get(
          "https://checkinn-rh1m.onrender.com/hotels",
          { withCredentials: true }
        );
      }

      const hotelsData = res.data.hotels || [];

      setHotel(hotelsData);
      setFilteredHotels(hotelsData);

      // Optional: Show friendly message if no hotels found
      if (hotelsData.length === 0) {
        setError(
          state?.destination
            ? `No hotels found in ${state.destination}`
            : "No hotels available at the moment"
        );
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setHotel([]);
      setFilteredHotels([]);
      setError("Failed to load hotels. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchHotels();
}, [state]); // Re-run when any part of state changes (destination, dates, guests)



useEffect(()=>{
    const fetchHotelLocations = async ()=>{
        const res = await fetch("https://checkinn-rh1m.onrender.com/hotels") 
        const result = await res.json();
        setHotelLocations(result.hotels)
    }
    fetchHotelLocations()
},[])
console.log(hotelLocations);

    // for locations
    useEffect(() => {
        const locations = [...new Set(hotelLocations.map(h => h.location))];
        setAvailableLocations(locations);
    }, [hotelLocations]);

    const handleLocationChange = (checked, location) => {
        if (checked) {
            setSelectedLocations([...selectedLocations, location]);
        } else {
            setSelectedLocations(
                selectedLocations.filter(loc => loc !== location)
            );
        }
    };
    //for price
    const handlePriceChange = (checked, label) => {
        if (checked) {
            setSelectedPrices([...selectedPrices, label]);
        } else {
            setSelectedPrices(selectedPrices.filter(p => p !== label));
        }
    };

    useEffect(() => {
        let tempHotels = [...hotel];
         if (selectedLocations.length > 0) {
            tempHotels = tempHotels.filter(h =>
            selectedLocations.includes(h.location)
            );
        }
        if (selectedPrices.length > 0) {
            tempHotels = tempHotels.filter(hotel =>
                selectedPrices.some(range => {
                    const [min, max] = range
                        .replace("₹", "")
                        .split("to")
                        .map(Number);

                    return hotel.price >= min && hotel.price <= max;
                })
            );
        }

        setFilteredHotels(tempHotels);
    }, [selectedLocations,selectedPrices, hotel]);
    // for sorting
    useEffect(() => {
        let tempHotels = [...filteredHotels];

        if (sortBy === "Price Low to Hight") {
            tempHotels.sort((a, b) => a.price - b.price);
        }

        if (sortBy === "Price Hight to Low") {
            tempHotels.sort((a, b) => b.price - a.price);
        }

        setFilteredHotels(tempHotels);
    }, [sortBy]);

    // console.log(hotel);



    return (
        <div className='flex flex-col-reverse  lg:flex-row items-start justify-between pt-28 md:pt-35 px-4  
        md:px-16 lg:px-24 xl:px-32'>
            <div>
                <div className='flex flex-col items-start text-left'>
                    <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2 '>Take advantage of our
                        limited-time offers and special packages to enhance your stay nd create<br /> unforgettable memories.
                    </p>
                </div>
                {loading && <p>Loading hotels...</p>}
                {!loading && error && (
                    <p className="text-center text-red-500 mt-10">{error}</p>
                )}
                {!loading && filteredHotels.length === 0 && !error && (
                    <p className="text-center text-gray-500 mt-10">
                        No hotels matching your filters
                    </p>
                )}
                {filteredHotels.length > 0 && filteredHotels.map((hot) => (
                    <div key={hot?._id} className='flex flex-col md:flex-row items-start 
                py-10 gap-6 border-b border-gray-300  px-5 last:pb-30 last:border-0 '>
                        <img
                            onClick={() => { navigate(`/hotelrooms/${hot?._id}`); scrollTo(0, 0) }}
                            src={hot?.hotelImage[0]} alt="hotel=img" title='View Room Details'
                            className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer' />
                        <div className='md:w-1/2 flex flex-col gap-2'>
                            <p
                                onClick={() => { navigate(`/hotelrooms/${hot?._id}`); scrollTo(0, 0) }}
                                className='text-gray-500'>{hot.location}</p>
                            <p className='text-gray-800 text-3xl font-playfair cursor-pointer'>{hot?.name}</p>
                            <div className='flex items-center'>
                                <StartRating />
                                <p className='ml-2 '>200+ reviews</p>
                            </div>
                            <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                                <img src={assets.locationIcon} alt="location-icon" />
                                <span>{hot?.location}</span>
                            </div>

                           
                        </div>
                    </div>
                ))}

            </div>

           
            <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}> 
            <div className='bg-white w-80 border rounded-md border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16'>
                <div className={`flex items-center justify-between px-5 py-2.5 lg:border-b border-gray-300 ${openFilters && "border-b"}`}>
                    <p className='text-base font-medium text-gray-800'>FILTERS</p>
                    <div className='text-xs cursor-pointer'>
                        <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
                            {openFilters ? 'HIDE' : 'SHOW'}
                        </span>
                        <span className='hidden lg:block'>CLEAR</span>
                    </div>
                </div>
                <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700 pb-5`}>
                 
                    <div className='px-5 pt-5'>
                    <p className='font-medium text-gray-800 pb-2'>Location</p>

                    {availableLocations.map((loc, index) => (
                        <CheckBox
                        key={index}
                        label={loc}
                        selected={selectedLocations.includes(loc)}
                        onChange={handleLocationChange}
                        />
                    ))}
                    </div>
                    {/* <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Price Range</p>
                        {priceRanges.map((range, index) => (
                            <CheckBox
                                key={index}
                                label={`₹ ${range}`}
                                selected={selectedPrices.includes(`₹ ${range}`)}
                                onChange={handlePriceChange}
                            />
                        ))}
                    </div>
                    <div className='px-5 pt-5 pb-7'>
                        <p className='font-medium text-gray-800 pb-2'>Sort By</p>
                        {sortOptions.map((option, index) => (
                            <RadioButton
                                key={index}
                                label={option}
                                selected={sortBy === option}
                                onChange={setSortBy}
                            />
                        ))}
                    </div> */}
                </div>


            </div>
        </div>
    </div>
    )
}

export default AllRooms