const express = require('express')
const hotelModels = require('../models/hotelModel')
const { verifyToken, isOwner } = require('../middlewares/authMiddleware')
const userModel = require('../models/userModels')
const roomModels = require("../models/roomModels")
const { default: axios } = require('axios')
const {upload} = require("../middlewares/multer.middleware")
const {uplaodOnCloudinary} = require("../utils/cloudinary")


const route = express.Router()


route.get("/dashboard", verifyToken, isOwner, async (req, res) => {
    // console.log(req.user.userId);
    const hotelInfo = await hotelModels.find({ ownerId: req.user.userId }).populate("rooms")
    // console.log(hotelInfo);

    res.send(hotelInfo)
})

route.post('/add-hotel', verifyToken, isOwner, upload.array('images',10) , async (req, res) => {
    try {
        const { name, location, description, pricePerNight, roomsAvailable } = req.body
        const uploadPromises = req.files.map(file => uplaodOnCloudinary(file.path));
        const uploadedResponses = await Promise.all(uploadPromises);
        console.log(r̀);
        
        const imageurl = uploadedResponses.map(r =>r.url)

        const user = await userModel.findById(req.user.userId);
        if (user.hotels.length>0) return res.status(401).json({message :"hotel already added"})
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
       ``
        res.status(201).json({
            message: "Hotel added successfully", hotel
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

})

route.post("/add-room/:hotelId", verifyToken, isOwner, upload.array('images',10), async (req, res) => {
    // try {
    //     const {roomType,pricePerNight,amenities,capacity} = req.body
    // const hotel = await hotelModels.findOne({ownerId : req.user.userId})

    // if (!hotel) {
    //         return res.status(404).json({ message: "Hotel not found for this owner" });
    // }
    // hotel.rooms.push({
    //     roomType,
    //     pricePerNight,
    //     amenities,
    //     capacity
    // })
    // await hotel.save();
    // res.status(200).json({
    //         message: "Room added successfully",
    //         hotel
    // });
    // } catch (error) {
    //     console.error("Error adding room:", error);
    //     res.status(500).json({ message: "Server error", error });
    // }
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

})

route.get("/room-details", verifyToken, isOwner,async(req,res)=>{
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
})




// route.get("/hotelDetails",verifyToken, isOwner,async(req,res)=>{
//     const owner = await userModel.findOne({_id:req.user?.userId})
//     res.status(200).json({
//         hotelId : owner.
//     })
// })

module.exports = route