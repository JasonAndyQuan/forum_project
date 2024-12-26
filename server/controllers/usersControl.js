const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const {
  createUser,
  getUser_username,
  getUserData,
} = require("../storages/queries.js");

//get /:id, show user profile and their comments
//post , create a user profile

const validateUser = () => [
  body("username")
    .trim()
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
    .isLength({ min: 8 })
    .withMessage("Must be atleast 8 chars")
    .escape(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Must be an email")
    .normalizeEmail(),
];


const usersGET = asyncHandler(async (req, res) => {
  const result = await getUserData(req.params.id);
  
  //err handling here;
  return res.json(result);
});

const usersHOME = asyncHandler((req, res) => {
  //sign up stuffs
  console.log("I am users GET ALL");
  res.send(`I am users GET ALL`);
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

module.exports = {
  usersGET,
  usersPOST,
  usersHOME,
  validateUser,
};
