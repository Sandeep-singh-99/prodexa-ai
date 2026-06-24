import { BrainCircuit, LayoutDashboard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

const MenuOptions = [
  {
    title: "Dashboard",
    url: "/ai-prod-app/v1/admin-route/",
    icon: <LayoutDashboard />,
  },

  {
    title: "Payment Plan Create",
    url: "/ai-prod-app/v1/admin-route/create-plan",
    icon: <LayoutDashboard />,
  },

  {
    title: "Feedback",
    url: "/ai-prod-app/v1/admin-route/feedback",
    icon: <LayoutDashboard />,
  },
];

export default function LeftSideBar() {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to={"/"} className="flex items-center gap-2">
          <BrainCircuit />
          {open && <span className="text-3xl font-bold">Prodexa AI</span>}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Separator />
          <SidebarGroupContent>
            <SidebarMenu>
              {MenuOptions.map((option, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild size={open ? "lg" : "default"}>
                    <Link to={option.url}>
                      {option.icon}
                      <span>{option.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
