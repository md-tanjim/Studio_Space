// // import React from 'react';

// // const AddNewStudio= async() => {

// //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings`,{
// //         method: "POST",
// //         headers:{
// //             "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(myListingData),
// //     })

// //     return (
// //         <div>
            
// //         </div>
// //     );
// // };

// // export default AddNewStudio




// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { IStudio } from "@/Types/rooms";
// import {
//   MdBusiness,
//   MdLocationOn,
//   MdPayments,
//   MdPublic,
//   MdPhotoCamera,
//   MdKeyboardArrowDown,
//   MdCloudDone,
//   MdCategory,
//   MdLink,
//   MdAdd,
//   MdStar,
//   MdDelete,
//   MdAcUnit,
//   MdWifi,
//   MdLocalParking,
//   MdDoorFront,
//   MdWbSunny,
//   MdLightbulb,
//   MdCropFree,
//   MdDarkMode,
//   MdAspectRatio,
//   MdGraphicEq,
//   MdMic,
//   MdCameraAlt,
//   MdTune,
//   MdCheckCircle,
//   MdAddCircleOutline,
//   MdClose,
//   MdVerifiedUser,
//   MdBadge,
//   MdLock,
// } from "react-icons/md";
// import Image from "next/image";
// import { useSession } from "@/lib/auth-client";
// import PublishStudio from "./PublishStudio";

// const regions = [
//   "Bangladesh",
//   "Europe",
//   "North America",
//   "Asia-Pacific",
//   "Middle East",
//   "Other",
// ];

// const categories = [
//   "Photo Studios",
//   "Sound Stages",
//   "Podcast Rooms",
//   "Music Suites",
//   "Art Workshops",
// ];

// type AddStudioFormData = Pick<
//   IStudio,
//   | "region"
//   | "title"
//   | "category"
//   | "location"
//   | "hourlyRate"
//   | "securityDeposit"
//   | "maxCapacity"
//   | "description"
//   | "images"
//   | "amenities"
// >;

// const AddNewStudio = () => {


// //all states
//   const [formData, setFormData] = useState<AddStudioFormData>({
//     title: "",
//     category: "",
//     region: "",
//     location: "",
//     description: "",
//     hourlyRate: 0,
//     securityDeposit: 0,
//     maxCapacity: 1,
//     images: [],
//     amenities: [],
//   });
//   const [imageUrl, setImageUrl] = useState("");
//   const [imageError, setImageError] = useState("");
//   const [brokenImages, setBrokenImages] = useState<string[]>([]);
//   const [customAmenities, setCustomAmenities] = useState<string[]>([]);
//   const [customAmenityInput, setCustomAmenityInput] = useState("");
//   const [showCustomInput, setShowCustomInput] = useState(false);
//   const [amenityError, setAmenityError] = useState("");
 

//   const updateField = (
//     field: keyof AddStudioFormData,
//     value: string | number
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

  
//   const { data: session, isPending } = useSession();

// const userName = session?.user.name || "Loading host...";
// const userEmail = session?.user.email || "";
// const userInitials = userName
//   .split(" ")
//   .filter(Boolean)
//   .map((word) => word[0])
//   .join("")
//   .slice(0, 2)
//   .toUpperCase();



//   //----------------------------------------------------------------------------------------//


//   //all handlers
//   const handleAddImage = () => {
//   const trimmedUrl = imageUrl.trim();

//   if (!trimmedUrl) {
//     setImageError("Please enter an image URL.");
//     return;
//   }

//   let parsedUrl: URL;

//   try {
//     parsedUrl = new URL(trimmedUrl);
//   } catch {
//     setImageError("Please enter a valid image URL.");
//     return;
//   }

//   if (!["http:", "https:"].includes(parsedUrl.protocol)) {
//     setImageError("Only HTTP and HTTPS image URLs are supported.");
//     return;
//   }

//   if (formData.images.length >= 10) {
//     setImageError("You can add a maximum of 10 images.");
//     return;
//   }

//   if (formData.images.includes(trimmedUrl)) {
//     setImageError("This image URL has already been added.");
//     return;
//   }

//   setFormData((prev) => ({
//     ...prev,
//     images: [...prev.images, trimmedUrl],
//   }));

//   setImageUrl("");
//   setImageError("");
// };

// const handleRemoveImage = (url: string) => {
//   setFormData((prev) => ({
//     ...prev,
//     images: prev.images.filter((image) => image !== url),
//   }));

//   setBrokenImages((prev) => prev.filter((image) => image !== url));
// };

// const handleSetCover = (url: string) => {
//   setFormData((prev) => ({
//     ...prev,
//     images: [
//       url,
//       ...prev.images.filter((image) => image !== url),
//     ],
//   }));
// };

// //emenities handler
// const handleToggleAmenity = (amenity: string) => {
//   setFormData((prev) => ({
//     ...prev,
//     amenities: prev.amenities.includes(amenity)
//       ? prev.amenities.filter((item) => item !== amenity)
//       : [...prev.amenities, amenity],
//   }));
// };

// const handleAddCustomAmenity = () => {
//   const trimmedAmenity = customAmenityInput.trim();

//   if (!trimmedAmenity) {
//     setAmenityError("Please enter an amenity name.");
//     return;
//   }

//   const allAmenities = [
//     ...mainAmenities.map((item) => item.name),
//     ...customAmenities,
//   ];

//   if (
//     allAmenities.some(
//       (item) => item.toLowerCase() === trimmedAmenity.toLowerCase()
//     )
//   ) {
//     setAmenityError("This amenity already exists.");
//     return;
//   }

//   setCustomAmenities((prev) => [...prev, trimmedAmenity]);
//   setCustomAmenityInput("");
//   setAmenityError("");
//   setShowCustomInput(false);
// };

// const handleRemoveCustomAmenity = (amenity: string) => {
//   setCustomAmenities((prev) =>
//     prev.filter((item) => item !== amenity)
//   );

//   setFormData((prev) => ({
//     ...prev,
//     amenities: prev.amenities.filter((item) => item !== amenity),
//   }));
// };

// //-----------------------------------------------------------------------------------------------------//





//   const inputClass =
//     "w-full h-11 rounded-2xl border border-separator bg-surface px-3 text-sm text-foreground outline-none transition focus:border-success focus:ring-2 focus:ring-success/10 placeholder:text-muted/60";

//   const labelClass =
//     "mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-foreground";

//   const helperClass = "mt-2 text-xs text-muted";

//   const sectionClass =
//     "rounded-[26px] border border-separator bg-surface p-5 sm:p-6 shadow-sm";



//     //emenities
//     const mainAmenities = [
//   { name: "Air Conditioning", icon: MdAcUnit },
//   { name: "High-Speed Wi-Fi", icon: MdWifi },
//   { name: "Parking", icon: MdLocalParking },
//   { name: "Changing Room", icon: MdDoorFront },
//   { name: "Natural Lighting", icon: MdWbSunny },
//   { name: "Professional Lighting", icon: MdLightbulb },
//   { name: "White Cyclorama Wall", icon: MdCropFree },
//   { name: "Blackout Curtains", icon: MdDarkMode },
//   { name: "High Ceilings", icon: MdAspectRatio },
//   { name: "Acoustic Treatment", icon: MdGraphicEq },
//   { name: "Professional Microphones", icon: MdMic },
//   { name: "Photography Equipment", icon: MdCameraAlt },
// ];






//   return (
//     <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl space-y-6">

//         {/* Page Header */}
//         <div className="space-y-3">
//           <nav className="flex items-center gap-2 text-xs text-muted">
//             <Link href="/" className="transition hover:text-success">
//               Home
//             </Link>
//             <span>/</span>
//             <Link
//               href="/my-listings"
//               className="transition hover:text-success"
//             >
//               My Listings
//             </Link>
//             <span>/</span>
//             <span className="font-medium text-foreground">
//               Add New Studio
//             </span>
//           </nav>

//           <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//             <div>
//               <div className="flex flex-wrap items-center gap-3">
//                 <h1 className="font-label text-2xl font-bold text-foreground sm:text-3xl">
//                   Add Your Studio
//                 </h1>

//                 <span className="rounded-full bg-success/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-success">
//                   ● Studio Pass · Verified
//                 </span>
//               </div>

//               <p className="mt-2 text-sm text-muted">
//                 Share your creative space with the global network of
//                 filmmakers, photographers, and visual artists.
//               </p>
//             </div>

//             <div className="flex w-fit items-center gap-2 rounded-full bg-success/10 px-3 py-2 text-xs text-success">
//               <MdCloudDone size={16} />
//               Draft saved 2 mins ago
//             </div>
//           </div>
//         </div>

//         {/* Section 01: Basic Information */}
//         <section className={sectionClass}>
//           <div className="mb-5 flex items-center gap-3 border-b border-separator pb-4">
//             <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
//               01
//             </span>

//             <div className="flex flex-wrap items-center gap-2">
//               <h2 className="text-base font-bold text-foreground">
//                 Basic Information
//               </h2>
//               <span className="text-xs text-muted">
//                 — Workspace identity and core classification
//               </span>
//             </div>

//             <MdBusiness className="ml-auto text-xl text-success/50" />
//           </div>

//           <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

//             {/* Studio Title */}
//             <div>
//               <label className={labelClass}>
//                 <span>Studio Title <span className="text-danger">*</span></span>
//                 <span className="text-[10px] font-normal text-muted">
//                   MAX 80 CHARS
//                 </span>
//               </label>

//               <input
//                 type="text"
//                 maxLength={80}
//                 placeholder="Enter your studio name"
//                 value={formData.title}
//                 onChange={(e) => updateField("title", e.target.value)}
//                 className={inputClass}
//               />

//               <p className={helperClass}>
//                 A descriptive title highlighting key studio features.
//               </p>
//             </div>

//             {/* Studio Category */}
//             <div>
//               <label className={labelClass}>
//                 <span>Studio Category <span className="text-danger">*</span></span>
//                 <span className="text-[10px] font-normal text-muted">
//                   DISCOVERY FILTER
//                 </span>
//               </label>

//               <div className="relative">
//                 <MdCategory className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-muted" />
//                 <select
//                   value={formData.category}
//                   onChange={(e) => updateField("category", e.target.value)}
//                   className={`${inputClass} appearance-none pl-10 pr-10`}
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>

//                 <MdKeyboardArrowDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-muted" />
//               </div>

//               <p className={helperClass}>
//                 Primary production classification.
//               </p>
//             </div>

//             {/* Studio Description */}
//             <div className="md:col-span-2">
//               <label className={labelClass}>
//                 <span>Studio Description <span className="text-danger">*</span></span>

//                 <span className="text-[10px] font-normal text-muted">
//                   {formData.description.length} CHARS
//                 </span>
//               </label>

//               <textarea
//                 rows={3}
//                 value={formData.description}
//                 onChange={(e) =>
//                   updateField("description", e.target.value)
//                 }
//                 placeholder="Describe your studio, its features, equipment, and ideal uses..."
//                 className={`${inputClass} h-auto min-h-24 resize-y py-3 leading-relaxed`}
//               />

//               <p className={helperClass}>
//                 Visible on public listing details page (50 characters minimum recommended).
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Section 02: Studio Location */}
//         <section className={sectionClass}>
//           <div className="mb-5 flex items-center gap-3 border-b border-separator pb-4">
//             <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
//               02
//             </span>

//             <div className="flex flex-wrap items-center gap-2">
//               <h2 className="text-base font-bold text-foreground">
//                 Studio Location
//               </h2>
//               <span className="text-xs text-muted">
//                 — Geographic location and access info
//               </span>
//             </div>

//             <MdLocationOn className="ml-auto text-xl text-success/50" />
//           </div>

//           <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

//             {/* Region */}
//             <div>
//               <label className={labelClass}>
//                 <span>Region <span className="text-danger">*</span></span>
//               </label>

//               <div className="relative">
//                 <MdPublic className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-muted" />

//                 <select
//                   value={formData.region}
//                   onChange={(e) => updateField("region", e.target.value)}
//                   className={`${inputClass} appearance-none pl-10 pr-10`}
//                 >
//                   <option value="">Select your region</option>
//                   {regions.map((region) => (
//                     <option key={region} value={region}>
//                       {region}
//                     </option>
//                   ))}
//                 </select>

//                 <MdKeyboardArrowDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-muted" />
//               </div>

//               <p className={helperClass}>
//                 Designated territory for currency and regional taxes.
//               </p>
//             </div>

//             {/* Studio Location */}
//             <div>
//               <label className={labelClass}>
//                 <span>Studio Location / Address <span className="text-danger">*</span></span>
//               </label>

//               <div className="relative">
//                 <MdLocationOn className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-muted" />

//                 <input
//                   type="text"
//                   value={formData.location}
//                   onChange={(e) => updateField("location", e.target.value)}
//                   placeholder="City, Country or full address"
//                   className={`${inputClass} pl-10`}
//                 />
//               </div>

//               <p className={helperClass}>
//                 Exact address is disclosed only upon confirmed booking.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Section 03: Pricing & Capacity */}
//         <section className={sectionClass}>
//           <div className="mb-5 flex items-center gap-3 border-b border-separator pb-4">
//             <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
//               03
//             </span>

//             <div className="flex flex-wrap items-center gap-2">
//               <h2 className="text-base font-bold text-foreground">
//                 Pricing & Capacity
//               </h2>
//               <span className="text-xs text-muted">
//                 — Standard rates and occupancy limits
//               </span>
//             </div>

//             <MdPayments className="ml-auto text-xl text-success/50" />
//           </div>

//           <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

//             {/* Hourly Rate */}
//             <div>
//               <label className={labelClass}>
//                 <span>Hourly Rate <span className="text-danger">*</span></span>
//               </label>

//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
//                   $
//                 </span>

//                 <input
//                   type="number"
//                   min="0"
//                   value={formData.hourlyRate || ""}
//                   onChange={(e) =>
//                     updateField("hourlyRate", Number(e.target.value))
//                   }
//                   placeholder="0"
//                   className={`${inputClass} pl-8 pr-12`}
//                 />

//                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
//                   /hr
//                 </span>
//               </div>

//               <p className={helperClass}>Standard booking increment.</p>
//             </div>

//             {/* Security Deposit */}
//             <div>
//               <label className={labelClass}>
//                 <span>Security Deposit <span className="text-danger">*</span></span>
//               </label>

//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
//                   $
//                 </span>

//                 <input
//                   type="number"
//                   min="0"
//                   value={formData.securityDeposit || ""}
//                   onChange={(e) =>
//                     updateField("securityDeposit", Number(e.target.value))
//                   }
//                   placeholder="0"
//                   className={`${inputClass} pl-8`}
//                 />
//               </div>

//               <p className={helperClass}>Refundable security deposit.</p>
//             </div>

//             {/* Maximum Capacity */}
//             <div>
//               <label className={labelClass}>
//                 <span>Maximum Capacity <span className="text-danger">*</span></span>
//               </label>

//               <div className="relative">
//                 <input
//                   type="number"
//                   min="1"
//                   step="1"
//                   value={formData.maxCapacity}
//                   onChange={(e) =>
//                     updateField("maxCapacity", Number(e.target.value))
//                   }
//                   className={`${inputClass} pl-3 pr-16`}
//                 />

//                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
//                   people
//                 </span>
//               </div>

//               <p className={helperClass}>Cast, crew and guest limit.</p>
//             </div>
//           </div>
//         </section>


// {/* Section 04: Studio Images */}
// <section className={sectionClass}>
//   {/* Section Header */}
//   <div className="mb-4 flex items-center gap-3 border-b border-separator pb-3">
//     <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
//       04
//     </span>

//     <div className="flex flex-wrap items-center gap-2">
//       <h2 className="text-base font-bold text-foreground">
//         Studio Images
//       </h2>

//       <span className="text-xs text-muted">
//         — Production visuals (PNG, JPG, WEBP up to 25MB)
//       </span>
//     </div>

//     <MdPhotoCamera className="ml-auto text-xl text-success/50" />
//   </div>

//   {/* Image URL Input */}
//   <div className="flex flex-col gap-2 sm:flex-row">
//     <div className="relative flex-1">
//       <MdLink className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-muted" />

//       <input
//         type="url"
//         value={imageUrl}
//         onChange={(e) => {
//           setImageUrl(e.target.value);
//           setImageError("");
//         }}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             e.preventDefault();
//             handleAddImage();
//           }
//         }}
//         placeholder="Paste external image URL (ImgBB, Unsplash, CDN)..."
//         className={`${inputClass} pl-10`}
//       />
//     </div>

//     <button
//       type="button"
//       onClick={handleAddImage}
//       disabled={formData.images.length >= 10}
//       className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl bg-success/10 px-5 text-sm font-semibold text-success transition hover:bg-success/20 disabled:cursor-not-allowed disabled:opacity-50"
//     >
//       <MdAdd size={19} />
//       Add Image URL
//     </button>
//   </div>

//   {/* URL Error */}
//   {imageError && (
//     <p className="mt-2 text-xs font-medium text-danger">
//       {imageError}
//     </p>
//   )}

//   {/* Uploaded Photos Header */}
//   <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
//     <p className="text-xs font-bold text-foreground">
//       Uploaded Photos ({formData.images.length} of 10)
//     </p>

//     <span className="text-[10px] font-medium text-muted">
//       16:9 RECOMMENDED · MIN 1 PHOTO
//     </span>
//   </div>

//   {/* Image Gallery */}
//   {formData.images.length > 0 && (
//     <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//       {formData.images.map((url, index) => (
//         <div
//           key={url}
//           className="group overflow-hidden rounded-2xl border border-separator bg-surface"
//         >
//           {/* Image Preview */}
//           <div className="relative aspect-video bg-default">
//             {!brokenImages.includes(url) ? (
//               <Image
//                 src={url}
//                 alt={`Studio image ${index + 1}`}
//                 fill
//                 unoptimized
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                 className="object-cover"
//                 onError={() => {
//                   setBrokenImages((prev) =>
//                     prev.includes(url) ? prev : [...prev, url]
//                   );
//                 }}
//               />
//             ) : (
//               <div className="flex h-full flex-col items-center justify-center gap-2 text-muted">
//                 <MdPhotoCamera size={28} />
//                 <span className="text-xs">Unable to load image</span>
//               </div>
//             )}

//             {/* Cover Badge */}
//             {index === 0 && (
//               <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-bold text-accent-foreground shadow">
//                 <MdStar size={12} />
//                 COVER
//               </span>
//             )}

//             {/* Image Actions */}
//             <div className="absolute right-3 top-3 flex gap-2">
//               {index !== 0 && (
//                 <button
//                   type="button"
//                   onClick={() => handleSetCover(url)}
//                   title="Set as cover image"
//                   className="flex size-8 items-center justify-center rounded-full bg-white text-foreground shadow transition hover:bg-accent hover:text-accent-foreground"
//                 >
//                   <MdStar size={17} />
//                 </button>
//               )}

//               <button
//                 type="button"
//                 onClick={() => handleRemoveImage(url)}
//                 title="Remove image"
//                 className="flex size-8 items-center justify-center rounded-full bg-white text-danger shadow transition hover:bg-danger hover:text-white"
//               >
//                 <MdDelete size={17} />
//               </button>
//             </div>
//           </div>

//           {/* Image URL */}
//           <div className="flex items-center justify-between gap-2 px-3 py-3">
//             <span
//               className="min-w-0 truncate text-xs font-medium text-foreground"
//               title={url}
//             >
//               {(() => {
//                 try {
//                   return new URL(url).hostname;
//                 } catch {
//                   return url;
//                 }
//               })()}
//             </span>

//             <span className="shrink-0 text-[10px] text-muted">
//               {index === 0 ? "Cover photo" : `Photo ${index + 1}`}
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   )}

//   {/* Empty State */}
//   {formData.images.length === 0 && (
//     <div className="mt-3 flex min-h-32 flex-col items-center justify-center rounded-2xl border border-dashed border-separator bg-default/40 px-4 py-6 text-center">
//       <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-success/10 text-success">
//         <MdPhotoCamera size={21} />
//       </div>

//       <p className="text-sm font-semibold text-foreground">
//         No studio images added yet
//       </p>

//       <p className="mt-1 text-xs text-muted">
//         Paste an image URL above to add your first photo.
//       </p>
//     </div>
//   )}

//   {/* Image Limit Information */}
//   {formData.images.length > 0 && (
//     <p className="mt-3 text-xs text-muted">
//       {10 - formData.images.length} more{" "}
//       {10 - formData.images.length === 1 ? "image" : "images"} can be added.
//       The first image will be displayed as your studio cover.
//     </p>
//   )}
// </section>

        
// {/* Section 05: Amenities & Facilities */}
// <section className={sectionClass}>
//   {/* Section Header */}
//   <div className="mb-5 flex items-center gap-3 border-b border-separator pb-4">
//     <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
//       05
//     </span>

//     <div className="flex flex-wrap items-center gap-2">
//       <h2 className="text-base font-bold text-foreground">
//         Amenities & Facilities
//       </h2>

//       <span className="text-xs text-muted">
//         — Equipment packages and studio capabilities
//       </span>
//     </div>

//     <MdTune className="ml-auto text-xl text-success/50" />
//   </div>

//   {/* Predefined Amenities */}
//   <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
//     {mainAmenities.map((amenity) => {
//       const isSelected = formData.amenities.includes(amenity.name);
//       const Icon = amenity.icon;

//       return (
//         <button
//           key={amenity.name}
//           type="button"
//           onClick={() => handleToggleAmenity(amenity.name)}
//           className={`flex min-h-11 items-center gap-3 rounded-full border px-3 transition-all duration-200 ${
//             isSelected
//               ? "border-success/40 bg-success/10 text-foreground"
//               : "border-separator bg-default/50 text-foreground hover:border-success/40 hover:bg-success/5"
//           }`}
//         >
//           <Icon
//             size={17}
//             className={isSelected ? "text-success" : "text-muted"}
//           />

//           <span className="flex-1 text-left text-xs font-medium">
//             {amenity.name}
//           </span>

//           {isSelected ? (
//             <MdCheckCircle size={17} className="text-success" />
//           ) : (
//             <MdAdd size={17} className="text-muted" />
//           )}
//         </button>
//       );
//     })}

//     {/* Custom Amenities */}
//     {customAmenities.map((amenity) => {
//       const isSelected = formData.amenities.includes(amenity);

//       return (
//         <div
//           key={amenity}
//           className={`flex min-h-11 items-center gap-2 rounded-full border px-3 transition-all ${
//             isSelected
//               ? "border-success/40 bg-success/10"
//               : "border-separator bg-default/50"
//           }`}
//         >
//           <button
//             type="button"
//             onClick={() => handleToggleAmenity(amenity)}
//             className="flex min-w-0 flex-1 items-center gap-3"
//           >
//             <MdAddCircleOutline
//               size={17}
//               className={isSelected ? "text-success" : "text-muted"}
//             />

//             <span className="truncate text-left text-xs font-medium text-foreground">
//               {amenity}
//             </span>

//             {isSelected ? (
//               <MdCheckCircle
//                 size={17}
//                 className="ml-auto shrink-0 text-success"
//               />
//             ) : (
//               <MdAdd
//                 size={17}
//                 className="ml-auto shrink-0 text-muted"
//               />
//             )}
//           </button>

//           <button
//             type="button"
//             onClick={() => handleRemoveCustomAmenity(amenity)}
//             title="Remove custom amenity"
//             className="flex size-6 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-danger/10 hover:text-danger"
//           >
//             <MdClose size={15} />
//           </button>
//         </div>
//       );
//     })}
//   </div>

//   {/* Add Custom Amenity */}
//   <div className="mt-4">
//     {!showCustomInput ? (
//       <button
//         type="button"
//         onClick={() => {
//           setShowCustomInput(true);
//           setAmenityError("");
//         }}
//         className="flex items-center gap-2 rounded-xl border border-dashed border-success/40 px-4 py-2.5 text-xs font-semibold text-success transition hover:bg-success/5"
//       >
//         <MdAdd size={17} />
//         Add Custom Amenity
//       </button>
//     ) : (
//       <div className="max-w-xl space-y-2">
//         <div className="flex flex-col gap-2 sm:flex-row">
//           <input
//             type="text"
//             value={customAmenityInput}
//             maxLength={50}
//             onChange={(e) => {
//               setCustomAmenityInput(e.target.value);
//               setAmenityError("");
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 handleAddCustomAmenity();
//               }
//             }}
//             placeholder="Enter a custom amenity..."
//             autoFocus
//             className={inputClass}
//           />

//           <button
//             type="button"
//             onClick={handleAddCustomAmenity}
//             className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl bg-success px-5 text-sm font-semibold text-white transition hover:opacity-90"
//           >
//             <MdAdd size={18} />
//             Add
//           </button>

//           <button
//             type="button"
//             onClick={() => {
//               setShowCustomInput(false);
//               setCustomAmenityInput("");
//               setAmenityError("");
//             }}
//             className="flex h-11 shrink-0 items-center justify-center rounded-2xl border border-separator px-4 text-sm text-muted transition hover:bg-default"
//           >
//             Cancel
//           </button>
//         </div>

//         {amenityError && (
//           <p className="text-xs font-medium text-danger">
//             {amenityError}
//           </p>
//         )}
//       </div>
//     )}
//   </div>

//   {/* Selected Amenities Count */}
//   <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-separator pt-3">
//     <p className="text-xs text-muted">
//       {formData.amenities.length} amenities selected
//     </p>

//     {formData.amenities.length > 0 && (
//       <button
//         type="button"
//         onClick={() =>
//           setFormData((prev) => ({
//             ...prev,
//             amenities: [],
//           }))
//         }
//         className="text-xs font-medium text-danger transition hover:underline"
//       >
//         Clear selection
//       </button>
//     )}
//   </div>
// </section>


// {/* Section 06: Host Information */}
// <section className={sectionClass}>
//   {/* Section Header */}
//   <div className="mb-4 flex items-center gap-3 border-b border-separator pb-3">
//     <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
//       06
//     </span>

//     <div className="flex flex-wrap items-center gap-2">
//       <h2 className="text-base font-bold text-foreground">
//         Host Information
//       </h2>

//       <span className="text-xs text-muted">
//         — Authenticated host credentials
//       </span>
//     </div>

//     <MdBadge className="ml-auto text-xl text-success/50" />
//   </div>

//   {/* Host Information Card */}
//   <div className="flex flex-col justify-between gap-4 rounded-2xl border border-success/15 bg-success/5 p-4 sm:flex-row sm:items-center">

//     {/* Host Details */}
//     <div className="flex min-w-0 items-center gap-3">

//       {/* Avatar */}
//       <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success text-sm font-bold text-white">
//         {isPending ? "..." : userInitials || "H"}
//       </div>

//       {/* Name and Email */}
//       <div className="min-w-0">
//         <div className="flex flex-wrap items-center gap-2">
//           <h3 className="text-sm font-bold text-foreground">
//             {userName}
//             {!isPending && " (You)"}
//           </h3>

//           {/* Verification status */}
//           <span className="flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-semibold text-success">
//             <MdVerifiedUser size={13} />
//             Authenticated Host
//           </span>
//         </div>

//         <p className="mt-1 truncate text-xs text-muted">
//           {isPending ? "Loading account information..." : userEmail}
//         </p>
//       </div>
//     </div>

//     {/* Read-only Indicator */}
//     <div className="flex w-fit shrink-0 items-center gap-2 rounded-xl bg-default px-3 py-2 text-xs font-medium text-muted">
//       <MdLock size={14} />
//       System-linked (Read-Only)
//     </div>
//   </div>
// </section>


//     <PublishStudio formData={formData} />

//       </div>
//     </main>
//   );
// };

// export default AddNewStudio;







"use client";

import { useState } from "react";
import Link from "next/link";
import { MdCloudDone } from "react-icons/md";
import StudioForm, { StudioFormData } from "@/components/studio/StudioForm";
import PublishStudio from "./PublishStudio";

const AddNewStudio = () => {
  const [formData, setFormData] = useState<StudioFormData>({
    title: "",
    category: "",
    region: "",
    location: "",
    description: "",
    hourlyRate: 0,
    securityDeposit: 0,
    maxCapacity: 1,
    images: [],
    amenities: [],
  });

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-3">
          <nav className="flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="transition hover:text-success">Home</Link>
            <span>/</span>
            <Link href="/my-listings" className="transition hover:text-success">My Listings</Link>
            <span>/</span>
            <span className="font-medium text-foreground">Add New Studio</span>
          </nav>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-label text-2xl font-bold text-foreground sm:text-3xl">
                  Add Your Studio
                </h1>
                <span className="rounded-full bg-success/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-success">
                  ● Studio Pass · Verified
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">
                Share your creative space with the global network of filmmakers,
                photographers, and visual artists.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full bg-success/10 px-3 py-2 text-xs text-success">
              <MdCloudDone size={16} />
              Draft saved 2 mins ago
            </div>
          </div>
        </div>

        <StudioForm formData={formData} setFormData={setFormData} />

        <PublishStudio formData={formData} />
      </div>
    </main>
  );
};

export default AddNewStudio;
