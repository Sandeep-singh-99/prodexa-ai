import BlogForm from "@/components/BlogComponents/BlogForm";
import BlogView from "@/components/BlogComponents/BlogView";

export default function BlogPage() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 min-h-screen px-5 py-10">
       <BlogForm />

       <BlogView />
    </div>
  )
}