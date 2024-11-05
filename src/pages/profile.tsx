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
// import cookie from "cookie";
import { parse } from "cookie";
import { verifyToken } from "../lib/jwt";
import Logo from "@/components/ui/logo";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { IncomingMessage } from "http";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const cookiesParsed = parse(req.headers.cookie || "");
  const token = cookiesParsed.token || null;

  if (!token) {
    return {
      redirect: {
        destination: "/login?error=not_authenticated",
        permanent: false,
      },
    };
  }

  const decoded = verifyToken(token) as User | null;

  if (!decoded) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const getClientIp = (req: IncomingMessage): string | undefined => {
    const xForwardedFor = req.headers["x-forwarded-for"];
    if (typeof xForwardedFor === "string") {
      const ips = xForwardedFor.split(",").map((ip: string) => ip.trim());
      return ips[0];
    }
    return req.socket.remoteAddress || undefined;
  };

  const clientIp = getClientIp(req) || "Unknown";

  return {
    props: { user: decoded, ip: clientIp },
  };
};

interface User {
  username: string;
  email: string;
}

interface ProfileProps {
  user: User;
  ip: string;
}

export default function Profile({ user, ip }: ProfileProps) {
  const [profileData, setProfileData] = useState<{
    username: string;
    email: string;
    location: string;
  }>({
    username: user.username || "",
    email: user.email || "",
    location: ip || "Loading location...",
  });
  const router = useRouter();

  useEffect(() => {
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

        const data: Partial<User & { location: string }> =
          await response.json();

        setProfileData((prev) => ({
          username: data.username || prev.username,
          email: data.email || prev.email,
          location: data.location || prev.location,
        }));
      } catch (error) {
        console.error("Error fetching profile info:", error);
        toast.error("Failed to load profile information.");
      }
    };

    fetchProfile();
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: profileData.username,
          email: profileData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      await response.json();
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
      router.replace("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to logout.");
    }
  };

  return (
    <div className="w-1/2 mx-auto max-w-md">
      <Logo />
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
