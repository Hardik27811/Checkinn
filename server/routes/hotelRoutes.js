const express = require('express')
const  hotelModel = require('../models/hotelModel')

const route = express.Router();


route.get("/hotels",async(req,res)=>{
    try {
        const hotel = await hotelModel.find()
        if(!hotel){
            return res.status(404).json({message : "No hotel found"})
        }
        res.status(200).json({hotels : hotel})
        
    } catch (error) {
        console.error("Error fetching room details:", error);
        res.status(500).json({ message: "Server error", error });
    }
}) 

route.post("/hotel-filter/",async(req,res)=>{
    try {
        const {roomType,minPrice,maxPrice} = req.body;

    } catch (error) {
        
    }
})

route.post("/search-hotels", async (req, res) => {
  try {
    const { destination, checkIn, checkOut, guests } = req.body;


    const hotels = await Hotel.find({
      location: { $regex: destination, $options: "i" },
    }).populate("rooms");

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found for this destination" });
    }


    const filteredHotels = hotels.map((hotel) => {
      const availableRooms = hotel.rooms.filter((room) => {
        const canAccommodate = room.maxGuests >= guests;
        const isAvailable =
          !room.bookedDates ||
          room.bookedDates.every(
            (b) => checkOut <= b.checkIn || checkIn >= b.checkOut
          );
        return canAccommodate && isAvailable;
      });

      return { ...hotel.toObject(), rooms: availableRooms };
    });


    const hotelsWithAvailableRooms = filteredHotels.filter(
      (hotel) => hotel.rooms.length > 0
    );

    res.status(200).json({
      success: true,
      count: hotelsWithAvailableRooms.length,
      hotels: hotelsWithAvailableRooms,
    });
  } catch (error) {
    console.error("Search hotels error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = route;