import DashboardLayout from "../../components/layout/DashboardLayout";

function Messages() {
  return (
    <DashboardLayout active="messages">
      <h1 className="mb-2 text-4xl font-bold">
        <span className="text-primary">Messages</span>
      </h1>

      <p className="text-white/60 mb-8">
        Speech-to-text conversations will appear here.
      </p>

      <div className="rounded-2xl border border-white/10 bg-surface p-6">
        <p className="text-white/50">
          No conversations available.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default Messages;