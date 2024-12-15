const { usersGET, usersPOST, usersHOME, validateUser} = require("../controllers/usersControl.js");
const express = require("express");

const usersRouters = express.Router();
usersRouters.get("/:id", usersGET);
usersRouters.get("/", usersHOME);
usersRouters.post("/", validateUser(), usersPOST);

module.exports = usersRouters;