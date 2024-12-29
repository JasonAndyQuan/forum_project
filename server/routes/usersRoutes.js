const {
  getUserProfile,
  createUserProfile,
  validateUser,
  deleteUser
} = require("../controllers/usersController.js");
const express = require("express");

const usersRouters = express.Router();
usersRouters.get("/:id", getUserProfile); //get user info via ID
usersRouters.post("/", validateUser(), createUserProfile); //create user
usersRouters.delete("/:id", deleteUser);

module.exports = usersRouters;
