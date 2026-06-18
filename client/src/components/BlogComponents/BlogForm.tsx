import { Sparkles, SquarePen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
            "An error occurred while generating the blog."
        );
      }
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-center space-x-2">
        <Sparkles className="h-4 w-4 mr-2" size={52} />
        <h2 className="text-lg font-semibold">Blog Configuration</h2>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardContent>
          <div className="space-y-4 mb-5">
            <Label className="font-semibold">Blog Topic</Label>
            <Textarea
              placeholder="The future of artificial intelligence is..."
              rows={5}
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
            />
          </div>

          <div className="space-y-4">
            <Label className="font-semibold text-lg">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant={"outline"}>
            <SquarePen className="h-4 w-4 mr-2" />
            Generate Blog
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
