import Approvals from "@/components/Approvals";

export default function GodkendelserPage() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Godkendelser</h1>
        <p className="page-subtitle">Alle afventende og behandlede godkendelser</p>
      </div>
      <div style={{ paddingBottom: 100 }}>
        <Approvals />
      </div>
    </>
  );
}
