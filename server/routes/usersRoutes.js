import { usersGET, usersPOST, usersHOME,validateUser, usersLOGIN } from "../controllers/usersControl.js";
import express from 'express';

const usersRouters = express.Router();

usersRouters.get("/:id", usersGET);
usersRouters.get("/", usersHOME);
usersRouters.post("/", validateUser(), usersPOST);
usersRouters.post("/login", usersLOGIN);

export default usersRouters;