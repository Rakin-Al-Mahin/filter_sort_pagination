import { Request, Response } from "express";
import {
  createProductService,
  getProductsService,
  getProductService,
  updateProductService,
  deleteProductService,
} from "./services.service.js";

// Create a product
const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await createProductService(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products with filtering, sorting, and pagination
const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getProductsService(req.query);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product
const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getProductService(req.params.id);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Update a product
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await updateProductService(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Delete a product
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteProductService(req.params.id);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
