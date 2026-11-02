import {
  MdSecurity,
  MdBadge,
  MdBuild,
  MdSupportAgent,
  MdVerified,
} from "react-icons/md";
import Link from "next/link";



const steps = [
    {
        number: "01",
        label: "CURATION",
        title: "Discover Spaces",
        description:
            "Search by medium, ceiling height, lighting gear packages, noise rating, and drive-in access. Filter down to exact studio capabilities.",
    },
    {
        number: "02",
        label: "AVAILABILITY",
        title: "Select Shoot Hours",
        description:
            "Real-time host calendars ensure zero scheduling clashes. Select multi-hour blocks, full-day call times, or consecutive weekly production blocks.",
    },
    {
        number: "03",
        label: "CHECKOUT",
        title: "Book Instantly",
        description:
            "Zero hidden administrative surcharges. Secure platform processing, transparent deposit holds, and immediate automated pass confirmation.",
    },
    {
        number: "04",
        label: "PRODUCTION",
        title: "Create & Produce",
        description:
            "Arrive at the studio door with host smart lock or stage manager check-in. Pre-rigged equipment is staged and waiting for your call time.",
    },
];

const HowItWorks = () => {
    return (
        <section className="bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
            <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-3xl border border-separator bg-surface px-6 py-16 sm:px-10 lg:px-16 lg:py-16">

                {/* Top-left gradient glow */}
                <div className="pointer-events-none absolute -left-40 -top-40 size-[450px] rounded-full bg-[radial-gradient(circle,rgba(200,243,34,0.60)_0%,transparent_70%)] blur-3xl" />

                {/* Bottom-right gradient glow */}
                <div className="pointer-events-none absolute -bottom-40 -right-40 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,243,34,0.40)_0%,transparent_70%)] blur-3xl" />

                <div className="relative z-10">

                    {/* Section Heading */}
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-4 py-1.5 text-[10px] font-bold tracking-wide text-success">
                            <span className="size-1.5 rounded-full bg-success" />
                            EFFORTLESS PROCESS
                        </span>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[38px]">
                            How Booking Works
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
                            From conceptualization to wrap time, reserving professional
                            production space takes just four transparent steps.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

                        {/* Connecting line - desktop */}
                        <div className="absolute left-[7%] right-[7%] top-[29px] hidden h-[3px] bg-separator lg:block">
                            <div className="h-full w-[75%] bg-gradient-to-r from-success to-[#c8f322]" />
                        </div>

                        {steps.map((step, index) => (
                            <div key={step.number} className="relative">

                                {/* Number circle */}
                                <div className="relative z-10 mb-6 flex size-[58px] items-center justify-center rounded-full border-[5px] border-surface bg-[#c8f322] text-[25px] font-bold text-[#1c2600] shadow-[0_0_20px_rgba(200,243,34,0.18)]">
                                    {step.number}
                                </div>

                                {/* Step content */}
                                <div>
                                    <span
                                        className={`text-[10px] font-bold tracking-wide ${index === 3 ? "text-muted" : "text-success"
                                            }`}
                                    >
                                        {step.label}
                                    </span>

                                    <h3 className="mt-1 text-xl font-bold tracking-tight">
                                        {step.title}
                                    </h3>

                                    <p className="mt-1.5 text-[13px] leading-[1.65] text-muted">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>



        {/* Trust & Protection Section */}
<section className="bg-background px-5 py-20 text-foreground transition-colors duration-300 sm:px-8 lg:py-24">
  <div className="mx-auto max-w-[1340px]">

    {/* Section Heading */}
    <div className="mb-16 text-center">
      <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-success">
        <span className="size-1.5 rounded-full bg-success" />
        Trust & Protection
      </span>

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[38px]">
        Create With Confidence
      </h2>

      <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-muted sm:text-base">
        StudioSpace is built on trust, transparency, and top-tier creator
        peace of mind for productions of every magnitude.
      </p>
    </div>

    {/* Trust Cards */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

      {/* Card 1 */}
      <div className="flex min-h-[270px] flex-col rounded-2xl border border-separator bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-success/15 bg-success/10 text-success">
          <MdSecurity className="size-6" />
        </div>

        <h3 className="text-xl font-bold tracking-tight">
          Liability Protection
        </h3>

        <p className="mt-1.5 text-[13px] leading-[1.65] text-muted">
          Platform-backed property damage and comprehensive general
          liability coverage automatically activated on verified
          reservations.
        </p>

        <span className="mt-auto pt-6 text-[10px] font-bold tracking-wide text-success">
          UP TO $2M COVERAGE
        </span>
      </div>

      {/* Card 2 */}
      <div className="flex min-h-[270px] flex-col rounded-2xl border border-separator bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-success/15 bg-success/10 text-success">
          <MdBadge className="size-6" />
        </div>

        <h3 className="text-xl font-bold tracking-tight">
          Verified Profiles
        </h3>

        <p className="mt-1.5 text-[13px] leading-[1.65] text-muted">
          Identity verification, peer reviews, production credentials,
          and onsite host readiness audits keep our network safe.
        </p>

        <span className="mt-auto pt-6 text-[10px] font-bold tracking-wide text-success">
          100% ID SCREENED
        </span>
      </div>

      {/* Card 3 */}
      <div className="flex min-h-[270px] flex-col rounded-2xl border border-separator bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-success/15 bg-success/10 text-success">
          <MdBuild className="size-6" />
        </div>

        <h3 className="text-xl font-bold tracking-tight">
          Equipment Safety
        </h3>

        <p className="mt-1.5 text-[13px] leading-[1.65] text-muted">
          Check-in itemization logs, calibrated audio gear condition
          logs, and continuous testing ensure zero gear failure on shoot day.
        </p>

        <span className="mt-auto pt-6 text-[10px] font-bold tracking-wide text-success">
          PRE-SHOOT TESTING
        </span>
      </div>

      {/* Card 4 */}
      <div className="flex min-h-[270px] flex-col rounded-2xl border border-separator bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-success/15 bg-success/10 text-success">
          <MdSupportAgent className="size-6" />
        </div>

        <h3 className="text-xl font-bold tracking-tight">
          24/7 Concierge Support
        </h3>

        <p className="mt-1.5 text-[13px] leading-[1.65] text-muted">
          Direct-line support team ready to assist with lockouts, stage
          rebooking, last-minute gear additions, or production questions.
        </p>

        <span className="mt-auto pt-6 text-[10px] font-bold tracking-wide text-success">
          &lt; 3 MIN RESPONSE TIME
        </span>
      </div>
    </div>

    {/* Certification Banner */}
    <div className="mt-16 flex flex-col gap-6 rounded-2xl border border-success/20 bg-success/5 p-7 sm:flex-row sm:items-center sm:p-8 lg:gap-6">

      {/* Certification Icon */}
      <div className="flex size-16 shrink-0 items-center justify-center self-start rounded-full border border-success/20 bg-background text-success shadow-[0_0_25px_rgba(200,243,34,0.15)] sm:self-center">
        <MdVerified className="size-9" />
      </div>

      {/* Banner Text */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold tracking-tight sm:text-[27px]">
          Certified Creative Production Infrastructure
        </h3>

        <p className="mt-1 text-sm leading-6 text-muted">
          Over{" "}
          <strong className="font-bold text-foreground">
            45,000+ hours
          </strong>{" "}
          of flawless film shoots, podcasts, and recordings hosted
          across North America with a 99.8% dispute-free record.
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/explore-studios"
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#c8f322] px-9 py-4 text-xs font-bold text-[#1c2600] shadow-[0_5px_20px_rgba(200,243,34,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b9e619] hover:shadow-lg"
      >
        Book a Verified Space
      </Link>
    </div>

  </div>
</section>



        </section>
    );
};
export default HowItWorks;