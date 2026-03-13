import Calendar from "@/components/Calendar";
import ProjectFolders from "@/components/ProjectFolders";
import FileShare from "@/components/FileShare";
import Approvals from "@/components/Approvals";
import ChatBar from "@/components/ChatBar";

export default function DashboardPage() {
  return (
    <>
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <ProjectFolders />
          <Approvals />
          <FileShare />
        </div>
        <div className="dashboard-sidebar">
          <Calendar />
        </div>
      </div>
      <ChatBar />
    </>
  );
}
