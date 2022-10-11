const express = require("express");

const homeController = require("../controller/home")


const router = express.Router();

router.get("/unecbusiness", homeController.getHome)

// router.get("/index", homeController.getLogo)




router.get("/add-blog",homeController.getAddBlog)

router.get("/admin", homeController.getUser)

router.post("/admin", homeController.postBlogpost)

router.get("/blog-post",homeController.getBlogPost)





module.exports = router