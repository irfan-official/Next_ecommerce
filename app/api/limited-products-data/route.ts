import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/product.model";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const allProducts = await ProductModel.find().limit(6);
    return Response.json({
      success: true,
      message: "Hello from frontend hello",
      data: allProducts,
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
