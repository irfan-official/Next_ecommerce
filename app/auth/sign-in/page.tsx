"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔥 Send user data to backend after successful login
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const user = session.user;

      console.log("Logged-in User:", user);

      // Send to backend
      axios
        .post("/api/auth/google", {
          name: user.name,
          email: user.email,
          image: user.image,
        })
        .then((res) => console.log("Backend response:", res.data))
        .catch((err) => console.error("Backend error:", err));
    }
  }, [status, session]);

  if (status === "authenticated") {
    const user = session.user;

    return router.replace("/");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => signIn("google")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
