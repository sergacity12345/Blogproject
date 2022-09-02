const express = require("express")

const homeController = require("../controller/isAuth")

const router = express.Router()

router.post("/index", homeController.postSignup)

router.get("/login.html", homeController.getLogin)

router.post("/login", homeController.postLogin)


module.exports = router;