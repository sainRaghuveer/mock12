const express = require("express");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { dataModel } = require("../models/user.datamodel");

const dataRoute = express.Router();


dataRoute.post("/calculate", async (req, res) => {

    const { AnnualInstalmentAmount, AnnualInterestRate, TotalNumberofYears } = req.body;
    console.log(req.body)

    const f=cal( AnnualInstalmentAmount, AnnualInterestRate, TotalNumberofYears)
    const totalInvestmentAmount=AnnualInstalmentAmount*TotalNumberofYears
    const totalInterestGained=f-totalInvestmentAmount;

    let obj = {
        TotalMaturityValue: f,
        totalInvestmentAmount: totalInvestmentAmount,
        totalInterestGained: totalInterestGained
    }

    res.send({"msg":obj});
})

const cal = (annualA, annualI, years) => {
    console.log(annualA,annualI,years)
    annualI = annualI / 100
    const res = Math.floor(annualA * (((annualI + 1) ** years - 1) / annualI));
    console.log(res)
    return res
}



module.exports = {
    dataRoute
}