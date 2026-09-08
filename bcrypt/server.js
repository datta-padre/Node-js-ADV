const express = require("express");
const bodyparser = require("body-parser");
const mysql2 = require("mysql2");
const util = require("util");
const bcrypt = require("bcrypt")

const conn = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"bcriypt"
})

const exe = util.promisify(conn.query).bind(conn);

const app = express();
app.use(bodyparser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("create_account.ejs")
})


app.post("/do_register", async (req,res)=>{
    var d = req.body;

    var hashpassword = await bcrypt.hash(d.userPassword , 10);

    var sql = `INSERT INTO users (userName,userMobile,userEmail ,userPassword)
    VALUES 
    ('${d.userName}' , '${d.userMobile} ' , '${d.userEmail}' ,'${hashpassword}')`

    
    var data = await exe(sql);
    res.send("Done ")
})

app.get("/login",(req,res)=>{
    res.render("login.ejs")
})

app.post("/do_login", async (req,res)=>{
    var d = req.body;
    var hashpassword = await bcrypt.hash(req.body.userPassword ,10);
    var sql = ` SELECT * FROM users WHERE
     userEmail = '${d.userEmail}' AND  userPassword = '${hashpassword}'`

     var data = await exe(sql);
    res.send(data)
})

app.listen(1000)