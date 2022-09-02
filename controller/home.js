


const path = require("path")

exports.getHome =(req,res,next)=>{
    res.sendFile(path.join(__dirname,"../","views","index.html"))
}

exports.getSignup = (req,res,next)=>{
    res.sendFile(path.join(__dirname,"../","views","signup.html"))
}

