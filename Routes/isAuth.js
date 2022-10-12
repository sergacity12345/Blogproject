const express = require("express")

const {check, body} = require("express-validator")

const homeController = require("../controller/isAuth")

const router = express.Router()

router.get("/signup",homeController.getSignup)

router.post("/signup",
check('email')
.isEmail()
.withMessage("Enter a valid email"),
body("password","password should be alphanumeric and at least 5 characters")
.isAlphanumeric()
.isLength({min:5}),
body("phone","Enter a valid phone number")
.isNumeric()
.isLength({min:11, max:13}), homeController.postSignup)


router.get("/login", homeController.getLogin)

router.post("/index",[
    check('email')
    .isEmail()
    .withMessage("Enter a valid email"),
    body("password","password should be alphanumeric and at least 5 characters")
    .isLength({min: 5})
    .isAlphanumeric()],
     homeController.postLogin)

router.get("/logout", homeController.getLogOut)

router.get("/reset",homeController.getResetPassword)

router.post("/reset",homeController.postResetPassword)

router.get("/reset/:token",homeController.getNewPassword)

router.post("/newPassword",homeController.postNewPassword)



module.exports = router;