import "@/styles/globals.css";
// import { Sidebar } from "lucide-react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </main>
  );
}
