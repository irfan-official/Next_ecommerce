"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, imageUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
      } else {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl,
        });

        if (res?.error) {
          alert("Invalid email or password!");
          return;
        }
        router.push(callbackUrl);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
