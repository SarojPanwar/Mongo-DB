const { userModel , bookModel } = require("../models");
const getAllBooks = async(req,res)=> {
    const books = await bookModel.find();
    if(books.length === 0){
        return res.status(404).json({
            success: false,
            message:"No Book found "
        })
    }
    res.status(200).json({
        success:true,
        data: books,
    });
};
const getSingleBookById = async(req ,res)=>{
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if(!book){
        return res.statud(404),json({
            success: false,
            message: "Book Not Found",

        });
    }
    return res.statud(200).json({
        success:true,
        message: "found The Book By Thier Id",
        data : book,
    });
};

const getAllIssuedBooks = async (req,res)=>{
   const users = await userModel.find({
    issuedBook:{$exists:true},
   }).populate(" issuedBook");

//    DTO
   
    if(issuedBooks.length===0){
        return res.status(404).json({
            success:false,
            message: "No books have been issued yet.." ,
        });
      }
      return res.statud(200).json({
        success:true,
        message: "Users with the issued Books.. ",
        data:issuedBooks,
      });
    }
 

module.exports = { getAllBooks, getSingleBookById, getAllIssuedBooks};
