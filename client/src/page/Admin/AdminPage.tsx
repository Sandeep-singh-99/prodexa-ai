import LeftSideBar from "@/components/Admin/LeftSideBar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        <LeftSideBar />
        <div className="flex-1">
          <Toaster />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
