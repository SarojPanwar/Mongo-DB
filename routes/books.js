const express=require('express');
const router=express.Router();
 const { books }=require("../Data/Books.json");
  const { users }=require("../Data/users.json");

/**
 * Route: /Books
 * Method: GET
 * Description:getting all books
 * Access: Public 
 * Parameters:none
 */
router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"got all the books",
        data:books
    });
});


/**
 * Route: /books/issued
 * Method: GET
 * Description:get all issued books
 * Access: Public 
 * Parameters:id
 */
 router.get("/issued",(req,res)=>{
    const userWithTheIssuedBook=users.filter((each)=>
        each.issuedBook
    );
    const issuedBooks=[];
    userWithTheIssuedBook.forEach((each)=>{
        const book=books.find((book)=>
            book.id===each.issuedBook);
        if(book){
        book.issuedBy=each.name;
        book.issuedDate=each.issuedDate;
        book.returnDate=each.returnDate;

        issuedBooks.push(book);
        }
    });
    if(issuedBooks.length===0){
        return res.status(404).json({
            success:false,
            message: "No books have been issued yet.." ,
        });
        
    }
    return res.status(200).json({
        success:true,
        message:"users with the Issued Books...",
        data:issuedBooks,
    });
 });
/**
 * Route: /books:id
 * Method: GET
 * Description:get single book by their id
 * Access: Public 
 * Parameters:id
 */
router.get("/:id",(req,res)=>{
    const { id }= req.params;
     const book =books.find((each)=>each.id===(id));
    if(!book){
        return res.status(404).json({
            success:false,
            message: "book doesn't exist",
        });
    }
    return res.status(200).json({
        success:true,
        message:"Book found",
        data:book,
    });
});



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