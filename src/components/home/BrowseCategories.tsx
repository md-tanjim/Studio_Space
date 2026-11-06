
import { IStudio } from "@/Types/rooms";
import Image from "next/image";
import Link from "next/link";
import {
  MdCameraAlt,
  MdVideocam,
  MdMic,
  MdGraphicEq,
  MdPalette,
} from "react-icons/md";


// Photo Studios
// Sound Stages
// Podcast Rooms
// Music Suites
// Art Workshops

const categories = [
  {
    title: "Photo Studios",
    category: "Photo Studios",
    description:
      "Strobes, paper rolls & tether carts ready for commercial shoots.",
    image: "/img6.png",
    Icon: MdCameraAlt,
  },
  {
    title: "Sound Stages",
    category: "Sound Stages",
    description:
      "Acoustic bays, heavy power drops & drive-in truck loading access.",
    image: "/img4.png",
    Icon: MdVideocam,
  },
  {
    title: "Podcast Rooms",
    category: "Podcast Rooms",
    description:
      "Shure SM7B, 4K multi-cam switchers & noise-isolated rooms.",
    image: "/img3.png",
    Icon: MdMic,
  },
  {
    title: "Music Suites",
    category: "Music Suites",
    description:
      "SSL consoles, isolated vocal booths & high-fidelity analog gear.",
    image: "/img2.png",
    Icon: MdGraphicEq,
  },
  {
    title: "Art Workshops",
    category: "Art Workshops",
    description:
      "Washable floors, kiln access & daylight skylight arrays.",
    image: "/img1.png",
    Icon: MdPalette,
  },
];

export default async function BrowseCategories() {
  
  //limit 6
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-rooms`);
    const roomsData = await res.json();
    console.log(roomsData,"rooms data from Featured section");


  const categoryCounts = roomsData.reduce(
    (counts : Record<string, number>, room : IStudio) => {
      const category = room.category.toLowerCase();
      counts[category] = (counts[category] || 0) + 1;
      return counts;
    },
    {}
  );

//   const PhotoStudio
//   const Podcast
//   const
//   const
//   const



  return (
    <section className="bg-background px-5 py-20 text-foreground transition-colors duration-300 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1340px]">

        
        <div className="mb-16 text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-success">
            <span className="size-1.5 rounded-full bg-success" />
            Curated Workspaces
          </span>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[38px]">
            Browse by Category
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            Filter spaces engineered specifically for your medium, gear
            requirements, and production scale.
          </p>
        </div>

       
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => {
            const count =
              categoryCounts[category.category.toLowerCase()] || 0;

            const Icon = category.Icon;

            return (
              <Link
                key={category.category}
                href={`/explore-studios?category=${encodeURIComponent(category.category)}`}
                className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-separator bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-transparent"
              >
              
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

              
                <div className="absolute inset-0 bg-gradient-to-b from-white/100 via-white/5 to-white/100 dark:from-[#101812]/75 dark:via-[#101812]/90 dark:to-[#101812]" />

            
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-full border border-success/15 bg-success/10 text-success backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>

                  <span className="rounded-full border border-success/15 bg-success/5 px-3 py-1 text-[11px] font-bold tracking-wide text-success backdrop-blur-sm">
                    {count.toLocaleString()}+ Spaces
                  </span>
                </div>

              
                <div className="relative z-10">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {category.title}
                  </h3>

                  <p className="mt-1.5 max-w-[230px] text-[13px] leading-[1.4] text-muted">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
