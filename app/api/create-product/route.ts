import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/product.model";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    console.log("req body ==> ", body);

    return Response.json({
      success: true,
      message: "Hello from frontend hello",
      data: body,
    });
  } catch (error: any & {
    message: string;
  }) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}
