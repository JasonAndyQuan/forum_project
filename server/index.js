import "dotenv/config";

import home from "./controllers/homeControl.js"
import postsRouter from "./routes/postsRoutes.js";
import usersRouter from "./routes/usersRoutes.js";


import cors from "cors";
import express from "express";
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', home);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is now listening on port : ${process.env.PORT} !!!`);
})