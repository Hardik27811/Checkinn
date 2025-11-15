const mongoose = require('mongoose')

async function connectTodb() {
    await mongoose.connect(process.env.MONGO_URI)   
    console.log("db connected");
    
}

module.exports = connectTodb