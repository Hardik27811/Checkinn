const express = require ('express')
const controller = require('../controllers/user.controller')

const route = express.Router()

route.get("/rooms", controller.rooms)


module.exports = route