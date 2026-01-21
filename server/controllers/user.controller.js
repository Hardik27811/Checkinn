const roomModels = require('../models/roomModels')


exports.rooms = async(req,res)=>{
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
}