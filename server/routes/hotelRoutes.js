const express = require('express')
const hotelModel = require('../models/hotelModel')

const route = express.Router();


route.get("/hotels", async (req, res) => {
  try {
    const hotel = await hotelModel.find().populate({
      path : "ownerId",
      select : "email"
    })
    if (!hotel) {
      return res.status(404).json({ message: "No hotel found" })
    }
    
    res.status(200).json({ hotels: hotel })

  } catch (error) {
    console.error("Error fetching room details:", error);
    res.status(500).json({ message: "Server error", error });
  }
})

route.post("/hotel-filter/", async (req, res) => {
  try {
    const { roomType, minPrice, maxPrice } = req.body;

  } catch (error) {

  }
})

route.post("/search-hotels", async (req, res) => {
  try {
    const { destination, checkIn, checkOut, guests } = req.body;

    // Find hotels by destination (case-insensitive)
    let hotels = await hotelModel
      .find({
        location: { $regex: destination || "", $options: "i" },
      })
      .populate("rooms");

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found for this destination" });
    }

    // If NO dates are provided → just return all matching hotels with all their rooms
    if (!checkIn || !checkOut) {
      const hotelsWithAllRooms = hotels.map((hotel) => ({
        ...hotel.toObject(),
        rooms: hotel.rooms, // return all rooms, no filtering
      }));

      return res.status(200).json({
        success: true,
        count: hotelsWithAllRooms.length,
        hotels: hotelsWithAllRooms,
      });
    }

    // Only if dates ARE provided → filter by availability and guests
    const filteredHotels = hotels.map((hotel) => {
      const availableRooms = hotel.rooms.filter((room) => {
        const canAccommodate = guests ? room.maxGuests >= guests : true;

        const noOverlap =
          !room.bookedDates ||
          room.bookedDates.every(
            (b) =>
              new Date(checkOut) <= new Date(b.checkIn) ||
              new Date(checkIn) >= new Date(b.checkOut)
          );

        return canAccommodate && noOverlap;
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