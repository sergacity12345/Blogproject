const bcrypt = require("bcrypt")

const User = require("../model/user")

const path = require("path")

exports.postSignup = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    // const confirmPassword = req.body.confirmPassword
    const phone = req.body.phone
    
    User.findOne({email:email})
     .then(userDoc=>{
        if(userDoc){
            return res.redirect("/signup.html")
        }
        bcrypt
        .hash(password,12)
        .then(hashPassword=>{
            const user = new User({email:email,password:hashPassword,phone:phone,post: { items: [] }})
            return user.save()
            // .catch(err=>{
            //     console.log(err)
            // })
         })
        .then(result=>{
            return res.redirect("/login.html")
            })
        .catch(err=>{
            console.log(err)
        })
    
     })
     .catch(err=>{
        console.log(err)
     })
}

exports.getLogin = (req,res,next)=>{
    res.render("login",{
        pageTitle:"Login"
    })
}


exports.postLogin = (req,res,next) =>{
    const password = req.body.password
    const email = req.body.email
    User.find({email:email})
     .then(user=>{
        console.log(user)
        if(!user){
           return res.redirect("/login.html")
        }
        req.session.user = user
        req.session.isLoggedIn = true
        return res.render('index',{
            accountName: user.email,
            pageTitle: "Completed - Business Update | Home",
            isLoggedIn: req.session.isLoggedIn,
        });
      })
     .catch(err=>{
        console.log(err)
     })
}



exports.getLogOut = (req,res,next)=>{
    const email = req.session.user.email
    User.find({email:email})
     .then(user=>{
         req.session.destroy()
          .then(result=>{
             console.log(result)
             res.render("/index",{
                accountName: user.email
             })
          })
          .catch(err=>{
             console.log(err)
          })
     })
}