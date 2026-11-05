import React from "react";
import Link from "next/link";


import {
  MdLocationOn,
  MdKeyboardArrowDown,
  MdStar,
} from "react-icons/md";
import { IStudio } from "@/Types/rooms";
import StudioCard from "@/components/home/FeaturedSecCards";
import StudioResults from "@/components/studioDetailsPageComponents/StudioResultsPerPage";

const ExploreStudios = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-rooms`);

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const roomsData: IStudio[] = await res.json();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-8 lg:px-12">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-muted transition-colors hover:text-foreground"
          >
            Homepage
          </Link>
          <span className="text-muted">/</span>
          <span className="font-medium text-foreground">
            Explore Studios
          </span>
        </div>

        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="font-label text-4xl font-bold tracking-tight md:text-5xl">
            Explore Studios
          </h1>

          <p className="mt-4 text-base text-muted md:text-lg">
            Discover vetted creative spaces, daylight lofts, and soundstages
            for your next production.
          </p>
        </div>

      

        {/* Studio Cards */}
        {/* {roomsData.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roomsData.map((room) => (
              <StudioCard key={room.sid} roomData={room} />
            //   <StudioResults key={room.sid} roomsData={roomsData} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <MdStar className="mx-auto mb-3 text-4xl text-muted" />
            <h2 className="text-xl font-semibold">No studios found</h2>
            <p className="mt-2 text-sm text-muted">
              There are currently no studios available.
            </p>
          </div>
        )} */}

        <StudioResults roomsData={roomsData} />
       


     



      </section>
    </main>
  );
};

export default ExploreStudios;