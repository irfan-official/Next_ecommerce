"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl,
    });

    setLoading(false);

    if (res?.error) {
      setErrorMsg("Invalid email or password!");
      return;
    }

    alert("Login successfully");
    console.log("res ===> ", res);

    router.push(callbackUrl);
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center mb-3">{errorMsg}</p>
        )}

        {/* Credentials Login Form */}
        <form onSubmit={handleCredentialsLogin}>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
