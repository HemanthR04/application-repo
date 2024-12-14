"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";



export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    firstname: "",
    lastname: ""
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const validateForm = () => {
    const errors: string[] = [];
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.push("Email is invalid.");
    }
    if (user.password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }
    if (user.firstname.length === 0 || user.lastname.length === 0) {
      errors.push("First name and Last name are required.");
    }
    setErrorMessages(errors);
    return errors.length === 0;
  };

  const onSignup = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Signup success");
      router.push("/login");
    } catch (error: any) {
      setErrorMessages([error.response?.data?.message || "Signup failed."]);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.firstname.length && user.lastname.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : ""}</h1>
      <hr />
      {errorMessages.length > 0 && (
        <div className="text-red-500">
          {errorMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      )}
      <div className="container">
          <div className="max-w-2xl text-center  my-4 mx-auto flex flex-col items-center justify-center">
            <div>
            
            </div>

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Connectivity Grid Tool
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Find the right connectivity for your application.
            </p>
          </div>

        </div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  type="text"
                  value={user.firstname}
                  onChange={(e) => setUser({ ...user, firstname: e.target.value })} placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname"
                  type="text"
                  value={user.lastname}
                  onChange={(e) => setUser({ ...user, lastname: e.target.value })} placeholder="Robinson" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                placeholder="@directv.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </div>
           
            <Button type="submit" onClick={onSignup} variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right" disabled={buttonDisabled || loading}>
            Create an account
            </Button>

          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>


  )

}