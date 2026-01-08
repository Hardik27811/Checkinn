const express = require('express')

const { verifyToken, isOwner } = require('../middlewares/authMiddleware')

 
const Booking = require("../models/bookingModels.js")
const Room = require( "../models/roomModels.js");
const Hotel = require( "../models/hotelModel.js");
const  sendEmail  = require( "../utils/sendEmail.js");

const route = express.Router()

route.post("/book-room",verifyToken,async(req,res)=>{
    try {
        const { roomId, hotelId, checkIn, checkOut, guests } = req.body;
        const booking = await Booking.create({
        user: req.user.userId,
        hotel: hotelId,
        room: roomId,
        checkIn,
        checkOut,
        guests,
        });
        await Room.findByIdAndUpdate(roomId, {
      $push: { bookedDates: { checkIn, checkOut } },
    });
    const hotel = await Hotel.findById(hotelId).populate("ownerId");
    // console.log( req.user);

    // Email to user
    await sendEmail(
      req.user.email,
      "Booking Confirmed",
      `<h2>Your booking is confirmed</h2>
       <p>Check-in: ${checkIn}</p>
       <p>Check-out: ${checkOut}</p>`
    );

    // await sendEmail(
    //   hotel.owner.email,
    //   "New Booking Received ",
    //   `<p>You received a new booking.</p>`
    // );
    res.status(201).json({ success: true, booking });



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Booking failed" });
    }
})

route.get("/booking", verifyToken, async (req, res) => {
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
});

module.exports = route;

// route.get("/owner/booking",verifyToken,isOwner,async(req,res)=>{
//   try {
//     const hotel = await Hotel.find({ownerId : req.user.userId})
//     const booking = await Booking.find({hotel : hotel._id})

//     console.log(hotel );
//     console.log(booking);
    
    

//     res.status(200).json({
//       sucess :true,
//       count : booking.length,
//       booking
//     })
//   } catch (error) {
//     onsole.error("Get bookings error:", error);
//     res.status(500).json({ message: "Failed to fetch bookings" });
    
//   }
// })

route.get("/owner/booking", verifyToken, isOwner, async (req, res) => {
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
});
