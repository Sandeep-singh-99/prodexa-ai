import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Dashboard from "@/page/Dashboard/Dashboard";
import AppHome from "@/page/AppHome";
import ArticlePage from "@/page/Dashboard/ArticlePage";
import BlogPage from "@/page/Dashboard/BlogPage";
import GImagePage from "@/page/Dashboard/GImagePage";
import RBackground from "@/page/Dashboard/RBackground";
import RObject from "@/page/Dashboard/RObject";
import ResumePage from "@/page/Dashboard/ResumePage";
import AdminPage from "@/page/Admin/AdminPage";
import AdminDashboard from "@/page/Admin/AdminDashboard";
import CreatePlan from "@/page/Admin/CreatePlan";
import FeedBackFormPage from "@/page/Admin/FeedBackFormPage";
import AppSideBarDashboard from "@/page/AppSideBarDashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <AppHome />,
      },
    ],
  },
  {
    path: "ai-prod-app/v1/admin-route",
    element: <AdminPage />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "create-plan",
        element: <CreatePlan />
      },
      {
        path: "feedback-form",
        element: <FeedBackFormPage />
      }
    ]
  },
  {
    path: "dashboard",
    element: <AppSideBarDashboard />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "article",
        element: <ArticlePage />
      },
      {
        path: "blog",
        element: <BlogPage />
      },
      {
        path: "g-image",
        element: <GImagePage />
      },
      {
        path: "r-background",
        element: <RBackground />
      },
      {
        path: "r-object",
        element: <RObject />
      },
      {
        path: "resume",
        element: <ResumePage />
      },
    ],
  },
]);

export default routes;
