"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdHome, MdArrowOutward } from "react-icons/md";

export default function NotFound() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent the wrong image from flashing before theme detection.
  const illustration =
    mounted && resolvedTheme === "dark"
      ? "/404-dark.png"
      : "/404-light.png";

  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-5 py-12 text-foreground transition-colors duration-300 sm:py-16">

      {/* Status Badge */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-success">
        <span className="size-1.5 animate-pulse rounded-full bg-[#c8f322]" />
        Status Code: 404 // Set Staged But Empty
      </div>

      {/* Illustration */}
      <div className="mt-7 w-full max-w-[500px]">
        <Image
          src={illustration}
          alt="StudioSpace missing studio illustration"
          width={500}
          height={300}
          priority
          className="h-auto w-full object-contain"
        />
      </div>

      {/* Error Content */}
      <div className="relative -mt-1 flex flex-col items-center text-center">

        {/* Missing Cut Badge */}
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-[#c8f322] px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-[#1c2600] shadow-[0_0_18px_rgba(200,243,34,0.25)]">
          Missing Cut
        </span>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          404
        </h1>

        <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
          Oops! Studio Not Found.
        </h2>

        <p className="mt-3 max-w-[440px] text-sm leading-6 text-muted sm:text-base">
          We couldnt find the creative space you're looking for. It may
          have been moved, removed, or the link might be incorrect.
        </p>

        {/* Return Home Button */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c8f322] px-7 py-3.5 text-xs font-bold text-[#1c2600] shadow-[0_5px_20px_rgba(200,243,34,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#b9e619] hover:shadow-lg"
        >
          <MdHome className="size-4" />
          Return to Home
        </Link>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-[11px] sm:mt-20">
        <span className="text-muted">
          Looking for something specific?
        </span>

        <Link
          href="/explore-studios"
          className="font-semibold text-success transition-colors hover:underline"
        >
          Explore Studios
        </Link>

        <span className="text-muted">·</span>

        <Link
          href="/#how-it-works"
          className="font-semibold text-success transition-colors hover:underline"
        >
          How It Works
        </Link>

        <span className="text-muted">·</span>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1 font-semibold text-success transition-colors hover:underline"
        >
          Contact Support
          <MdArrowOutward className="size-3" />
        </Link>
      </div>
    </main>
  );
}