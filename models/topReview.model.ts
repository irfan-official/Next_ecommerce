import mongoose, { Schema, Document } from "mongoose";

export interface TopReview extends Document {
  image: string;
  name: string;
  rating: number;
  statement: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TopReviewSchema: Schema<TopReview> = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    statement: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const TopReviewModel =
  (mongoose.models.TopReview as mongoose.Model<TopReview>) ||
  mongoose.model<TopReview>("TopReview", TopReviewSchema);

export default TopReviewModel;
