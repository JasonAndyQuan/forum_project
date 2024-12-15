require("dotenv").config();
const home = require("./controllers/homeControl.js");
const postsRouter = require("./routes/postsRoutes.js");
const usersRouter = require("./routes/usersRoutes.js");

const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", home);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is now listening on port : ${process.env.PORT} !!!`);
});
