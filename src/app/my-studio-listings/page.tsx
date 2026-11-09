
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { IMyStudioDetails, IStudio } from "@/Types/rooms";
import {
  MdAdd,
  MdArrowForward,
  MdBusiness,
  MdCheckCircle,
  MdDashboard,
  MdHome,
} from "react-icons/md";
import MyStudioCard from "./MyStudioCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export interface MyStudioListing extends IStudio {
userName: string;
userEmail: string;
}

const MyStudioListings = async () => {
  // Get authenticated user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  // Fetch user's studio listings

  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${user.email}`,
    {
      cache: "no-store",
      headers:{
        authorization: `Bearer ${token}`,
      }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch your studio listings.");
  }

  const data: IMyStudioDetails[] = await res.json();

  console.log(data,"data from my listings=====================");

  const listings = Array.isArray(data) ? data : [];

  const totalStudios = listings.length;

  // Generate user initials
  const userInitials = (user.name || "Host")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Breadcrumb and Host Badge */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <nav className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <Link href="/" className="transition hover:text-foreground">
              Homepage
            </Link>

            <MdArrowForward size={13} />

          

          

            <span className="font-semibold text-foreground">
              My Listings
            </span>
          </nav>

          {/* Host Badge */}
          <div className="flex w-fit items-center gap-2 rounded-full border border-success/10 bg-success/5 px-3 py-2">
            <span className="size-2 rounded-full bg-success" />

            <span className="text-xs font-semibold text-foreground">
              {user.name || "Host"}
            </span>

            <span className="text-xs text-muted">
              (Host Account)
            </span>

            <span className="mx-1 h-3 w-px bg-separator" />

            <span className="rounded-full bg-success/15 px-2 py-1 text-[9px] font-bold text-success">
              {totalStudios} {totalStudios === 1 ? "STUDIO" : "STUDIOS"} REGISTERED
            </span>
          </div>
        </div>

        {/* Page Heading */}
        <section className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div className="max-w-md">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-success">
              <MdDashboard size={15} />
              Host Portfolio Management
            </div>

            <h1 className="font-label text-3xl font-extrabold tracking-tight sm:text-4xl">
              My Studio Listings
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              Manage your creative spaces, monitor seasonal occupancy
              rates, and synchronize reservation windows.
            </p>
          </div>

          {/* Add New Studio Button */}
          <Link
            href="/add-new-studio"
            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-bold text-accent-foreground shadow-sm transition hover:opacity-90"
          >
            <MdAdd size={20} />
            Add New Studio
          </Link>
        </section>

        {/* Studio Statistics */}
        <section className="rounded-3xl border border-separator bg-surface px-6 py-5 shadow-sm sm:px-8">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
            <MdBusiness size={15} />
            Registered Studios
          </div>

          <div className="mt-1 flex items-center gap-2">
            <span className="size-2 rounded-full bg-success" />

            <span className="font-label text-3xl font-extrabold tabular-nums">
              {totalStudios}
            </span>

            <span className="text-sm text-muted">
              {totalStudios === 1 ? "Studio Registered" : "Studios Registered"}
            </span>
          </div>
        </section>

        {/* Listings Area - Cards will be added separately */}
        

        {data.map((myListingData)=>{
            return(
                <MyStudioCard key={myListingData._id} studio={myListingData}></MyStudioCard>
            )
        })}

      </div>
    </main>
  );
};

export default MyStudioListings;
