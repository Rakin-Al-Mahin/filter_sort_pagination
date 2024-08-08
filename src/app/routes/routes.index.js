const express = require("express");
const authRoute = require("../modules/auth/auth.route.js");
const userRoute = require("../modules/user/user.route.js");
const servicesRoute = require("../modules/services/services.route.js");
const dashboardRoute = require("../modules/dashboard/dashboard.route.js");
const { socialAuthenticated } = require("../middlewares/auth.middleware");

const router = express.Router();

// Define routes
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/products", servicesRoute);
router.use("/dashboard", socialAuthenticated, dashboardRoute);

router.get("/login", (req, res) => {
  res.send("Social login failed!!");
});

module.exports = router;
