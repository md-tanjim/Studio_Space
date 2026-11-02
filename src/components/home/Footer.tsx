'use client';
import Link from "next/link";
import {
  FaTwitter,
  FaYoutube,
  FaSpotify,
} from "react-icons/fa";
import { MdPublic } from "react-icons/md";

const Footer= ()=> {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Studios", href: "/explore-studios" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About Us", href: "/about" },
  ];

  const categories = [
    { label: "Photo Studios", value: "Photo Studio" },
    { label: "Sound Stages", value: "Sound Stage" },
    { label: "Podcast Rooms", value: "Podcast Room" },
    { label: "Music Suites", value: "Music Suite" },
    { label: "Art Workshops", value: "Art Workshop" },
  ];

  const socialLinks = [
    {
      label: "Twitter",
      href: "https://twitter.com",
      Icon: FaTwitter,
    },
    {
      label: "YouTube",
      href: "https://youtube.com",
      Icon: FaYoutube,
    },
    {
      label: "Spotify",
      href: "https://spotify.com",
      Icon: FaSpotify,
    },
  ];

  return (
    <footer className="border-t border-separator bg-surface text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-[1400px] px-5 pt-14 sm:px-8 lg:pt-16">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_0.75fr_0.75fr_1.6fr] lg:gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full border border-success/20 bg-success/10 text-success">
                <MdPublic className="size-5" />
              </span>

              <span className="text-xl font-bold tracking-tight">
                Studio<span className="text-success">Space</span>
              </span>
            </Link>

            <p className="max-w-[390px] text-sm leading-6 text-muted">
              Curated boutique ateliers, acoustic sound stages, and
              luminous production lofts designed for visionary creators
              and modern media professionals.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-success">
                <span className="size-1 rounded-full bg-success" />
                Global Access
              </span>

              <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
                24/7 Production Readiness
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-wide">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted transition-colors hover:text-success"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-wide">
              Categories
            </h4>

            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.value}>
                  <Link
                    href={`/explore-studios?category=${encodeURIComponent(category.value)}`}
                    className="text-[13px] text-muted transition-colors hover:text-success"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Socials */}
          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-wide">
              Stay in the Loop
            </h4>

            <p className="mb-5 text-[13px] leading-5 text-muted">
              Receive exclusive studio invites, darkroom releases, and
              creator residency announcements.
            </p>

            {/* Newsletter Form */}
            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Enter your creative email"
                className="h-10 min-w-0 flex-1 rounded-full border border-success/15 bg-default px-4 text-xs text-foreground outline-none placeholder:text-muted focus:border-success"
              />

              <button
                type="submit"
                className="h-10 shrink-0 rounded-full bg-[#c8f322] px-6 text-xs font-bold text-[#1c2600] shadow-[0_4px_16px_rgba(200,243,34,0.15)] transition-all hover:-translate-y-0.5 hover:bg-[#b9e619]"
              >
                Subscribe
              </button>
            </form>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-success/15 bg-default text-muted transition-all hover:border-success/30 hover:bg-success/10 hover:text-success"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-5 border-t border-separator py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © 2025 StudioSpace Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/legal-terms"
              className="text-[11px] font-medium tracking-wide text-muted transition-colors hover:text-success"
            >
              Legal Terms
            </Link>

            <Link
              href="/privacy-policy"
              className="text-[11px] font-medium tracking-wide text-muted transition-colors hover:text-success"
            >
              Privacy Policy
            </Link>

            <Link
              href="/studio-safety"
              className="text-[11px] font-medium tracking-wide text-muted transition-colors hover:text-success"
            >
              Studio Safety Guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer