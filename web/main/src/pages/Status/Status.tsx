import { CheckCircle, Wifi, Shield, Bell, Mic } from "lucide-react";
import AuthLayout from "../../components/layout/AuthLayout";
import CareConnectLogo from "../../components/branding/CareConnectLogo";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";

const statusItems = [
  { icon: Wifi, label: "Network Connection", status: "Connected", ok: true },
  { icon: Shield, label: "Security", status: "Encrypted", ok: true },
  { icon: Bell, label: "Alert System", status: "Active", ok: true },
  { icon: Mic, label: "Speech-to-Text", status: "Ready", ok: true },
];

function Status() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        <header className="text-center">
          <div className="mb-6 flex justify-center">
            <CareConnectLogo />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            System <span className="text-primary">Status</span>
          </h1>
          <p className="mt-3 text-base text-white/70">
            All systems are operational.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {statusItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-surface p-4"
            >
              <item.icon className="w-6 h-6 text-primary" />
              <div className="flex-1">
                <p className="font-semibold">{item.label}</p>
                <p className="text-sm text-white/50">{item.status}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          ))}
        </div>

        <Button size="lg" fullWidth onClick={() => navigate("/home")}>
          Continue to Dashboard
        </Button>
      </div>
    </AuthLayout>
  );
}

export default Status;
