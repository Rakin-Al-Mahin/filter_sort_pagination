import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./services.controllers.js";
import {
  authenticate,
  authorizeAdmin,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Create a product (admin only)
router.post("/", authenticate, authorizeAdmin, createProduct);

// Get all products
router.get("/", getProducts);

// Get a product by ID
router.get("/:id", getProduct);

// Update a product (admin only)
router.put("/:id", authenticate, authorizeAdmin, updateProduct);

// Delete a product (admin only)
router.delete("/:id", authenticate, authorizeAdmin, deleteProduct);

export default router;
