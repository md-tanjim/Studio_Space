
"use client";
import { useState } from "react";
import EditStudioModal from "./EditStudioModal";
import Image from "next/image";
import Link from "next/link";
import { IStudio } from "@/Types/rooms";
import {
  MdLocationOn,
  MdStar,
  MdGroups,
  MdEdit,
  MdDeleteOutline,
  MdOpenInNew,
} from "react-icons/md";
import { MyStudioListing } from "./page";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface MyStudioCardProps {
  studio: MyStudioListing;

}

const MyStudioCard = ({ studio }: MyStudioCardProps) => {

    const [isEditOpen, setIsEditOpen] = useState(false);


  const studioImage = studio.images?.[0];

 const router = useRouter();
  const handleDeleteBooking = async()=>{

    const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings/${studio._id}`,{
            method: 'DELETE',
            headers:{
              authorization: `Bearer ${token}`,
            }
            
        });
        const data = await res.json();
        router.refresh();
        toast.error("successfully deleted!");
        console.log(data,"deleeeeeeted");
    }



  return (
    <>
    <article className="rounded-2xl border border-separator bg-surface p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        {/* Studio Image */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-default sm:h-52 lg:h-20 lg:w-24">
          {studioImage ? (
            <Image
              src={studioImage}
              alt={studio.title}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 96px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted">
              No Image
            </div>
          )}
        </div>

        {/* Studio Information */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-foreground sm:text-base">
              {studio.title}
            </h3>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-success/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-success">
              {studio.category}
            </span>

            <span className="text-[10px] text-muted">
              ID: #{studio._id}
            </span>
          </div>

          {/* Location */}
          <div className="mt-3 flex items-start gap-1.5 text-xs text-muted">
            <MdLocationOn size={16} className="mt-0.5 shrink-0 text-success" />
            <span>{studio.location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex shrink-0 items-center lg:w-24 lg:justify-center">
          <span className="rounded-full bg-success/10 px-3 py-1.5 text-xs font-bold text-success">
            ${studio.hourlyRate}
            <span className="ml-1 font-medium">/hr</span>
          </span>
        </div>

        {/* Rating */}
        <div className="flex shrink-0 items-center gap-1.5 lg:w-28 lg:justify-center">
          <MdStar size={18} className="shrink-0 text-amber-500" />

          <div>
            <p className="text-xs font-bold text-foreground">
              {studio.totalReviews > 0
                ? studio.rating.toFixed(2)
                : "New"}
              {studio.totalReviews > 0 && (
                <span className="ml-1 font-normal text-muted">
                  ({studio.totalReviews})
                </span>
              )}
            </p>

            <p className="text-[10px] text-muted">
              {studio.totalReviews > 0 ? "Reviews" : "No reviews yet"}
            </p>
          </div>
        </div>

        {/* Capacity */}
        <div className="flex shrink-0 items-center gap-2 lg:w-24 lg:justify-center">
          <MdGroups size={19} className="text-muted" />

          <div>
            <p className="text-xs font-semibold text-foreground">
              {studio.maxCapacity}
            </p>
            <p className="text-[10px] text-muted">People</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 border-t border-separator pt-3 lg:w-auto lg:border-t-0 lg:pt-0">
          <button
  type="button"
  onClick={() => setIsEditOpen(true)}
  title="Edit studio"
  className="flex size-9 items-center justify-center rounded-xl border border-separator text-muted transition hover:border-success/30 hover:bg-success/10 hover:text-success"
>
  <MdEdit size={18} />
</button>

          <button
            type="button"
            title="Delete studio"
            onClick={handleDeleteBooking}
            aria-label={`Delete ${studio.title}`}
            className="flex size-10 items-center justify-center rounded-xl bg-danger/10 text-danger transition hover:bg-danger/20"
          >
            <MdDeleteOutline size={19} />
          </button>

          <Link
            href={`/my-studio-listings/${studio.userEmail}`}
            title="View studio"
            aria-label={`View ${studio.title}`}
            className="flex size-10 items-center justify-center rounded-xl bg-default text-muted transition hover:bg-accent/10 hover:text-foreground"
          >
            <MdOpenInNew size={18} />
          </Link>
        </div>

      </div>
    </article>


{isEditOpen && (
    <EditStudioModal
      studio={studio}
      onClose={() => setIsEditOpen(false)}
    />
  )}

    </>
  );
};

export default MyStudioCard;
