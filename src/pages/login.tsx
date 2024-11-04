"use client";

import { useState } from "react";
import {useRouter} from "next/router";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevents page refresh
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Failed to log in. Please try again.";
        toast.error(errorMessage);
        return;
      }
      localStorage.setItem('username', username);
      router.push('/gallery')

      //todo add jwt tokens
    } catch (error: unknown) {
      console.log(error);
      toast.error("Failed to login");
    }
  };

  return (
    <div className="w-1/2 mx-auto max-w-md">
      <form onSubmit={handleLogin}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="john123"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button type="submit" className="w-full">
              Login
            </button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
