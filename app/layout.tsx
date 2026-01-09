import type { Metadata } from "next";
import "@/styles/globals.css";
import Chatbot from "@/components/ui/Chatbot";

export const metadata: Metadata = {
  title: "Portfolio - Full Stack Developer",
  description: "A minimalist portfolio showcasing clean, efficient software solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
