const mongoose = require('mongoose')
const bookModel = require("../models/bookmodel")
const reviewModel = require("../models/reviewmodel");
const { valid, regForName, regForDate } = require('../validation/validation');


//create review
const createReview = async function (req, res) {
    try {
        
        const book = req.params.bookId;

        if (mongoose.Types.ObjectId.isValid(book) == false) {
            return res.status(400).send({ status: false, message: "Book Id is not valid" });
        }

        const existBook = await bookModel.findOne({ _id: book, isDeleted: false });

        if (!existBook) {
            return res.status(404).send({ status: false, message: "No Book with this Id found" });
        }
        requestBody = req.body;
        if (Object.keys(requestBody).length == 0) {
            return res.status(400).send({ status: false, message: "No data Present" });
        }
        const { reviewedBy, rating, review, reviewedAt } = requestBody;
        if (valid(reviewedBy) == false) {
            return res.status(400).send({ status: false, message: "ReviewedBy is mandatory!" });
        }
        if (regForName(reviewedBy) == false) {
            return res.status(400).send({ status: false, message: "reviewedBy should be in alphabets" })
        }



        if (rating == undefined || typeof rating !== "number") {
            return res.status(400).send({ status: false, message: "rating is required and type must be Number" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).send({ status: false, message: "rating should be between 1 to 5" });
        }


        if (valid(review) == false) {
            return res.status(400).send({ status: false, message: "Review is mandatory" });
        }

        if (valid(reviewedAt) == false) {
           return res.status(400).send({ status: false, message: "ReviewdAt is Mandatory!" });
        }
        if (regForDate(reviewedAt) == false) {
            return res.status(400).send({ status: false, message: "Invalid ReviewdAt Format Must be In (YYYY/MM/DD)!" });
        }
        requestBody.bookId= book

        const createdreviews = await reviewModel.create(requestBody);
        await bookModel.findOneAndUpdate({_id:book}, {$inc:{reviews:1}}, {new:true})

        res.status(201).send({ status: true, message: "Success", data: createdreviews });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


const updateReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId
        if (mongoose.Types.ObjectId.isValid(bookId) == false) { return res.status(400).send({ status: false, message: "invalid bookId" }) }
        if (mongoose.Types.ObjectId.isValid(reviewId) == false) { return res.status(400).send({ status: false, message: "invalid reviewId" }) }

        let bookExist = await bookModel.findOne({ _id: bookId, isDeleted:false })
        if (!bookExist) { return res.status(404).send({ status: false, message: "book doesn't exist" }) }
        let reviewExist = await reviewModel.findOne({ _id: reviewId, isDeleted:false })

        if (!reviewExist) { return res.status(404).send({ status: false, message: "review doesn't exist" }) }
        let data = req.body  // { kfjfkj:hgdfkgh}
        let updateData = await reviewModel.findOneAndUpdate({ $and: [{ _id: reviewId }, { bookId: bookId }, { isDeleted: false }] }, { $set: { reviewedBy: data.reviewedBy, rating: data.rating, review: data.review } }, { new: true })
        res.status(200).send({ status: true, message: updateData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}
const deleteReview = async function (req, res) {
    try{
        let bookId = req.params.bookId
        if(mongoose.Types.ObjectId.isValid(bookId)==false){
            return res.status(400).send({status:false, message:"Invalid BookId! "})
        }
        let reviewId= req.params.reviewId
        if(mongoose.Types.ObjectId.isValid(reviewId)==false){
            return res.status(400).send({status:false, message:"Invalid ReviewId! "})

        }

        let bookExists = await bookModel.findOne({_id:bookId, isDeleted:false})
        if(!bookExists) return res.status(404).send({status:false, message:"Book not present or Deleted! "})
        let reviewExists = await reviewModel.findOne({_id:reviewId, isDeleted:false})
        if(!reviewExists) return res.status(404).send({status:false, message:"Review not present or Deleted! "})

        let deletereview = await reviewModel.findOneAndUpdate({_id:reviewId, bookId:bookId}, {$set:{isDeleted:true}}, {new:true})

        await bookModel.updateOne({_id:bookId}, {$inc:{reviews:-1}}, {new:true})

        res.status(200).send({status:true, message:"Review Deleted Successfully"})


    }
    catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}


module.exports = { updateReview, createReview, deleteReview}