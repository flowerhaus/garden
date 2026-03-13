"use client";

import { useRouter } from "next/navigation";
import { Avatar, Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";

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
    <Navbar maxWidth="full" classNames={{ wrapper: "px-0" }} isBordered={false} className="bg-transparent shadow-none">
      <NavbarBrand className="gap-2">
        <Avatar name={initials} size="sm" classNames={{ base: "bg-primary text-primary-foreground text-xs font-semibold" }} />
        <span className="text-lg font-semibold tracking-tight text-foreground">Garden</span>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-3">
        <span className="text-sm text-default-500">{userName || userEmail}</span>
        <Button size="sm" variant="light" onPress={handleLogout} className="text-xs uppercase tracking-wider font-semibold text-default-500">
          Log ud
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
