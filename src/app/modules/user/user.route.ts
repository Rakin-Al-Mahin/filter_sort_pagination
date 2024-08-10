import express from "express";
import { updateUserRole } from "../user/user.controllers.js";
import {
  authenticate,
  authorizeAdmin,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Update user role (admin only)
router.put("/:id/role", authenticate, authorizeAdmin, updateUserRole);

export default router;
