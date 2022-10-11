const bcrypt = require("bcrypt")

const User = require("../model/user")

const path = require("path")

const crypto = require("crypto")

exports.getSignup = (req,res,next)=>{
    let message = req.flash("error")
    if(message.length > 0){
        message = message[0]
        
    }else{
        message = null
    }
    res.render("signup",{
        errorMessage: message
    })
}

exports.postSignup = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    // const confirmPassword = req.body.confirmPassword
    const phone = req.body.phone
    if(email.length > 2 && password.length > 0){
        User.findOne({email:email})
        .then(userDoc=>{
          
           if(userDoc){
               req.flash("error", "Email already exist")
               return res.redirect("/signup")
           }
           bcrypt
           .hash(password,12)
           .then(hashPassword=>{
               const user = new User({email:email,password:hashPassword,phone:phone})
               return user.save()
            })
           .then(result=>{
               return res.redirect("/login")
               })
           .catch(err=>{
               console.log(err)
           })
       
        })
        .catch(err=>{
           console.log(err)
        })
    }else{
        req.flash("error", "Details missing")
        return res.redirect("/signup")
    }
    
   
}

exports.getLogin = (req,res,next)=>{
    let message = req.flash("error")
    if(message.length > 0){
        message = message[0]
        
    }else{
        message = null
    }
    res.render("login",{
        pageTitle:"Login",
        errorMessage: message
    })
    
}


exports.postLogin = (req,res,next) =>{
    const password = req.body.password
    const email = req.body.email
    User.findOne({email:email})
     .then(user=>{

        if(!user){
            req.flash("error", "invalid email or password")
           return res.redirect("/login")
        }
        
        bcrypt
        .compare(password, user.password)
        .then(doMatch=>{
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
                res.render('index',{
                    accountName: user.email,
                    pageTitle: "Completed - Business Update | Home",
                    isLoggedIn: req.session.isLoggedIn,
                    userId: user.email
                });
              });
          }else{
            req.flash("error", "invalid email or password")
            return res.redirect("/login")
          }

        })
      })
      


     .catch(err=>{
        console.log(err)
     })
}



exports.getLogOut = (req,res,next)=>{
    
    req.session.destroy(err=>{
        res.redirect("unecbusiness")
        console.log(err)
    })
   
}


exports.getResetPassword = ( req, res, next)=>{
    res.render("reset",{
        pageTitle: "Reset Password",
        userId:null
    })
    console.log("reset password")
}

exports.postResetPassword = (req,res,next)=>{
    crypto.randomBytes(32,(err, buffer)=>{
        if (err){
            return res.redirect("/reset")
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
         .then(user=>{
            if(!user){
                return res.redirect("/reset")
            }
            user.resetToken = token;
            user.resetTokenExp = Date.now() + 3600000;
            return user.save();
         })
         .then(result=>{
            res.redirect(`http://localhost:8080/reset/${token}`);
         })
         .catch()
    })
    console.log("email to find password")

}

exports.getNewPassword = (req,res,next)=>{
    console.log("new password input")
    const token = req.params.token;
    User.findOne({resetToken:token, resetTokenExp:{$gt: Date.now()}})
     .then(user=>{
        res.render("newPassword",{
            pageTitle: "new Password",
            userId:null,
            passwordToken:token
        })
     })
     .catch(err=>{
        console.log(err)
     })
    
}

exports.postNewPassword = (req,res,next)=>{
    console.log("post new password")
    const newPassword = req.body.password;
    const passwordToken = req.body.passwordToken
    let resetUser;
    User.findOne({
        resetToken : passwordToken,
         resetTokenExp :{$gt: Date.now()}})
     .then(user=>{
        resetUser = user;
        return bcrypt.hash(newPassword , 12)
     })
     .then(hashedPassword=>{
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExp = undefined;
        return resetUser.save()
     })
     .then(result=>{
        res.redirect("/login")
     })
     .catch(err=>{
        console.log(err)
     })
}