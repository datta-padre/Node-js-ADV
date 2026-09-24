const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/MongoDB-day4");

const studentSchema = mongoose.Schema({
    student_name:String,
    student_mobile:Number,
    student_email:String,
    student_dob:String,
    student_address:String
})

const studentModel = mongoose.model("student",studentSchema);

app.get("/",(req, res) => {
  res.render("index.ejs")
})

app.post("/save_student", async (req,res)=>{
    var data = await  studentModel(req.body).save();
    res.redirect("/")
})

app.get("/student_list", async (req,res)=>{
    var data = await studentModel.find({});
    res.render("Student_list.ejs",{data})
})

app.get("/delete/:id", async (req,res)=>{
    var id = req.params.id
    var data = await studentModel.findByIdAndDelete(id)
    res.redirect("/student_list")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});