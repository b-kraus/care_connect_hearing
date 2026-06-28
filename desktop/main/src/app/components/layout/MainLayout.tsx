import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import TopMenu from "./TopMenu";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      <TopMenu />

      <div className="flex flex-1">

        <Sidebar />

        <main className="flex-1 overflow-auto p-10">
          {children}
        </main>

      </div>

      <StatusBar />

    </div>
  );
}