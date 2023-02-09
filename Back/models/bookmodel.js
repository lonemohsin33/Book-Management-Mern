const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId
const bookSchema = new mongoose.Schema({


    title: {
        type:String, 
        required:true, 
        unique:true
    },
    author: {
        type: String,
        required: true,
        
    },
    excerpt: {
        type:String,
        required:true 
    },
    userId: {
        type:ObjectId,
        required: true, 
        ref:"user"
    },
    ISBN: {
        type:String, 
        required: true,
        unique: true
    },
    category: {
        type:String,
        required: true
    },
    reviews: {
        type:Number, 
        default: 0},
    deletedAt: {
        type: Date,
        default: null
    }, 
    isDeleted: {
        type:Boolean,
        default: false
    },
    releasedAt:  {
        type:Date, 
        required:true, 
       },
       bookcover:{
        type:String,
        required:true
       }
  },{timestamps:true}
 ) 
module.exports = mongoose.model("book",bookSchema)