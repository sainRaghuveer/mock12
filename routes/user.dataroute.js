const express = require("express");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { dataModel } = require("../models/user.datamodel");

const dataRoute = express.Router();


dataRoute.post("/calculate", async (req, res) => {
    const { annualAmount, annualInterestRate, years } = req.body;

        let middle=(1+(annualInterestRate/100))**years
        let lastMiddle=middle-1;

        let f=annualAmount*(lastMiddle/(annualInterestRate/100))

        let totalInvestmentAmount=annualAmount*years;
        let totalInterestGained=f-totalInvestmentAmount;

        let obj={
            TotalMaturityValue:f,
            totalInvestmentAmount:totalInvestmentAmount,
            totalInterestGained:totalInterestGained
        }

        res.send({"msg":obj});
})



module.exports = {
    dataRoute
}