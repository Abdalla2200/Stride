import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/UI/sonner";
import CartAuthSync from "@/components/cart/CartAuthSync";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Stride | Home",
  description: "Stride Ecommerce for men clothes and accessories",
  icons: [{ rel: "icon", url: "/logo.png", type: "image/png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("font-sans", geist.variable)}
    >
      <head></head>
      <body className="bg-primary-bg text-primary-tx flex flex-col min-h-dvh">
        <Header />
        <CartAuthSync />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
