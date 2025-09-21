import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";
import DevToolsHandler from "@/components/DevToolsHandler";
import FAQChatBot from "@/components/interactive/FAQChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Complete Developer Learning Hub - Programming, Data Structures & Web Technologies",
  description: "Learn programming languages (JavaScript, Python, Java, C++), data structures, web frameworks (React, Next.js), databases, cloud technologies, and more with interactive examples and real-world projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <DevToolsHandler />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FirebaseAnalytics />
        <FAQChatBot />
      </body>
    </html>
  );
}
