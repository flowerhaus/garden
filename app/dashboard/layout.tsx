import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Header from "@/components/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  if (!user) redirect("/");

  return (
    <div className="container">
      <Header userName={user.name} userEmail={user.email} />
      {children}
    </div>
  );
}
