import { NotebookPen, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useResumeAnalysis } from "@/api/aiApi";
import { useAppDispatch } from "@/hooks/hooks";
import React, { useState } from "react";
import { setLoading } from "@/redux/slice/imgGenerateSlice";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function ResumeForm() {
  const [analysis, setAnalysis] = useState<File | null>(null);

  const resumeMutation = useResumeAnalysis();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!analysis) {
      toast.error("Please upload a resume file.");
      return;
    }

    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("file", analysis);

    try {
      const response = await resumeMutation.mutateAsync(formData);
      dispatch(setLoading(false));
      toast.success(response.message || "Resume analyzed successfully!");
      setAnalysis(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while processing the resume."
        );
      }
    } finally {
      dispatch(setLoading(false));
    }
  };


  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-center space-x-2">
        <Sparkles className="h-4 w-4 mr-2" size={52} />
        <h2 className="text-lg font-semibold">Resume Review</h2>
      </CardHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
      <CardContent>
        <div className="space-y-4 mb-5">
          <Label className="font-semibold">Upload Resume</Label>
          <div className="flex flex-col space-y-2">
            <Input onChange={(e) => setAnalysis(e.target.files?.[0] || null)} type="file" accept="application/pdf"  />
            <p className="text-sm text-muted-foreground">Supports PDF resume only.</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="" variant={"outline"}>
          <NotebookPen className="h-4 w-4 mr-2" />
          Resume Review
        </Button>
      </CardFooter>
      </form>
    </Card>
  );
}
