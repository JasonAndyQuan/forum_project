import asyncHandler from "express-async-handler";
import { createUser } from "../storages/queries.js";

//get /:id, show user profile and their comments
//post , create a user profile

const usersHOME = asyncHandler((req, res) => {
  console.log("I am users GET ALL");
  res.send(`I am users GET ALL`);
});
const usersGET = asyncHandler((req, res) => {
  console.log("I am users GET");
  res.send(`I am users GET with Param ${req.params.id}`);
});
const usersPOST = asyncHandler( async (req, res) => {
    

    await createUser("First@gmail.com", "Tester", "Password123");
    res.send ("user created");
});


export { usersGET, usersPOST, usersHOME };
