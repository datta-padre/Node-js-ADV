const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/MongoDB-Insert");

const productSchema = mongoose.Schema({
    product_name : String,
    product_price: Number,
    product_qty: Number,
    product_detail: String
})

const productModel = mongoose.model("product",productSchema)

const app = express();
app.use(bodyparser.urlencoded({extended:true}));
const PORT = 3000;

app.get("/",(req,res)=>{
    res.render("Index.ejs")
})

app.post("/save_product", async (req,res)=>{
    var data = await productModel(req.body).save();
    res.redirect("/")
})

app.get("/product_list",async (req,res)=>{
    var data = await productModel.find({});
    console.log(data)
    res.render("product_list.ejs",{data})
})

app.get("/delete/:id", async(req,res)=>{
    var id = req.params.id;
   var data = await productModel.findByIdAndDelete(id);
    res.redirect("/product_list")
})



app.listen(PORT,()=>{
    console.log("Server Running On Port : "+PORT);
})