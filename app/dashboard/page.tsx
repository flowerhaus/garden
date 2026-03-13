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
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <ProjectFolders />
          <Moodboard />
          <Approvals />
          <FileShare />
        </div>
        <div className="dashboard-sidebar">
          <StatusBarometer />
          <Calendar />
          <QuickLinks />
        </div>
      </div>
      <ChatBar />
    </>
  );
}
