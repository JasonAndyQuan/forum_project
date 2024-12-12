import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { createUser, checkUser } from "../storages/queries.js";

//get /:id, show user profile and their comments
//post , create a user profile

const validateUser = () => [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 25 })
    .withMessage("Username must be between 3 and 25 chars")
    .custom(async (username) => {
      if (await checkUser(username))
        throw new Error("Username already exists");
    })
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 chars")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be an email")
    .normalizeEmail(),
];

const usersHOME = asyncHandler((req, res) => {
  //sign up stuffs
  console.log("I am users GET ALL");
  res.send(`I am users GET ALL`);
});
const usersGET = asyncHandler((req, res) => {
  console.log("I am users GET");
  res.send(`I am users GET with Param ${req.params.id}`);
});
const usersPOST = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if (result.isEmpty()) {
    console.log("success, no errors");
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        console.log("errror here at hashing");
      }
      await createUser(req.body.email, req.body.username, hash);
    });
  }
  res.send("user created");
});

export { usersGET, usersPOST, usersHOME, validateUser };
