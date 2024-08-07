const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

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

// Service to handle user signup
const signupService = async (name, email, password, role) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();

  return { message: "User created successfully" };
};

// Service to handle user login
const loginService = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);

  return { token, message: `Login successful! Welcome ${user.name}` };
};

// Google signup/signin
const googleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL: "https://filter-sort-pagination.vercel.app/api/auth/google/callback",
        callbackURL: "http://localhost:3000/api/auth/google/callback",
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
          const message = `Login successful! Welcome ${user.name}`;

          done(null, { user, token, message });
        } catch (err) {
          done(err, false, err.message);
        }
      }
    )
  );
};

// Facebook signup/signin
const facebookStrategy = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        // callbackURL: "https://filter-sort-pagination.vercel.app/api/auth/facebook/callback",
        callbackURL: "http://localhost:3000/api/auth/facebook/callback",
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
          const message = `Login successful! Welcome ${user.name}`;

          done(null, { user, token, message });
        } catch (err) {
          done(err, false, err.message);
        }
      }
    )
  );
};

// Serialize user
passport.serializeUser((userObj, done) => {
  // Check if userObj contains user property and user has _id
  if (userObj && userObj.user) {
    done(null, userObj.user._id);
  } else if (userObj && userObj._id) {
    // If userObj is the user itself
    done(null, userObj._id);
  } else {
    done(new Error("No user object or ID found"), null);
  }
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
  signupService,
  loginService,
  googleStrategy,
  facebookStrategy,
  passport,
};
