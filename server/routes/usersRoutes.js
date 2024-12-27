const { getUserProfile, createUserProfile, validateUser} = require("../controllers/usersControl.js");
const express = require("express");

const usersRouters = express.Router();
usersRouters.get("/:id", getUserProfile);                //get user info via ID
usersRouters.post("/", validateUser(), createUserProfile); //create user

module.exports = usersRouters;