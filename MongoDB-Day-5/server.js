const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./models/user")

mongoose.connect("mongodb://localhost:27017/MongoDB-Day5");


const app = express();
app.use(bodyparser.urlencoded({extended:true}));
const PORT = 3000;

app.get("/",(req,res)=>{
    res.render("Index.ejs")
})

app.post("/save",async (req,res)=>{
    await userModel(req.body).save();
    res.redirect("/")
})

app.get("/list", async(req,res)=>{
    var data = await userModel.find({});
    res.render("list.ejs",{data})
})

app.get("/delete/:id", async (req,res)=>{
    var id = req.params.id;
    var data = await  userModel.findByIdAndDelete(id);
    res.redirect("/list")
})

app.get("/update/:id", async (req,res)=>{
    var id = req.params.id;
    var data = await userModel.findById(id);
    res.render("update.ejs",{data})
})

app.post("/edit/:id", async (req,res)=>{
    var id = req.params.id
    var data = await userModel.findByIdAndUpdate(id,req.body)
    res.redirect('/list')
})

app.listen(PORT,()=>{
    console.log("Server Running On PORT "+PORT)
})