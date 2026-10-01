const P: Record<string, string> = {
  briefcase: "M3 8h18v11H3zM9 8V5h6v3M3 13h18",
  file: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  mic: "M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM6 11a6 6 0 0 0 12 0M12 17v4",
  cap: "M2 9l10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5",
  megaphone: "M3 10v4h4l8 4V6L7 10zM18 9a4 4 0 0 1 0 6",
  spark: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",
};
export default function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  return <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={P[name] ?? P.spark} /></svg>;
}
