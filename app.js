const User = require("./model/user")

const express = require("express")

const path = require("path")

const flash = require("connect-flash")

const bodyParser = require("body-parser")

const ejs = require("ejs")

const mongoDb = require("mongoose")

const session = require("express-session")

// const session = require("")


const MongoDBStore = require("connect-mongodb-session")(session)

const homeRouter = require("./Routes/home")
const isAuth = require("./Routes/isAuth")


const app = express()
app.set('view engine', 'ejs');
app.set('views', 'views');



const MONGODB_URI = "mongodb://localhost:27017/Blog";

const store = new MongoDBStore({
    uri:MONGODB_URI,
    collection:"session-cookies"
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"our secrete",resave:false, saveUninitialized:false,store:store}))
app.use(flash());
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