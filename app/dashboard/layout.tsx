import { getSession } from "@/lib/auth";
import Header from "@/components/Header";
import UserProvider from "@/components/UserProvider";

// TODO: Genaktiver auth-check når login er klar
// import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <UserProvider
      user={
        user
          ? { email: user.email, name: user.name }
          : null
      }
    >
      <div className="container">
        <Header
          userName={user?.name ?? "Demo"}
          userEmail={user?.email ?? "demo@flowerhaus.dk"}
        />
        {children}
      </div>
    </UserProvider>
  );
}
