// Remove "use client" if you're using getServerSideProps in the same file.
// "use client" is used for client-side components, whereas getServerSideProps is for server-side.
// If you need client-side interactivity, consider structuring your component to separate server and client logic.

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
import cookie from "cookie";
import { verifyToken } from "../lib/jwt";
import Logo from "@/components/ui/logo";
import {useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { req } = context;
  const cookiesParsed = cookie.parse(req.headers.cookie || "");
  const token = cookiesParsed.token || null;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const getClientIp = (req) => {
    const xForwardedFor = req.headers["x-forwarded-for"];
    if (xForwardedFor) {
      const ips = xForwardedFor.split(",").map((ip) => ip.trim());
      return ips[0];
    }
    return req.connection.remoteAddress;
  };

  const clientIp = getClientIp(req);

  return {
    props: { user: decoded, ip: clientIp },
  };
}

export default function Profile({ user, ip }) {
  // Initialize profileData with server-side data
  const [profileData, setProfileData] = useState({
    username: user.username || "",
    email: user.email || "",
    location: ip || "Loading location...",
  });
  const router =  useRouter();

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/getProfileInfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log("Failed to fetch profile information.");
          return;
        }

        const data = await response.json();

        setProfileData({
          username: data.username || profileData.username,
          email: data.email || profileData.email,
          location: data.location || profileData.location,
        });
      } catch (error) {
        console.error("Error fetching profile info:", error);
        toast.error("Failed to load profile information.");
      }
    };

    fetchProfile();
    // Empty dependency array to run only once on mount
  }, []);

  // Handler for email change if needed
  const handleEmailChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  // Handler for updating profile
  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: profileData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      const result = await response.json();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to logout.");
      }
      toast.success("Logged out successfully!");
      router.replace('/login');
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to logout.");
    }
  };

  return (
    <div className="w-1/2 mx-auto max-w-md">
      <Logo/>
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
              value={profileData.username}
              disabled
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleEmailChange}
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              value={profileData.location}
              disabled
              className="bg-gray-100"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={handleUpdateProfile}>Update Profile</Button>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}
