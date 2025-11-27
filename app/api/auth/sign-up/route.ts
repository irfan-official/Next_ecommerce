import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password, imageUrl } = await request.json();

    console.log("/api/auth/sign-up ==> ", username, email, password, imageUrl);


    // Check duplicate user
    const existing = await UserModel.findOne({ email });


    if (existing) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    await UserModel.create({
      username,
      imageUrl,
      email,
      password: hashedPassword,
      verifyCode,
      provider: "credentials",
    });


    return NextResponse.json({
      success: true,
      message: "User registered. Verification code sent to email.",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Signup failed" },
      { status: 500 }
    );
  }
}
