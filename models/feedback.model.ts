import mongoose, { Schema, Document } from "mongoose";

export interface Feedback extends Document {
  user_img: string;
  rating: number;
  feedback: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const FeedbackSchema: Schema<Feedback> = new Schema(
  {
    user_img: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const FeedbackModel =
  (mongoose.models.Feedback as mongoose.Model<Feedback>) ||
  mongoose.model<Feedback>("Feedback", FeedbackSchema);

export default FeedbackModel;
