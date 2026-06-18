import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import { BrainCircuit } from "lucide-react";
import AuthComponent from "./AuthComponent";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "@/api/authApi";
import { logout } from "@/redux/slice/authSlice";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ProfileDialogComponents from "./ProfileComponents/ProfileDialogComponents";
import { toast } from "sonner";

export default function NavBar() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const LogoutMutation = useSignOut();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const result = await LogoutMutation.mutateAsync();
      dispatch(logout());
      queryClient.clear();
      queryClient.removeQueries({ queryKey: ["user"] });
      toast.success(result.message || "Logout successful");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Logout failed");
      } else {
        toast.error("Logout failed");
      }
    }
  };
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={"/"}>
          <span className="bg-clip-text font-bold text-2xl flex items-center gap-2">
            <BrainCircuit /> Prodexa AI
          </span>
        </Link>

        <div className="flex flex-row items-center space-x-2 md:space-x-4">
          {isAuthenticated && (
            <Link to={"/home/article"}>
              <Button variant={"outline"} className="md:flex">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Dashboard Insights</span>
              </Button>
            </Link>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.imageUrl || ""} alt="User Avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-1" align="end">
                {user?.role === "admin" ? (
                  <Link to={"/ai-prod-app/v1/admin-route/dashboard"}>
                    <DropdownMenuItem>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                ) : (
                  <DropdownMenuItem asChild>
                    <ProfileDialogComponents
                      triggerButton={
                        <Button variant="ghost">
                          <Settings className="h-4 w-4 mr-2" /> My Account
                        </Button>
                      }
                    />
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <AuthComponent />
          )}
        </div>
      </nav>
    </header>
  );
}
