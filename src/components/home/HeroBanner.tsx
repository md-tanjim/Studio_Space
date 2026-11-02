"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import {
  MdAdd,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
  MdOutlineApartment,
  MdOutlineSchedule,
  MdOutlineSensors,
  MdOutlineVerified,
  MdOutlineVerifiedUser,
  MdStar,
} from "react-icons/md";



const slides = [
  {
    badge: "Photo Studios",
    title: "Daylight Cycloramas and Photography Studios",
    description:
      "North-facing natural light, seamless white cycs, and full strobe and grip packages, ready for editorial, e-commerce and portrait work.",
    image: "/hero/studio-1.jpg",
  },
  {
    badge: "Film Sets",
    title: "Cinema-Grade Sets for Film and Commercial Shoots",
    description:
      "Built period sets, practical locations and drive-in loading bays, with crew parking and production offices on site.",
    image: "/hero/studio-2.jpg",
  },
  {
    badge: "Virtual Soundstages",
    title: "LED Volumes and Multi-Cam Broadcast Stages",
    description:
      "Next-generation production bays with Roe Visual LED panels, Unreal Engine synchronized tracking, heavy grid power, and green room suites.",
    image: "/hero/studio-3.jpg",
  },
];

const stats = [
  { value: "2,400+", label: "Vetted Creative Studios", Icon: MdOutlineApartment },
  { value: "4.9 / 5", label: "Average Creator Rating", Icon: MdStar },
  { value: "100%", label: "Host Protected & Bonded", Icon: MdOutlineVerifiedUser },
  { value: "45,000+", label: "Production Hours Hosted", Icon: MdOutlineSchedule },
];

const AUTOPLAY_MS = 7000;


const limeButton =
  "bg-[#c8f322] text-[#293500] shadow-[0_8px_24px_rgba(200,243,34,0.35)] hover:bg-[#d6ff3a]";



export default function Hero() {
  const router = useRouter();
  const [active, setActive] = useState(slides.length - 1);
  const slide = slides[active];

  const goTo = (index: number) =>
    setActive((index + slides.length) % slides.length);

 
  useEffect(() => {
    const id = setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(id);
  }, [active]);

  return (
    <div className="relative w-full overflow-x-clip">
      {/* top gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[1100px] -translate-x-1/2 rounded-full bg-[#d9f57a]/40 blur-[130px] dark:-top-40 dark:h-[480px] dark:w-[1200px] dark:bg-[#acf847]/15 dark:blur-[140px]"
      />
      {/* right side gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-24 h-[320px] w-[500px] rounded-full bg-[#c3ebc9]/100 blur-[110px] dark:top-20 dark:h-[350px] dark:bg-[#94de2d]/15 dark:blur-[120px]"
      />
      
      {/* left gradient */}
      <div
  aria-hidden
  className="pointer-events-none absolute -left-20 top-1/3 h-[450px] w-[500px] rounded-full bg-[#d9f57a]/30 blur-[120px] dark:bg-[#acf847]/12"
/>

    {/* bottom */}
    <div
  aria-hidden
  className="pointer-events-none absolute -bottom-24 left-1/2 h-[360px] w-[1000px] -translate-x-1/2 rounded-full bg-[#c3ebc9]/0 blur-[130px] dark:bg-[#94de2d]/0"
/>

    <section className="relative mx-auto w-full max-w-[1440px] px-6 py-6">
      
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-label text-sm text-muted">
            <li>
              <NextLink href="/" className="hover:text-foreground">
                Homepage
              </NextLink>
            </li>
            <li aria-hidden>/</li>
            {/* <li>
              <NextLink href="/explore-studios" className="hover:text-foreground">
                Spaces
              </NextLink>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-accent">
              Atelier Showcase
            </li> */}
          </ol>
        </nav>

        <div className="flex items-center gap-2 rounded-full border border-separator bg-surface px-3 py-1.5 font-label text-[11px] font-semibold uppercase tracking-wider text-foreground">
          <span className="relative flex size-2">
  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
  <span className="relative inline-flex size-2 rounded-full bg-success" />
</span>
          Live Availability • 140 Cities
        </div>
      </div>

      {/* Banner card */}
      <div className="overflow-hidden rounded-[2rem] border border-separator bg-surface shadow-[0_20px_50px_-20px_rgba(0,0,0,0.10)]">
        <div className="relative min-h-[560px] lg:min-h-[630px]">
       
          {slides.map((s, i) => (
            <Image
              key={s.image}
              src={"/hero-banner-2.png"}
              alt={s.title}
              fill
              priority={i === slides.length - 1}
              sizes="(min-width: 1440px) 1440px, 100vw"
              className={`object-cover object-right transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

     

        
          <div className="absolute inset-0 bg-linear-to-r from-surface via-surface/85 to-transparent lg:via-surface/60" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-surface to-transparent" />

        
          <div className="absolute right-8 top-12 hidden items-center gap-4 rounded-2xl border border-separator bg-surface/90 p-4 pr-6 shadow-lg backdrop-blur md:flex">
            <span className="flex size-12 items-center justify-center rounded-full bg-default text-success">
              <MdOutlineVerified className="size-6" />
            </span>
            <div className="font-label">
              <p className="text-[10px] font-bold uppercase tracking-widest text-success">
                Acoustics Certified
              </p>
              <p className="text-sm font-semibold text-foreground">
                NC-20 Sound Rating
              </p>
              <p className="text-[11px] text-muted">Zero Street Bleed Guarantee</p>
            </div>
          </div>

       
          <div className="relative flex h-full min-h-[560px] flex-col justify-center p-8 lg:min-h-[630px] lg:p-16">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-separator bg-default px-3 py-1.5 font-label text-[11px] font-bold uppercase tracking-wider text-success">
                <MdOutlineSensors className="size-4" />
                {slide.badge}
              </span>

              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted lg:text-lg">
                {slide.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className={`h-12 gap-2 rounded-full px-7 font-label font-semibold ${limeButton}`}
                  onPress={() => router.push("/explore-studios")}
                >
                  Explore Studios
                  <MdArrowForward className="size-[18px]" />
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 gap-2 rounded-full border border-separator bg-surface px-7 font-label font-semibold text-foreground"
                  onPress={() => router.push("/add-new-studio")}
                >
                  <MdAdd className="size-4" />
                  Host Your Space
                </Button>
              </div>

             
              <div className="mt-10 flex items-center gap-4">
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    variant="secondary"
                    aria-label="Previous slide"
                    className="size-11 rounded-full border border-separator bg-surface text-foreground"
                    onPress={() => goTo(active - 1)}
                  >
                    <MdChevronLeft className="size-6" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="secondary"
                    aria-label="Next slide"
                    className="size-11 rounded-full border border-separator bg-surface text-foreground"
                    onPress={() => goTo(active + 1)}
                  >
                    <MdChevronRight className="size-6" />
                  </Button>
                </div>

                <ol className="flex items-center gap-2 font-label text-sm">
                  {slides.map((s, i) => {
                    const isActive = i === active;
                    return (
                      <li key={s.badge} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          aria-label={`Go to slide ${i + 1}`}
                          aria-current={isActive ? "true" : undefined}
                          className={`flex items-center gap-1.5 transition-colors ${
                            isActive
                              ? "font-bold text-accent"
                              : "text-muted hover:text-foreground"
                          }`}
                        >
                          <span
                            className={`h-0.5 rounded-full bg-current transition-all ${
                              isActive ? "w-6" : "w-1.5"
                            }`}
                          />
                          {String(i + 1).padStart(2, "0")}
                        </button>
                        {i < slides.length - 1 && (
                          <span aria-hidden className="text-muted">
                            /
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>

     
        <div className="grid grid-cols-2 gap-6 border-t border-separator bg-default/60 px-8 py-6 lg:grid-cols-4 lg:px-16">
          {stats.map(({ value, label, Icon }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-separator bg-surface text-accent">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-xl font-bold leading-6 text-foreground">
                  {value}
                </p>
                <p className="font-label text-xs tracking-wide text-muted">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}