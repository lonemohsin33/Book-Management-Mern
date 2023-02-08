const mongoose= require('mongoose')
const bookModel = require("../models/bookmodel")
const reviewModel= require("../models/reviewmodel")
const lodash= require("lodash")




const {valid, regForName, regForDate,isValidISBN} = require("../validation/validation")
const getBooks = async (req, res) => {
  let data = await bookModel.find({});
  console.log(data);
  if (data.length == 0)
    return res.status(404).send({ status: false, message: "No data found" });
  res.status(200).send({ status: true, message: data });
};
const createBook = async function(req, res){
    try{

        let data = req.body
        if(Object.keys(data).length==0) return res.status(400).send({status:false, message:"Data is Not Present!"})
        const {title, excerpt, userId, ISBN,category,releasedAt, subcategory}= data
        if(!title) return res.status(400).send({status:false, message:"Title is not Present! "})
        if(!excerpt) return res.status(400).send({status:false, message:"excerpt is not Present! "})
        if(!userId) return res.status(400).send({status:false, message:"userId is not Present! "})
        if(!ISBN) return res.status(400).send({status:false, message:"ISBN is not Present! "})
        if(!category) return res.status(400).send({status:false, message:"category is not Present! "})
        if(!releasedAt) return res.status(400).send({status:false, message:"releasedAt is not Present! "})


        if(valid(title)==false) return res.status(400).send({status:false, message:"Invalid Title"})
        if(valid(excerpt)==false) return res.status(400).send({status:false, message:"Invalid excerpt"})
        if(valid(ISBN)==false) return res.status(400).send({status:false, message:"Invalid ISBN"})
        if(valid(category)==false) return res.status(400).send({status:false, message:"Invalid category"})
        
        let validObjId = mongoose.Types.ObjectId.isValid(userId)
        if(validObjId==false) return res.status(400).send({status:false, message:"Invalid ObjectId"})



        if(regForName(title)==false) return res.status(400).send({status:false, message:"Invalid Title format"})
        let present = await bookModel.findOne({title:title})
        if(present) return res.status(400).send({status:false, message:"This title is already present in the DB"})
        if(regForName(excerpt)==false) return res.status(400).send({status:false, message:"Invalid excerpt"})
        if(isValidISBN(ISBN)==false) return res.status(400).send({status:false, message:"Invalid ISBN"})
        let present1 = await bookModel.findOne({ISBN:ISBN})
        if(present1) return res.status(400).send({status:false, message:"This ISBN is already present in the DB"})
        if(regForName(category)==false) return res.status(400).send({status:false, message:"Invalid category"})
        if(regForName(subcategory)==false) return res.status(400).send({status:false, message:"Invalid subcategory"})
        if(regForDate(releasedAt)== false) return res.status(400).send({status:false, message:"Invalid Date Format Takes YYYY-MM-DD"})


        const bookData = await bookModel.create(data)
        res.status(201).send({status:true, message:bookData})
    }catch(err){
        res.status(500).send({status:false, message:err.message})

    }
}
const getBookDetails = async function (req, res) {
  try {
      let queries = req.query;

      const bookData = await bookModel.find({
          $and: [{ isDeleted: false }, queries],
      }).select({ ISBN: 0, isDeleted: 0, deletedAt: 0, createdAt: 0, updatedAt: 0, __v: 0 })

      if (bookData.length == 0) return res.status(404).send({ status: false, message: "no document found" })
      let sorted = lodash.sortBy(bookData,["title"])
      return res.status(200).send({status:true, message: "book list", data:sorted})

  } catch (err) {
      return res.status(500).send({ status: false, message: err.message})
}
}


const getBookbyId= async function(req,res){
    try{
        let bookId=req.params.bookId
        //checkobjectId is valid or not
        if(mongoose.Types.ObjectId.isValid(bookId)==false) { return res.status(400).send({status:false,message:"Book Id is not valid"})}
        let books=await bookModel.findOne({_id:bookId,isDeleted:false})
    
        if(!books) { return res.status(400).send({status:false,message:"Data does not exist or already deleted"})}
        let reviewDetails=await reviewModel.find({bookId:books._id, isDeleted:false})
        books= JSON.parse(JSON.stringify(books))
        books["reviewDetails"]= reviewDetails
        res.status(200).send({status:true,message:"Booklist", data:books})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
}
}

//update book by id



const updateBookDataById=async function (req,res) {
    try{
        const paramsBookId = req.params.bookId;
        const filteredData = {};
  
        if (mongoose.Types.ObjectId.isValid(paramsBookId)==false) {
        return res.status(400).send({
            status: false,
            message: "Book Id is not valid",
        });
        }
  
        const existBook=await bookModel.findOne({_id:paramsBookId,isDeleted:false})
        if(!existBook){
          return res.status(404).send({
            status: false,
            message: "No book found with given Id",
          });
        } 
        const requestBody=req.body
  
        if(Object.keys(requestBody).length===0){
          return res.status(400).send({
            status: false,
            message: "Update request rejected no data found in body",
          });
        }
        const{title,excerpt,releasedAt,ISBN}=requestBody

        
        if (title !== undefined) {
          if (typeof title!=='string' && title.trim().length===0) {
            return res.status(400).send({
              status: false,
              message: "title type must be string and required some data inside string",
            });
          }
          const existTitle=await bookModel.findOne({title:title})
          if(existTitle){
            return res.status(400).send({
              status: false,
              message: "use different title",
            });
          }
          filteredData["title"] = title.trim().split(' ').filter(a=>a).join(' ');
        }
  
        if (ISBN !== undefined) {
          if (typeof ISBN!=='string'&& ISBN.trim().length===0) {
            return res.status(400).send({
              status: false,
              message: "ISBN type must be string and required some data inside string",
            });
          }
            const regiexISBN=/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
            if(!regiexISBN.test(ISBN)){
              return res.status(400).send({
                status: false,
                message: "ISBN is not valid its length shout be 10 or 13",
              });
            }
  
          const existISBN=await bookModel.findOne({ISBN:ISBN})
          if(existISBN){
            return res.status(400).send({
              status: false,
              message: "use different ISBN",
            });
          }
          filteredData["ISBN"] = ISBN.trim();
        }
  
  
        if (excerpt !== undefined) {
          if (typeof excerpt!=='string' && excerpt.trim().length===0) {
            return res.status(400).send({
              status: false,
              message: "excerpt type must be string and required some data inside string",
            });
          }
          filteredData["excerpt"] = excerpt.trim().split(' ').filter(a=>a).join(' ');
        }
  
        if (releasedAt !== undefined) {
          if (typeof releasedAt!=='string' && releasedAt.trim().length===0) {
            return res.status(400).send({
              status: false,
              message: "releasedAt type must be string and required some data inside string",
            });
          }
          
          var regEx = /^\d{4}-\d{2}-\d{2}$/;
  
          if(!(regEx.test(releasedAt))){
            return res.status(400).send({
              status: false,
              message: "Date is not vailid example 'YYYY-MM-DD'",
            });
          }
          filteredData["releasedAt"] = releasedAt.trim();
        }
  
        const updateBook=await bookModel.findByIdAndUpdate({_id:existBook._id},{$set:filteredData},{new:true}).lean()
        const allRevies = await reviewModel.find({
          bookId:existBook._id ,
          isDeleted: false,
        });
        updateBook.reviewsData=allRevies
     
  
        return res.status(200).send({status: true,
          message: 'Success',
          data:updateBook})
  
    }catch(err){
        return res.status(500).send({ status:false, message: err.message })
    }
  }
  const deleteBooksById = async function(req,res){
    try{
    let bookId = req.params.bookId;
  
    // console.log(bookId)
    let book = await bookModel.findById(bookId);
    
    // console.log(book) 
    if (book.isDeleted == true){
        return res.status(404).send({status:false, msg:"Book not found"})
      }
    let date = new Date()
    let deletedBook = await bookModel.findOneAndUpdate({_id:bookId},{ $set: { isDeleted: true, deletedAt: date } })
  
    
    return res.status(200).send({ status: true, msg: "Requested Book deleted" })
  }catch(err){
    return res.status(500).send({ msg: err })
  }
  
  }
module.exports.updateBookDataById=updateBookDataById
module.exports.createBook= createBook
module.exports.getBookbyId= getBookbyId
module.exports.getBookDetails= getBookDetails
module.exports.deleteBooksById = deleteBooksById
module.exports.getBooks = getBooks;



