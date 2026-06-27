import { SquarePen } from "lucide-react";
import { useAppSelector } from "@/hooks/hooks";
import MDEditor from "@uiw/react-md-editor";

export default function ArticleView() {
  const { isLoading, article } = useAppSelector((state) => state.articles);
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      {isLoading ? (
        <div className="flex h-[70vh] flex-col items-center justify-center gap-5">
          <SquarePen className="h-10 w-10 animate-spin" />

          <div className="space-y-2 text-center">
            <h2 className="font-semibold text-lg">
              Generating your article...
            </h2>

            <p className="text-muted-foreground">AI is writing...</p>
          </div>
        </div>
      ) : article ? (
        <div className="space-y-8">
          {/* User Message */}

          <div className="flex justify-end">
            <div className="rounded-2xl bg-primary text-primary-foreground px-5 py-3 max-w-xl">
              {article.question}
            </div>
          </div>

          {/* AI Message */}

          <div className="flex gap-4">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              AI
            </div>

            <div className="flex-1 overflow-hidden">
              <MDEditor.Markdown
                source={article.data}
                className="bg-transparent"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[70vh] flex-col items-center justify-center gap-6">
          <SquarePen className="h-14 w-14 text-muted-foreground" />

          <div className="text-center">
            <h1 className="text-3xl font-bold">AI Article Generator</h1>

            <p className="mt-3 text-muted-foreground">
              Describe a topic, and I'll generate a well-structured article for
              you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
