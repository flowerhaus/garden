"use client";

import { useRouter } from "next/navigation";

interface HeaderProps {
  userName: string | null;
  userEmail: string;
}

export default function Header({ userName, userEmail }: HeaderProps) {
  const router = useRouter();
  const initials = (userName || userEmail)
    .split(/[\s@]/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-avatar">{initials}</div>
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
