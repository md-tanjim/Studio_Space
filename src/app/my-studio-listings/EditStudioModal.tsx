
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MdClose, MdSave } from "react-icons/md";
import { IStudio } from "@/Types/rooms";
import StudioForm, { StudioFormData } from "@/components/studio/StudioForm";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface EditStudioModalProps {
  studio: IStudio;
  onClose: () => void;
}

const EditStudioModal = ({ studio, onClose }: EditStudioModalProps) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<StudioFormData>({
    title: studio.title || "",
    category: studio.category || "",
    region: studio.region || "",
    location: studio.location || "",
    description: studio.description || "",
    hourlyRate: studio.hourlyRate || 0,
    securityDeposit: studio.securityDeposit || 0,
    maxCapacity: studio.maxCapacity || 1,
    images: studio.images || [],
    amenities: studio.amenities || [],
  });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSaving) onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose, isSaving]);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter your studio title.");
      return;
    }

    if (!formData.category || !formData.region) {
      toast.error("Please select a category and region.");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Please enter your studio location.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter your studio description.");
      return;
    }

    if (formData.hourlyRate <= 0) {
      toast.error("Hourly rate must be greater than zero.");
      return;
    }

    if (formData.securityDeposit < 0) {
      toast.error("Security deposit cannot be negative.");
      return;
    }

    if (!Number.isInteger(formData.maxCapacity) || formData.maxCapacity < 1) {
      toast.error("Maximum capacity must be a positive whole number.");
      return;
    }

    if (formData.images.length === 0) {
      toast.error("Please add at least one studio image.");
      return;
    }

    const updatedData: StudioFormData = {
      ...formData,
    };

    setIsSaving(true);

    const token = await getTokenFromClient();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${studio._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || "Failed to update studio.");
      }

      toast.success("Studio updated successfully!");
      onClose();
      router.refresh();
    } catch (error) {
      console.error("Studio update error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) onClose();
      }}
    >
      <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-separator bg-background shadow-2xl">
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-separator bg-surface px-5 py-4 sm:px-7">
          <div>
            <h2 className="font-label text-xl font-bold text-foreground">
              Edit Studio
            </h2>
            <p className="mt-1 text-xs text-muted">
              Update the information and details of your studio.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="flex size-9 items-center justify-center rounded-full border border-separator text-muted transition hover:bg-default hover:text-foreground disabled:opacity-50"
            aria-label="Close edit modal"
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <StudioForm
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        {/* Modal Footer */}
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-separator bg-surface px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-xl border border-separator px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-default disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 rounded-xl bg-success px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <MdSave size={18} />
            {isSaving ? "Saving Changes..." : "Save Edits"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudioModal;
