const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const connectTodb = require('./config/db')
connectTodb()
const cors = require('cors')
const path = require('path')
const app = express()
const authRoute = require("./routes/authRoutes")
const ownerRoute = require('./routes/ownerRoutes')
const adminRoute = require('./routes/adminRoutes')
const userRoute = require('./routes/userRoutes')
const hotelRoute = require('./routes/hotelRoutes')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}),
)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))





app.use("/auth/user",authRoute)

app.use("/owner",ownerRoute)

app.use("/admin",adminRoute)

app.use("/",userRoute)

app.use("/",hotelRoute)

app.listen(3000,()=>{
    console.log("server connected");
    
})