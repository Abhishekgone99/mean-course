const express = require('express');
const bodyParser =require('body-parser')
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts')

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
});

app.use("/api/posts", postRoutes)



module.exports = app;