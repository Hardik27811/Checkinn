const express = require('express')
const controller = require('../controllers/hotel.controller')
const route = express.Router();


route.get("/hotels", controller.hotels)


route.post("/search-hotels", controller.searchHotels);

//specific room
route.get("/rooms/:id", controller.room);

//room at desired loc

route.get('/rooms',controller.rooms);





module.exports = route;