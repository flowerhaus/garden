import { getSession } from "@/lib/auth";
import Header from "@/components/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
      <Header
        userName={user?.name ?? "Isabella Lewis"}
        userEmail={user?.email ?? "demo@edtech.dk"}
      />
      {children}
    </div>
  );
}
