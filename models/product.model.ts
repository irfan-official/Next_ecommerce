import mongoose, { Schema, Document } from "mongoose";

export interface Product extends Document {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
  createdAt?: Date;
  updatedAt?: Date;
}

const RatingSchema = new Schema(
  {
    rate: { type: Number, required: true, default: 0 },
    count: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const ProductSchema: Schema<Product> = new Schema(
  {
    id: {
      type: Number,
      required: [true, "Product id is required"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Product title is required"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"],
    },
    rating: {
      type: RatingSchema,
      required: false,
    },
  },
  { timestamps: true }
);

const ProductModel =
  (mongoose.models.Product as mongoose.Model<Product>) ||
  mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;
