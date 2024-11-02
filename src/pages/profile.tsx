"use client";

import { useEffect, useState } from "react";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Profile() {
    const [location, setLocation] = useState("Loading location...");
  const [profileData, setProfileData] = useState({
    username: "john123",
    email: "john.doe@example.com",
    location: "Loading location...",
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`);
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <div className="w-1/2 mx-auto max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={(e) => {}}
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              disabled
              className="bg-gray-100"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button>Update Profile</Button>
          <Button>Logout</Button>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}
