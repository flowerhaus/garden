"use client";

import { useState, FormEvent } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Noget gik galt. Prøv igen.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="login-success">
        <div className="login-success-icon">&#9993;</div>
        <h3>Tjek din email</h3>
        <p>Vi har sendt et login-link til <strong>{email}</strong></p>
      </div>
    );
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <div className="login-error">{error}</div>}
      <input
        className="input"
        type="email"
        placeholder="din@email.dk"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoFocus
      />
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Sender..." : "Send login-link"}
      </button>
    </form>
  );
}
