import { Request, Response } from "express";
import { signupService, loginService } from "./auth.service.js";
import passport from "passport";

// Sign up a user
const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const result = await signupService(name, email, password, role);
    res.status(201).json(result);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Email already in use") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

// Login a user
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    res.status(200).json(result);
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

// Google login callback
const googleCallback = passport.authenticate("google", {
  failureRedirect: "/api/login",
  successRedirect: "/api/dashboard",
});

// Facebook login callback
const facebookCallback = passport.authenticate("facebook", {
  failureRedirect: "/api/login",
  successRedirect: "/api/dashboard",
});

export { signup, login, googleCallback, facebookCallback };
