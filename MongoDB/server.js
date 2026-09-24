const express = require("express");
const mongoose = require("mongoose"); // npm i mongoose 
const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/dattapadre");
                // Connection URL/ databaseName  

const userSchema = mongoose.Schema({
    name:String,
    mobile : Number,
    age: Number,
    class:String
})      

const userModel = mongoose.model("user",userSchema);

app.get("/",(req,res)=>{
    res.send("MongoDB Day-1")
})

app.listen(PORT, ()=>{
    console.log("Server Running is PORT",PORT)
})