
import Image from "next/image";
import { MdVerified, MdPersonOutline, MdArrowForward } from "react-icons/md";

interface StudioHostProps {
  host: {
    name: string;
    verified: boolean;
    image?: string;
  };
}

const StudioHost = ({ host }: StudioHostProps) => {
  const hasImage = Boolean(host?.image?.trim());

  return (
    <section className="rounded-2xl border border-separator bg-surface p-5 sm:p-7">
      <h2 className="font-label text-xl font-bold">
        Meet Your Host
      </h2>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-4">
   
          <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-success/10 text-success">
            {hasImage ? (
              <Image
                src={host.image!}
                alt={host?.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <span className="font-label text-2xl font-bold">
                {host?.name?.charAt(0).toUpperCase() || <MdPersonOutline size={30} />}
              </span>
            )}
          </div>

      
          <div>
            <h3 className="font-label text-base font-bold">
              {host?.name}
            </h3>

            {host?.verified && (
              <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-success">
                <MdVerified size={16} />
                Verified Host
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-separator px-5 py-2.5 text-sm font-bold transition hover:border-success hover:text-success"
        >
          Contact Host
          <MdArrowForward size={17} />
        </button>
      </div>
    </section>
  );
};

export default StudioHost;
