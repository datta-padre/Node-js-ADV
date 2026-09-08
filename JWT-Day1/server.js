const express = require("express");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser")
const mysql = require("mysql2")
const util = require("util");
const cookieParser = require("cookie-parser"); // npm i cookie-parser
const app = express();

app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieParser());                        // mid 

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"jwt_56"
})

const KEY = "qwertyuio"

const exe = util.promisify(conn.query).bind(conn);

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/do_register",  async (req,res)=>{
    var d = req.body;
    var sql = ` INSERT INTO users (userName, userMobile , userEmail , userpassword)
        VALUES
        ('${d.userName}', '${d.userMobile}' , '${d.userEmail}', '${d.userpassword}')`

        var data = await exe(sql);

    res.redirect("/login")
})

app.get("/login",(req,res)=>{
    res.render("Login.ejs")
})

app.post("/do_login", async (req,res)=>{
    var sql =` SELECT * FROM users WHERE 
    userEmail = '${req.body.userEmail}' AND userpassword = '${req.body.userpassword}'`

    var data = await exe(sql);

    if(data.length > 0){
        var token = jwt.sign(({email:req.body.userEmail}),KEY);
        res.cookie("token",token);
        res.redirect("/home")
    }else{
        res.redirect("/login")
    }
})

app.get("/home",verfiy,(req,res)=>{
        res.render("home.ejs")
})

app.get("/about",verfiy,(req,res)=>{
    res.render("about.ejs")
})

function verfiy(req, res, next){
    if(req.cookies.token){
        next()
    }else{
        res.redirect("/login")
    }
}

app.listen(1000)