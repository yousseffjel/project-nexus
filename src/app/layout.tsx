import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MockCartProvider } from "@/providers/mock-cart-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Project Nexus - Modern E-Commerce Platform",
    template: "%s | Project Nexus",
  },
  description:
    "Project Nexus - A cutting-edge e-commerce platform with guest checkout, advanced filtering, and lightning-fast performance. Built with Next.js 15 and TypeScript.", // cspell:disable-line
  keywords: [
    "project nexus",
    "ecommerce",
    "guest checkout",
    "nextjs 15",
    "typescript",
    "modern platform",
    "no account required",
    "quick shopping",
  ], // cspell:disable-line
  authors: [{ name: "Youssef Fjel" }], // cspell:disable-line
  creator: "Youssef Fjel", //cspell:disable-line
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <MockCartProvider>
          {children}
          <Toaster />
        </MockCartProvider>
      </body>
    </html>
  );
}
