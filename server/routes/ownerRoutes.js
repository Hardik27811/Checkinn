const express = require('express')
const hotelModels = require('../models/hotelModel')
const { verifyToken, isOwner } = require('../middlewares/authMiddleware')
const userModel = require('../models/userModels')
const roomModels = require("../models/roomModels")
const { default: axios } = require('axios')
const {upload} = require("../middlewares/multer.middleware")
const {uplaodOnCloudinary} = require("../utils/cloudinary")

const controller = require('../controllers/owner.controller')
const route = express.Router()


route.get("/dashboard", verifyToken, isOwner,controller.dashboard )

route.post('/add-hotel', verifyToken, isOwner, upload.array('images',10) , controller.addHotel)

route.post("/add-room/:hotelId", verifyToken, isOwner, upload.array('images',10), controller.addRoom)

route.get("/room-details", verifyToken, isOwner, controller.roomDetails)


module.exports = route