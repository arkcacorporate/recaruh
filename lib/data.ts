import { serviceImages, getImageSrc } from "./images";

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const services = [
  {
    id: "job-applications",
    title: "Job Applications",
    text: "Discover opportunities that match your skills and career goals.",
    icon: "briefcase",
    image: getImageSrc(serviceImages["job-applications"]),
    heroImage: "/images/hero/step-1.webp",
  },
  {
    id: "resume-building",
    title: "Resume Building",
    text: "Create a professional profile that gets noticed.",
    icon: "file-text",
    image: getImageSrc(serviceImages["resume-building"]),
    heroImage: "/images/hero/step-2.webp",
  },
  {
    id: "interview-preparation",
    title: "Interview Preparation",
    text: "Prepare with confidence and perform your best.",
    icon: "mic",
    image: getImageSrc(serviceImages["interview-preparation"]),
    heroImage: "/images/hero/step-3.webp",
  },
  {
    id: "campus-hiring",
    title: "Campus Hiring",
    text: "Build a strong talent pipeline from the start.",
    icon: "graduation-cap",
    image: getImageSrc(serviceImages["campus-hiring"]),
    heroImage: "/images/hero/step-4.webp",
  },
  {
    id: "job-posting",
    title: "Job Posting",
    text: "Reach qualified candidates faster and hire smarter.",
    icon: "megaphone",
    image: getImageSrc(serviceImages["job-posting"]),
    heroImage: "/images/hero/step-5.webp",
  },
  {
    id: "ai-candidate-selection",
    title: "AI-Powered Candidate Selection",
    text: "Identify the right talent with greater speed and accuracy.",
    icon: "sparkles",
    image: getImageSrc(serviceImages["ai-candidate-selection"]),
    heroImage: "/images/hero/step-6.webp",
  },
];

export const highlights = ["Hiring", "Compliance", "Automation", "Growth"];

export const contact = {
  phone: "7003738613",
  email: "info@recaruh.com",
  address:
    "Ecospace Business Park, Block 4A, 6th Floor, Kolkata 700156, India",
};

export const quickLinks = [
  ...nav,
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms And Conditions", href: "/terms" },
];

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
];

export const floatingChips = [
  "New job match",
  "Resume 92% ready",
  "Interview scheduled",
];
