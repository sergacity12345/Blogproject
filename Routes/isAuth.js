const express = require("express")

const homeController = require("../controller/isAuth")

const router = express.Router()

router.get("/signup",homeController.getSignup)

router.post("/login", homeController.postSignup)

router.get("/login", homeController.getLogin)

router.post("/index", homeController.postLogin)

router.get("/logout", homeController.getLogOut)

router.get("/reset",homeController.getResetPassword)

router.post("/reset",homeController.postResetPassword)

router.get("/reset/:token",homeController.getNewPassword)

router.post("/newPassword",homeController.postNewPassword)



module.exports = router;