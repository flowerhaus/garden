import { getSession } from "@/lib/auth";
import Header from "@/components/Header";

// TODO: Genaktiver auth-check når login er klar
// import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <div className="container">
      <Header
        userName={user?.name ?? "Demo"}
        userEmail={user?.email ?? "demo@flowerhaus.dk"}
      />
      {children}
    </div>
  );
}
