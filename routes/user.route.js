const express = require("express");
const { userModel } = require("../models/user.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        userAlready = await userModel.findOne({ email });
        if (userAlready) {
            res.send("User already exist, please login")
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    res.send({ "msg": "Enter valid email or password" })
                } else {
                    const user = new userModel({ name, email, password: hash });
                    user.save();
                    res.send({ "msg": "user registered successful" })
                }
            });
        }
    } catch (error) {
        res.send({ "msg": error.message });
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        console.log(user)
        if (user.length>0) {
            console.log(user)
            bcrypt.compare(password, user[0].password, (err, result)=> {
                if (result) {
                    var token = jwt.sign({user: user[0]._id}, 'grow', { expiresIn: '3h' });
                    res.send({"msg":"user logged in successful", "token":token});
                } else {
                    res.send({ "msg": "Wrong password" });
                }
            });
        } else {
            res.send({ "msg": "Wrong credentials" });
        }
    } catch (error) {
        res.send({ "msg": error.message });
    }
})



module.exports = {
    userRoute
}