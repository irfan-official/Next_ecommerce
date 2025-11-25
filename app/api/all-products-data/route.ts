export async function GET(request: Request) {
  return Response.json({
    success: true,
    message: "Hello from frontend hello",
    data: [
      {
        id: "1",
      },
      {
        id: "2",
      },
      {
        id: "3",
      },
      {
        id: "4",
      },
      {
        id: "5",
      },
      {
        id: "6",
      },
    ],
  });
}
