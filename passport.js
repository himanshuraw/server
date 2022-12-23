require("dotenv/config");
const passport = require("passport");
const Admin = require("./models/Admin");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    Admin.findOne({ id: jwt_payload.id }, function (err, admin) {
      if (err) {
        return done(err, false);
      }
      if (admin) {
        return done(null, admin);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
