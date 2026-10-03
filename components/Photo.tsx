"use client";
import Image from "next/image";
import { useState } from "react";

interface PhotoProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function Photo({
  src,
  alt,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  priority = false,
}: PhotoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-navy-900/60 p-4 text-center text-white/70">
        <span className="text-sm font-medium">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
