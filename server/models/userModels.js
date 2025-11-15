const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        length : {min : 3}
        
    },
    lastName : {
        type : String,
        required : true,
        length : {min : 3}
    },
    email:{
        type:String,
        required : true,
        unique: true
    },
    phone:{
        type: String,
        unique: true,
        required : true,
        minlength : 10
    },
    password:{
        type:String,
        minlength : 5,
        required : true
    },

    role: { type: String, enum: ["admin", "owner", "user"], default: "user" },
    hotels:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "hotelData",
        default: "" 
    }],
    age:{
        type: Number,
        minlength: 15,
        default: 18 
        
    }, 
    gender:{
        type : String,
        enum:['male','female'],
        default: "male"
       
    },
    userImage : {
        type : String,
        default : 'https://as1.ftcdn.net/jpg/06/33/54/78/1000_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg'
    }
})

const userModel = mongoose.model("userData",userSchema)

module.exports = userModel