import dbConnect from "@/lib/dbConnect";
import FeedbackModel from "@/models/feedback.model";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const allProducts = await FeedbackModel.find();
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
