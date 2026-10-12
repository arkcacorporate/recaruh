import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";

export const metadata: Metadata = {
  title: "Blog & Career Insights | RECARUH - Smart Job Portal & HR Automation",
  description:
    "Explore actionable guides on recruitment automation, ATS-optimized resumes, corporate interview preparation, and workforce compliance from the RECARUH team.",
  openGraph: {
    title: "Blog & Career Insights | RECARUH - Smart Job Portal & HR Automation",
    description:
      "Explore actionable guides on recruitment automation, ATS-optimized resumes, corporate interview preparation, and workforce compliance.",
    url: "https://recaruh.com/blog",
    type: "website",
  },
};

export default function Blog() {
  return <BlogPage />;
}
