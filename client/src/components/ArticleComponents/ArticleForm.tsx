import { Sparkles, SquarePen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
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
        toast.error(error.response?.data.message || "An error occurred while generating the article.");
      }
    }
  }

  return (
    <Card className="w-full h-full">
        <CardHeader className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 mr-2" size={52} />
            <h2 className="text-lg font-semibold">Article Configuration</h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
        <CardContent className="mb-5">
           <div className="space-y-4">
             <Label className="font-semibold">Article Topic</Label>
            <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={5} placeholder="The future of artificial intelligence is..."/>
           </div>
        </CardContent>

        <CardFooter>
            <Button className="" variant={"outline"}>
                <SquarePen className="h-4 w-4 mr-2" />
                Generate Article
            </Button>
        </CardFooter>
        </form>
    </Card>
  )
}
