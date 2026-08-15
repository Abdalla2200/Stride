import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/UI/ToastProvider";
import CartAuthSync from "@/components/cart/CartAuthSync";

export const metadata: Metadata = {
  title: "Stride | Home",
  description: "Stride Ecommerce for men clothes and accessories",
  icons: [{ rel: "icon", url: "/logo.png", type: "image/png" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        
      </head>
      <body
        className={`${inter.variable} bg-primary-bg text-primary-tx flex flex-col min-h-dvh`}
      >
        <ToastProvider>
          <Header />
          <CartAuthSync />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
