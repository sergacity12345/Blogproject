


const path = require("path")

exports.getHome =(req,res,next)=>{
    console.log(req.session.user)
    console.log(req.session.isLoggedIn)
    res.render("index",{
        isLoggedIn: req.session.isLoggedIn,
        pageTitle: "Completed - Business Update | Home"
    })
}

exports.getSignup = (req,res,next)=>{
    res.sendFile(path.join(__dirname,"../","views","signup.html"))
}

