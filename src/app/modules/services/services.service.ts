import Product from "./services.model.js";
import { Document, FilterQuery, UpdateQuery } from "mongoose";

// Define TypeScript types for your service functions
interface ProductData {
  // Define the structure based on your Product model
  name: string;
  price: number;
  // Add other fields as needed
}

interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  [key: string]: any; // For additional filters
}

// Service to create a product
const createProductService = async (productData: ProductData) => {
  const product = await Product.create(productData);
  return { message: "Product created successfully", product };
};

// Service to get all products with filtering, sorting, and pagination
const getProductsService = async (query: QueryParams) => {
  const { page = 1, limit = 5, sort, ...filters } = query;

  const productQuery = Product.find(filters as FilterQuery<Document>);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    productQuery.sort(sortList);
  }

  const total = await Product.countDocuments(filters as FilterQuery<Document>);
  const products = await productQuery
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return {
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
    products,
  };
};

// Service to get a single product
const getProductService = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

// Service to update a product
const updateProductService = async (
  id: string,
  productData: UpdateQuery<ProductData>
) => {
  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return { message: "Product updated successfully", product };
};

// Service to delete a product
const deleteProductService = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return { message: "Product deleted successfully" };
};

export {
  createProductService,
  getProductsService,
  getProductService,
  updateProductService,
  deleteProductService,
};
