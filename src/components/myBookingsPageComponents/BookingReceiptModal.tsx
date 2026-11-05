
"use client";

import { useEffect } from "react";

import jsPDF from "jspdf";
import {
  MdClose,
  MdDownload,
  MdCalendarToday,
  MdAccessTime,
  MdCheckCircle,
} from "react-icons/md";
import { IMyBookingsPage } from "@/app/my-bookings/page";

interface BookingReceiptModalProps {
  bookingData: IMyBookingsPage;
  onClose: () => void;
}

const PREPARATION_FEE = 25;

const BookingReceiptModal = ({
  bookingData,
  onClose,
}: BookingReceiptModalProps) => {
  const {
    _id,
    title,
    category,
    userName,
    userEmail,
    selectedDate,
    startTime,
    endTime,
    hourlyRate,
    securityDeposit,
  } = bookingData;

  // Calculate session duration
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let durationMinutes =
    endHour * 60 + endMinute - (startHour * 60 + startMinute);

  if (durationMinutes < 0) {
    durationMinutes += 24 * 60;
  }

  const duration = durationMinutes / 60;
  const studioHire = hourlyRate * duration;

  // Total includes preparation fee and refundable deposit.
  const totalAmount =
    studioHire + PREPARATION_FEE + securityDeposit;

  const formattedDate = new Date(
    `${selectedDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const referenceNumber = `SS-${_id.slice(-6).toUpperCase()}`;

  // Close modal with Escape and prevent background scrolling
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Generate downloadable PDF
  const generateReceiptPDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const left = 18;
    const right = pageWidth - 18;

    // Header
    doc.setFillColor(22, 29, 24);
    doc.roundedRect(left, 16, pageWidth - 36, 28, 3, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(21);
    doc.text("StudioSpace", left + 7, 28);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("ATELIER CREATIVE INVOICING", left + 7, 36);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(referenceNumber, right - 7, 29, { align: "right" });

    doc.setFontSize(7);
    doc.text("INVOICE / RECEIPT", right - 7, 21, {
      align: "right",
    });

    // Studio information
    let y = 58;

    doc.setTextColor(90, 100, 88);
    doc.setFontSize(8);
    doc.text("STUDIO RESERVATION", left, y);
    doc.text("STATUS", right, y, { align: "right" });

    y += 9;

    doc.setTextColor(22, 29, 24);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(title, left, y, {
      maxWidth: 125,
    });

    doc.setFontSize(9);
    doc.setTextColor(160, 90, 0);
    doc.text("Pending", right, y, { align: "right" });

    y += 9;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 105, 67);
    doc.setFontSize(9);
    doc.text(category.toUpperCase(), left, y);

    // Booking information panel
    y += 10;

    doc.setFillColor(238, 246, 237);
    doc.roundedRect(left, y, pageWidth - 36, 43, 3, 3, "F");

    const col2 = pageWidth / 2 + 3;

    doc.setTextColor(90, 100, 88);
    doc.setFontSize(8);
    doc.text("DATE OF BOOKING", left + 5, y + 9);
    doc.text("RESERVED DURATION", col2, y + 9);
    doc.text("CUSTOMER", left + 5, y + 25);
    doc.text("PAYMENT METHOD", col2, y + 25);

    doc.setTextColor(22, 29, 24);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(formattedDate, left + 5, y + 15);
    doc.text(
      `${formatTime(startTime)} - ${formatTime(endTime)} (${duration} hrs)`,
      col2,
      y + 15
    );
    doc.text(userName, left + 5, y + 31, {
      maxWidth: 75,
    });
    doc.text("N/A", col2, y + 31);

    // Calculation breakdown
    y += 55;

    doc.setTextColor(90, 100, 88);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("CALCULATION BREAKDOWN", left, y);

    const addRow = (label: string, amount: number) => {
      y += 12;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(40, 48, 42);
      doc.text(label, left, y);

      doc.setFont("helvetica", "bold");
      doc.text(`$${amount.toFixed(2)}`, right, y, {
        align: "right",
      });

      doc.setDrawColor(225, 233, 225);
      doc.line(left, y + 4, right, y + 4);
    };

    addRow(`Studio Space Hire ($${hourlyRate}/hr)`, studioHire);
    addRow("Clean-up & Production Prep Fee", PREPARATION_FEE);
    addRow("Refundable Damage Deposit", securityDeposit);

    y += 12;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(22, 29, 24);
    doc.text("Total Amount", left, y);
    doc.text(`$${totalAmount.toFixed(2)}`, right, y, {
      align: "right",
    });

    // Footer
    y += 12;

    doc.setDrawColor(225, 233, 225);
    doc.line(left, y, right, y);

    y += 12;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 110, 100);
    doc.text("Customer Email:", left, y);
    doc.text(userEmail, left + 30, y);

    y += 9;
    doc.text(
      "Thank you for booking with StudioSpace.",
      left,
      y
    );

    doc.save(`StudioSpace-${referenceNumber}.pdf`);
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-title"
        className="relative my-auto w-full max-w-[540px] rounded-[24px] bg-surface p-6 text-foreground shadow-2xl sm:p-9"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-separator pb-5">
          <div>
            <h2 className="font-label text-2xl font-extrabold tracking-tight">
              <span className="text-success">◉</span> StudioSpace
            </h2>
            <p className="mt-1 text-[9px] font-bold tracking-widest text-muted">
              ATELIER CREATIVE INVOICING
            </p>
          </div>

          <div className="text-right">
            <p className="text-[9px] font-bold tracking-wider text-muted">
              INVOICE / RECEIPT
            </p>
            <p className="font-label text-lg font-extrabold">
              #{referenceNumber}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close receipt"
            className="absolute right-3 top-3 rounded-full p-2 text-muted transition hover:bg-default sm:hidden"
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Studio and status */}
        <div className="flex items-start justify-between gap-3 py-6">
          <div className="min-w-0">
            <p className="text-[9px] font-bold tracking-wider text-muted">
              STUDIO RESERVATION
            </p>

            <h3
              id="receipt-title"
              className="mt-1 font-label text-lg font-extrabold leading-tight"
            >
              {title}
            </h3>

            <span className="mt-2 inline-block rounded-full bg-success/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-success">
              {category}
            </span>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[9px] font-bold tracking-wider text-muted">
              STATUS
            </p>

            <span className="mt-1 inline-block rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-800">
              Pending
            </span>
          </div>
        </div>

        {/* Booking details */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 rounded-2xl bg-success/10 p-4">
          <div>
            <p className="text-[9px] font-bold tracking-wide text-muted">
              DATE OF BOOKING
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold">
              <MdCalendarToday className="shrink-0 text-success" />
              {formattedDate}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-bold tracking-wide text-muted">
              RESERVED DURATION
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold">
              <MdAccessTime className="shrink-0 text-success" />
              {formatTime(startTime)} - {formatTime(endTime)} ({duration} hrs)
            </p>
          </div>

          <div>
            <p className="text-[9px] font-bold tracking-wide text-muted">
              CUSTOMER
            </p>
            <p className="mt-1 text-xs font-semibold">
              {userName}
            </p>
            <p className="mt-0.5 break-all text-[10px] text-muted">
              {userEmail}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-bold tracking-wide text-muted">
              PAYMENT METHOD
            </p>
            <p className="mt-1 text-xs font-semibold">N/A</p>
          </div>
        </div>

        {/* Calculation breakdown */}
        <div className="mt-6">
          <h4 className="mb-3 text-[9px] font-bold tracking-wider text-muted">
            CALCULATION BREAKDOWN
          </h4>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between gap-3">
              <span>Studio Space Hire (${hourlyRate}/hr)</span>
              <span className="font-semibold">
                ${studioHire.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span>Clean-up & Production Prep Fee</span>
              <span className="font-semibold text-success">
                ${PREPARATION_FEE.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span>Refundable Damage Deposit</span>
              <span className="font-semibold">
                ${securityDeposit.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between gap-3 border-t border-separator pt-3 text-base font-extrabold">
              <span>Total Amount</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-separator pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-success/10 px-6 py-2.5 text-xs font-semibold text-foreground transition hover:bg-success/20"
          >
            Close
          </button>

          <button
            type="button"
            onClick={generateReceiptPDF}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold text-accent-foreground shadow-md transition hover:brightness-95"
          >
            <MdDownload size={17} />
            Download PDF Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingReceiptModal;
