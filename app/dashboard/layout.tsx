import { getSession } from "@/lib/auth";
import Header from "@/components/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-10">
      <Header
        userName={user?.name ?? "Demo"}
        userEmail={user?.email ?? "demo@flowerhaus.dk"}
      />
      {children}
    </div>
  );
}
