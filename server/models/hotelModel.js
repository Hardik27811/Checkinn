const mongoose = require('mongoose')




const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        default:"xyz Inn",
        required: true
    },
    location: {
        type: String,
        default :"xyz city"
    },
    description: {
        type: String,
        default : "Enter description here..."
    },
    Images: [String],
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData",
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    rooms: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'roomsData'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    hotelImage :{
        type : [String],
        default :'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    }
})

const hotelModels = mongoose.model("hotelData", hotelSchema)

module.exports = hotelModels