import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MessageSquareText } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useSubmitFeedback } from "@/api/feedbackApi";
import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useSidebar } from "./ui/sidebar";

export default function FeedbackFormComponents() {
    const [feedback, setFeedback] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const FeedbackFormMutation = useSubmitFeedback();

    const { open } = useSidebar();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (!feedback) {
            toast.error("Feedback cannot be empty.");
            setIsLoading(false);
            return;
        }

        try {
            const result = await FeedbackFormMutation.mutateAsync({ feedback });
            toast.success(result.message || "Feedback submitted successfully!");
            setFeedback("");
            setIsLoading(false); 
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setIsLoading(false);
                toast.error(error.response?.data.message || "An error occurred.");
            }
        }
    }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={open ? "lg" : "default"} variant="destructive" className="w-full justify-start">
          <MessageSquareText className="h-4 w-4 shrink-0" />
          {open && <span className="truncate">Feedback Form</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback Form</DialogTitle>
          <DialogDescription>
            Please provide your feedback below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              rows={10}
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback here..."
              className="mb-4"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
