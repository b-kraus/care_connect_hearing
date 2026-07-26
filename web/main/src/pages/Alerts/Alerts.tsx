import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const alertData = [
  { id: 1, title: "Take blue pill", time: "6:00 PM", status: "Active Now", color: "border-green-500", badge: "bg-green-700" },
  { id: 2, title: "Physical therapy session", time: "2:00 PM", status: "Missed", color: "border-red-500", badge: "bg-red-700" },
  { id: 3, title: "Blood pressure check", time: "5:30 PM", status: "Awaiting", color: "border-yellow-500", badge: "bg-yellow-700" },
  { id: 4, title: "Hearing aid battery change", time: "9:00 AM", status: "Confirmed", color: "border-primary", badge: "bg-primary text-black" },
];

function Alerts() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Active Now", "Missed", "Awaiting", "Confirmed"];

  const filtered = filter === "All"
    ? alertData
    : alertData.filter(a => a.status === filter);

  return (
    <DashboardLayout active="alerts">
      <h1 className="mb-2 text-2xl md:text-4xl font-bold">
        Alert <span className="text-primary">History</span>
      </h1>
      <p className="text-white/60 mb-6">
        View and manage your care alerts.
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === f
                ? "bg-primary text-black"
                : "bg-surface border border-white/10 hover:bg-primary/10"
            }`}
            aria-label={`Filter by ${f}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filtered.map(alert => (
          <div
            key={alert.id}
            className={`bg-surface border-l-4 ${alert.color} rounded-xl p-5`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">{alert.title}</h2>
                <p className="text-white/50 text-sm">{alert.time}</p>
              </div>
              <span className={`${alert.badge} px-3 py-1 rounded-lg text-xs font-bold`}>
                {alert.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Alerts;
