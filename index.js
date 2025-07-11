const express=require('express');
const dotenv = require("dotenv");
const DbConnection = require("./databaseConnection");
const usersRouter=require("./routes/users");
const booksRouter=require("./routes/books");

dotenv.config();

const app=express(); 
DbConnection();

const port=8081;
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"server is running now"
    });
});

app.use("/users",usersRouter);
app.use("/books",booksRouter);


app.use((req,res)=>{
    res.status(404).json({
        message:"this route doesn't exist"
    });
});
app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port} `);
})

