const mongoose = require('mongoose');

const  NewsletterSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    subscribedAt : {
        type : Date,
        default : Date.now,
    },
    isActive : {
        type : Boolean ,
        default : true,
    },
    source : {
        type :String,
        default : "website",
    },

})

const  NewsletterModel = mongoose.model( "newsletterData" ,NewsletterSchema)

module.exports = NewsletterModel


