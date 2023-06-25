const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

exports.initializePassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await User.findByEmail(email);
          if (!user) {
            return done(null, false, { message: "Invalid credentials" });
          }
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
};

exports.isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  res.status(401);
  throw new Error("Unauthorized User");
};
