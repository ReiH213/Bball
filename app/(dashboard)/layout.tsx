import Sidebar from "@/components/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen w-full font-inter bg-gray-200">
      <Sidebar />
      {children}
    </main>
  );
};

export default DashboardLayout;
