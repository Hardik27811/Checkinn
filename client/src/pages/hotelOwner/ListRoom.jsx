import React, { useEffect, useState } from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title'
import { useUser } from '../../context/UserContext'
import axios from 'axios'
const ListRoom = () => {
    
    const [rooms,setRooms] = useState(roomsDummyData)
  const [hotelInfo, setHotelInfo] = useState([]);


  useEffect(() => {
    const hotelDetail = async () => {
      try {
        const res = await axios.get("https://checkinn-rh1m.onrender.com/owner/dashboard", {
          withCredentials: true,
        });
        setHotelInfo(res.data);

      } catch (err) {
        console.error(err);
      }
    };
    hotelDetail();
  }, []);
 console.log(hotelInfo[0]?.rooms);
 
  
    
    
  return (
    <div>
        <Title align='left' font='outfit' title='Room Listings' subTitle='View, edit
        or manage all listed rooms. Keep the information up-to-date to provide
        the best experience for users.' />
        <p className='text-gray-500 mt-8'>All Rooms</p>
        {/* <p>{roomsData}</p> */}
        {/* {hotelInfo[0]?.rooms.map((room,index)=>{
            return(
                <p key={index}>{room.roomType}</p>
            )
        })} */}

         <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg
          max-h-80 overflow-y-scroll mt-3'>
            <table className='w-full '>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                        <th className='py-3 px-4 text-gray-800 font-medium
                        max-sm:hidden'>Facility</th>
                        <th className='py-3 px-4 text-gray-800 font-medium
                        text-center'>Price / night</th>
                        <th className='py-3 px-4 text-gray-800 font-medium
                        text-center'>Avaliability</th>
                        

                    </tr>
                </thead>
                <tbody className='text-sm'>
                    {hotelInfo[0]?.rooms.map((item,index)=>(
                        <tr key={index}>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                {item.roomType}
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                {item.amenities.join(', ')}
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                                {item.pricePerNight}
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-sm text-center read-only: text-red-500'>
                                <label htmlFor="checkbox" className='relative inline-flex items-center cursor-pointer
                                text-gray-900 gap-3'>
                                    <input type="checkbox" className='sr-only peer' checked={item.isAvailable} />
                                    <div className='w-12 h-7 bg-state-300 rounded-full peer peer-checked:bg-blue-600
                                    transition-colors duration-200'></div>
                                    <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full 
                                    transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
    </div>
  )
}

export default ListRoom