const express = require("express");

const homeController = require("../controller/home")


const router = express.Router();

router.get("/unecbusiness", homeController.getHome)

router.get("/signup.html",homeController.getSignup)


module.exports = router