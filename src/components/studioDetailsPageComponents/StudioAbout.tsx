
"use client";

import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface StudioAboutProps {
  description: string;
}

const StudioAbout = ({ description }: StudioAboutProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="border-b border-separator pb-7">
      <h2 className="font-label text-xl font-bold">
        About this studio
      </h2>

      <p
        className={`mt-4 text-sm leading-7 text-muted ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {description}
      </p>

      {description.length > 180 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-sm font-bold text-success transition hover:opacity-75"
        >
          {expanded ? "Read Less" : "Read More"}

          {expanded ? (
            <MdKeyboardArrowUp size={20} />
          ) : (
            <MdKeyboardArrowDown size={20} />
          )}
        </button>
      )}
    </section>
  );
};

export default StudioAbout;
