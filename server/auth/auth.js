// const JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt;

const localStrategy = require("passport-local").Strategy;
const { getUser_username, getUser } = require("../storages/queries");
const pool = require("../storages/pool");
const bcrypt = require("bcrypt");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);


const sessionAuth = session({
    store: new pgSession ({
        pool: pool,
        tablename:"session"
    }),
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "lax", 
    }
})

const strat = new localStrategy(async (username, password, done) => {
  const user = await getUser_username(username);
  if (!user) {
    return done(null, false, { message: "no user found" });
  }
  bcrypt.compare(password, user.password, (err, same) => {
    if (same) {
      return done(null, user);
    } else {
      return done(null, false, { message: "wrong password" });
    }
  });
});


const serializeUser = async (user, done) => {
    try {
      done(null, user.userid); 
    } catch (error) {
      done(error); 
    }
  };

  const deSerializeUser = async (id, done) => {
    try {
      const user = await getUser(id);  
      if (!user) {
        return done(new Error("User not found"));  
      }
      done(null, user);  
    } catch (error) {
      done(error);  
    }
  };

module.exports = {strat, sessionAuth, serializeUser, deSerializeUser}
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.JWTKEY;

// passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
//     await getUser({id: jwt_payload.sub}, (err, user) => {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));
