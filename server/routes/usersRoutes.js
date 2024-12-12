import { usersGET, usersPOST, usersHOME,validateUser } from "../controllers/usersControl.js";
import express from 'express';

const usersRouters = express.Router();

usersRouters.get("/:id", usersGET);
usersRouters.get("/", usersHOME);
usersRouters.post("/", validateUser(), usersPOST);

export default usersRouters;