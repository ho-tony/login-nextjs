// pages/index.js

import Head from 'next/head';
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card";
import Image from 'next/image';

export default function Home() {


  return (
    <>
      <Head>
        <title>My Landing Page</title>
        <meta name="description" content="Corgi App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="items-center">
        <CardHeader className="text-4xl font-bold mb-4 flex justify-center items-center">
         Corgi Gallery Landing Page
            <Image
              src="/images/corgi.png" 
              alt="Hero Image"
              width={200}
              height={200}
              className="rounded-full object-cover "
            />
          </CardHeader>
          </Card>
          
      </main>
    </>
  );
}
