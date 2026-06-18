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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { AxiosError } from "axios";
import { useState } from "react";
import { useCreatePlan } from "@/api/planApi";
import { useAppDispatch } from "@/hooks/hooks";
import { setPlans } from "@/redux/slice/planSlice";
import { toast } from "sonner";

interface CreatePlanFormProps {
    planName: string;
    price: string;
    content: string;
}

export default function CreatePlanForm() {
  const [formData, setFormData] = useState<CreatePlanFormProps>({
    planName: "",
    price: "",
    content: "",
  });

  const planMutation = useCreatePlan();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.planName || !formData.price || !formData.content) {
      toast.error("All fields are required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("planName", formData.planName);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("content", formData.content);

    try {
      const result = await planMutation.mutateAsync(formDataToSend);
      dispatch(setPlans(result));
      toast.success(result.message || "Plan created successfully");

      setFormData({ planName: "", price: "", content: "" });
    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Signup failed");
      } else {
        toast.error("Signup failed");
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Payment Plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Payment Plan</DialogTitle>
          <DialogDescription>
            Fill in the details for the new payment plan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-3">
            <div className="grid gap-3">
              <Label htmlFor="planName">Plan Name</Label>
              <Input
                id="planName"
                name="planName"
                placeholder="Enter plan name"
                value={formData.planName}
                onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                name="price"
                placeholder="Enter plan price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={5}
                name="content"
                placeholder="Enter plan content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
