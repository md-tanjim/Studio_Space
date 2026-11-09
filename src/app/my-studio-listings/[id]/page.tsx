

// import Link from "next/link";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import {
//   MdArrowBack,
//   MdLocationOn,
//   MdGroups,
//   MdAttachMoney,
//   MdSecurity,
//   MdEmail,
//   MdImageNotSupported,
// } from "react-icons/md";
// import { IMyStudioDetails } from "@/Types/rooms";
// import { Suspense } from "react";
// import { getTokenFromClient } from "@/lib/getTokenFromClient";
// import { getTokenFromServer } from "@/lib/getTokenFromServer";

// export interface MyStudioDetailsProps {
//   params: Promise<{ id: string }>;
// }

// const MyStudioDetails = async ({ params }: MyStudioDetailsProps) => {
//   const { id } = await params;

//   const token = await getTokenFromServer();
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${id}`,
//     { cache: "no-store",
//       headers:{
//         authorization: `Bearer ${token}`,
//       }
//      }
//   );

//   console.log("nooooooo dataaaa from my studio id");
//   if (!res.ok) notFound();

//   const data: IMyStudioDetails[] = await res.json();
//   const studio = data[0];
//   console.log(data.length,"dataaaa from my studio id");
//   if (!studio) notFound();

//   const formattedDate = new Date(studio.createdAt).toLocaleDateString(
//     "en-US",
//     {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     }
//   );

//   return (

//   // <div>hello  {data.length}</div>

//     <main className="min-h-screen bg-background text-foreground">
//       <div className="mx-auto max-w-[1200px] px-5 py-8 md:px-8">

//         {/* Breadcrumb */}
//         <Link
//           href="/my-listings"
//           className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-success"
//         >
//           <MdArrowBack size={18} />
//           Back to My Listings
//         </Link>

//         {/* Header */}
//         <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
//           <div>
//             <div className="mb-3 flex flex-wrap items-center gap-2">
//               <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
//                 {studio.category}
//               </span>
//               <span className="rounded-full bg-default px-3 py-1 text-xs font-semibold text-muted">
//                 My Listing
//               </span>
//             </div>

//             <h1 className="font-label text-2xl font-bold md:text-3xl">
//               {studio.title}
//             </h1>

//             <p className="mt-2 flex items-center gap-2 text-sm text-muted">
//               <MdLocationOn className="text-success" size={18} />
//               {studio.location}
//             </p>
//           </div>

//           <div className="flex gap-2">
//             <Link
//               href="/my-listings"
//               className="flex items-center gap-2 rounded-xl border border-separator px-4 py-2.5 text-sm font-semibold transition hover:bg-default"
//             >
//               <MdArrowBack size={17} />
//               Listings
//             </Link>

         
//           </div>
//         </div>

//         {/* Image Gallery */}
//         <section className="mb-8">
//           {studio.images?.length > 0 ? (
//             <div className="grid h-[280px] grid-cols-1 gap-3 overflow-hidden rounded-2xl sm:h-[380px] sm:grid-cols-2">
//               <div className="relative h-full min-h-0">
//                 <Image
//                   src={studio.images[0]}
//                   alt={studio.title}
//                   fill
//                   unoptimized
//                   className="object-cover"
//                 />
//               </div>

//               <div className="hidden grid-cols-2 grid-rows-2 gap-3 sm:grid">
//                 {studio.images.slice(1, 5).map((image: string, index:number) => (
//                   <div key={index} className="relative min-h-0 overflow-hidden rounded-xl">
//                     <Image
//                       src={image}
//                       alt={`${studio.title} image ${index + 2}`}
//                       fill
//                       unoptimized
//                       className="object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="flex h-64 items-center justify-center rounded-2xl border border-separator bg-surface text-muted">
//               <div className="text-center">
//                 <MdImageNotSupported size={35} className="mx-auto mb-2" />
//                 No images available
//               </div>
//             </div>
//           )}
//         </section>

//         {/* Studio Information */}
//         <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">

//           {/* Left Content */}
//           <div className="space-y-7">

//             {/* Specifications */}
//             <section>
//               <h2 className="mb-4 font-label text-xl font-bold">
//                 Studio Specifications
//               </h2>

//               <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                 <div className="rounded-2xl border border-separator bg-surface p-5">
//                   <MdAttachMoney className="mb-3 text-success" size={25} />
//                   <p className="text-xs font-semibold text-muted">Hourly Rate</p>
//                   <p className="mt-1 text-2xl font-bold">
//                     ${studio.hourlyRate}
//                     <span className="text-xs font-normal text-muted"> / hour</span>
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-separator bg-surface p-5">
//                   <MdSecurity className="mb-3 text-success" size={25} />
//                   <p className="text-xs font-semibold text-muted">Security Deposit</p>
//                   <p className="mt-1 text-2xl font-bold">
//                     ${studio.securityDeposit}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-separator bg-surface p-5">
//                   <MdGroups className="mb-3 text-success" size={25} />
//                   <p className="text-xs font-semibold text-muted">Maximum Capacity</p>
//                   <p className="mt-1 text-2xl font-bold">
//                     {studio.maxCapacity}
//                     <span className="text-xs font-normal text-muted"> people</span>
//                   </p>
//                 </div>
//               </div>
//             </section>

//             {/* Description */}
//             <section className="rounded-2xl border border-separator bg-surface p-5 sm:p-6">
//               <h2 className="mb-3 font-label text-xl font-bold">
//                 About This Studio
//               </h2>
//               <p className="whitespace-pre-line text-sm leading-7 text-muted">
//                 {studio.description || "No description provided."}
//               </p>
//             </section>

//             {/* Amenities */}
//             <section className="rounded-2xl border border-separator bg-surface p-5 sm:p-6">
//               <h2 className="mb-4 font-label text-xl font-bold">
//                 Amenities & Facilities
//               </h2>

//               {studio.amenities?.length > 0 ? (
//                 <div className="flex flex-wrap gap-2">
//                   {studio.amenities.map((amenity, index: number) => (
//                     <span
//                       key={index}
//                       className="rounded-xl border border-separator bg-default px-3 py-2 text-sm"
//                     >
//                       {amenity}
//                     </span>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm text-muted">
//                   No amenities have been added to this listing.
//                 </p>
//               )}
//             </section>

//           </div>

//           {/* Right Sidebar */}
//           <aside className="space-y-5">

//             {/* Owner Information */}
//             <section className="rounded-2xl border border-separator bg-surface p-5">
//               <h2 className="mb-4 font-label text-lg font-bold">
//                 Listing Owner
//               </h2>

//               <div className="flex items-center gap-3">
//                 <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-success/10 font-bold text-success">
//                   {studio.host.name?.charAt(0).toUpperCase() || "U"}
//                 </div>

//                 <div className="min-w-0">
//                   <p className="font-semibold">{studio.host.name}</p>
//                   <p className="text-xs text-muted">Studio Owner</p>
//                 </div>
//               </div>

//               <div className="mt-5 space-y-3 border-t border-separator pt-4">
//                 <div className="flex items-start gap-2 text-sm">
//                   <MdEmail className="mt-0.5 shrink-0 text-success" size={18} />
//                   <span className="break-all text-muted">
//                     {studio.host.userEmail}
//                   </span>
//                 </div>
//               </div>
//             </section>

//             {/* Listing Details */}
//             <section className="rounded-2xl border border-separator bg-surface p-5">
//               <h2 className="mb-4 font-label text-lg font-bold">
//                 Listing Details
//               </h2>

//               <div className="space-y-4 text-sm">
//                 <div className="flex items-center justify-between gap-3">
//                   <span className="text-muted">Listing ID</span>
//                   <span className="font-semibold">{studio._id.slice(-6).toUpperCase()}</span>
//                 </div>

//                 <div className="flex items-center justify-between gap-3">
//                   <span className="text-muted">Region</span>
//                   <span className="font-semibold">{studio.region}</span>
//                 </div>

//                 <div className="flex items-center justify-between gap-3">
//                   <span className="text-muted">Created</span>
//                   <span className="font-semibold">{formattedDate}</span>
//                 </div>
//               </div>
//             </section>

            

//           </aside>
//         </div>
//       </div>
//     </main>

   
//   );
// };

// export default MyStudioDetails;



    import { IMyStudioDetails, IStudio } from "@/Types/rooms";
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
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenFromServer } from "@/lib/getTokenFromServer";






    interface ExploreDetailedStudiosProps {
    params: Promise<{ id: string }>;
    }

    const MyStudioDetails = async ({ params }: ExploreDetailedStudiosProps) => {

    const { id } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
      });

    // console.log(id,session, "id from deltailed listings");

    const email = session?.user.email;

   

    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings/${email}/${id}`,
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings/${id}`);

    // console.log("okkkkkkkk")
    if (!res.ok) {
      notFound();
    }
    
    // console.log("okkkkkoookk")
    const roomData: IMyStudioDetails = await res.json();

    console.log(roomData, "data from detailed my listings page")


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
                            {roomData.reviews[0]?.rating} ({roomData.totalReviews} reviews)
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
                    rating={roomData.reviews[0]?.rating}
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

    export default MyStudioDetails;
