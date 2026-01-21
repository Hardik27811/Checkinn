const express = require('express')
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware')

const controller = require('../controllers/admin.controller')
const route = express.Router()


route.get("/admin-details", verifyToken, isAdmin, controller.adminDetails);
route.post("/add-owner", verifyToken, isAdmin, controller.addOwner);



module.exports = route