const User = require("../model/user")

const path = require("path")

exports.postSignup = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    const phone = req.body.phone
    
    User.findOne({email:email})
     .then(userDoc=>{
        if(userDoc){
            return res.redirect("/signup.html")
        }
        const user = new User({email,password,confirmPassword,phone,post: { items: [] }})
        user.save()
         .then(result=>{
            return res.redirect("/login.html")
         })
     })
     .catch(err=>{
        console.log(err)
     })
}

exports.getLogin = (req,res,next)=>{
    res.sendFile(path.join(__dirname,"../","views","login.html"))
}


exports.postLogin = (req,res,next) =>{
    const password = req.body.password
    const email = req.body.email
    User.find({email:email})
     .then(user=>{
        req.user = user
        return res.redirect('/');
      })
     .catch(err=>{
        console.log(err)
     })
}