import HeroSection from "@/components/HeroSection";
import AverageGPA from "@/components/AverageGPA";
import ParentsContacts from "@/components/ParentsContacts";
import UpcomingTests from "@/components/UpcomingTests";
import TodaysSchedule from "@/components/TodaysSchedule";
import RecentEvents from "@/components/RecentEvents";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-10">
      {/* Top row: Hero, GPA Chart, Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <HeroSection />
        <AverageGPA />
        <ParentsContacts />
      </div>
      {/* Bottom row: Tests, Schedule, Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <UpcomingTests />
        <TodaysSchedule />
        <RecentEvents />
      </div>
    </div>
  );
}
