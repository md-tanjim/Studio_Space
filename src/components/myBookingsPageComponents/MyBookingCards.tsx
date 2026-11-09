
import React, { useState } from "react";
import Image from "next/image";

import {
  MdLocationOn,
  MdCalendarToday,
  MdAccessTime,
  MdPayments,
  MdReceiptLong,
  MdCancel,
} from "react-icons/md";
import { IMyBookingsPage } from "@/app/my-bookings/page";
import { useRouter } from "next/navigation";
import BookingReceiptModal from "./BookingReceiptModal";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "react-toastify";

const MyBookingCards = ({bookingData,}: {bookingData: IMyBookingsPage}) => {
  const {
    images,
    category,
    title,
    location,
    hourlyRate,
    securityDeposit,
    selectedDate,
    startTime,
    endTime,
  } = bookingData;

  // Calculate session duration
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  let duration =
    endHour * 60 + endMinute - (startHour * 60 + startMinute);

  if (duration < 0) duration += 24 * 60;

  const hours = duration / 60;
  const subtotal = hourlyRate * hours;

  // Format date
  const formattedDate = new Date(
    `${selectedDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  // Format time
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };


  const router = useRouter();
  const handleDeleteBooking = async()=>{

        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${bookingData._id}`,{
            method: 'DELETE',
            headers:{
              authorization: `Bearer ${token}`,
            }

            
        });
        const data = await res.json();
        toast.success("Successfully Deleted");
        router.refresh();
        console.log(data,"deleeeeeeted");
    }

  return (
    <>
    
    <article className="flex flex-col overflow-hidden rounded-[24px] border border-separator bg-surface shadow-sm transition hover:shadow-md md:flex-row">

      {/* Studio Image */}
      <div className="relative min-h-[230px] w-full shrink-0 bg-default sm:min-h-[260px] md:min-h-[255px] md:w-[32%]">

        {images?.[0] && (
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 32vw"
            className="object-cover"
          />
        )}

        {/* Pending Badge */}
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-800">
          <span className="size-1.5 rounded-full bg-amber-500" />
          Pending Review
        </span>

        {/* Booking Reference */}
        <span className="absolute bottom-4 left-4 z-10 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-white">
          Ref: #{bookingData._id.slice(-6).toUpperCase()}
        </span>
      </div>

      {/* Booking Information */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-5 sm:p-6">

        {/* Studio Details */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row">

          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-success/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-success">
                {category}
              </span>

              <span className="text-[10px] text-muted">
                • Full Studio Space
              </span>
            </div>

            <h2 className="font-label text-lg font-bold leading-tight sm:text-xl">
              {title}
            </h2>

            <p className="mt-2 flex items-center gap-1 text-xs text-muted">
              <MdLocationOn size={16} className="shrink-0 text-success" />
              {location}
            </p>
          </div>

          {/* Deposit Information */}
          <div className="shrink-0 sm:text-right">
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted">
              Deposit Required
            </p>

            <p className="font-label text-xl font-extrabold">
              ${subtotal.toFixed(0)}
              <span className="ml-1 text-xs font-normal text-muted">
                (${securityDeposit} deposit)
              </span>
            </p>
          </div>
        </div>

        {/* Booking Schedule */}
        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-success/10 p-4 sm:grid-cols-3">

          {/* Reserved Date */}
          <div>
            <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-muted">
              Reserved Date
            </p>

            <p className="flex items-center gap-2 text-sm font-semibold">
              <MdCalendarToday size={16} className="shrink-0 text-success" />
              {formattedDate}
            </p>
          </div>

          {/* Session Window */}
          <div>
            <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-muted">
              Session Window
            </p>

            <p className="flex flex-wrap items-center gap-1.5 text-sm font-semibold">
              <MdAccessTime size={16} className="shrink-0 text-success" />
              {formatTime(startTime)} – {formatTime(endTime)}
              <span className="text-[10px] font-normal text-muted">
                ({hours} hrs)
              </span>
            </p>
          </div>

          {/* Rate Breakdown */}
          <div>
            <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-muted">
              Rate Breakdown
            </p>

            <p className="flex flex-wrap items-center gap-1.5 text-sm font-semibold">
              <MdPayments size={17} className="shrink-0 text-success" />
              ${hourlyRate} / hr · Total: ${subtotal.toFixed(0)}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-amber-50 px-3 py-1.5 text-[10px] font-medium text-amber-700">
            <MdAccessTime size={14} />
            Awaiting host confirmation within 24h
          </span>

          <div className="flex items-center justify-end gap-2">

            <button
  type="button"
  onClick={() => setIsReceiptOpen(true)}
  className="flex items-center gap-1.5 rounded-full bg-success/10 px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-success/20"
>
  <MdReceiptLong size={16} />
  Receipt
</button>

            <button
              type="button"
              onClick={handleDeleteBooking}
              className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-500/20"
            >
              <MdCancel size={16} />
              Cancel
            </button>

          </div>
        </div>
      </div>
    </article>


       {isReceiptOpen && (
      <BookingReceiptModal
        bookingData={bookingData}
        onClose={() => setIsReceiptOpen(false)}
      />
    )}
            


    </>
  );
};

export default MyBookingCards;
