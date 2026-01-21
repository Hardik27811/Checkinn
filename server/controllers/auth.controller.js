const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');




exports.signup = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { firstName, lastName, age, email, gender, password, phone,role } = req.body
            const hashedpassword = await bcrypt.hash(password, 12)
            const newUser = await userModel.create({
                firstName,
                lastName,
                email,
                password: hashedpassword,
                gender,
                age,
                phone,
                role
            })
            console.log("User registered sucessfully");
            res.status(200).json({ message: "User registered", user: newUser });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
}

exports.login =  async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                msg: "Invalid data"
            });
        }

        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const isMatching = await bcrypt.compare(password, user.password);
            if (!isMatching) {
                return res.status(400).json({ error: "Invalid password" });
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role : user.role,
                    userImage : user.userImage,
                    phone : user.phone,

                },
                process.env.JWT_SECRET
            );

            res.cookie("token", token,
                {
                    httpOnly: true,
                    secure: true, // change to true in production with HTTPS
                    sameSite: "none",
                    path: "/",
                }
            );

            res.status(200).json({
                message: "User login successful",
                user,
                role : user.role,
            });

        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
}


exports.verify = (req, res) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ loggedIn: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ loggedIn: true, user: decoded });
    } catch (error) {
        res.status(401).json({ loggedIn: false });
    }
}

exports.logout = (req,res)=>{
    res.cookie("token", "", {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax", // "lax" works for localhost
    expires: new Date(0), // expire immediately
     
  });
    res.status(200).json({ message: "Logged out successfully" });
}