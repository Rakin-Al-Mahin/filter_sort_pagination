import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface representing a product document in MongoDB
export interface ProductDocument extends Document {
  name: string;
  quantity: number;
  price: number;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create a Schema corresponding to the document interface
const ProductSchema: Schema<ProductDocument> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Model
const Product: Model<ProductDocument> = mongoose.model<ProductDocument>(
  "Product",
  ProductSchema
);

export default Product;
