const express = require ('express')
const roomModels = require('../models/roomModels')
const userModel = require('../models/userModels')
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware')

const route = express.Router()

route.get("/rooms",async(req,res)=>{
   try {
     const rooms =  await roomModels.find();
        if(!rooms) {
            return res.status(404).json({ message: "rooms not found " });
        }
        res.status(200).json({rooms:rooms})
   } catch (error) {
        console.error("Error fetching room details:", error);
        res.status(500).json({ message: "Server error", error });
   }
})
// route.get("/user-profile",verifyToken, isAdmin ,async(req,res)=>{
//    try {
//       const user = userModel.find({ _id: req.user.userId })
//       console.log(user)
//    } catch (error) {
      
//    }
// })


module.exports = route