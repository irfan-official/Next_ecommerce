import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl">Welcome, {session.user.name}</h1>
      <p>Your email: {session.user.email}</p>
    </div>
  );
}
