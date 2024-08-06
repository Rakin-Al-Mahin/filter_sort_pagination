const { signupService, loginService } = require("./auth.service");
const passport = require('passport');

// Sign up a user
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await signupService(name, email, password, role);
    res.status(201).json(result);
  } catch (error) {
    if (error.message === "Email already in use") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Invalid email or password") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Google login callback
const googleCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/api/dashboard'
});

// Facebook login callback
const facebookCallback = passport.authenticate('facebook', {
  failureRedirect: '/login',
  successRedirect: '/api/dashboard'
});

module.exports = { signup, login, googleCallback, facebookCallback };
