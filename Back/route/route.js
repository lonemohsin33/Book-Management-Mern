const express=require('express')
const router=express.Router()
const bookController = require("../controller/bookController")
// const {getBookDetails}= require("../controller/bookController")
const {createUser,loginUser,profile}= require("../controller/userController")
const {updateReview,createReview,deleteReview} = require("../controller/reviewController")
// const bookModel= require('../models/bookModel')
const {Authentication,Authorization} = require("../middleware/MW")
const aws= require("aws-sdk")



aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer
    }


    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        // console.log(data)
        // console.log("file uploaded succesfully")
        return resolve(data.Location)
    })

    // let data= await s3.upload( uploadParams)
    // if( data) return data.Location
    // else return "there is an error"

   })
}

router.post("/write-file-aws", async function(req, res){

    try{
        let files= req.files
        if(files && files.length>0){
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            let uploadedFileURL= await uploadFile( files[0] )
            res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        
    }
    catch(err){
        res.status(500).send({msg: err})
    }
    
})





router.post("/register",createUser )

router.get("/logout", async (req, res) => {
    try {
         res
           .status(200)
           .cookie('token', null, {
             expires: new Date(Date.now()),
             httpOnly: true,
             "secure": true,
             sameSite: 'none',
           })
           .json({ status: false, message: 'Logged Out SuccessFully' });
    } catch (err) {
        res.status(500).json({status:false, message:err.message})
    }
})

router.get('/me', Authentication,profile);


router.post("/login", loginUser) 
router.get("/getbooks", bookController.getBooks)
router.post("/books",Authentication,bookController.createBook )
router.get("/books", bookController.getBookDetails)
router.get("/books/:bookId",Authentication,bookController.getBookbyId )

router.put("/books/:bookId",Authentication,Authorization, bookController.updateBookDataById)
router.delete("/books/:bookId",Authentication,Authorization, bookController.deleteBooksById)
router.post("/books/:bookId/review",createReview )
router.put("/books/:bookId/review/:reviewId", updateReview)
router.delete("/books/:bookId/review/:reviewId", deleteReview)


router.get("/getapi", function(req,res ){
    try{

        res.status(200).send({message:" Hello World"})
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})






module.exports=router
