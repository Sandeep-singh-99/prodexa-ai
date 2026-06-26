import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  BrainCircuit,
  LayoutDashboard,
  FileText,
  Globe,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import FeedbackFormComponents from "./FeedbackFormComponents";

const MenuOptions = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Article",
    url: "/dashboard/article",
    icon: <FileText />,
  },
  {
    title: "Blog",
    url: "/dashboard/blog",
    icon: <Globe />,
  },
  {
    title: "Resume",
    url: "/dashboard/resume",
    icon: <Briefcase />,
  },
  // {
  //   title: "Assignments",
  //   url: "/t-dashboard/assignments",
  //   icon: <ClipboardList />,
  // },
  // {
  //   title: "Payment",
  //   url: "/t-dashboard/payment",
  //   icon: <DollarSignIcon />,
  // },
];

export default function SideBar() {
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
      <SidebarFooter>
        <FeedbackFormComponents />
      </SidebarFooter>
    </Sidebar>
  );
}
