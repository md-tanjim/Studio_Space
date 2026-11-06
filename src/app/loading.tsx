
import { MdCameraAlt } from "react-icons/md";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
      <div className="flex flex-col items-center text-center">

        {/* Logo Icon */}
        <div className="relative mb-6 flex size-20 items-center justify-center rounded-3xl border border-success/20 bg-success/10">
          <MdCameraAlt size={38} className="text-success" />

          {/* Pulse Effect */}
          <span className="absolute inset-0 animate-ping rounded-3xl border border-success/30 opacity-30" />
        </div>

        {/* Brand */}
        <h1 className="font-label text-2xl font-extrabold tracking-tight">
          Studio<span className="text-success">Space</span>
        </h1>

        <p className="mt-2 text-sm text-muted">
          Preparing your creative space...
        </p>

        {/* Loading Indicator */}
        <div className="mt-7 flex items-center gap-1.5">
          <span className="size-2 animate-bounce rounded-full bg-success [animation-delay:-0.3s]" />
          <span className="size-2 animate-bounce rounded-full bg-success [animation-delay:-0.15s]" />
          <span className="size-2 animate-bounce rounded-full bg-success" />
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
          Loading Experience
        </p>
      </div>
    </main>
  );
}
