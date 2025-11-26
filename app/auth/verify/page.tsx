"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
      } else {
        setSuccess(data.message || "Email verified successfully!");
        // Redirect to sign-in after 2 seconds
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Email Verification</h2>
      <form
        onSubmit={handleVerify}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          required
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
