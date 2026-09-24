const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyparser.urlencoded({extended:true}));
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/MongoDB-Demo");

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    mobile: Number,
    password: String
})

const userModel = mongoose.model("user",userSchema);

app.get("/",(req,res)=>{
    res.render("Index.ejs")
})

app.post("/save", async (req,res)=>{
    var data = await userModel(req.body).save();
    res.send(data)
})

app.listen(PORT,()=>{
    console.log("Server Rinning On PORT ="+PORT)
})