
"use client";

import { useState } from "react";

import MyBookingCards from "./MyBookingCards";
import { MdCalendarToday, MdEventBusy, MdSearch } from "react-icons/md";
import { IMyBookingsPage } from "@/app/my-bookings/page";




type BookingTab =
  | "All Bookings"
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

const MyBookingTabs = ({ bookingsData }: {bookingsData : IMyBookingsPage[]}) => {
  const [activeTab, setActiveTab] =
    useState<BookingTab>("All Bookings");

  // Currently, all bookings are Pending.
  const filteredBookings =
    activeTab === "All Bookings" || activeTab === "Pending"
      ? bookingsData
      : [];

  const tabs: { label: BookingTab; count: number }[] = [
    { label: "All Bookings", count: bookingsData.length },
    { label: "Pending", count: bookingsData.length },
    { label: "Confirmed", count: 0 },
    { label: "Completed", count: 0 },
    { label: "Cancelled", count: 0 },
  ];


  

  return (
    <>
      {/* Booking Tabs */}
      <section className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-full border border-separator bg-surface p-1.5 shadow-sm">
        <div className="flex flex-wrap items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              aria-pressed={activeTab === tab.label}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.label
                  ? "bg-foreground text-background"
                  : "text-muted hover:bg-default hover:text-foreground"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 opacity-60">
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 text-sm font-medium text-muted">
          <span className="size-2 rounded-full bg-success" />
          {bookingsData.length} Total Sessions
          {/* <span className="ml-2 size-2 rounded-full bg-accent" />    */}
        </div>
      </section>

      {/* Booking Cards */}
      
{/* Booking Cards / Empty States */}

{bookingsData.length === 0 ? (
  // No bookings at all
  <section className="mt-8 flex min-h-[340px] flex-col items-center justify-center rounded-3xl bg-surface px-5 py-12 text-center shadow-sm">

    <div className="mb-4 flex size-[70px] items-center justify-center rounded-full bg-success/15 shadow-[0_0_30px_rgba(132,204,22,0.12)]">
      <MdCalendarToday size={30} className="text-success" />
    </div>

    <h2 className="font-label text-2xl font-extrabold">
      No Bookings Yet
    </h2>

    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
      You havent booked any creative spaces yet. Explore our studios
      and find the perfect workspace for your next project.
    </p>

    <a
      href="/explore-studios"
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-xs font-bold text-accent-foreground shadow-md transition hover:brightness-95"
    >
      <MdSearch name="search" />
      Explore Studios
    </a>
  </section>

) : filteredBookings.length > 0 ? (
  // Matching bookings exist
  <section className="mt-8 space-y-5">
    {filteredBookings.map((bookingData) => (
      <MyBookingCards
        key={bookingData._id}
        bookingData={bookingData}
      />
    ))}
  </section>

) : (
  // No bookings in selected category
  <section className="mt-8 flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-separator bg-surface px-5 py-12 text-center">

    <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-default">
      <MdEventBusy size={28} className="text-muted" />
    </div>

    <h3 className="font-label text-lg font-bold">
      No {activeTab.toLowerCase()} bookings found
    </h3>

    <p className="mt-2 max-w-sm text-sm text-muted">
      There are currently no bookings in this category.
      Your studio reservations will appear here.
    </p>
  </section>
)}

    </>
  );
};

export default MyBookingTabs;
