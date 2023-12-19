const express = require("express");
const { default: mongoose } = require("mongoose");
const Blog = require("../model/Blog");
const User = require("../model/User");
const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");

    } catch (error) {
        console.log(error);
    }
    if (!blogs) {
        return res.status(404).json({ message: "Blog Not Fount !" })
    }
    return res.status(200).json({ blogs })
})

blogRouter.post("/add", async(req, res)=> {
    const {title, description, image, user} = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
       return console.log(error);
    }
    if(!existingUser){
        return res.status(400).json({message:"Unable to Find User by This Id"})
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    })
    try {
       const session = await mongoose.startSession();
       session.startTransaction();
       await blog.save({session});
       existingUser.blogs.push(blog);
       await existingUser.save({session});
       await session.commitTransaction();

    } catch (error) {
         console.log(error);
         return res.status(500).json({message:error})
    }
    return res.status(200).json({blog})
})

blogRouter.put("/update/:id", async(req, res)=> {
    const{title, description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (error) {
        console.log(error);
    }
    if(!blog){
        return res.status(500).json({message:"unable to the blog"})
    }
   return res.status(200).json({blog})
})

blogRouter.get("/:id", async(req, res)=> {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id)
    } catch (error) {
        console.log(error);
    }
    if(!blog){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({blog})
})

blogRouter.delete("/:id", async(req, res)=> {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save()
    } catch (error) {
        console.log(error);
    }
    if(!blog){
        return res.status(404).json({Message: "Unable to Delete"})
    }
    return res.status(200).json({message: "succssFully delete"})
})

blogRouter.get("/user/:id", async(req, res)=> {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs")

    } catch (error) {
        console.log(error);
    }
    if(!userBlogs){
        return res.status(404).json({message:"No Blog Fount"})
    }
    return res.status(200).json({user:userBlogs})
})


module.exports = blogRouter;


