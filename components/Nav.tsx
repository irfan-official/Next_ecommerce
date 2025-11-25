import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavClient from "./NavClient";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  const user = session?.user
    ? {
        name: session.user.name ?? undefined,
        email: session.user.email ?? undefined,
        image: session.user.image ?? undefined,
      }
    : null;

  return <NavClient user={user} />;
}
