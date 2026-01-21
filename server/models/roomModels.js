const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        default: []
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    roomImages: {
        type: [String],
        default: []
    },
    capacity: {
        type: Number,
        default: 2
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    hotelId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "hotelData"
    },
    OwnerId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "userData"
    }
});

module.exports = mongoose.model("roomsData",roomSchema)