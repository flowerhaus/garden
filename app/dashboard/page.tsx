import ProcessBar from "@/components/ProcessBar";
import UpcomingEvents from "@/components/UpcomingEvents";
import FileUpload from "@/components/FileUpload";
import ProjectFolders from "@/components/ProjectFolders";
import Approvals from "@/components/Approvals";
import ChatBar from "@/components/ChatBar";
import TeamNotes from "@/components/TeamNotes";
import QuickLinks from "@/components/QuickLinks";

export default function DashboardPage() {
  return (
    <>
      <ProcessBar />
      <div className="dashboard-top">
        <div className="dashboard-column">
          <UpcomingEvents />
          <FileUpload />
        </div>
        <div className="dashboard-column">
          <ProjectFolders />
          <TeamNotes />
        </div>
        <div className="dashboard-column">
          <Approvals />
          <QuickLinks />
        </div>
      </div>
      <ChatBar />
    </>
  );
}
