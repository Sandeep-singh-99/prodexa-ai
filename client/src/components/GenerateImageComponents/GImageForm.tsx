import { Image, Sparkles } from "lucide-react";
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
import { useGenerateImage } from "@/api/aiApi";
import { useAppDispatch } from "@/hooks/hooks";
import { useState } from "react";
import { setImgGenerate, setLoading } from "@/redux/slice/imgGenerateSlice";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function GImageForm() {
  const [context, setContext] = useState("");
  const [style, setStyle] = useState("");

  const imgGenerateMutation = useGenerateImage();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!context || !style) {
      toast.error("Please fill in all fields.");
      dispatch(setLoading(false));
      return;
    }
    dispatch(setLoading(true));

    try {
      const result = await imgGenerateMutation.mutateAsync({
        context,
        style,
      });
      dispatch(setImgGenerate(result));

      dispatch(setLoading(false));
      toast.success(result.message || "Image generated successfully!!!!");
      
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message ||
            "An error occurred while generating the image."
        );
      }
    } finally {
      dispatch(setLoading(false));
    }

  }

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-center space-x-2">
        <Sparkles className="h-4 w-4 mr-2" size={52} />
        <h2 className="text-lg font-semibold">AI Image Generation</h2>
      </CardHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
      <CardContent>
        <div className="space-y-4 mb-5">
          <Label className="font-semibold">Describe Your Image</Label>
          <Textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="Describe what your want to see in the image..." />
        </div>

        <div className="space-y-4">
          <Label className="font-semibold text-lg">Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Styles</SelectLabel>
                <SelectItem value="realistic">Realistic</SelectItem>
                <SelectItem value="anime">Anime Style</SelectItem>
                <SelectItem value="cartoon">Cartoon Style</SelectItem>
                <SelectItem value="3d">3D Style</SelectItem>
                <SelectItem value="fantasy">Fantasy Style</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="" variant={"outline"}>
          <Image className="h-4 w-4 mr-2" />
          Generate Image
        </Button>
      </CardFooter>
      </form>
    </Card>
  );
}
