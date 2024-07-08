const express = require("express");
const authRoute = require("../modules/auth/auth.route.js");
const userRoute = require("../modules/user/user.route.js");
const servicesRoute = require("../modules/services/services.route.js");

const router = express.Router();

// Define routes
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/products", servicesRoute);

module.exports = router;
