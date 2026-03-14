import ProcessBar from "@/components/ProcessBar";
import UpcomingEvents from "@/components/UpcomingEvents";
import FileUpload from "@/components/FileUpload";
import ProjectFolders from "@/components/ProjectFolders";
import Approvals from "@/components/Approvals";
import ChatBar from "@/components/ChatBar";
import TeamNotes from "@/components/TeamNotes";
import QuickLinks from "@/components/QuickLinks";
import TaskStatus from "@/components/TaskStatus";
import TeamOverview from "@/components/TeamOverview";

export default function DashboardPage() {
  return (
    <>
      <ProcessBar />
      <div className="dashboard-top">
        <div className="dashboard-column">
          <UpcomingEvents />
          <FileUpload />
          <TeamNotes />
        </div>
        <div className="dashboard-column">
          <ProjectFolders />
          <QuickLinks />
        </div>
        <div className="dashboard-column">
          <Approvals />
          <TaskStatus />
          <TeamOverview />
        </div>
      </div>
      <ChatBar />
    </>
  );
}
