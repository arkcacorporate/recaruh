import Link from "next/link";
import { BookOpen, ArrowLeft, Home } from "lucide-react";

export default function BlogNotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#F8FAFC] px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand/15 text-brand shadow-lg shadow-brand/10">
          <BookOpen className="h-10 w-10" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-brand">
          404 · MISSING POST
        </p>
        <h1 className="mt-3 font-head text-3xl font-extrabold text-navy-950 sm:text-4xl">
          Article Not Found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          The blog post you requested does not exist, has an invalid URL, or may have been archived. Please explore our other corporate insights.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-brand hover:text-navy-950"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Browse All Blog Posts</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Home className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
