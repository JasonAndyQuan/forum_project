import dotenv from "dotenv";
dotenv.config();
import home from "./controllers/homeControl.js"
import postsRouter from "./routes/postsRoutes.js";
import usersRouter from "./routes/usersRoutes.js";

import express from "express";
const app = express();
app.use(express.json());

app.get('/', home);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is now listening on port : ${process.env.PORT} !!!`);
})