import type { Metadata } from "next";
import ServicesPage from "@/components/ServicesPage";

export const metadata: Metadata = {
  title: "Our Services | RECARUH - Recruitment & HR Solutions",
  description:
    "Explore RECARUH's full range of recruitment services for job seekers and employers — from job applications, resume building, and career counseling to campus hiring, AI-powered candidate selection, and employer branding.",
  openGraph: {
    title: "Our Services | RECARUH - Recruitment & HR Solutions",
    description:
      "End-to-end recruitment solutions for professionals and organisations. Discover 14 tailored services across job seeking and hiring.",
    url: "https://recaruh.com/services",
    type: "website",
  },
};

export default function Services() {
  return <ServicesPage />;
}
