const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/user.model")
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cors = require("cors")

mongoose.connect("mongodb://localhost:27017/API-02")

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const PORT = 3000;

app.post("/api/register",async  function(req,res){
    const  {fullname , email , mobile , password } = req.body;

    var isExitEmail = await userModel.findOne({ email });

    if(isExitEmail){
       return res.json({
            message:"email already exist"
        })
    }

    var user = await userModel({
        fullname,
        email, 
        mobile, 
        password
    }).save();

    res.json({message:"register user successfully"})
})

app.post("/api/login", async function(req,res){
    const {email , password} = req.body;


    const user = await userModel.findOne({email,password})

    if(!user){
        return res.json({
            message:"invalid user and password"
        })
    }

    res.json({
        token:user.id,
        message:"login successfully"
    })
})

app.post("/api/send-otp",async function(req,res){

    var {email} = req.body;

    console.log(email)

    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log(otp)

    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user:"dattapadre357@gmail.com",
    pass:"jjuy ndut njaq hcsl",
  },
});

await transporter.sendMail({
  from: "DattaPadre <dattapadre357@gmail.com>",
  to:"dattapadr358@gmail.com",
  subject: "Auth Otp",
  text:`OTP ${otp}`,
});

    res.json({
        message:`Otp send this ${email} email address`
    })
})

// app.post("/api/verfiy-otp",async function(req,res){
//     const {otp} = req.body;

//     if(){
//         return res.json("")
//     }else{
//         return res.json("")
//     }

// })

app.listen(PORT,()=>{
    console.log("server running on http://localhost:3000")
})