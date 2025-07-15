const express=require('express');
const router=express.Router();
const { users }=require("../Data/users.json");
const { userModel , bookModel } = require("../models/index");

/**
 * Route: /
 * Method: GET
 * Description:get all users
 * Access: Public 
 * Parameters:none
 */

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users,
    });
});

/**
 * Route: /:id
 * Method: GET
 * Description:get single user by their id
 * Access: Public 
 * Parameters:id
 */

router.get("/:id",(req,res)=>{
    const { id }=req.params;
    const user =users.find((each)=>each.id===(id));
    if(!user){
        return res.status(404).json({
            success:false,
            message: "User doesn't exist",
        });
    }
    return res.status(200).json({
        success:true,
        message:"User found",
        data:user,
    });

})

/**
 * Route: /
 * Method: Post
 * Description:creating user by their id
 * Access: Public 
 * Parameters:
 */
router.post("/",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate}=req.body;
    const user=users.find((each)=>each.id===id);
    if(user){
        return res.status(404).json({
            success:false,
            message:"User with the ID exists",
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
        }
    );
    return res.status(201).json({
        success:true,
        message:"user added successfully",
        data:users,
    });
})
/**
 * Route: /:id
 * Method: Put
 * Description:updating a user by their id
 * Access: Public 
 * Parameters:id
 */
router.put("/:id",(req,res)=>{
    const{ id }=req.params;
    const { data }=req.body;
    const user =users.find((each)=>each.id===(id));
    if(!user){
        return res.status(404).json({
            success:false,
            message: "User doesn't exist",
        });
    }
    const updateUserData=users.map((each)=>{
        if(each.id===(id)){
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(200).json({
        success:true,
        message:"User updated !",
        data:updateUserData,
    });
});
/**
 * Route: /:id
 * Method: DELETE
 * Description:deleting a user by their id
 * Access: Public 
 * Parameters:id
 */

router.delete("/:id",(req,res)=>{
    const { id }=req.params;
    const user =users.find((each)=>each.id===(id));
    if(!user){
        return res.status(404).json({
            success:false,
            message: "User doesn't exist",
        });
    }
    const index=users.indexOf(user);
     users.splice(index,1)

     return res.status(200).json({
        success:true,
        message:"Deleted User..",
        data:users,
     });
});

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description:get all users subscription details
 * Access: Public 
 * Parameters:id
 */

router.get("/subscription-details/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User with  the ID did not Exist",
        });
    }
const getDateInDays=(data= "")=> {
    let date;
    if(data===""){
        date=new Date();
    }else{
        date=new Date(data);
    }
    let days=Math.floor(date/(1000*60*60*24));
    return days;
};
const subscriptionType=(date)=>{
    if((user.subscriptionType === "Basic")){
        date=date+90;
    }else if((user.subscriptionType === "Standard")){
        date=date+180;
    }else if((user.subscriptionType === "Premium")){
        date=date+365;
    }
    return date;
};
//Jan 1 1970
let returnDate=getDateInDays(user.returnDate);
let currentDate=getDateInDays();
let subscriptionDate=getDateInDays(user.subscriptionDate);
let subscriptionExpiration=subscriptionType(subscriptionDate);

const data={
    ...user,
    isSubscriptionExpired:subscriptionExpiration<=currentDate,
    daysleftForExpiration:subscriptionExpiration<=currentDate?0:subscriptionExpiration-currentDate,
    fine:
        returnDate<currentDate
        ? subscriptionExpiration<=currentDate
          ?100
           :50
       :0,    
};
return res.status(200).json({
  success:true,
  message:"Subscription details for the user is: ",
  data,  
})
});

module.exports=router;
// Math.floor()
