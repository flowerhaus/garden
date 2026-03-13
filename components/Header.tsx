"use client";

import { useRouter } from "next/navigation";

interface HeaderProps {
  userName: string | null;
  userEmail: string;
}

export default function Header({ userName, userEmail }: HeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="header">
      <div className="header-brand">
        <svg className="header-logo" viewBox="0 0 32 32" fill="none">
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
        <span className="header-title">Garden</span>
      </div>
      <div className="header-user">
        <span className="header-name">{userName || userEmail}</span>
        <button className="btn-icon" onClick={handleLogout} title="Log ud">
          Log ud
        </button>
      </div>
    </header>
  );
}
