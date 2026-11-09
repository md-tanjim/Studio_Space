
import Image from "next/image";
import Link from "next/link";
import { MdArrowForward, MdLocationOn, MdStar } from "react-icons/md";

type StudioData = {
  _id: string
  sid: string;
  title: string;
  category: string;
  rating: number;
  totalReviews: number;
  location: string;
  hourlyRate: number;
  description: string;
  images: string[];
};
//roomsData: (IStudio & {source: "rooms" | "my-listings";})[];
type StudioCardProps = {
  roomData: StudioData & {source: "rooms" | "my-listings";};
};

export default function StudioCard({ roomData }: StudioCardProps) {
  // console.log(roomData,"roomData from featured Cards")
  return (
    //  <Link href={`/explore-studios/${roomData._id}`}>
    <Link
  href={`/${roomData.source === "rooms" ? "explore-studios" : "my-studio-listings"}/${roomData._id}`}
>
    <div className="group overflow-hidden rounded-2xl border border-separator bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-transparent dark:bg-[#161e18]">

      <div className="relative aspect-[1.6/1] overflow-hidden">
        <Image
          src={roomData.images[0]}
          alt={roomData.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

       
        <span className="absolute left-4 top-4 rounded-full bg-surface/95 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-foreground backdrop-blur-sm dark:bg-[#101812]/90 dark:text-white">
          {roomData.category}
        </span>

       
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-surface/95 px-3 py-1.5 text-xs font-bold text-foreground backdrop-blur-sm dark:bg-[#101812]/90 dark:text-white">
          <MdStar className="size-4 text-accent" />
          {roomData?.rating.toFixed(2)}
          <span className="font-normal text-muted">
            ({roomData.totalReviews})
          </span>
        </div>
      </div>


      <div className="flex flex-col p-5 sm:p-6">

        {/* Location */}
        <div className="mb-1 flex items-center gap-1 text-xs font-medium tracking-wide text-muted">
          <MdLocationOn className="size-4 shrink-0 text-success" />
          <span className="line-clamp-1">{roomData.location}</span>
        </div>

    
        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-7 tracking-tight text-foreground">
          {roomData.title}
        </h3>

   
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-muted">
          {roomData.description}
        </p>

    
        <div className="mt-8 flex items-end justify-between border-t border-separator pt-5 dark:border-white/10">

          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">
              Rate
            </span>

            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-extrabold leading-none tracking-tight text-foreground">
                ${roomData.hourlyRate}
              </span>
              <span className="text-sm text-muted">/ hr</span>
            </div>
          </div>

          <Link
            href={`/explore-studios/${roomData._id}`}
            className="inline-flex items-center justify-center gap-1 rounded-full border border-success/15 bg-success/5 px-6 py-3 text-xs font-bold text-foreground transition-all duration-300 hover:bg-success hover:text-white dark:border-transparent dark:bg-[#242e27] dark:hover:bg-success"
          >
            View Details
            <MdArrowForward className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>

        </div>
      </div>
    </div>
    </Link>
  );
}
