import asyncHandler from "express-async-handler";


//get /:id, show user profile and their comments
//post , create a user profile

const usersHOME = asyncHandler((req,res)=>{
    console.log("I am users GET ALL");
    res.send(`I am users GET ALL`);
});
const usersGET = asyncHandler((req,res)=>{
    console.log("I am users GET");
    res.send(`I am users GET with Param ${req.params.id}`);
});
const usersPOST = asyncHandler((req,res)=>{

});

export {usersGET, usersPOST, usersHOME};