const express = require("express");
const router = express.Router();
const { updateUserRole } = require("../user/user.controllers");
const {
  authenticate,
  authorizeAdmin,
} = require("../../middlewares/auth.middleware");

// Update user role (admin only)
router.put("/:id/role", authenticate, authorizeAdmin, updateUserRole);

module.exports = router;
