"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const response = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
      callbackUrl: "/admin",
    });

    if (response?.error) {
      setError("Invalid credentials. Please verify email and password.");
      setIsSubmitting(false);
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <main className="min-h-screen grid place-items-center bg-background">
      <form className="panel w-full max-w-md space-y-4 p-6" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">Admin Login</h1>
        {error ? <p className="rounded-md border border-rose-500/30 bg-rose-500/10 p-2 text-sm text-rose-100">{error}</p> : null}
        <input className="input" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn w-full justify-center" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
