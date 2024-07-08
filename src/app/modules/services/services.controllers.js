const {
  createProductService,
  getProductsService,
  getProductService,
  updateProductService,
  deleteProductService,
} = require("./services.service");

// Create a product
const createProduct = async (req, res) => {
  try {
    const result = await createProductService(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products with filtering, sorting, and pagination
const getProducts = async (req, res) => {
  try {
    const result = await getProductsService(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product
const getProduct = async (req, res) => {
  try {
    const result = await getProductService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const result = await updateProductService(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const result = await deleteProductService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
