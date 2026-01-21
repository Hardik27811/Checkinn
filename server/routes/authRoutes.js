const express = require('express')
const { body, validationResult } = require('express-validator')
const controller = require('../controllers/auth.controller')

const authRoute = express.Router()


authRoute.post("/signup",
    [body('firstName').trim().toLowerCase().isLength({ min: 3 }),
    body('lastName').trim().toLowerCase(),
    body('age'),
    body('email').toLowerCase().trim(),
    body('password').trim(),
    body('phone').trim().isNumeric()]
    ,controller.signup);



authRoute.post('/login',
    body('email').trim().toLowerCase(),
    body('password').trim().isLength({ min: 5 }),
   controller.login);


authRoute.get("/verify", controller.verify);


authRoute.post("/logout", controller.logout)




module.exports = authRoute