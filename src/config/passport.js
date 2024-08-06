const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../app/modules/user/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_TOKEN = process.env.JWT_SECRET;

// Generate a token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    JWT_TOKEN,
    { expiresIn: "1h" }
  );
};

// Google Strategy setup
const googleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              role: "user",
              googleId: profile.id,
            });
            await user.save();
          }

          const token = generateToken(user);
          done(null, { user, token });
        } catch (err) {
          done(err, false, err.message);
        }
      }
    )
  );
};

// Facebook Strategy setup
const facebookStrategy = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/api/auth/facebook/callback",
        profileFields: ["id", "emails", "name"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });
          if (!user) {
            user = new User({
              name: `${profile.name.givenName} ${profile.name.familyName}`,
              email: profile.emails[0].value,
              role: "user",
              facebookId: profile.id,
            });
            await user.save();
          }

          const token = generateToken(user);
          done(null, user);
        } catch (err) {
          done(err, false, err.message);
        }
      }
    )
  );
};

// Serialize user
passport.serializeUser((userObj, done) => {
  done(null, userObj.user._id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = {
  googleStrategy,
  facebookStrategy,
  passport,
};
