import { AlertTriangle } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/Button";

function Emergency() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <AlertTriangle
          aria-hidden="true"
          className="mb-4 h-12 w-12 text-red-400"
        />

        <h1 className="mb-2 text-4xl font-bold">
          Emergency <span className="text-red-400">SOS</span>
        </h1>

        <p className="mb-8 text-white/60">
          Send an emergency alert to your configured contacts.
        </p>

        <div className="rounded-2xl border border-red-500/40 bg-red-950/20 p-6">
          <h2 className="mb-2 text-xl font-semibold">
            Emergency alert ready
          </h2>

          <p className="mb-6 text-white/60">
            Only use this feature when immediate assistance is needed.
          </p>

          <Button type="button" size="lg">
            Send Emergency Alert
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Emergency;