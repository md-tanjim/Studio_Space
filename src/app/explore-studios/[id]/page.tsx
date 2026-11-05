
    import { IStudio } from "@/Types/rooms";
    import React from "react";
    import Image from "next/image";
    import Link from "next/link";


    import {
    MdLocationOn,
    MdStar,
    MdVerified,
    MdBolt,
    MdArrowOutward,
    } from "react-icons/md";
    import StudioDetailsCarousel from "@/components/studioDetailsPageComponents/StudioDetailsCarousel";
    import StudioAbout from "@/components/studioDetailsPageComponents/StudioAbout";
    import ShowAmenities from "@/components/studioDetailsPageComponents/ShowAmenities";
import StudioHost from "@/components/studioDetailsPageComponents/StudioHost";
import StudioReviews from "@/components/studioDetailsPageComponents/StudioReviews";
import BookWorkplaceNow from "@/components/studioDetailsPageComponents/BookWorkplacaNow";
import { notFound } from "next/navigation";

    interface ExploreDetailedStudiosProps {
    params: Promise<{ id: string }>;
    }

    const ExploreDetailedStudios = async ({ params }: ExploreDetailedStudiosProps) => {

    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-rooms/${id}`,
    { cache: "no-store" }
    );

    if (!res.ok) {
    notFound();
    }

    const roomData: IStudio = await res.json();

    console.log(roomData, "room data from detailed studio page")


    return (
    <main className="min-h-screen bg-background text-foreground">
    <div className="mx-auto max-w-[1440px] px-5 py-6 md:px-8 lg:px-12">

        {/* Breadcrumb */}
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-muted">
            <Link href="/">Homepage</Link>
            <span>/</span>
            <Link href="/explore-studios">Explore Studios</Link>
            <span>/</span>
            <span className="font-semibold text-foreground">
                {roomData.title}
            </span>
        </nav>

        {/* Image Carousel */}
        <StudioDetailsCarousel images={roomData.images} title={roomData.title} />

        {/* Main Content */}
        <div className="mt-5 grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">

            {/* Left Side */}
            <div className="min-w-0 space-y-7">

                {/* Studio Information */}
                <section>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-success/15 px-3 py-1 text-[10px] font-bold uppercase text-success">
                            {roomData.category}
                        </span>

                        <span className="flex items-center gap-1 rounded-full bg-default px-3 py-1 text-xs font-semibold">
                            <MdStar className="text-success" size={15} />
                            {roomData.rating} ({roomData.totalReviews} reviews)
                        </span>

                        <span className="flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold text-accent">
                            <MdBolt size={14} />
                            Instant Confirmation
                        </span>
                    </div>

                    <h1 className="font-label text-2xl font-bold tracking-tight md:text-3xl">
                        {roomData.title}
                    </h1>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
                        <MdLocationOn size={18} className="text-success" />
                        <span>{roomData.location}</span>
                        <span>·</span>

                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(roomData.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-success hover:underline"
                        >
                            Show on Map
                        </a>

                        <MdArrowOutward size={14} />
                    </div>
                </section>

                {/* Studio Specifications */}
                <section className="grid grid-cols-2 gap-2 rounded-2xl border border-separator bg-surface p-3 sm:grid-cols-4">

                    <div className="rounded-xl bg-success/10 p-3">
                        <p className="text-[10px] font-bold uppercase text-muted">
                            Rate
                        </p>
                        <p className="mt-1 text-xl font-bold">
                            ${roomData.hourlyRate}
                            <span className="text-xs font-normal text-muted"> / hour</span>
                        </p>
                        <p className="mt-1 text-[10px] text-muted">
                            Hourly pricing
                        </p>
                    </div>

                    <div className="rounded-xl bg-success/10 p-3">
                        <p className="text-[10px] font-bold uppercase text-muted">
                            Security Deposit
                        </p>
                        <p className="mt-1 text-xl font-bold">
                            ${roomData.securityDeposit}
                        </p>
                        <p className="mt-1 text-[10px] text-muted">
                            Refundable deposit
                        </p>
                    </div>

                    <div className="rounded-xl bg-success/10 p-3">
                        <p className="text-[10px] font-bold uppercase text-muted">
                            Capacity
                        </p>
                        <p className="mt-1 text-xl font-bold">
                            {roomData.maxCapacity}
                        </p>
                        <p className="mt-1 text-[10px] text-muted">
                            Maximum guests
                        </p>
                    </div>

                    <div className="rounded-xl bg-success/10 p-3">
                        <p className="text-[10px] font-bold uppercase text-muted">
                            Reviews
                        </p>
                        <p className="mt-1 text-xl font-bold">
                            {roomData.totalReviews}
                        </p>
                        <p className="mt-1 text-[10px] text-muted">
                            Guest reviews
                        </p>
                    </div>

                </section>

               
                <StudioAbout description={roomData.description} />

                <ShowAmenities amenities={roomData.amenities}></ShowAmenities>
              
                <StudioHost host={roomData.host} />

                <StudioReviews 
                    reviews={roomData.reviews ?? []}
                    rating={roomData.rating}
                    totalReviews={roomData.totalReviews}
                />

            </div>

            {/* Right Side - Booking Component Placeholder */}
            <aside className="lg:sticky lg:top-24">
                <div className="flex  flex-col items-center justify-center  text-center">
                    {/* <MdVerified size={35} className="text-muted" />

                    <h2 className="mt-3 font-label text-lg font-bold">
                        Booking Section
                    </h2>

                    <p className="mt-2 max-w-[220px] text-sm leading-6 text-muted">
                        The Book Workplace Now component will be placed here later.
                    </p> */}
                    <BookWorkplaceNow studio={roomData}></BookWorkplaceNow>
                </div>
            </aside>

        </div>

        {/* Future sections will be added below */}


    </div>
    </main>
    );
    };

    export default ExploreDetailedStudios;
