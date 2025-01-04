require("dotenv").config();
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
app.set('trust proxy', 1)
app.use(passport.initialize());
app.use(passport.session());

passport.use(strat);
passport.serializeUser(serializeUser);
passport.deserializeUser(deSerializeUser);
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
