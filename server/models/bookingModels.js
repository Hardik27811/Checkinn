const mongoose = require('mongoose')


const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userdata" },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "hoteldata" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "roomdata" },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  status: { type: String, default: "confirmed" },
}, { timestamps: true });
const bookingModels = mongoose.model("bookingData", bookingSchema)

module.exports = bookingModels