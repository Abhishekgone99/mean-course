const express = require('express');
const bodyParser =require('body-parser')
const mongoose = require('mongoose');
const Post = require('./models/post');
const { log } = require('@angular-devkit/build-angular/src/builders/ssr-dev-server');

const app = express();

mongoose.connect("mongodb+srv://abhishekgone99:ICRAFclprGekaNuN@cluster0.dry3eeb.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to database");
}).catch(()=>{
    console.log("connection failed");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
})

app.post('/api/posts',(req,res,next)=>{
   const post = new Post({
    title : req.body.title,
    content : req.body.content
   })
   
   post.save().then((createdPost)=>{
    console.log(post);
    console.log(createdPost._id);
    res.status(201).json({
        message: "Post added successfully",
        postId : createdPost._id
       })
   }) 
})

app.put('/api/posts/:id',(req,res,next)=>{
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({_id: req.params.id}, post).then((result)=>{
        console.log(result);
        res.status(200).json({
            message:"Updated Successfully"
        })
    })
})

app.get('/api/posts',(req,res,next)=>{
    Post.find()
    .then((documents)=>{
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: documents
        })
    })
})

app.get('/api/posts/:id',(req,res,next)=>{
    Post.findById(req.params.id).then(post => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message:"Post not found"})
        }
    })
})

app.delete('/api/posts/:id',(req,res,next)=>{
    console.log(req.params.id);
    Post.deleteOne({_id : req.params.id}).then((result)=>{
        console.log(result);
        res.status(200).json({
            message : "Post deleted Successfully"
        })
    })
})

module.exports = app;