const express = require('express');
const jwt = require("jsonwebtoken");  // npm i jsonwebtoken 
const app = express();

const name ="John Doe";

const KEY = "sdfghsjdkfgh"

app.get('/', (req, res) => {

    const token = jwt.sign((name),KEY);

    console.log("Token",token)

  res.send('Hello, World!');
});

app.listen(1000);