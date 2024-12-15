import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { createUser, getUser_username } from "../storages/queries.js";
import jwt from "jsonwebtoken";

//get /:id, show user profile and their comments
//post , create a user profile

const validateUser = () => [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 25 })
    .withMessage("Must be 3 - 25 chars")
    .custom(async (username) => {
      if (await getUser_username(username)) {
        throw new Error("Username already exists");
      }
    })
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Must be atleast 8 chars")
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
  return res.send(JSON.stringify(result));
});
const usersLOGIN = asyncHandler(async (req, res) => {
  const user = await getUser_username(req.body.username);
  if (!user) {
    console.log("User does not exist");
    return res.send(JSON.stringify({ error: "User does not exist" }));
  } else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err)
          return;

      if (result) {
        console.log("match");

        const data = {userid: user.userid, username: user.username, email: user.email}
        jwt.sign(data, process.env.JWTKEY, (err,token) =>{
          if (err)
            console.log("error at jwtToken stuffs");
          res.json({token});
        });
      }
      else {
        console.log("wrong passwrod");
        return res.send(JSON.stringify({ error: "Incorrect password" }));
      }
    });
  }
});

export { usersGET, usersPOST, usersHOME, usersLOGIN, validateUser };
