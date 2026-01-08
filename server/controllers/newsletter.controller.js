const  NewsletterModel = require('../models/ NewsletterModel');


const subscribeNewsletter = async(req,res)=>{
    try {
        const {email} = req.body;
        if(!email || typeof email !== 'string' || email.trim() === ""){
            return res.status(400).json({
                sucess : false,
                message : "Email is required",
            })
        }

        const eamilregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!eamilregex.test(email)){
            return res.status(400).json({
                sucess : false,
                message : "Invalid email address",
            })
        }
        const existingUser = await NewsletterModel.findOne({email});
        if(existingUser){
            return res.status(409).json({
                sucess : false,
                message : "Email already subscribed",
            })
        }

        await NewsletterModel.create({email});
        return res.status(201).json({
            sucess : true ,
            message :"Subscribed successfully",
        })

    } catch (error) {
        console.error("Newsletter Error:", error);
        return res.status(500).json({
        success: false,
        message: "Internal server error",
        })
    }
}

module.exports = subscribeNewsletter