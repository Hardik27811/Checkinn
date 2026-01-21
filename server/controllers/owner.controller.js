const hotelModels = require('../models/hotelModel')
const userModel = require('../models/userModels')
const roomModels = require("../models/roomModels")
const { default: axios } = require('axios')

const {uplaodOnCloudinary} = require("../utils/cloudinary")

exports.dashboard = async (req, res) => {
    // console.log(req.user.userId);
    const hotelInfo = await hotelModels.find({ ownerId: req.user.userId }).populate("rooms")
    // console.log(hotelInfo);

    res.send(hotelInfo)
}


exports.addHotel =  async (req, res) => {
    try {
        const { name, location, description, pricePerNight, roomsAvailable } = req.body
        const uploadPromises = req.files.map(file => uplaodOnCloudinary(file.path));
        const uploadedResponses = await Promise.all(uploadPromises);
        // console.log(r̀);
        
        const imageurl = uploadedResponses.map(r =>r.url)

        const user = await userModel.findById(req.user.userId);
        if (user.hotels.length>0) return res.status(409).json({message :"hotel already added"})
        const hotel = await hotelModels.create({
            name,
            location,
            description,
            pricePerNight,
            roomsAvailable,
            hotelImage : imageurl,
            ownerId: req.user.userId
        })
        user.hotels.push(hotel._id);


        await user.save();
    
        res.status(201).json({
            message: "Hotel added successfully", hotel
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

}

exports.addRoom = async (req, res) => {
    
    try {
        const { hotelId } = req.params; // hotel ID from frontend
        const { roomType, pricePerNight, amenities, capacity, } = req.body

        const uploadPromises = req.files.map(file => uplaodOnCloudinary(file.path));
        const uploadedResponses = await Promise.all(uploadPromises);
        const imageUrls = uploadedResponses.map(r => r.url);

        let room = await roomModels.create({
            roomType,
            pricePerNight: Number(pricePerNight),
            amenities: Array.isArray(amenities) ? amenities : amenities.split(","),
            capacity,
            hotelId,
            roomImages:imageUrls,
            ownerId: req.user.userId,
        })

        const hotel = await hotelModels.findOne({ _id: hotelId })
        hotel.rooms.push(room._id)
        await hotel.save()
        res.status(201).json({ message: "Room added successfully", room });

    } catch (error) {

        console.error(error)

    }

}

exports.roomDetails =async(req,res)=>{
    try {
        const hotel = await hotelModels.findOne({ ownerId: req.user.userId }).populate("rooms");

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found for this owner" });
        }
        res.status(200).json({ rooms: hotel.rooms});
    } catch (error) {
        console.error("Error fetching room details:", error);
        res.status(500).json({ message: "Server error", error });
    }
}