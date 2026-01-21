
const Booking = require('../models/bookingModels.js')
const Room = require( "../models/roomModels.js");
const Hotel = require( "../models/hotelModel.js");
const  sendEmail  = require( "../utils/sendEmail.js");



exports.bookRoom = async (req, res) => {
  try {
    const { roomId, hotelId, checkIn, checkOut, guests } = req.body;

    if (!roomId || !hotelId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (guests > room.capacity) {
      return res.status(400).json({
        message: `Maximum ${room.capacity} guests allowed`,
      });
    }

    //check for overlapping bookings
    const isOverlapping = room.bookedDates?.some((b) => {
      return !(
        new Date(checkOut) <= new Date(b.checkIn) ||
        new Date(checkIn) >= new Date(b.checkOut)
      );
    });

    if (isOverlapping) {
      return res
        .status(409)
        .json({ message: "Room already booked for selected dates" });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user.userId,
      hotel: hotelId,
      room: roomId,
      checkIn,
      checkOut,
      guests,
    });

    // Lock dates
    await Room.findByIdAndUpdate(roomId, {
      $push: { bookedDates: { checkIn, checkOut } },
    });

    const hotel = await Hotel.findById(hotelId).populate("ownerId");

    // Email to user
    await sendEmail(
      req.user.email,
      "Booking Confirmed ",
      `
        <h2>Your booking is confirmed</h2>
        <p><strong>Hotel:</strong> ${hotel.name}</p>
        <p><strong>Check-in:</strong> ${checkIn}</p>
        <p><strong>Check-out:</strong> ${checkOut}</p>
        <p><strong>Guests:</strong> ${guests}</p>
      `
    );

    // Email to hotel owner
    if (hotel?.ownerId?.email) {
      await sendEmail(
        hotel.ownerId.email,
        "New Booking Received",
        `<p>You have a new booking for <b>${hotel.name}</b></p>`
      );
    }

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
}


exports.booking =  async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
    //   .populate("hotel", "name location hotelImage")
    //   .populate("room", "roomType pricePerNight roomImages")
    //   .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
}

exports.ownerBoooking = async (req, res) => {
  try {
    const hotels = await Hotel.find({ ownerId: req.user.userId });

    if (!hotels.length) {
      return res.status(404).json({ message: "No hotels found for this owner" });
    }

    const hotelIds = hotels.map(hotel => hotel._id);

    const bookings = await Booking.find({
      hotel: { $in: hotelIds }
    })
      .populate("user", "name email")
      .populate("room", "roomType pricePerNight")
      .populate("hotel", "name location");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
}