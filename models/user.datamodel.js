const mongoose=require("mongoose");

const dataSchema={
    annualAmount:Number,
    annualInterestRate:Number,
    years:Number
}

const dataModel=mongoose.model("data",dataSchema);

module.exports={
    dataModel
}