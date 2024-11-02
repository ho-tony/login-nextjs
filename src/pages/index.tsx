// pages/index.js

import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Corgi Gallery</title>
        <meta name="description" content="Corgi App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <Card className="items-center">
          <CardHeader className="text-4xl font-bold mb-4 flex justify-center items-center">
            Corgi Gallery
            <Image
              src="/images/corgi.png"
              alt="Hero Image"
              width={200}
              height={200}
              className="rounded-full object-cover "
            />
          </CardHeader>
          <CardFooter className="justify-center mb-4 space-x-3">
            <Link href ="/login"> 
            <Button>Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
            <Link href ="/gallery">
            <Button>Gallery</Button>
            </Link>
            <Link href = "/profile">
            <Button>Profile</Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
