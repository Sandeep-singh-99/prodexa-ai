import BlogForm from "@/components/BlogComponents/BlogForm";
import BlogView from "@/components/BlogComponents/BlogView";

export default function BlogPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="flex-1 overflow-y-auto pb-52">
        <BlogView />
      </div>

      <BlogForm />
    </div>
  );
}
