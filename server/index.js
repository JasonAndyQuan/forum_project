require("dotenv").config();
const home = require("./controllers/homeControl.js");
const {
  strat,
  sessionAuth,
  serializeUser,
  deSerializeUser,
} = require("./auth/auth.js");
const postsRouter = require("./routes/postsRoutes.js");
const usersRouter = require("./routes/usersRoutes.js");
const passport = require("passport");

const cors = require("cors");
const express = require("express");
const app = express();

app.use(sessionAuth);
app.use(passport.initialize());
app.use(passport.session());

passport.use(strat);
passport.serializeUser(serializeUser);
passport.deserializeUser(deSerializeUser);
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", home);
app.post("/login", passport.authenticate("local"), (req,res) => {
  const load = {};
  load.userid = req.user.userid;
  load.username =req.user.username;
  load.date = req.user.date;
  res.json({user: load});
});
app.get("/sesh", (req,res) => {
  console.log(" Session refreshed ");
  if (!req.user)
    return res.json({user:null});

  const load = {};
  load.userid = req.user.userid;
  load.username = req.user.username;
  load.date = req.user.date;
  return res.json({user:load});
})
app.post("/logout",(req,res)=>{
  req.logOut((err) => {
    if (!err)
      return res.json({errors : err});
  });
})
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is now listening on port : ${process.env.PORT} !!!`);
});
