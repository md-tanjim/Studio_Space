
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IStudio } from "@/Types/rooms";
import {
  MdCheckCircle,
  MdPublish,
} from "react-icons/md";
import { useSession } from "@/lib/auth-client";
import { StudioFormData } from "@/components/studio/StudioForm";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type AddStudioFormData = Pick<
  IStudio,
  | "region"
  | "title"
  | "category"
  | "location"
  | "hourlyRate"
  | "securityDeposit"
  | "maxCapacity"
  | "description"
  | "images"
  | "amenities"
>;

// interface PublishStudioProps {
//   formData: AddStudioFormData;
// }
interface PublishStudioProps {
  formData: StudioFormData;
}
const PublishStudio = ({ formData }: PublishStudioProps) => {


    const { data: session } = useSession();

const name = session?.user.name;
const userEmail = session?.user?.email;



  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);

  const validateForm = () => {
    if (!formData.title.trim()) {
      return "Please enter your studio title.";
    }

    if (!formData.category) {
      return "Please select a studio category.";
    }

    if (!formData.region) {
      return "Please select a region.";
    }

    if (!formData.location.trim()) {
      return "Please enter your studio location.";
    }

    if (!formData.description.trim()) {
      return "Please enter your studio description.";
    }

    if (formData.hourlyRate <= 0) {
      return "Hourly rate must be greater than zero.";
    }

    if (formData.securityDeposit < 0) {
      return "Security deposit cannot be negative.";
    }

    if (
      !Number.isInteger(formData.maxCapacity) ||
      formData.maxCapacity < 1
    ) {
      return "Maximum capacity must be a positive whole number.";
    }

    if (formData.images.length === 0) {
      return "Please add at least one studio image.";
    }

    return null;
  };

  const handlePublish = async () => {
    const validationError = validateForm();

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsPublishing(true);

    try {
     const myListingData = {
  ...formData,
  host : {
    name,
    userEmail,
    verified : true,
  },
  rating: 0,
  reviews: [],  
  createdAt: new Date().toISOString(),
};


  const token = await getTokenFromClient();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-listings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(myListingData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);

        throw new Error(
          errorData?.message || "Failed to publish your studio."
        );
      }

      toast.success("Your studio has been published successfully!");

      router.replace("/my-studio-listings");
      router.refresh();
    } catch (error) {
      console.error("Studio publishing error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCancel = () => {
    router.push("/my-studio-listings");
  };

  return (
    <div className="flex flex-col justify-between gap-4 rounded-[26px] border border-separator bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:px-5">

      {/* Publishing Status */}
      <div className="flex items-center gap-3">
        <MdCheckCircle size={21} className="shrink-0 text-success" />

        <span className="text-sm font-bold text-foreground">
          Ready to Publish
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isPublishing}
          className="text-sm font-medium text-muted transition hover:text-foreground disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handlePublish}
          disabled={isPublishing}
          className="flex h-10 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-accent-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <MdPublish size={18} />

          {isPublishing ? "Publishing..." : "Publish Studio"}
        </button>
      </div>
    </div>
  );
};

export default PublishStudio;
