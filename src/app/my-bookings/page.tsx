import MyBookingCards from "@/components/myBookingsPageComponents/MyBookingCards";
import MyBookingTabs from "@/components/myBookingsPageComponents/MyBookingTabs";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { IStudio } from "@/Types/rooms";
import Link from "next/link";

export const instant = false;

export interface IMyBookingsPage extends IStudio {
    // _id: string;
     userName: string,
    userEmail: string,
    selectedDate: string;
    crewSize: number;
    startTime: string;
    endTime: string;
    requirements: string;
    bookingDate: string;
}



const MyBookingsPage = async () => {


    const token = await getTokenFromServer();


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings`,{
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
    );

    if (!res.ok) {
        // throw new Error("Failed to fetch bookings");
    }

    const bookingsData: IMyBookingsPage[] = await res.json();

    const totalBookings = bookingsData.length;

    const bookingTabs = [
        { label: "All Bookings", count: totalBookings },
        { label: "Pending", count: totalBookings },
        { label: "Confirmed", count: 0 },
        { label: "Completed", count: 0 },
        { label: "Cancelled", count: 0 },
    ];

    return (
        <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Breadcrumb */}
                <nav className="mb-5 flex items-center gap-2 text-xs font-medium text-muted">
                    <Link
                        href="/"
                        className="transition hover:text-success"
                    >
                        Homepage
                    </Link>

                    <span>›</span>

                    <span className="text-foreground" aria-current="page">
                        My Bookings
                    </span>
                </nav>

                {/* Page Header */}
                <section>
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1">
                        <span className="size-1.5 rounded-full bg-success" />
                        <span className="text-[9px] font-bold tracking-widest text-success">
                            STUDIO PASS · RESERVATION LOG
                        </span>
                    </div>

                    <h1 className="font-label text-3xl font-extrabold tracking-tight sm:text-4xl">
                        My Bookings
                    </h1>

                    <p className="mt-2 text-sm text-muted sm:text-base">
                        Keep track of your studio reservations and manage your bookings in one place.
                    </p>
                </section>

                {/* Booking Tabs */}
               

                {/* Booking Cards — we'll build this next */}
                {/* <section className="mt-8 space-y-5">
                    {bookingsData.map((bookingData) => (
                        <MyBookingCards
                            key={bookingData._id}
                            bookingData={bookingData}
                        />
                    ))}
                </section> */}
                 <MyBookingTabs bookingsData={bookingsData}  />

            </div>
        </main>
    );
};

export default MyBookingsPage;