const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    std_name : String,
    std_email : String ,
    std_mobile : Number,
    std_age: Number
});

const studentModel = mongoose.model("student",studentSchema)

module.exports = studentModel;