import DashboardLayout from "../../components/layout/DashboardLayout";

function Alerts() {
  return (
    <DashboardLayout active="alerts">
      <h1 className="mb-2 text-4xl font-bold">
        Active <span className="text-primary">Alerts</span>
      </h1>

      <p className="text-white/60">
        No active alerts at this time.
      </p>
    </DashboardLayout>
  );
}

export default Alerts;