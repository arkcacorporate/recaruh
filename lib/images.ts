/**
 * Image Registry for RECARUH
 * Centralized configuration for Logo, Hero, Service, and About images.
 * WebP optimized assets load instantaneously under 150KB.
 */

export const USE_LOCAL_IMAGES = true;

export const logo = {
  src: "/images/recaruh-logo.png",
  alt: "RECARUH",
  width: 180,
  height: 56,
};

export interface ImageItem {
  id: string;
  title: string;
  localPath: string;
  remoteUrl: string;
  alt: string;
  blurDataURL?: string;
}

export const heroImages: ImageItem[] = [
  {
    id: "step-1",
    title: "Job Applications",
    localPath: "/images/hero/step-1.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1600&q=70",
    alt: "Job seeker exploring career opportunities and applying on laptop",
    blurDataURL:
      "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAQCdASoKAAYAAUAmJQBOgBuoj8fmAAD++am5fdvmLFNAt5/G/+YqHeCXB8XWfP+H98Z6WzWHu//VvW3GI2LkUWaBw/TsWbagXDWOjV1vvhNzlk/Gg9rgAAA=",
  },
  {
    id: "step-2",
    title: "Resume Building",
    localPath: "/images/hero/step-2.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=70",
    alt: "Professional crafting a modern resume profile",
  },
  {
    id: "step-3",
    title: "Interview Preparation",
    localPath: "/images/hero/step-3.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=70",
    alt: "Candidate engaging in a professional job interview session",
  },
  {
    id: "step-4",
    title: "Campus Hiring",
    localPath: "/images/hero/step-4.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=70",
    alt: "University campus students meeting corporate talent recruiters",
  },
  {
    id: "step-5",
    title: "Job Posting",
    localPath: "/images/hero/step-5.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=70",
    alt: "Recruiter publishing job openings and scouting talent",
  },
  {
    id: "step-6",
    title: "AI-Powered Candidate Selection",
    localPath: "/images/hero/step-6.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70",
    alt: "HR analytics dashboard with AI candidate matching insights",
  },
];

export const serviceImages: Record<string, ImageItem> = {
  "job-applications": {
    id: "job-applications",
    title: "Job Applications",
    localPath: "/images/services/job-applications.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=75",
    alt: "Person applying for jobs on a laptop with resume ready",
  },
  "resume-building": {
    id: "resume-building",
    title: "Resume Building",
    localPath: "/images/services/resume-building.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=75",
    alt: "Curriculum vitae and laptop on desk for resume building",
  },
  "interview-preparation": {
    id: "interview-preparation",
    title: "Interview Preparation",
    localPath: "/images/services/interview-preparation.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=75",
    alt: "Professional job interview handshake and career coaching",
  },
  "campus-hiring": {
    id: "campus-hiring",
    title: "Campus Hiring",
    localPath: "/images/services/campus-hiring.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=75",
    alt: "College graduates and recruiters at a campus hiring event",
  },
  "job-posting": {
    id: "job-posting",
    title: "Job Posting",
    localPath: "/images/services/job-posting.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=75",
    alt: "Hiring manager posting new jobs on recruitment dashboard",
  },
  "ai-candidate-selection": {
    id: "ai-candidate-selection",
    title: "AI-Powered Candidate Selection",
    localPath: "/images/services/ai-candidate-selection.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=75",
    alt: "HR analytics team reviewing AI candidate selection scorecards",
  },
};

export const aboutImages = {
  about1: {
    id: "about-1",
    title: "Creative Team at Work",
    localPath: "/images/about/creative-people-working-office.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=75",
    alt: "Creative professionals collaborating in modern RECARUH office workspace",
  },
  about2: {
    id: "about-2",
    title: "RECARUH Team",
    localPath: "/images/about/about-2.webp",
    remoteUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=75",
    alt: "Diverse RECARUH team discussing HR technology innovation",
  },
};

/**
 * Returns the active image source URL based on the USE_LOCAL_IMAGES toggle.
 */
export function getImageSrc(item: ImageItem): string {
  return USE_LOCAL_IMAGES ? item.localPath : item.remoteUrl;
}
