const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/product.services");

const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/auth.middleware");

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

module.exports = router;
