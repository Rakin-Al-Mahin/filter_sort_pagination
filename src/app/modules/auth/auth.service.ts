import User, { UserDocument } from "../user/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

dotenv.config();

const JWT_TOKEN = process.env.JWT_SECRET as string;

interface SignupServiceResponse {
  message: string;
}

interface LoginServiceResponse {
  token: string;
  message: string;
}

// Generate a token
const generateToken = (user: UserDocument): string => {
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
const signupService = async (
  name: string,
  email: string,
  password: string | null,
  role: string,
  googleId: string | null = null,
  facebookId: string | null = null
): Promise<SignupServiceResponse> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  let hashedPassword: string | null = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
    googleId,
    facebookId,
  });
  await user.save();

  return { message: "User created successfully" };
};

// Service to handle user login
const loginService = async (
  email: string,
  password: string | null = null
): Promise<LoginServiceResponse> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (password) {
    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
  }

  const token = generateToken(user);

  return { token, message: `Login successful! Welcome ${user.name}` };
};

// Google signup/signin
const googleStrategy = (): void => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL:
          "https://filter-sort-pagination.vercel.app/api/auth/google/callback",
        // callbackURL: "http://localhost:3000/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails?.[0].value });
          if (!user) {
            await signupService(
              profile.displayName,
              profile.emails?.[0].value as string,
              null,
              "user",
              profile.id,
              null
            );
            user = await User.findOne({ email: profile.emails?.[0].value });
          }

          const { token, message } = await loginService(
            profile.emails?.[0].value as string,
            null
          );

          done(null, { user, token, message });
        } catch (err: any) {
          done(err, false, err.message);
        }
      }
    )
  );
};

// Facebook signup/signin
const facebookStrategy = (): void => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        callbackURL:
          "https://filter-sort-pagination.vercel.app/api/auth/facebook/callback",
        // callbackURL: "http://localhost:3000/api/auth/facebook/callback",
        profileFields: ["id", "emails", "name"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails?.[0].value });
          if (!user) {
            await signupService(
              `${profile.name?.givenName} ${profile.name?.familyName}`,
              profile.emails?.[0].value as string,
              null,
              "user",
              null,
              profile.id
            );
            user = await User.findOne({ email: profile.emails?.[0].value });
          }

          const { token, message } = await loginService(
            profile.emails?.[0].value as string,
            null
          );

          done(null, { user, token, message });
        } catch (err: any) {
          done(err, false, err.message);
        }
      }
    )
  );
};

// Serialize user
passport.serializeUser((userObj: any, done) => {
  if (userObj && userObj.user) {
    done(null, userObj.user._id);
  } else if (userObj && userObj._id) {
    done(null, userObj._id);
  } else {
    done(new Error("No user object or ID found"), null);
  }
});

// Deserialize user
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export {
  signupService,
  loginService,
  googleStrategy,
  facebookStrategy,
  passport,
};
