import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | RECARUH - Corporate Talent & HR Solutions",
  description:
    "Connect with the RECARUH corporate team at Ecospace Business Park, Kolkata. Explore employer hiring solutions, candidate opportunities, and HR automation.",
  openGraph: {
    title: "Contact Us | RECARUH - Corporate Talent & HR Solutions",
    description:
      "Connect with the RECARUH corporate team at Ecospace Business Park, Kolkata. Explore employer hiring solutions, candidate opportunities, and HR automation.",
    url: "https://recaruh.com/contact",
    type: "website",
  },
};

export default function Contact() {
  return <ContactPage />;
}
