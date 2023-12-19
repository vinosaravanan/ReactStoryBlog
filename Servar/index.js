const express = require("express")
const mongoose = require("mongoose");
const blogRouter = require("./router/blog-router");
const router = require("./router/user-router")
const cours = require("cors")

const app = express();
app.use(cours())
app.use(express.json())
app.use("/api/user" ,router)
app.use("/api/blog", blogRouter)

mongoose.connect("mongodb+srv://admin:ViNoMuvi22@cluster0.8k9tvxb.mongodb.net/Blog?retryWrites=true&w=majority"
).then(()=> app.listen(5000))
.then(()=> console.log('connect to database and listen port "5000"'))
.catch((err)=>console.log(err));


