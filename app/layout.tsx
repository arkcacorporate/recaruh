import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const head = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-head",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1F4D",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://recaruh.com"),
  title: "RECARUH | Smart Job Portal & HR Automation",
  description:
    "Find jobs, build resumes, prepare for interviews and hire the right talent with RECARUH, based in Kolkata.",
  openGraph: {
    title: "RECARUH | Smart Job Portal & HR Automation",
    description:
      "Discover new opportunities, achieve more, and succeed faster.",
    url: "https://recaruh.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body className="overflow-x-clip bg-navy-950 text-slate-100 antialiased selection:bg-brand selection:text-navy-950">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
