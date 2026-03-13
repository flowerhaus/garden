import DecisionQueue from "@/components/DecisionQueue";
import MilestoneTimeline from "@/components/MilestoneTimeline";
import StatusBarometer from "@/components/StatusBarometer";
import ProjectFolders from "@/components/ProjectFolders";
import Moodboard from "@/components/Moodboard";
import Approvals from "@/components/Approvals";
import FileShare from "@/components/FileShare";
import Calendar from "@/components/Calendar";
import QuickLinks from "@/components/QuickLinks";
import ChatBar from "@/components/ChatBar";

export default function DashboardPage() {
  return (
    <>
      <DecisionQueue />
      <MilestoneTimeline />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3 pb-20">
        <div className="flex flex-col gap-3">
          <ProjectFolders />
          <Moodboard />
          <Approvals />
          <FileShare />
        </div>
        <div className="flex flex-col gap-3">
          <StatusBarometer />
          <Calendar />
          <QuickLinks />
        </div>
      </div>
      <ChatBar />
    </>
  );
}
