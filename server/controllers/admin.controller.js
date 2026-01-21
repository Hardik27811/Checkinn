const bcrypt = require("bcrypt")
const userModel = require('../models/userModels')


exports.adminDetails = async (req, res) => {
    const admin = await userModel.find({ _id: req.user.userId })
    console.log(admin);
    res.send(admin)

}

exports.addOwner = async (req, res) => {
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
}

