const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const connectToDB = require('./config/db');


const authRoute = require("./routes/authRoutes");
const ownerRoute = require('./routes/ownerRoutes');
const adminRoute = require('./routes/adminRoutes');
const userRoute = require('./routes/userRoutes');
const hotelRoute = require('./routes/hotelRoutes');
const bookingRoute = require('./routes/bookingRoutes');
const newsletterRoute = require('./routes/newsletter.routes');

const app = express();


connectToDB();


app.use(cookieParser());

const allowedOrigins = [

   "https://checkinn-three.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));


app.get("/healthCheck", (req, res) => {
  res.status(200).send("OK");
});


app.get("/", (req, res) => {
  res.send("Backend is working ");
});


app.use("/auth/user", authRoute);
app.use("/owner", ownerRoute);
app.use("/admin", adminRoute);

app.use("/users", userRoute);
app.use("/hotel", hotelRoute);
app.use("/bookings", bookingRoute);
app.use("/newsletter", newsletterRoute);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
