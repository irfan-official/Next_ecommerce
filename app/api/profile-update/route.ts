// /app/api/auth/google/route.ts
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import UserModel from "@/models/user.model"; // your user model

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { email, name, image } = body;

    console.log("/api/profile-update ===> ", body);

    // Update or create user
    let checkUser = await UserModel.findOne({ email });

    if (checkUser) {
      if (checkUser?.username !== name || checkUser?.imageUrl !== image) {
        checkUser.username = name;
        checkUser.imageUrl = image;
      }
      await checkUser.save();
    }

    return NextResponse.json({
      success: true,
      id: checkUser?._id.toString(),
      name: checkUser?.username,
      email: checkUser?.email,
      image: checkUser?.imageUrl,
      provider: checkUser?.provider,
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
