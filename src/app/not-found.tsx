import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 py-32 text-center">
      <p className="font-label text-sm font-semibold uppercase tracking-widest text-accent">
        404
      </p>
      <h1 className="text-3xl font-bold text-foreground">Page not found</h1>
      <p className="text-muted">The page you're looking for doesn't exist yet.</p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-[#c8f322] px-7 py-3 font-label font-semibold text-[#293500]"
      >
        Back to home
      </Link>
    </main>
  );
}