const express = require("express");
const nodemailer = require("nodemailer");
const app = express();app

const port = 3000;

app.get("/",async (req,res)=>{

    const OTP = Math.floor(1000 + Math.random() * 900000);

    console.log(OTP)

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  pool: true, // Enable connection pooling
  auth: {
    user:"dattapadre357@gmail.com",
    pass:"xfnu plyz jwvy isqo",
  },
});


await transporter.sendMail({
  from: "dattapadre357@gmail.com",
  to: `dattapadr358@gmail.com`,
  subject: "A2Z register otp",
  text: `Your 4-digit otp ${OTP} Do Not Share`,
});

    res.send("Heyyy....")
})

app.listen(port,()=>{
    console.log("Server is run in  port "+port);
});