import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export default async function Home() {
  const user = await getSession();
  if (user) redirect("/dashboard");

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="#2d6a4f" strokeWidth="2" />
            <path
              d="M16 8c-2 4-6 6-6 10a6 6 0 0 0 12 0c0-4-4-6-6-10z"
              fill="#2d6a4f"
              opacity="0.2"
            />
            <path
              d="M16 8c-2 4-6 6-6 10a6 6 0 0 0 12 0c0-4-4-6-6-10z"
              stroke="#2d6a4f"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <h1 className="login-title">Garden</h1>
        </div>
        <p className="login-subtitle">Log ind for at se dine projekter</p>
        <LoginForm />
      </div>
    </div>
  );
}
