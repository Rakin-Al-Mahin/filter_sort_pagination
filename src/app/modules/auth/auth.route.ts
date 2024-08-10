import express, { Router } from "express";
import {
  signup,
  login,
  googleCallback,
  facebookCallback,
} from "./auth.controllers.js";
import passport from "passport";

const router: Router = express.Router();

// const { authenticate } = require("../../middlewares/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", googleCallback);

// Facebook OAuth routes
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get("/facebook/callback", facebookCallback);

export default router;
