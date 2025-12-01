import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ADD these two lines here
import './main.css';
import './components.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IUCEE-RIT",
  description: "Fostering Innovation and Excellence in Engineering Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}