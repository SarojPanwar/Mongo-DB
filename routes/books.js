const express=require('express');
const {
     getAllBooks,
     getSingleBookById,
    getAllIssuedBooks
     } = require("../Controllers/book-controller");
const router=express.Router();
 const { books }=require("../Data/Books.json");
  const { users }=require("../Data/users.json");
// const bookModel = require("../models/book-model");
// const userModel = rquire("../models/user-model");
 
const { userModel , bookModel } = require("../models/index");
/**
 * Route: /Books
 * Method: GET
 * Description:getting all books
 * Access: Public 
 * Parameters:none
 */

router.get("/",getAllBooks );
    



/**
 * Route: /books/issued
 * Method: GET
 * Description:get all issued books
 * Access: Public 
 * Parameters:id
 */
router.get("/issued/by-user",getAllIssuedBooks);
  

/**
 * Route: /books:id
 * Method: GET
 * Description:get single book by their id
 * Access: Public 
 * Parameters:id
 */
router.get("/:id",getSingleBookById);




/**
 * Route: /
 * Method: POST
 * Description:adding a new book
 * Access: Public 
 * Parameters:none
 * data: author,id,name,genre,price,publisher 
 */

router.post("/",(req,res)=>{
    const {data}=req.body;

    if(!data){
        return res.status(400).json({
            success:false,
            message:"No data to add a book added"
        })
    }
    const book=books.find((each)=>each.id===data.id);
    if(book){
        return res.status(404).json({
            success:false,
            message:"Id is already existe !!"
        })
    }
    const allBooks={...books, data};
    return res.status(201).json({
        success:true,
        message:"Added book successfully",
        data:allBooks
    })
})

/**
 * Route: /:id
 * Method: PUT
 * Description:updating a Book bi its id
 * Access: Public 
 * Parameters:id
 * data: author,id,name,genre,price,publisher 
 */

router.put("/updateBook/:id",(req,res)=>{
    const { id }=req.params;
    const{data}=req.body;

    const book=books.find((each)=>each.id===id)
    if(!book){
        return res.status(400).json({
            success:false,
            message:"Book not found for this ID",
        });
    }
    const updateData=books.map((each)=>{
        if(each.id===id){
            return {...each, ...data};
        }
        return each;
    });
    return res.status(200).json({
        success:true,
        message:"Updated a book by thier id",
        data:updateData,
    });
});
module.exports=router;