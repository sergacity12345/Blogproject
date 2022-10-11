
const Post = require("../model/post")

const path = require("path")


const User = require("../model/user")
const post = require("../model/post")

exports.getHome =(req,res,next)=>{


    res.render("index",{
        isLoggedIn: req.session.isLoggedIn,
        pageTitle: "Completed - Business Update | Home"
    })
}

// exports.getLogo =(req,res,next)=>{
    
//     const userId = req.session.user.email
//     if(!userId){
//         return next()
//     }
//     res.render("index",{
//         pageTitle:"",
//         isLoggedIn:req.session.isLoggedIn,
//         userId: userId,
//         pageTitle: "Completed - Business Update | Home"
//     })
// }



exports.getAddBlog = (req,res,next)=>{
    const userId = req.session.user.email
    res.render("add-blog",{
        pageTitle:"",
        isLoggedIn:req.session.isLoggedIn,
        userId: userId
    })
}

exports.getUser = (req,res,next)=>{
    userName = req.session.user.email
    if(!userName){
        return res.render("index")
    }
    postDoc = req.session.user._id
    postId = postDoc.toString()
    Post.find({userId:postId})
     .then(post=>{
        res.render("admin",{
            pageTitle:userName,
            post:post,
            isLoggedIn: req.session.isLoggedIn,
            userId : userName
        })
     })
}

exports.postBlogpost = (req,res,next)=>{
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const category = req.body.category
    const topic = req.body.topic
    const description = req.body.description
    
    const post = new Post({title:title,
        imageUrl:imageUrl,
        category:category,
        topic:topic,
        description:description,userId:req.session.user._id})
     post.save()
      .then(result=>{
        // const userName = req.session.user.email
        res.redirect("index")
     })
     .catch(err=>{
        console.log(err)
     })
}

exports.getBlogPost = (req,res,next)=>{
    // if(!userId)
    userName = req.session.user
    console.log(userName)
    // postDoc = req.session.user._id
    // postId = postDoc.toString()
    Post.find()
     .then(post=>{
        console.log(post)
         res.render("blog-post",{
             pageTitle:userName,
             post:post,
             userId:null,
             isLoggedIn: req.session.isLoggedIn,
         })
         
     })

}
