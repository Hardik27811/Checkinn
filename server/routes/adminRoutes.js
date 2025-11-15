const express = require('express')
const bcrypt = require("bcrypt")
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware')
const userModel = require('../models/userModels')



const route = express.Router()


route.get("/admin-details", verifyToken, isAdmin, async (req, res) => {
    const admin = await userModel.find({ _id: req.user.userId })
    console.log(admin);
    res.send(admin)

})
route.post("/add-owner", verifyToken, isAdmin, async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body
        const hashedpassword = await bcrypt.hash(password,10)
        let ownerCreated = await userModel.create({
            firstName, lastName, email, password:hashedpassword, phone, role: "owner"
        })
        res.status(201).json({
            message: "Owner Added",
            ownerCreated
        })
    } catch (error) {
        console.error(error)
    }
})



module.exports = route