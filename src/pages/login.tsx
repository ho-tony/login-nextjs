"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useErrorToast from "@/hooks/useErrorToast";
import Logo from "@/components/ui/logo";
import "react-toastify/dist/ReactToastify.css";
import { parse } from "cookie";
import { verifyToken } from "../lib/jwt";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "@/models/user";
interface LoginResponse {
  token?: string;
  error?: string;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const cookiesParsed = parse(req.headers.cookie || "");
  const token = cookiesParsed.token || null;

  if (!token) {
    return {
      props: {}, 
    };
  }

  const decoded = verifyToken(token) as User | null;

  if (decoded) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {}, 
  };
};


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useErrorToast(router.query.error as string);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        toast.error("Invalid Username or Password. Please try again.");
        return;
      }

      if (data.token) {
        router.replace("/profile");
      } else {
        toast.error("Login failed: No token received");
      }
    } catch (error: unknown) {
      console.log(error);
      toast.error("Failed to login. Internal Server Error");
    }
  };

  return (
    <div className="w-1/2 mx-auto max-w-md">
      <form onSubmit={handleLogin}>
        <Logo />
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
