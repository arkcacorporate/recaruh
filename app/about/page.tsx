import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About Us | RECARUH - Smart Job Portal & HR Automation",
  description:
    "Learn about RECARUH, our story, mission, and how we bridge the gap between talented individuals and forward-thinking businesses.",
  openGraph: {
    title: "About Us | RECARUH - Smart Job Portal & HR Automation",
    description:
      "Learn about RECARUH, our story, mission, and how we bridge the gap between talented individuals and forward-thinking businesses.",
    url: "https://recaruh.com/about",
    type: "website",
  },
};

export default function About() {
  return <AboutPage />;
}
