"use client";

import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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

  const handleLogin = async (e: any) => {
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
      //todo add jwt tokens
    } catch (error: any) {
      toast.error("Network error");
    }

    //

    //       const data = await response.json();
    //       console.log("Login successful:", data);
    //     } catch (error) {
    //       console.error("Network error during login:", error);
    //       toast.error("Network error. Please check your connection and try again.");
    //     }
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
