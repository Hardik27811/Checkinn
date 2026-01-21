const express = require('express')
const controller = require('../controllers/booking.controller')
const { verifyToken, isOwner } = require('../middlewares/authMiddleware')

 
const route = express.Router()

route.post("/book-room", verifyToken, controller.bookRoom );

route.get("/booking", verifyToken, controller.booking);

route.get("/owner/booking", verifyToken, isOwner, controller.ownerBoooking);

module.exports = route;
