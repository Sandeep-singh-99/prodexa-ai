import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Newspaper,
  FileText,
  FileUser,
  Sparkles,
  Crown,
  Clock,
  Eye,
} from "lucide-react";

const user = {
  name: "Sandeep Singh",
  email: "sandeep@gmail.com",
  subscribed: true,
  daysLeft: 24,
};

const stats = [
  {
    title: "Blogs",
    value: 42,
    icon: Newspaper,
  },
  {
    title: "Articles",
    value: 28,
    icon: FileText,
  },
  {
    title: "Resumes",
    value: 17,
    icon: FileUser,
  },
  {
    title: "Total Generated",
    value: 87,
    icon: Sparkles,
  },
];

const recentActivity = [
  {
    title: "Future of AI",
    type: "Blog",
    date: "2 hours ago",
  },
  {
    title: "Modern Resume",
    type: "Resume",
    date: "Yesterday",
  },
  {
    title: "Next.js Guide",
    type: "Article",
    date: "3 days ago",
  },
];

const blogs = [
  {
    title: "Future of AI",
    date: "Today",
    status: "Completed",
  },
  {
    title: "React Tips",
    date: "Yesterday",
    status: "Completed",
  },
  {
    title: "SEO Guide",
    date: "3 days ago",
    status: "Completed",
  },
];

const articles = [
  {
    title: "Machine Learning",
    date: "Today",
    status: "Completed",
  },
  {
    title: "Cloud Computing",
    date: "2 days ago",
    status: "Completed",
  },
];

const resumes = [
  {
    title: "Software Engineer Resume",
    date: "Yesterday",
    status: "Completed",
  },
  {
    title: "Frontend Developer Resume",
    date: "Last Week",
    status: "Completed",
  },
];

function HistoryTable({
  data,
}: {
  data: {
    title: string;
    date: string;
    status: string;
  }[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              {item.title}
            </TableCell>

            <TableCell>{item.date}</TableCell>

            <TableCell>
              <Badge>{item.status}</Badge>
            </TableCell>

            <TableCell className="text-right">
              <Button size="sm" variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">

      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your AI activity.
        </p>
      </div>

      {/* User Card */}

      <Card>
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6">

          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-semibold">
                {user.name}
              </h2>

              <p className="text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">

            <Badge
              variant={
                user.subscribed
                  ? "default"
                  : "secondary"
              }
            >
              <Crown className="mr-2 h-4 w-4" />
              {user.subscribed
                ? "Pro Plan"
                : "Free Plan"}
            </Badge>

            {user.subscribed ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {user.daysLeft} days remaining
              </div>
            ) : (
              <Button>Upgrade Plan</Button>
            )}
          </div>

        </CardContent>
      </Card>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardContent className="flex items-center justify-between p-6">

                <div>
                  <p className="text-muted-foreground">
                    {item.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <Icon className="h-10 w-10 text-primary" />

              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}

      <Card>
        <CardContent className="p-6">

          <h2 className="text-xl font-semibold mb-4">
            Recent Activity
          </h2>

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {recentActivity.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.title}</TableCell>

                  <TableCell>{item.type}</TableCell>

                  <TableCell>{item.date}</TableCell>

                  <TableCell>
                    <Badge>Completed</Badge>
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>

          </Table>

        </CardContent>
      </Card>

      {/* History */}

      <Card>
        <CardContent className="p-6">

          <h2 className="text-xl font-semibold mb-4">
            Generation History
          </h2>

          <Tabs defaultValue="blogs">

            <TabsList className="mb-6">
              <TabsTrigger value="blogs">
                Blogs
              </TabsTrigger>

              <TabsTrigger value="articles">
                Articles
              </TabsTrigger>

              <TabsTrigger value="resumes">
                Resumes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blogs">
              <HistoryTable data={blogs} />
            </TabsContent>

            <TabsContent value="articles">
              <HistoryTable data={articles} />
            </TabsContent>

            <TabsContent value="resumes">
              <HistoryTable data={resumes} />
            </TabsContent>

          </Tabs>

        </CardContent>
      </Card>

    </div>
  );
}