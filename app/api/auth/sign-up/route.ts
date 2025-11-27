import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password, imageUrl } = await request.json();

    // Check duplicate user
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Send email
    await sendVerificationEmail({
      receiverEmail: email,
      username: username,
      code: verifyCode,
    });

    await UserModel.create({
      username,
      imageUrl,
      email,
      password: hashedPassword,
      verifyCode,
      provider: "credentials",
    });

    return NextResponse.json({
      message: "User registered. Verification code sent to email.",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
