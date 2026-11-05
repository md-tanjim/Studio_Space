
    "use client";

    import { useEffect, useState } from "react";
    import { Calendar, DateField, DatePicker, Label } from "@heroui/react";
    import { parseDate } from "@internationalized/date";
    import { TimePicker } from "@/components/reui/time-picker";
    import { MdArrowForward, MdCalendarMonth, MdClose, MdStar } from "react-icons/md";
    import { useSession } from "@/lib/auth-client";
    import { IStudio } from "@/Types/rooms";
    import { useRouter } from "next/navigation";
    import { toast } from "react-toastify";


    const getToday = () => {
    const today = new Date();

    return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
    ].join("-");
    };

    const BookWorkplaceNow = ({ studio }: { studio: IStudio }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getToday());
    const [crewSize, setCrewSize] = useState(1);
    const [startTime, setStartTime] = useState("10:00");
    const [endTime, setEndTime] = useState("14:00");
    const [requirements, setRequirements] = useState("");
    const [isBooked, setIsBooked] = useState(false);
    const [isBooking, setIsBooking] = useState(false);


    const { data: session, isPending } = useSession();
    const userData = session?.user;


    // Modal keyboard and scroll behavior
    useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
    setIsOpen(false);
    }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
    document.removeEventListener("keydown", handleEscape);
    document.body.style.overflow = "";
    };
    }, [isOpen]);



    const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isBooked || isBooking) return;

    setIsBooking(true);

    const bookingData = {
    userName: userData?.name,
    userEmail: userData?.email,
    userImage: userData?.image,
    selectedDate,
    crewSize,
    startTime,
    endTime,
    requirements,
    ...studio,
    bookingDate: new Date(),
    };

    try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
    }
    );

    const result = await res.json();

    if (!res.ok) {
    toast.error(result.message || "Booking failed. Please try again.");
    return;
    }

    setIsBooked(true);
    setIsOpen(false);
    toast.success("Booking Successful 🎉");

    } catch {
    toast.error("Something went wrong. Please try again.");
    } finally {
    setIsBooking(false);
    }
    };

    return (
    <>
    {/* Booking Sidebar Card */}
    <aside className="rounded-[28px] border border-separator bg-surface p-6 shadow-xl lg:sticky lg:top-24">
    {/* Price and Rating */}
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-separator pb-4">
        <div className="flex items-baseline gap-1">
            <span className="font-label text-3xl font-extrabold">
                ${studio.hourlyRate}
            </span>
            <span className="text-muted">/ hour</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm font-semibold">
            <MdStar size={20} className="text-success" />
            <span>{studio.rating}</span>
            <span className="text-muted">
                ({studio.totalReviews} reviews)
            </span>
        </div>
    </div>

    {/* Pricing Details */}
    <div className="mt-5">
        <h3 className="font-semibold">Pricing details</h3>

        <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3 border-b border-separator pb-3">
                <span className="text-muted">Hourly rental rate</span>
                <span className="font-semibold">
                    ${studio.hourlyRate} / hour
                </span>
            </div>

            <div className="border-b border-separator pb-3">
                <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">Security deposit</span>
                    <span className="font-semibold">
                        ${studio.securityDeposit}
                    </span>
                </div>

                <p className="mt-1 text-xs text-muted">
                    Fully refundable within 24h
                </p>
            </div>

            <div className="flex items-center justify-between gap-3">
                <span className="text-muted">Maximum capacity</span>
                <span className="font-semibold">
                    {studio.maxCapacity} people
                </span>
            </div>
        </div>
    </div>

    {/* Booking Notice */}
    <div className="mt-7 flex gap-3 rounded-3xl border border-success/15 bg-success/5 p-4">
        <MdCalendarMonth size={25} className="shrink-0 text-success" />

        <div>
            <p className="text-sm font-medium">
                Choose your preferred date and time
            </p>

            <p className="mt-1 text-sm leading-5 text-muted">
                Select your booking schedule in the next step.
            </p>
        </div>
    </div>

    {/* Book Button */}
    <button
        type="button"
        disabled={isBooked || isPending}
        onClick={() => setIsOpen(true)}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-accent px-5 py-4 font-bold text-accent-foreground shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
    >
        {isBooked ? "Already Booked" : "Book Workspace Now"}

        {!isBooked && <MdArrowForward size={22} />}
    </button>

    <p className="mt-5 text-center text-xs text-muted">
        No payment required yet · Instant booking confirmation
    </p>
    </aside>

    {/* Booking Modal */}
    {isOpen && (
    <div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-3 backdrop-blur-sm sm:p-6"
        onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
                setIsOpen(false);
            }
        }}
    >
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="my-auto w-full max-w-[540px] overflow-visible rounded-2xl bg-surface shadow-2xl"
        >
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-2xl bg-success/10 px-5 py-4 sm:px-6">
                <h2
                    id="booking-modal-title"
                    className="flex items-center gap-2 font-label text-lg font-bold"
                >
                    <MdCalendarMonth className="text-success" size={23} />
                    Book This Workspace
                </h2>

                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close booking modal"
                    className="flex size-9 items-center justify-center rounded-full bg-default text-muted transition hover:text-foreground"
                >
                    <MdClose size={20} />
                </button>
            </div>

            <form onSubmit={handleBooking}>
                <div className="space-y-4 p-5 sm:p-6">
                    {/* Studio Summary */}
                    <div className="rounded-2xl bg-success/10 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-muted">
                            {studio.category}
                        </p>

                        <h3 className="font-label font-bold">
                            {studio.title}
                        </h3>

                        <p className="text-xs text-muted">
                            {studio.location} · Host: {studio.host.name}
                        </p>
                    </div>

                    {/* Date and Crew Size */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <span className="mb-1 block text-[10px] font-bold uppercase text-muted">
                                Selected Date
                            </span>

                    <DatePicker
                        className="w-full"
                        name="date"
                        minValue={parseDate(getToday())}
                        value={parseDate(selectedDate)}
                        onChange={(date) => {
                            if (date) {
                                setSelectedDate(date.toString());
                            }
                        }}
                    >
                <Label className="sr-only">Booking date</Label>

                <DateField.Group fullWidth>
                    <DateField.Input>
                        {(segment) => (
                            <DateField.Segment segment={segment} />
                        )}
                    </DateField.Input>

                    <DateField.Suffix>
                        <DatePicker.Trigger>
                            <DatePicker.TriggerIndicator />
                        </DatePicker.Trigger>
                    </DateField.Suffix>
                </DateField.Group>

                <DatePicker.Popover>
                    <Calendar aria-label="Booking date">
                        <Calendar.Header>
                            <Calendar.YearPickerTrigger>
                                <Calendar.YearPickerTriggerHeading />
                                <Calendar.YearPickerTriggerIndicator />
                            </Calendar.YearPickerTrigger>

                            <Calendar.NavButton slot="previous" />
                            <Calendar.NavButton slot="next" />
                        </Calendar.Header>

                        <Calendar.Grid>
                            <Calendar.GridHeader>
                                {(day) => (
                                    <Calendar.HeaderCell>
                                        {day}
                                    </Calendar.HeaderCell>
                                )}
                            </Calendar.GridHeader>

                            <Calendar.GridBody>
                                {(date) => <Calendar.Cell date={date} />}
                            </Calendar.GridBody>
                        </Calendar.Grid>

                        <Calendar.YearPickerGrid>
                            <Calendar.YearPickerGridBody>
                                {({ year }) => (
                                    <Calendar.YearPickerCell year={year} />
                                )}
                            </Calendar.YearPickerGridBody>
                        </Calendar.YearPickerGrid>
                    </Calendar>
                </DatePicker.Popover>
                    </DatePicker>
                        </div>

                <label className="block">
                    <span className="mb-1 block text-[10px] font-bold uppercase text-muted">
                        Crew Size (Max {studio.maxCapacity})
                    </span>

                    <input
                        type="number"
                        required
                        min={1}
                        max={studio.maxCapacity}
                        value={crewSize}
                        onChange={(event) =>
                            setCrewSize(
                                Math.min(
                                    studio.maxCapacity,
                                    Math.max(1, Number(event.target.value))
                                )
                            )
                        }
                        className="w-full rounded-xl border border-separator bg-success/5 px-3 py-2.5 text-sm outline-none focus:border-success"
                    />
                </label>
                    </div>

                    {/* Start Time and End Time */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="min-w-0">
                        <span className="mb-1 block text-[10px] font-bold uppercase text-muted">
                            Start Time
                        </span>

                        <TimePicker
                            id="booking-start-time"
                            className="w-full"
                            minuteStep={30}
                            value={startTime}
                            onValueChange={(value) => {
                                if (value !== null) {
                                    setStartTime(value);
                                }
                            }}
                        />
                    </div>

                    <div className="min-w-0">
                        <span className="mb-1 block text-[10px] font-bold uppercase text-muted">
                            End Time
                        </span>

                        <TimePicker
                            id="booking-end-time"
                            className="w-full"
                            minuteStep={30}
                            value={endTime}
                            onValueChange={(value) => {
                                if (value !== null) {
                                    setEndTime(value);
                                }
                            }}
                        />
                    </div>
                </div>

                    {/* Production Requirements */}
                <label className="block pt-2">
                    <span className="mb-1 block text-[10px] font-bold uppercase text-muted">
                        Production Requirements (Optional)
                    </span>

                    <textarea
                        rows={2}
                        value={requirements}
                        onChange={(event) =>
                            setRequirements(event.target.value)
                        }
                        placeholder="e.g., Equipment drop-off time, sound isolation needs, special staging requests..."
                        className="w-full resize-none rounded-2xl border border-separator bg-success/5 px-3 py-3 text-sm outline-none placeholder:text-muted/70 focus:border-success"
                    />
                </label>
                </div>



                {/* Price Summary */}
                <div className="space-y-3 rounded-2xl bg-success/10 p-4 text-sm">
                    <div className="flex justify-between gap-3">
                        <span className="text-muted">Hourly rate:</span>
                        <span>${studio.hourlyRate} / hour</span>
                    </div>

                    <div className="flex justify-between gap-3">
                        <span className="text-muted">4 Hours Subtotal:</span>
                        <span className="font-semibold">$180.00</span>
                    </div>

                    <div className="flex justify-between gap-3">
                        <span className="text-muted">Cleaning & Prep:</span>
                        <span>$25.00</span>
                    </div>

                    <div className="flex justify-between gap-3">
                        <span className="text-muted">Refundable Deposit:</span>
                        <span>${studio.securityDeposit.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-separator pt-3">
                        <span className="font-bold text-base">
                            Total Payable Now:
                        </span>

                        <span className="font-label text-xl font-extrabold text-success">
                            ${(studio.hourlyRate * 4 + 25 + studio.securityDeposit).toFixed(2)}
                        </span>
                    </div>
                </div>


                {/* Modal Footer */}
                <div className="flex flex-col-reverse gap-3 mt-5 rounded-b-2xl bg-success/10 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="rounded-full bg-surface px-6 py-3 text-sm font-semibold transition hover:bg-default"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isBooking}
                        className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isBooking ? "Submitting..." : "Confirm & Send Booking Request"}
                    </button>
                </div>
            </form>
        </div>
    </div>
    )}
    </>
    );
    };

    export default BookWorkplaceNow;
