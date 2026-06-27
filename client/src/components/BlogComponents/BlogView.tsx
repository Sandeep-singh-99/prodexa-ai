import { SquarePen } from "lucide-react";
import { useAppSelector } from "@/hooks/hooks";
import MDEditor from '@uiw/react-md-editor';


export default function BlogView() {
  const { isLoading, blog } = useAppSelector((state) => state.blogs);
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      {isLoading ? (
        <div className="flex h-[70vh] flex-col items-center justify-center gap-5">
          <SquarePen className="h-10 w-10 animate-spin" />

          <div className="text-center">
            <h2 className="text-lg font-semibold">
              Generating your blog...
            </h2>

            <p className="text-muted-foreground">
              AI is writing...
            </p>
          </div>
        </div>
      ) : blog ? (
        <div className="space-y-8">
          <div className="flex justify-end">
            <div className="max-w-xl rounded-2xl bg-primary px-5 py-3 text-primary-foreground">
              {blog.question}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
              AI
            </div>

            <div className="flex-1">
              <MDEditor.Markdown
                source={blog.data}
                className="bg-transparent"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[70vh] flex-col items-center justify-center gap-6">
          <SquarePen className="h-14 w-14 text-muted-foreground" />

          <div className="text-center">
            <h1 className="text-3xl font-bold">
              AI Blog Generator
            </h1>

            <p className="mt-3 text-muted-foreground">
              What would you like to write about today?
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
