const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const opts = {};

exports.initializePassport = (passport) => {
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = "SECRETJWT";
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findByEmail(jwt_payload.user.email);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.status(401);
  throw new Error("Unauthorized User");
};
