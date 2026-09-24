const express = require("express");

const app = express();
const PORT = 3000;

app.get("/",(req,res)=>{
    res.render("payment.ejs");
})

app.listen(PORT,()=>{
    console.log(`Server Running In PORT ${PORT}`)
})