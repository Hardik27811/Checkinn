import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StartRating from '../components/StartRating';
import api from '../services/api';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
    <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
    <span className='font-light select-none'>{label}</span>
  </label>
);

function AllRooms() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);

  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortBy, setSortBy] = useState("");

  
  const params = new URLSearchParams(location.search);
  const hotelId = params.get("hotelId");
  const destination = params.get("destination");

  // Fetch rooms based on hotelId or destination
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError("");

        let url = "";
        if (hotelId) {
          url = `hotel/rooms?hotelId=${hotelId}`;
        } else if (destination) {
          url = `hotel/rooms?destination=${destination}`;
        } else {
          url = `/hotel/rooms`;
        }

        const res = await api.get(url, { withCredentials: true });
        const roomsData = res.data.rooms || [];

        setRooms(roomsData);
        setFilteredRooms(roomsData);

        // Extract unique hotel locations for filter sidebar
        const locations = [...new Set(roomsData.map(r => r.hotelId?.location).filter(Boolean))];
        setAvailableLocations(locations);

        // Pre-select location if hotelId or destination is present
        if (hotelId && locations.length === 1) {
          setSelectedLocations(locations); // only that hotel's location
        } else if (destination && locations.includes(destination)) {
          setSelectedLocations([destination]);
        }

        if (roomsData.length === 0) {
          setError(hotelId 
            ? "No rooms available for this hotel." 
            : destination 
              ? `No rooms found in ${destination}` 
              : "No rooms available.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch rooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId, destination]);

  // Filters
  const handleLocationChange = (checked, location) => {
    if (checked) setSelectedLocations([...selectedLocations, location]);
    else setSelectedLocations(selectedLocations.filter(l => l !== location));
  };

  const handlePriceChange = (checked, range) => {
    if (checked) setSelectedPrices([...selectedPrices, range]);
    else setSelectedPrices(selectedPrices.filter(r => r !== range));
  };

  // Apply filters & sorting
  useEffect(() => {
    let tempRooms = [...rooms];

    if (selectedLocations.length > 0) {
      tempRooms = tempRooms.filter(r => selectedLocations.includes(r.hotelId?.location));
    }

    if (selectedPrices.length > 0) {
      tempRooms = tempRooms.filter(r =>
        selectedPrices.some(range => {
          const [min, max] = range.replace("₹", "").split("to").map(Number);
          return r.pricePerNight >= min && r.pricePerNight <= max;
        })
      );
    }

    // Sorting
    if (sortBy === "Price Low to High") tempRooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sortBy === "Price High to Low") tempRooms.sort((a, b) => b.pricePerNight - a.pricePerNight);

    setFilteredRooms(tempRooms);
  }, [selectedLocations, selectedPrices, sortBy, rooms]);

  if (loading) return <p className="text-center mt-20">Loading rooms...</p>;

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Rooms List */}
      <div className='flex-1'>
        <h1 className='font-playfair text-4xl mb-4'>Available Rooms</h1>
        {error && <p className="text-center text-red-500 mt-10">{error}</p>}
        {filteredRooms.length === 0 && !error && <p className="text-center text-gray-500 mt-10">No rooms matching your filters</p>}

        {filteredRooms.map(room => (
          <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 px-5 last:border-0'>
            <img
              onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0); }}
              src={room.roomImages[0]} alt={room.roomType}
              className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'
            />
            <div className='md:w-1/2 flex flex-col gap-2'>
              <p className='text-gray-500'>{room.hotelId?.location}</p>
              <p className='text-gray-800 text-3xl font-playfair cursor-pointer'>
                {room.hotelId?.name} - {room.roomType}
              </p>
              <div className='flex items-center'>
                <StartRating />
                <p className='ml-2 '>200+ reviews</p>
              </div>
              <p className='mt-2 text-gray-600'>₹{room.pricePerNight}/Night</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Sidebar */}
      {/* Container: Full width on mobile, fixed width on Large screens */}
<div className='w-full md:w-full lg:w-80 lg:ml-8 flex-shrink-0 mb-6 lg:mb-0'>
  
  {/* The Card: Adjust margins for different screens */}
  <div className='bg-white w-full border rounded-md border-gray-300 text-gray-600 mt-4 md:mt-8 lg:mt-16'>
    
    {/* Header */}
    <div className='flex items-center justify-between px-5 py-2.5 border-b border-gray-300'>
      <p className='text-base font-medium text-gray-800'>FILTERS</p>
      
      {/* Optional: Add a "Clear All" button visible only on mobile for better UX */}
      <button className='text-xs text-blue-600 lg:hidden'>Clear All</button>
    </div>

    {/* Content Area: Grid layout on tablets, single column on mobile/desktop */}
    <div className='px-5 pt-5 pb-5'>
      <p className='font-medium text-gray-800 pb-2'>Location</p>
      
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-1">
        {availableLocations.map((loc, index) => (
          <CheckBox
            key={index}
            label={loc}
            selected={selectedLocations.includes(loc)}
            onChange={handleLocationChange}
          />
        ))}
      </div>
    </div>
    
  </div>
</div>

    </div>
  );
}

export default AllRooms;
