const mongoose=require("mongoose");

const userSchema={
    name:String,
    email:String,
    password:String,
    time:String
}

const userModel=mongoose.model("user",userSchema);

module.exports={
    userModel
}