import { usersGET, usersPOST, usersHOME } from "../controllers/usersControl.js";
import express from 'express';

const usersRouters = express.Router();

usersRouters.get("/:id", usersGET);
usersRouters.get("/", usersHOME);
usersRouters.post("/", usersPOST);

export default usersRouters;