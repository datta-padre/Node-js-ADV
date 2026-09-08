const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bcrypt_demo"
});

const exe = util.promisify(connection.query).bind(connection);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req, res)=>{
    res.render("index.ejs");
})

app.post("/do_register", async (req, res) => {
    var d = req.body;
    var hashpassword =await bcrypt.hash(d.password,10);
    var sql = ` INSERT INTO users (username,usermobile , useremail, password) 
    VALUES
  ('${d.username}', '${d.usermobile}', '${d.useremail}', '${hashpassword}')`;

    var data = await exe(sql);
    res.redirect("/login")
})

app.get("/login",(req, res)=>{
    res.render("login.ejs");
})

app.post("/do_login", async (req, res) => { 
    var d = req.body;
    var sql = `SELECT * FROM users WHERE useremail = '${d.useremail}'`;

     var data = await exe(sql);

     var password = data[0].password;

     var idMatch = await bcrypt.compare(d.password , password);

     if(idMatch){
        res.send("Login Success");
     }else{
        res.send("Login Failed");
     }

})    

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});