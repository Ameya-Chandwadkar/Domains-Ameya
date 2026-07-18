import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Survey Corps | Hackathon",
  description: "Choose your branch. Build for humanity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
