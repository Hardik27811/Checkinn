const hotelModel = require('../models/hotelModel')
const roomModel = require('../models/roomModels');
const { populate } = require('../models/userModels');

exports.hotels = async (req, res) => {
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
}


exports.searchHotels = async (req, res) => {
  try {
    const { destination, checkIn, checkOut, guests } = req.body;

    let hotels = await hotelModel
      .find({
        location: { $regex: destination || "", $options: "i" },
      })
      .populate("rooms");

    if (!hotels.length) {
      return res.status(404).json({ message: "No hotels found" });
    }

    // No date filter → return all rooms
    if (!checkIn || !checkOut) {
      return res.status(200).json({
        success: true,
        count: hotels.length,
        hotels,
      });
    }

    const filteredHotels = hotels.map((hotel) => {
      const availableRooms = hotel.rooms.filter((room) => {
        const canAccommodate = guests
          ? room.capacity >= guests
          : true;

        return canAccommodate;
      });

      return { ...hotel.toObject(), rooms: availableRooms };
    });

    const finalHotels = filteredHotels.filter(
      (hotel) => hotel.rooms.length > 0
    );

    res.status(200).json({
      success: true,
      count: finalHotels.length,
      hotels: finalHotels,
    });
  } catch (error) {
    console.error("Search hotels error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.room = async (req, res) => {
  try {
    const room = await roomModel.findById(req.params.id).populate({path :"hotelId" , populate:{path : "ownerId" , select:"firstName lastName email"}});

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ room });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}


exports.rooms =  async (req, res) => {
  const { hotelId, destination } = req.query;

  try {
    let filter = {};

    // hotelId is provided
    if (hotelId) {
      filter.hotelId = hotelId;
    }

    // destination is provided
    if (destination) {
      const hotels = await hotelModel.find({ location: destination }).select("_id");
      const hotelIds = hotels.map(h => h._id);
      filter.hotelId = { $in: hotelIds };
    }

    const rooms = await roomModel
      .find(filter)
      .populate({
        path: "hotelId",
        populate: { path: "ownerId", select: "name email" }
      });

    res.status(200).json({ rooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
}