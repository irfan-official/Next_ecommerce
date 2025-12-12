import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email } = await request.json();

    console.log("email ===> ", email);

    const user = await UserModel.findOne({ email });

    if (!user?.email) {
      throw new Error("user not found!");
    }

    if (user?.email) {
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      const checkMail = await sendVerificationEmail({
        receiverEmail: email,
        username: user.username,
        code: verifyCode,
        subject: "Email Verification for Shopify users ",
      });

      if (checkMail.success) {
        user.verifyCode = verifyCode;
        user.verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        return NextResponse.json({
          success: true,
          message: "User registered. Verification code sent to email.",
        });
      } else {
        throw new Error(checkMail.message);
      }
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
