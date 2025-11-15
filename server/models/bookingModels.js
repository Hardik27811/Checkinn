const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel"
    },
    checkIn: Date,
    checkOut: Date,
    guests: Number,
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    }
}
)

const bookingModels = mongoose.model("bookingData", bookingSchema)

module.exports = bookingModels