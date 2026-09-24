const express = require("express");
const mongoose = require("mongoose")
const userModel = require("./Models/user")
const app = express();
app.use(express.json());

const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/API-Demo")

app.post("/do-register", async function(req,res){
    await userModel(req.body).save();
    res.status(201).json({
        message:"user registered successfully",
    })
})

app.get("/get-users",async function(req,res){
    var data = await userModel.find({});
    res.json({
        message:"users List",
        data:data
    })
})

app.listen(PORT,()=>{
    console.log("server running on port http://localhost:"+PORT);
})