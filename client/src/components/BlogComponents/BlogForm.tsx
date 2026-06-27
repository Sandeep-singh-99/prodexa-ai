import { Sparkles, SquarePen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/hooks";
import { useGenerateBlog } from "@/api/aiApi";
import { useState } from "react";
import { AxiosError } from "axios";
import { setBlog, setLoading } from "@/redux/slice/blogSlice";
import { toast } from "sonner";

export default function BlogForm() {
  const [formData, setFormData] = useState({
    question: "",
    category: "",
  });

  const blogMutation = useGenerateBlog();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (!formData.question || !formData.category) {
      toast.error("Please fill in all fields.");
      dispatch(setLoading(false));
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("question", formData.question);
    formDataToSend.append("category", formData.category);
    try {
      const result = await blogMutation.mutateAsync({
        question: formData.question,
        category: formData.category,
      });
      dispatch(setBlog(result));

      dispatch(setLoading(false));
      toast.success(result.message || "Blog generated successfully!!!!");
    } catch (error: unknown) {
      dispatch(setLoading(false));
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message ||
            "An error occurred while generating the blog.",
        );
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="mx-auto max-w-4xl p-5">
        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border bg-card shadow-lg"
        >
          <Textarea
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            placeholder="Write a blog about..."
            rows={4}
            className="resize-none border-0 shadow-none focus-visible:ring-0"
          />

          <div className="flex items-center justify-between border-t px-4 py-3">
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="w-48 border-none shadow-none">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
              </SelectContent>
            </Select>

            <Button
              type="submit"
              className="rounded-full"
              disabled={blogMutation.isPending}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
