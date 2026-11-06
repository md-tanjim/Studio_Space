

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MdArrowBack,
  MdLocationOn,
  MdEdit,
  MdDeleteOutline,
  MdGroups,
  MdAttachMoney,
  MdSecurity,
  MdCalendarToday,
  MdPerson,
  MdEmail,
  MdImageNotSupported,
} from "react-icons/md";
import { IMyStudioDetails } from "@/Types/rooms";
import EditStudioModal from "../EditStudioModal";
import { Suspense } from "react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export interface MyStudioDetailsProps {
  params: Promise<{ id: string }>;
}

const MyStudioDetails = async ({ params }: MyStudioDetailsProps) => {
  const { id } = await params;

  const token = await getTokenFromClient();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${id}`,
    { cache: "no-store",
      headers:{
        authorization: `Bearer ${token}`,
      }
     }
  );

  if (!res.ok) notFound();

  const data: IMyStudioDetails[] = await res.json();
  const studio = data[0];

  if (!studio) notFound();

  const formattedDate = new Date(studio.createdAt).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (

    <Suspense
      fallback={
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-[1200px] animate-pulse px-5 py-8 md:px-8">
            <div className="mb-6 h-5 w-36 rounded bg-default" />
            <div className="mb-6 h-10 w-2/3 rounded bg-default" />
            <div className="h-[380px] rounded-2xl bg-default" />
            <div className="mt-7 h-40 rounded-2xl bg-default" />
          </div>
        </main>
      }
    >

    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1200px] px-5 py-8 md:px-8">

        {/* Breadcrumb */}
        <Link
          href="/my-listings"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-success"
        >
          <MdArrowBack size={18} />
          Back to My Listings
        </Link>

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
                {studio.category}
              </span>
              <span className="rounded-full bg-default px-3 py-1 text-xs font-semibold text-muted">
                My Listing
              </span>
            </div>

            <h1 className="font-label text-2xl font-bold md:text-3xl">
              {studio.title}
            </h1>

            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              <MdLocationOn className="text-success" size={18} />
              {studio.location}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/my-listings"
              className="flex items-center gap-2 rounded-xl border border-separator px-4 py-2.5 text-sm font-semibold transition hover:bg-default"
            >
              <MdArrowBack size={17} />
              Listings
            </Link>

         
          </div>
        </div>

        {/* Image Gallery */}
        <section className="mb-8">
          {studio.images?.length > 0 ? (
            <div className="grid h-[280px] grid-cols-1 gap-3 overflow-hidden rounded-2xl sm:h-[380px] sm:grid-cols-2">
              <div className="relative h-full min-h-0">
                <Image
                  src={studio.images[0]}
                  alt={studio.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="hidden grid-cols-2 grid-rows-2 gap-3 sm:grid">
                {studio.images.slice(1, 5).map((image: string, index:number) => (
                  <div key={index} className="relative min-h-0 overflow-hidden rounded-xl">
                    <Image
                      src={image}
                      alt={`${studio.title} image ${index + 2}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-separator bg-surface text-muted">
              <div className="text-center">
                <MdImageNotSupported size={35} className="mx-auto mb-2" />
                No images available
              </div>
            </div>
          )}
        </section>

        {/* Studio Information */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* Left Content */}
          <div className="space-y-7">

            {/* Specifications */}
            <section>
              <h2 className="mb-4 font-label text-xl font-bold">
                Studio Specifications
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-separator bg-surface p-5">
                  <MdAttachMoney className="mb-3 text-success" size={25} />
                  <p className="text-xs font-semibold text-muted">Hourly Rate</p>
                  <p className="mt-1 text-2xl font-bold">
                    ${studio.hourlyRate}
                    <span className="text-xs font-normal text-muted"> / hour</span>
                  </p>
                </div>

                <div className="rounded-2xl border border-separator bg-surface p-5">
                  <MdSecurity className="mb-3 text-success" size={25} />
                  <p className="text-xs font-semibold text-muted">Security Deposit</p>
                  <p className="mt-1 text-2xl font-bold">
                    ${studio.securityDeposit}
                  </p>
                </div>

                <div className="rounded-2xl border border-separator bg-surface p-5">
                  <MdGroups className="mb-3 text-success" size={25} />
                  <p className="text-xs font-semibold text-muted">Maximum Capacity</p>
                  <p className="mt-1 text-2xl font-bold">
                    {studio.maxCapacity}
                    <span className="text-xs font-normal text-muted"> people</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="rounded-2xl border border-separator bg-surface p-5 sm:p-6">
              <h2 className="mb-3 font-label text-xl font-bold">
                About This Studio
              </h2>
              <p className="whitespace-pre-line text-sm leading-7 text-muted">
                {studio.description || "No description provided."}
              </p>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl border border-separator bg-surface p-5 sm:p-6">
              <h2 className="mb-4 font-label text-xl font-bold">
                Amenities & Facilities
              </h2>

              {studio.amenities?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {studio.amenities.map((amenity, index: number) => (
                    <span
                      key={index}
                      className="rounded-xl border border-separator bg-default px-3 py-2 text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">
                  No amenities have been added to this listing.
                </p>
              )}
            </section>

          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5">

            {/* Owner Information */}
            <section className="rounded-2xl border border-separator bg-surface p-5">
              <h2 className="mb-4 font-label text-lg font-bold">
                Listing Owner
              </h2>

              <div className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-success/10 font-bold text-success">
                  {studio.userName?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="min-w-0">
                  <p className="font-semibold">{studio.userName}</p>
                  <p className="text-xs text-muted">Studio Owner</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 border-t border-separator pt-4">
                <div className="flex items-start gap-2 text-sm">
                  <MdEmail className="mt-0.5 shrink-0 text-success" size={18} />
                  <span className="break-all text-muted">
                    {studio.userEmail}
                  </span>
                </div>
              </div>
            </section>

            {/* Listing Details */}
            <section className="rounded-2xl border border-separator bg-surface p-5">
              <h2 className="mb-4 font-label text-lg font-bold">
                Listing Details
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted">Listing ID</span>
                  <span className="font-semibold">{studio._id.slice(-6).toUpperCase()}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted">Region</span>
                  <span className="font-semibold">{studio.region}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted">Created</span>
                  <span className="font-semibold">{formattedDate}</span>
                </div>
              </div>
            </section>

            

          </aside>
        </div>
      </div>
    </main>

    </Suspense>
  );
};

export default MyStudioDetails;
