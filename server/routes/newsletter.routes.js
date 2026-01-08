const express = require('express')
const subscribeNewsletter = require("../controllers/newsletter.controller")
const route = express.Router();

route.post("/subscribe",subscribeNewsletter);

module.exports = route;