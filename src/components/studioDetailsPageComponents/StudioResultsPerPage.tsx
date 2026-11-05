
"use client";

import { IStudio } from "@/Types/rooms";
import { useState } from "react";

import { MdChevronLeft, MdChevronRight, MdKeyboardArrowDown, MdLocationOn } from "react-icons/md";
import StudioCard from "../home/FeaturedSecCards";
import Link from "next/link";

interface StudioResultsProps {
roomsData: IStudio[];
}

const ITEMS_PER_PAGE = 12;

export default function StudioResults({ roomsData }: StudioResultsProps) {


const [currentPage, setCurrentPage] = useState(1);
const [location, setLocation] = useState("all");
const [priceRange, setPriceRange] = useState("all");
const [minRating, setMinRating] = useState("all");
const [sortBy, setSortBy] = useState("default");

// Get unique locations from API data
const locations = Array.from(
new Set(roomsData.map((room) => room.location).filter(Boolean))
).sort();
//---------------------------------------//
// Filter studios
const filteredStudios = roomsData.filter((room) => {
const matchesLocation =
location === "all" || room.location === location;

let matchesPrice = true;

if (priceRange === "under50") {
matchesPrice = room.hourlyRate < 50;
} else if (priceRange === "50-100") {
matchesPrice = room.hourlyRate >= 50 && room.hourlyRate <= 100;
} else if (priceRange === "100-150") {
matchesPrice = room.hourlyRate > 100 && room.hourlyRate <= 150;
} else if (priceRange === "150plus") {
matchesPrice = room.hourlyRate > 150;
}

const matchesRating =
minRating === "all" || room.rating >= Number(minRating);

return matchesLocation && matchesPrice && matchesRating;
});
//-----------------------------------------------//


//sort
const sortedStudios = [...filteredStudios].sort((a, b) => {
switch (sortBy) {
case "newest":
    return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

case "price-low":
    return a.hourlyRate - b.hourlyRate;

case "price-high":
    return b.hourlyRate - a.hourlyRate;

case "rating":
    return b.rating - a.rating;

default:
    return 0;
}
});

//-----------------------------------------//

//----------Pagination----------//
const totalPages = Math.ceil(sortedStudios.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = Math.min(
startIndex + ITEMS_PER_PAGE,
filteredStudios.length
);

const currentStudios = sortedStudios.slice(startIndex, endIndex);

const getPageNumbers = () => {
const pages: (number | string)[] = [];

if (totalPages <= 5) {
return Array.from({ length: totalPages }, (_, i) => i + 1);
}

pages.push(1);

if (currentPage > 3) pages.push("...");

const start = Math.max(2, currentPage - 1);
const end = Math.min(totalPages - 1, currentPage + 1);

for (let i = start; i <= end; i++) {
pages.push(i);
}

if (currentPage < totalPages - 2) pages.push("...");

pages.push(totalPages);

return pages;
};
//----------------------------------------------//

//filter
const handleClearFilters = () => {
setLocation("all");
setPriceRange("all");
setMinRating("all");
setCurrentPage(1);
};

const hasActiveFilters =
location !== "all" ||
priceRange !== "all" ||
minRating !== "all";
//----------------------------------//
return (
<>
{/* Filters */}
<div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-separator bg-surface p-3 shadow-sm md:rounded-full">
    <div className="flex flex-wrap items-center gap-2">

        {/* Location Filter */}
        <div className="relative flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm font-medium text-success">
            <MdLocationOn size={18} />

            <select
                value={location}
                onChange={(e) => {
                    setLocation(e.target.value);
                    setCurrentPage(1);
                }}
                className="max-w-[180px] cursor-pointer appearance-none bg-transparent pr-5 outline-none"
            >
                <option value="all">All locations</option>

                {locations.map((loc) => (
                    <option key={loc} value={loc}>
                        {loc}
                    </option>
                ))}
            </select>

            <MdKeyboardArrowDown
                size={18}
                className="pointer-events-none absolute right-3"
            />
        </div>

        {/* Price Filter */}
        <div className="rounded-full bg-success/10 px-4 py-2 text-sm font-medium text-success">
            <select
                value={priceRange}
                onChange={(e) => {
                    setPriceRange(e.target.value);
                    setCurrentPage(1);
                }}
                className="cursor-pointer bg-transparent outline-none"
            >
                <option value="all">All prices</option>
                <option value="under50">Under $50/hr</option>
                <option value="50-100">$50–$100/hr</option>
                <option value="100-150">$100–$150/hr</option>
                <option value="150plus">$150+/hr</option>
            </select>
        </div>

        {/* Rating Filter */}
        <div className="rounded-full bg-success/10 px-4 py-2 text-sm font-medium text-success">
            <select
                value={minRating}
                onChange={(e) => {
                    setMinRating(e.target.value);
                    setCurrentPage(1);
                }}
                className="cursor-pointer bg-transparent outline-none"
            >
                <option value="all">All ratings</option>
                <option value="4">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.8">4.8+</option>
            </select>
        </div>
    </div>

    {/* Clear Filters */}
    <button
        onClick={handleClearFilters}
        disabled={!hasActiveFilters}
        className="px-4 py-2 text-sm font-semibold text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
    >
        Clear all
    </button>
</div>

{/* Results Count and Sorting */}
<div className="mb-8 mt-5 flex items-center justify-between px-1">
    <p className="text-sm text-muted md:text-base">
        {filteredStudios.length} studios
    </p>

    <div className="flex items-center gap-2 text-sm">
        <span className="text-xs font-semibold uppercase text-muted">
            Sort:
        </span>

        <select
            value={sortBy}
            onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
            }}
            className="cursor-pointer bg-transparent font-semibold text-foreground outline-none"
        >
            <option value="default">Default</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
        </select>
    </div>
</div>

{/* Studio Cards */}
{currentStudios.length > 0 ? (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentStudios.map((room) => (
             
                 <StudioCard key={room.sid} roomData={room} />
        
        ))}
    </div>
) : (
    <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">No studios found</h2>
        <p className="mt-2 text-sm text-muted">
            Try changing your filters to find available studios.
        </p>
        <button
            onClick={handleClearFilters}
            className="mt-5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground"
        >
            Clear filters
        </button>
    </div>
)}

{/* Pagination */}
{totalPages > 0 && (
    <div className="mt-12 flex flex-col items-center justify-center gap-5 pb-8">
        <div className="flex items-center gap-2">
            {/* Previous */}
            <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex size-10 items-center justify-center rounded-full border border-separator bg-surface text-muted transition-colors hover:bg-default disabled:cursor-not-allowed disabled:opacity-40"
            >
                <MdChevronLeft size={22} />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-1 text-muted">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page as number)}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`size-10 rounded-full text-sm font-semibold transition-colors ${currentPage === page
                                ? "bg-accent text-accent-foreground"
                                : "border border-separator bg-surface text-foreground hover:bg-default"
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex size-10 items-center justify-center rounded-full border border-separator bg-surface text-foreground transition-colors hover:bg-default disabled:cursor-not-allowed disabled:opacity-40"
            >
                <MdChevronRight size={22} />
            </button>
        </div>
    </div>
)}
</>
);
}
