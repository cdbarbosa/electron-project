import { Header } from "@renderer/components/Header";
import { Sidebar } from "@renderer/components/Sidebar";
import { Outlet } from "react-router-dom";

export function Default() {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={true} />

        <Outlet />
      </div>
    </div>
  );
}
