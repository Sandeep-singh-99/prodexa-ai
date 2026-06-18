import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks/hooks";
import React, { useState, type ReactNode } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useUpdateProfile } from "@/api/authApi";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface ProfileDialogComponentsProps {
  triggerButton: ReactNode;
}

export default function ProfileDialogComponents({
  triggerButton,
}: ProfileDialogComponentsProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const updateUserMutation = useUpdateProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileImage) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", profileImage);

    try {
      await updateUserMutation.mutateAsync(formData);
      toast.success("Profile image updated successfully!");
      setProfileImage(null);
      setIsMounted(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message || "Failed to update profile image.");
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="bg-[#212126] md:min-w-3xl sm:min-w-xl">
        <DialogHeader>
          <DialogTitle>Profile Details</DialogTitle>
          <DialogDescription>
            User profile information and update options.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                className="w-16 h-16 rounded-full border-2 shadow-2xl"
                src={user?.imageUrl || ""}
                alt="User Profile Picture"
              />
              <div>
                <h3 className="text-xl font-semibold">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            {isMounted ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <CardContent>
                    <div>
                      <Label className="block mb-2">Update Profile Image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfileImage(file);
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      onClick={() => setIsMounted(false)}
                      variant={"outline"}
                    >
                      Cancel
                    </Button>
                    <Button variant={"outline"}>Save Changes</Button>
                  </CardFooter>
                </form>
              </Card>
            ) : (
              <Button onClick={() => setIsMounted(true)} variant={"outline"}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-xl font-semibold mb-5">Payment Information</h1>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Subscription Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You are currently on the {user?.subscriptionPlan || "Free"}{" "}
                plan.
              </p>
              <Button className="mt-4" variant={"outline"}>
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
