"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const onLogin = async () => {
    if (!validateEmail(user.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (user.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    setErrorMessage(""); // Clear previous error messages

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success");
      if (rememberMe) {
        // Logic to remember user (e.g., set a cookie)
      }
      router.push("/");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Login Failed, Check your Credentials");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = async () => {
    try {
      setLoading(true);
      router.push("/sign-up");
    } catch (error: any) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <div>
        <Toaster />
      </div>
      <div className="relative overflow-hidden py-12 lg:py-20">
        <div className="container">
          <div className="max-w-2xl text-center mx-auto flex flex-col items-center justify-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-Satoshi">
              App Vault
            </h1>
            <p className="mt-3 text-xl text-muted-foreground font-Montserrat tracking-tighter">
              Find the right connectivity for your Application.
            </p>
          </div>
        </div>
      </div>
      <h1>{loading ? "Processing" : ""}</h1>
      <hr />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Card className="mx-auto max-w-sm ">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                ></Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <Label htmlFor="rememberMe" className="ml-2">Remember Me</Label>
            </div>
            <Button
              type="submit"
              onClick={onLogin}
              variant="expandIcon"
              Icon={ArrowRightIcon}
              iconPlacement="right"
              disabled={buttonDisabled || loading}
            >
              Login
            </Button>
            <Button
              type="submit"
              onClick={onSignUp}
              variant="expandIcon"
              Icon={ArrowRightIcon}
              iconPlacement="right"
            >
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
