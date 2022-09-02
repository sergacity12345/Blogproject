const User = require("./model/user")

const express = require("express")

const path = require("path")

const bodyParser = require("body-parser")


const mongoDb = require("mongoose")
const homeRouter = require("./Routes/home")
const isAuth = require("./Routes/isAuth")

const app = express()

const MONGODB_URI = "mongodb://localhost:27017/Blog";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(homeRouter)
app.use(isAuth)
// app.use((req,res,next)=>{
//     User.find()
//       .then(!user=>{
//         req.user = user
//       })
//       .catch(err=>{
//         console.log(err)
//       })
// })

app.use((req,res,next)=>{
    console.log(req.user)
})

mongoDb.connect(MONGODB_URI)
 .then(result=>{
     app.listen(8080)
 })
 .catch(err=>{
    console.log(err)
 })