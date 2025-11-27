// /app/api/auth/google/route.ts
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import UserModel from "@/models/user.model"; // your user model
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { email, name, image } = body;

    // Update or create user
    let checkUser = await UserModel.findOne({ email });

    if (!checkUser?._id) {
      const randomString = uuidv4();

      const hashedPassword = await bcrypt.hash(randomString, 10);

      checkUser = await UserModel.create({
        username: name,
        imageUrl: image,
        email: email,
        password: hashedPassword,
        isEmailVerified: true,
        provider: "google",
      });
    }

    return NextResponse.json({
      id: checkUser._id.toString(),
      name: checkUser.username,
      email: checkUser.email,
      image: checkUser.imageUrl,
      provider: "google",
      isEmailVerified: checkUser.isEmailVerified,
    });
  } catch (error: any & {
    message: string;
  }) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
