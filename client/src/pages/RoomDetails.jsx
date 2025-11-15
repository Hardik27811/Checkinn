import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, } from '../assets/assets';
import StartRating from '../components/StartRating';
import axios from 'axios';

function RoomDetails() {
    const { id } = useParams(null);

    const [room, setRoom] = useState(null);

    const [hotel,setHotel]= useState(null);
    const [mainImage, setMainImage] = useState(room?.roomImages[0]);
    // const [hotel, setHotel] = useState([])


    useEffect(() => {
        try {
            const fetchrooms = async () => {
                
                const res1 = await axios.get("http://localhost:3000/hotels", {
                        withCredentials: true
                    })
                const hotel = res1.data.hotels;
                const matchedHotels = await hotel?.find((hotel => hotel.rooms.filter(h=> h._id === id) ))
                setHotel(matchedHotels)
                
             
                const res = await axios.get('http://localhost:3000/rooms', {
                    withCredentials: true,
                })
                const allRooms = res.data.rooms;
                const matchedRooms = await allRooms?.find((room) => room._id === id)
                setRoom(matchedRooms)
            }
            fetchrooms();
        } catch (error) {
            console.error('Error fetching hotel or rooms:', error);
        }
    }, []);
        useEffect(() => {
        if (room && room.roomImages && room.roomImages.length > 0) {
            setMainImage(room.roomImages[0]);
        }
        }, [room]);


    console.log(hotel);


    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 '>
            
            {/* Room Details */}
            <div className='flex flex-col md:flex-row  items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>{hotel.name }
                    <span className='font-inter text-sm'> ( {room.roomType})</span></h1>
                <p
                    className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
            </div>

            {/* Room Raitings  */}
            <div className='flex items-center gap-1 mt-2'>
                <StartRating />
                <p className='ml-2'>200+ Reviews</p>
            </div>

            {/* Room Address  */}
            {/* <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
            </div> */}

            {/* Room Images  */}

            <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                <div className='lg:w-1/2 w-full'>
                    <img
                        className='w-full rounded-xl shadow-lg object-cover  h-100'
                        src={mainImage} alt="Room Image" />
                </div>
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room?.roomImages.length > 1 && room.roomImages.map((image, index) => (
                        <img
                            className={`w-full rounded-xl shadow-md object-cover  h-48
                cursor-pointer ${mainImage === image &&
                                'outline-3 outline-orange-500'}`}
                            onClick={() => setMainImage(image)}
                            key={index} src={image} alt="Room Image" />
                    ))}
                </div>
            </div>

            {/* Room Higlights */}
            <div className='flex flex-col md:flex-row md:justify-between mt-10'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>
                        Experience Luxury Like Never Before</h1>
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 
                            rounded-lg bg-gray-100'>
                                <img src={facilityIcons[item]} alt={item}
                                    className='h-5 w-5' />
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Room price */}
                <p className='text-2xl font-medium'>₹{room.pricePerNight}/Night</p>
            </div>
            <form className='flex flex-col md:flex-row items-start md:items-center
        justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6
         rounded-xl  mx-auto mt-16  max-w-6xl'>
                <div className='flex flex-col flex-wrap md:flex-row items-start
            md:items-center gap-4 md:gap-10 text-gray-500'>

                    <div className='flex flex-col'>
                        <label className='font-medium'
                            htmlFor="checkInDate">Check-In</label>
                        <input type="date"
                            id='checkInDate' placeholder='check-In'
                            className='w-full rounded border border-gray-300 px-3 py-2
                mt-1.5 outline-none'
                            required
                        />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label className='font-medium'
                            htmlFor="checkOutDate">Check-Out</label>
                        <input type="date"
                            id='checkOutDate' placeholder='check-Out'
                            className='w-full rounded border border-gray-300 px-3 py-2
                mt-1.5 outline-none'
                            required
                        />
                    </div>

                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

                    <div className='flex flex-col'>
                        <label className='font-medium'
                            htmlFor="guests">Guests</label>
                        <input type="number"
                            id='gyests' placeholder='guests'
                            className='max-w-20 rounded border border-gray-300 px-3 py-2
                mt-1.5 outline-none'
                            required
                        />
                    </div>

                </div>
                <button
                    className='bg-primary hover:bg-primary-dull active:scale-95
            transition-all text-white rounded-md max-md max-md:w-full
            max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer '
                    type='submit'>
                    {/* Check Availability */}
                    Book Now
                </button>
            </form>
            {/* Common Specifications */}
            <div className='mt-25 space-y-4'>
                {roomCommonData.map((spec, index) => (
                    <div className='flex items-start gap-2'>
                        <img src={spec.icon} alt={`${spec.title}.icon`}
                            className='w-6.5' />
                        <div>
                            <p className='text-base'>{spec.title}</p>
                            <p className='text-gray-500'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
                <p>Guests will be allocated on the ground floor according to availability.
                    You will get a comfortable Two-bedroom apartment has a true city feeling.
                    The price quoted is for two guests. At the guest slot, please mark the number of
                    guests to get the exact price for groups. The guests will be allocated ground
                    floor according to availability. You get the comfortable two-bedroom apartment
                    that has a true city feeling.
                </p>
            </div>

            {/* Hosted by */}
            <div className='flex flex-col items-start gap-4'>
                <div className='flex gap-4'>
                    {/* <img src='/Users/hardiksharma/Desktop/hotelbooking/client/src/assets/regImage.png' alt="Host" */}
                    {/* className='h-14 w-14 md:h-18 rounded-full' /> */}
                    <div>
                        <p className='text-lg md:text-xl'>Hosted by <span className='text-3xl bold'>{hotel.name}</span></p>
                        <div className='flex items-center mt-1'>
                            <StartRating />
                            <p>200+ reviews</p>
                        </div>
                    </div>
                </div>
                <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary
            hover:bg-primary-dull transition-all cursor-pointer'>Contact Now</button>
            </div>

        </div>

    )
}

export default RoomDetails