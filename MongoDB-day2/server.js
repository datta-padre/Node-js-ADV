const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/node-57-day2");
               //  connection String    / DatabaseName           
const userSchema =  mongoose.Schema({
    user_name: String , 
    user_mobile: Number,
    user_email : String,
    user_age: Number
})     

const userModel = mongoose.model("user",userSchema)

app.get("/" , async(req,res)=>{

    var obj = {
        user_name:"Vishal Chavan",
        user_mobile: 1234567890,
        user_email:"vishalchavan@gmail.com",
        user_age:89
    }

    var result = await userModel(obj).save();

    res.send("MongoDB Day-2")
})

app.listen(PORT,()=>{
    console.log("Server Running is PORT = "+PORT);
})