"use client";

import { useState, FormEvent } from "react";
import { Input, Button } from "@heroui/react";

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
      <div className="text-center py-5">
        <div className="text-2xl mb-2">&#9993;</div>
        <h3 className="text-lg font-semibold mb-1.5">Tjek din email</h3>
        <p className="text-sm text-default-500">
          Vi har sendt et login-link til <strong className="text-foreground">{email}</strong>
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-danger-100 text-danger p-2.5 rounded-medium text-[13px]">{error}</div>
      )}
      <Input
        type="email"
        placeholder="din@email.dk"
        value={email}
        onValueChange={setEmail}
        isRequired
        autoFocus
        variant="bordered"
      />
      <Button color="primary" type="submit" isLoading={loading} className="font-semibold">
        {loading ? "Sender..." : "Send login-link"}
      </Button>
    </form>
  );
}
