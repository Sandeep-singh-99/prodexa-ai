import LeftSideBar from "@/components/Admin/LeftSideBar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <SidebarProvider>
      <LeftSideBar />
      <div className="w-full p-5 bg-background text-foreground">
        <Toaster />
        <AppHeader />
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
