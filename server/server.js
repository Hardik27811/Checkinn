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
const bookingRoute = require ('./routes/bookingRoutes')
const NewsletterRoute = require('./routes/newsletter.routes')

const PORT = process.env.PORT || 3000;

const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(cors({
    origin: "*", 
    credentials: true,
}),
)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))


console.log({
  authRoute,
  ownerRoute,
  adminRoute,
  userRoute,
  hotelRoute,
  bookingRoute
});




app.use("/auth/user",authRoute)

app.use("/owner",ownerRoute)

app.use("/admin",adminRoute)

app.use("/",userRoute)

app.use("/",hotelRoute)

app.use("/",bookingRoute)

app.use("/",NewsletterRoute)

app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

app.get("/healthCheck", (req, res) => {
  res.status(200).send("OK");
});


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})