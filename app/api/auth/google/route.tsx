import dbConnect from "@/lib/dbConnect";

export async function GET(request: Request) {
  return Response.json({ message: "Hello from frontend hello" });
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    console.log("body == ", body);

    return Response.json({ received: body });
  } catch (error) {}
}
