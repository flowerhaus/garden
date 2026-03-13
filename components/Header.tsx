"use client";

import { useRouter } from "next/navigation";
import { Avatar, Button } from "@heroui/react";

interface HeaderProps {
  userName: string | null;
  userEmail: string;
}

const NAV_LINKS = ["Dashboard", "Activity", "Teachers", "Events", "Payments", "Parent's Guide"];

export default function Header({ userName, userEmail }: HeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="flex items-center justify-between py-5">
      <div className="flex items-center gap-8">
        <span className="text-xl font-semibold tracking-tight text-foreground">EdTech</span>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className={`text-sm ${link === "Dashboard" ? "text-foreground font-medium" : "text-foreground/60 hover:text-foreground"} transition-colors`}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <Button isIconOnly variant="light" radius="full" className="text-foreground/60" onPress={handleLogout}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar
            src="https://i.pravatar.cc/150?u=isabella"
            size="sm"
            className="w-9 h-9"
          />
          <span className="hidden sm:block text-sm font-medium">{userName || userEmail}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-foreground/60">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </header>
  );
}
