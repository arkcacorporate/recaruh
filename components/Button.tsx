import Link from "next/link";

export default function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5";
  const v =
    variant === "primary"
      ? "bg-brand text-navy-950 shadow-lg shadow-brand/30 hover:bg-brand-light hover:shadow-brand/50"
      : "border border-white/30 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/50";
  return (
    <Link href={href} className={`${base} ${v}`}>
      {children}
    </Link>
  );
}
