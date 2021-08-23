const mongoose = require("mongoose");
const User = mongoose.model("users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {jwtSecretKey} = require("../config/keys");

const signUp = async (req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body;
    const userName = firstName + " " + lastName;
    // console.log(req.body);
    // console.log(userName);
    // res.send("done");
    try {
        const testEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]*@+vit+(?:\.edu)*$/;
        if(!testEmail.test(email)){
            throw "your email must be a valid vit.edu email";
        }
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            console.log("user exists \n");
            console.log(existingUser);
            return res.status(400).json({message: "user already exists"});
        }else if(password !== confirmPassword){
            console.log(`passwords do not match. \n password: ${password} \nconfirm password: ${confirmPassword}`)
            return res.status(401).json({message: "passwords do not match"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await new User({
            userName,
            email,
            password: hashedPassword
        }).save();
        console.log('new User: ');
        console.log(newUser);
        const token = jwt.sign({email: newUser.email, userName: newUser.userName, id: newUser._id}, jwtSecretKey, {expiresIn: "6h"});
        res.status(200).json({token});
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "something went wrong", error: e});
    }
    console.log(`email: ${email} \npassword: ${password} \nconfirmPassword: ${confirmPassword}`);
}

const logIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email: email});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect || !existingUser) throw "Incorrect credentials";
        const token = jwt.sign({email: existingUser.email, userName: existingUser.userName, id: existingUser._id}, jwtSecretKey, {expiresIn: "6h"});
        return res.status(200).json({token: token});
    } catch (e) {
        console.error(e);
        return res.status(500).render("logIn", {layout: "index", errorsExist: true, errors: e});
    }
}

// const logIn = async (req, res) => {
//     // console.log(req);
//     console.log(req.body);
//     console.log(req.body.email);
//     res.send("done");
// }


const getProfiles = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.send(allUsers)
    } catch (e) {
        console.error(e);
    }
}

exports.signUp = signUp;
exports.logIn = logIn;
exports.getProfiles = getProfiles;