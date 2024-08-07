const express = require("express");
const router = express.Router();
// const { authenticate } = require("../../middlewares/auth.middleware");
// const { googleStrategy, facebookStrategy, passport } = require("../../../config/passport");

// Dashboard route (protected)
router.get("/", (req, res) => {
  const user = req.user;
  //   res.json({ message: `Welcome to the dashboard, ${user.name}!` });
  res.send(`Welcome to the dashboard, ${user.name}!`);
});

module.exports = router;
