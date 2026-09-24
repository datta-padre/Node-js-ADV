const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./Models/user");
const studentModel = require("./Models/student")

mongoose.connect("mongodb://localhost:27017/MongoDB-Demo01")

const app = express();
app.use(bodyparser.urlencoded({extended:true}))
const PORT = 3000;

app.get("/",(req,res)=>{
    res.render("Index.ejs")
})

app.get("/add_user",(req,res)=>{
    res.render("user.ejs")
})

app.post("/save_user", async  (req,res)=>{
        var data = await  userModel(req.body).save();
    res.send(data)
})

app.get("/add_student",(req,res)=>{
    res.render("student.ejs")
})

app.post("/save_student", async(req,res)=>{
    var data = await studentModel(req.body).save()
    res.send(data)
})

app.listen(PORT,()=>{
    console.log("Server Running On PORT "+PORT);
})