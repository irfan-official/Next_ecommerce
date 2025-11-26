import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export async function POST(request: Request) {
  await dbConnect();

  const { email, code } = await request.json();

  // console.log("/api/auth/verify ==> ", email, " & ", code);

  const user = await UserModel.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  if (user.verifyCode !== code) {
    return NextResponse.json(
      { error: "Invalid verification code" },
      { status: 400 }
    );
  }

  if (user.verifyCodeExpiry < new Date()) {
    const newVerifyCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.verifyCode = newVerifyCode;

    await user.save();

    return NextResponse.json(
      { error: "Code expired please try again" },
      { status: 400 }
    );
  }

  user.isEmailVerified = true;
  user.verifyCode = "";
  user.verifyCodeExpiry = new Date();

  await user.save();

  return NextResponse.json({ message: "Email verified successfully" });
}
