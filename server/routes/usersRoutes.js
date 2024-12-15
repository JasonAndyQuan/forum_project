const { usersGET, usersPOST, usersHOME, validateUser, usersLOGIN } = require("../controllers/usersControl.js");
const express = require("express");

const usersRouters = express.Router();
usersRouters.get("/:id", usersGET);
usersRouters.get("/", usersHOME);
usersRouters.post("/", validateUser(), usersPOST);
usersRouters.post("/login", usersLOGIN);

module.exports = usersRouters;