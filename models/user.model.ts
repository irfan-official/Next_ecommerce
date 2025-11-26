import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  imageUrl: string;
  email: string;
  isEmailVerified?: boolean;
  password: string;
  verifyCode?: string;
  verifyCodeExpiry: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

//imageUrl

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "imageUrl is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
      trim: true,
    },
    verifyCodeExpiry: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
