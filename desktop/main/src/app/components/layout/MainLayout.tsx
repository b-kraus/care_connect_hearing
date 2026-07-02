import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import TopMenu from "./TopMenu";

export type ScreenName = string | "settings" | "alerts" | "messages" | "recording" | "emergency";

interface MainLayoutProps {
  children: ReactNode;
  currentView?: ScreenName;
  onNavigate?: (screenName: ScreenName) => void;
}

export default function MainLayout({ children, currentView, onNavigate }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <TopMenu />
      <div className="flex flex-1">
        <Sidebar currentView={currentView} onNavigate={onNavigate} />
        <main className="flex-1 overflow-auto p-10">
          {children}
        </main>
      </div>
      <StatusBar />
    </div>
  );
}
