const express = require("express");
const {
  signup,
  login,
  googleCallback,
  facebookCallback,
} = require("./auth.controllers");
const passport = require("passport");
const router = express.Router();
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

module.exports = router;
