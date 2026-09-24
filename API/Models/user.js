const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user_name : String,
    user_email : String,
    user_mobile: Number,
    user_password : String
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;

