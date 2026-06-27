import { Sparkles } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { useGenerateArticle } from "@/api/aiApi";
import { useAppDispatch } from "@/hooks/hooks";
import { setArticle, setLoading } from "@/redux/slice/articleSlice";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function ArticleForm() {
  const [question, setQuestion] = useState<string>("");

  const articleMutation = useGenerateArticle();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (!question) {
      toast.error("Please enter a question.");
      dispatch(setLoading(false));
      return;
    }

    try {
      const result = await articleMutation.mutateAsync({ question });
      dispatch(setArticle(result));
      dispatch(setLoading(false));
      toast.success(result.message || "Article generated successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message ||
            "An error occurred while generating the article.",
        );
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="mx-auto max-w-4xl p-5">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border bg-card shadow-lg"
        >
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Write an article about..."
            rows={4}
            className="
          resize-none
          border-0
          shadow-none
          focus-visible:ring-0
          rounded-t-3xl
        "
          />

          <div className="flex items-center justify-end px-4 py-3 border-t">
            <Button
              type="submit"
              className="rounded-full"
              disabled={articleMutation.isPending}
            >
              <Sparkles className="mr-2 h-4 w-4" />

              {articleMutation.isPending ? "Generating..." : "Generate"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
