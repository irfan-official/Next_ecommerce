import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/product.model";
import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { title, price, description, category, image, userEmail } = body;

    console.log("req body ==> ", body);

    const checkUser = await UserModel.findOne({
      email: userEmail,
    });

    if (!checkUser?.email) {
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 400 }
      );
    }

    const createdProduct = await ProductModel.create({
      user: String(checkUser._id),
      title,
      price,
      description,
      category,
      image,
    });

    return NextResponse.json({
      success: true,
      message: "Product Created Successfully!",
      data: body,
    });
  } catch (error: any & {
    message: string;
  }) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
