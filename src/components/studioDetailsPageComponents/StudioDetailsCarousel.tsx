
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
} from "react-icons/md";

interface StudioDetailsCarouselProps {
  images: string[];
  title: string;
}

const StudioDetailsCarousel = ({
  images,
  title,
}: StudioDetailsCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-2xl bg-default text-muted">
        No images available
      </div>
    );
  }

  const previousImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="space-y-3">
     
      <div className="group relative  h-[260px] overflow-hidden rounded-2xl bg-default sm:h-[380px] lg:h-[480px]">
        <Image
          src={images[activeIndex]}
          alt={`${title} - Image ${activeIndex + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 70vw, 1400px"
        />

        {/* Image cnt */}
        <div className="absolute bottom-4 right-4 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </div>

        
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-100 backdrop-blur-sm transition hover:bg-black/75 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <MdArrowBackIosNew size={18} />
            </button>

            
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-100 backdrop-blur-sm transition hover:bg-black/75 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <MdArrowForwardIos size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-28 ${
                activeIndex === index
                  ? "border-success opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default StudioDetailsCarousel;
