
import { div } from "framer-motion/client";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import StudioCard from "./FeaturedSecCards";
import { IStudio } from "@/Types/rooms";

const FeaturedSection = async()=> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`);
    const roomsData = await res.json();
    console.log(roomsData,"rooms data from Featured section");

//     const sortedRooms = roomsData.toSorted(
//   (a , b) =>
//     b.rating - a.rating
// );

  return (
    <section className="bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

     
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
          
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-success">
              <span className="size-1.5 rounded-full bg-success" />
              Handpicked Spaces
            </div>

       
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[38px]">
              Featured Studios
            </h2>

           
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Discover our most popular and newly verified creative
              sanctuaries available for instant booking across top
              cultural hubs.
            </p>
          </div>

       
          <Link
            href="/explore-studios"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-success transition-colors hover:text-accent"
          >
            Filter all locations
            <MdArrowForward className="size-[18px] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

       
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
       
            {
               roomsData.map((roomData : IStudio)=>{
                return (
                    <StudioCard key={roomData._id} roomData={roomData}></StudioCard>
                )
               })
            }



        </div>

       
        <div className="mt-12 flex justify-center">
          <Link
            href="/explore-studios"
            className="group inline-flex min-w-[280px] items-center justify-center gap-3 rounded-full border border-separator bg-surface px-8 py-4 text-sm font-bold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-success/30 hover:shadow-md dark:bg-default"
          >
            Explore All 2,400+ Spaces
            <MdArrowForward className="size-5 text-success transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedSection;
