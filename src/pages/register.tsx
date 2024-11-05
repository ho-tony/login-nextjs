"use client";

import {useState } from "react";
import {useRouter} from 'next/router';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {parse} from 'cookie';
import {verifyToken} from '../lib/jwt'; 
import {User} from '@/models/user';
import Logo from "@/components/ui/logo";

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


export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();

  const handleRegistration = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevents refresh of page, might change to redirect to login page
    try {
      const response = await fetch('/api/register', {
        method: 'POST', 
        headers: {
          'Content-Type' : 'application/json', 
        },
        body: JSON.stringify({
          username, 
          email, 
          password, 
          passwordConfirmation
        })
      })
      const data = await response.json();
      console.log(data);
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-1/2 mx-auto max-w-md">
      <form onSubmit={handleRegistration}>
        <Logo/>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Register</CardTitle>
            <CardDescription>
              Enter your details to register your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="john123"
                onChange = {(e) => setUsername(e.target.value)}
                required
                
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="johndoe@gmail.com"
                onChange= {(e) => setEmail(e.target.value)}
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
                onChange = {(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password Confirmation</Label>
              <Input
                id="password-confirmation"
                name="password-confirmation"
                type="password"
                placeholder="Confirm your password"
                onChange = {(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="w-full">Register</button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}