"use client";

import { createContext, useContext } from "react";

type UserInfo = {
  email: string;
  name: string | null;
} | null;

const UserContext = createContext<UserInfo>(null);

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({
  user,
  children,
}: {
  user: UserInfo;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
