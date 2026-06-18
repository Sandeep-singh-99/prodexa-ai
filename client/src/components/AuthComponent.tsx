import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useSignIn, useSignUp } from "@/api/authApi";
import { useAppDispatch } from "@/hooks/hooks";
import { setUser } from "@/redux/slice/authSlice";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface FormData {
  imageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    imageUrl: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const signUpMutation = useSignUp();
  const loginMutation = useSignIn();
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      try {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prevData) => ({
          ...prevData,
          imageUrl,
        }));
        setUploadedImage(file);
        e.target.value = "";
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      setLoading(false);
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const result = await loginMutation.mutateAsync(formData);
      dispatch(setUser(result));
      setLoading(false);
      toast.success(result.message || "Login successful");
    } catch (error: unknown) {
      console.log("Login failed:", error);
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedImage) {
      toast.error("No image uploaded");
      setLoading(false);
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("image", uploadedImage);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    try {
      const result = await signUpMutation.mutateAsync(formDataToSend);

      dispatch(setUser(result));

      toast.success(result.message || "Signup successful");

      setFormData({
        imageUrl: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setLoading(false);
      setUploadedImage(null);
      console.log("Signup successful:", result);
    } catch (error: unknown) {
      console.error("Signup error:", error);
      setLoading(false);
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
        <Button variant={"outline"}>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="login" className="m-5">
          <TabsList className="w-full">
            <TabsTrigger value="login" className="">
              Log In
            </TabsTrigger>
            <TabsTrigger value="signup" className="">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <div className="py-4">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Sign in to Prodexa AI</h2>
                <p className="text-sm text-muted-foreground">
                  Please enter your credentials to log in.
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email.."
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="mt-2">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password.."
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Logging In..." : "Log In"}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <div className="py-2">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Create an account</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account.
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleSignupSubmit}>
                <div className="flex justify-center">
                  <input
                    type="file"
                    id="fileInput"
                    name="imageUrl"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer w-24 h-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100"
                    aria-label="Upload Image"
                  >
                    {uploadedImage ? (
                      <img
                        src={formData.imageUrl}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-gray-400 text-center">
                        Upload Image
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="firstName">FirstName</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your FirstName.."
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="lastName">LastName</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your LastName.."
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email.."
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password.."
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
