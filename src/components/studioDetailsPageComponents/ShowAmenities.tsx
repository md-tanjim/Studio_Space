
"use client";

import { useEffect, useState } from "react";
import { MdClose, MdArrowForward } from "react-icons/md";

interface ShowAmenitiesProps {
  amenities: string[];
}

const ShowAmenities = ({ amenities }: ShowAmenitiesProps) => {
  const [showAll, setShowAll] = useState(false);

  const visibleAmenities = amenities.slice(0, 4);

  useEffect(() => {
    if (!showAll) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAll(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [showAll]);

  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <>
      {/* Amenities Section */}
      <section className="rounded-2xl border border-separator bg-surface p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="font-label text-lg font-bold sm:text-xl">
            Amenities & Included Equipment
          </h2>

          <span className="shrink-0 text-[10px] font-bold uppercase text-muted">
            {amenities.length} Included Services
          </span>
        </div>

        {/* Preview */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {visibleAmenities.map((amenity, index) => (
            <div
              key={`${amenity}-${index}`}
              className="flex min-h-14 items-center rounded-xl bg-success/10 px-4 py-3"
            >
              <p className="text-sm font-medium text-foreground">
                {amenity}
              </p>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {amenities.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-xs font-bold text-success transition hover:bg-success/20"
          >
            View All Amenities ({amenities.length})
            <MdArrowForward size={16} />
          </button>
        )}
      </section>

      {/* All Amenities Modal */}
      {showAll && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAll(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="amenities-modal-title"
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-surface shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-separator bg-success/10 px-5 py-4 sm:px-7">
              <h2
                id="amenities-modal-title"
                className="font-label text-base font-bold sm:text-lg"
              >
                All Included Amenities ({amenities.length})
              </h2>

              <button
                type="button"
                onClick={() => setShowAll(false)}
                aria-label="Close amenities"
                className="flex size-9 items-center justify-center rounded-full bg-default text-muted transition hover:bg-separator hover:text-foreground"
              >
                <MdClose size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {amenities.map((amenity, index) => (
                  <div
                    key={`${amenity}-${index}`}
                    className="flex min-h-12 items-center rounded-xl bg-success/10 px-4 py-3"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {amenity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowAmenities;
