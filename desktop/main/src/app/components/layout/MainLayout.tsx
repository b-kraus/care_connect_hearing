import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import TopMenu from "./TopMenu";

interface MainLayoutProps {
  children: ReactNode;
  currentView?: "home" | "logs" | string;
  onNavigate?: (screenName: "home" | "logs") => void;
}

export default function MainLayout({
  children,
  currentView,
  onNavigate,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      <TopMenu />

      <div className="flex flex-1">

        {/* Forward the current view and the navigation handler to the Sidebar */}
        <Sidebar currentView={currentView} onNavigate={onNavigate} />

        <main className="flex-1 overflow-auto p-10">
          {children}
        </main>

      </div>

      <StatusBar />

    </div>
  );
}