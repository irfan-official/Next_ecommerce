import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavClient from "./NavClient";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  console.log("session ==> ", session);

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;

  return <NavClient user={user} />;
}
