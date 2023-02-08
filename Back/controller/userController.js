const mongoose = require('mongoose')
const bookModel = require("../models/bookmodel")
const reviewModel = require("../models/reviewmodel");
const userModel= require("../models/usermodel")
const jwt = require("jsonwebtoken")
const { valid, regForName, regForDate } = require('../validation/validation');
function validateEmail(input) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(input);
}
const createUser = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      let user = req.body
      if (Object.keys(user).length == 0) return res.status(400).send({ status: false, msg: "data is not present" })
      let title = req.body.title
      let name = req.body.name
      let phone = req.body.phone
      let email = req.body.email
      let password = req.body.password
      let address = req.body.address
  
  
  
      if (!title) {
        return res.status(400).send({ status: false, msg: "Title is mandatory" })
      }
      if (!["Mr", "Mrs", "Miss"].includes(title)) {
        return res.status(400).send({ status: false, msg: "title is not valid" })
      }
      if (!name) {
        return res.status(400).send({ status: false, msg: "Name field is required" })
      }
      if (valid(name) == false) {
        return res.status(400).send({ status: false, msg: "Name is not valid" })
      }
      if (!phone) { return res.status(400).send({ status: false, msg: "Phone no. is mandatory" }) }
  
      // if (valid(phone) === false) {
      //   return res.status(400).send({ status: false, msg: "Phone is not valid" })
      // }
      if (phone.length != 10) { return res.status(400).send({ status: false, msg: "Phone No. must be 10 Digits" }) }
      let uniquePhone = await userModel.find({ phone: phone })
      if (uniquePhone[0]) { return res.status(400).send({ status: false, msg: "Phone number Already exists" }) }
  
      if (!email) { return res.status(400).send({ status: false, msg: "Email Id is mandatory" }) }
      if (valid(email) === false) {
        return res.status(400).send({ status: false, msg: "Email is not valid" })
      }
      
      if (validateEmail(email) == false) { return res.status(400).send({ status: false, msg: "email format is invalid" }) }
  
      let uniqueEmail = await userModel.findOne({ email: email })
      if (uniqueEmail) { return res.status(404).send({ status: false, msg: "Email id Already exists" }) }
  
      if (!password) {
        return res.status(400).send({ status: false, msg: "Password is mandatory" })
      }
      if (valid(password) === false) {
        return res.status(400).send({ status: false, msg: "Password is not valid" })
      }
      if (!(password.length > 8) || (!(password.length < 15))) {
        return res.status(400).send({ status: false, msg: "Password must be between 8 to 15 Characters" })
      }
      if(address){
        if(typeof address!= "object"){
          return res.status(400).send({status:false, message:"Address should be in object!"})
        }
        else {
          let userCreated = await userModel.create(user);
          return res.status(201).send({ status: true, data: userCreated })
        }
        
      }else {
        let userCreated = await userModel.create(user);
        return res.status(201).send({ status: true, data: userCreated })
      }
       
       
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
  }
  }
  

const loginUser = async function (req, res) {
  // res.header('Access-Control-Allow-Credentials', true);
    try {
      let emailId = req.body.email;
      if (!(emailId)) {
        return res.status(400).send({ status: false, msg: "Email Id  is mandatory for login" })
      }
      if(validateEmail(emailId)==false){
        return res.status(400).send({status:false, message:"Invalid email Format"})
      }
      let password = req.body.password;
      if (!(password)) {
        return res.status(400).send({ status: false, msg: " Password is mandatory for login" })
      }
      
  
      let user = await userModel.findOne({ email: emailId, password: password });
      if (!user) { return res.status(404).send({ status: false, msg: "Incorrect Email ID or Password", }) }
  
      let token = jwt.sign(                   
        {
          userId: user._id.toString(),
          userName: emailId,
          password: password
  
        },
        "room-35-secret-key",{expiresIn:"1hr"}
      );
      const options = {
        "expires": new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        "httpOnly": true,
        "secure": true,
        "sameSite": 'none'
      }
      res.cookie("token", token, options);
      return res.status(200).send({ status: true, message: `Welcome Back ${user.name}`, user:user });
    } catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
    }
  };

const profile = async (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  try {
      
    let user = await userModel.findById(req.user.userId)
    if (!user) return res.status(401).json({ status: false, message: "Not Logged In" })
    
    res.status(200).json({status:true,user })
  }
  catch (err) {
    res.status(500).json({ status: false, message:err.message });
    
  }
}

  module.exports= {loginUser, createUser, profile}