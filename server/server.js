const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const connectToDB = require('./config/db');

// Routes
const authRoute = require("./routes/authRoutes");
const ownerRoute = require('./routes/ownerRoutes');
const adminRoute = require('./routes/adminRoutes');
const userRoute = require('./routes/userRoutes');
const hotelRoute = require('./routes/hotelRoutes');
const bookingRoute = require('./routes/bookingRoutes');
const newsletterRoute = require('./routes/newsletter.routes');

const app = express();

// ================== DATABASE ==================
connectToDB();

// ================== MIDDLEWARE ==================
app.use(cookieParser());

const allowedOrigins = [
  "https://peppy-beijinho-3cb979.netlify.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// ================== HEALTH CHECK (IMPORTANT) ==================
app.get("/healthCheck", (req, res) => {
  res.status(200).send("OK");
});

// ================== ROOT TEST ==================
app.get("/", (req, res) => {
  res.send("Backend is working ");
});

// ================== ROUTES ==================
app.use("/auth/user", authRoute);
app.use("/owner", ownerRoute);
app.use("/admin", adminRoute);

app.use("/users", userRoute);
app.use("/hotels", hotelRoute);
app.use("/bookings", bookingRoute);
app.use("/newsletter", newsletterRoute);

// ================== 404 HANDLER ==================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ================== SERVER ==================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
