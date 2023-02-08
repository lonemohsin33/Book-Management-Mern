const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bookModel = require("../models/bookmodel")


const Authentication = function (req, res, next) {
    try {
        

        let {token} = req.cookies
        if (!token) return res.status(401).send({ status: false, message: "Not Logged In" })
        let decode = jwt.verify(token, "room-35-secret-key")
        if (!decode) return res.status(401).send({ status: false, message: "Not Authenticated! " })
        req.user= decode
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const Authorization = async (req, res, next) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");

        let token = req.headers["x-api-key"]
        if (!token) return res.status(400).send({ status: false, message: "Token mut be Present" })
        //validate token later
        let decode = jwt.verify(token, "room-35-secret-key")
        
        const loggedAuthor = decode.userId
        let newAuthor = req.params.bookId
        let validId = mongoose.Types.ObjectId.isValid(newAuthor)
        if (validId == false) return res.status(400).send({ status: false, message: "Invalid Id" })
        let thisUser = await bookModel.findOne({ _id: newAuthor })
        if(!thisUser){
            return res.status(404).send({ status: false, message: "Book Not Present" })
        }
   
        if (loggedAuthor != thisUser.userId) return res.status(403).send({ status: false, message: "Authorization Error! " })
        next()
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}

module.exports = { Authorization, Authentication }