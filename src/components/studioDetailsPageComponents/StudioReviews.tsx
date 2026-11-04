
import Image from "next/image";
import {
  MdStar,
  MdArrowForward,
} from "react-icons/md";

interface StudioReview {
  reviewerName: string;
  reviewerPhoto?: string;
  rating: number;
  date: string;
  comment: string;
}

interface StudioReviewsProps {
  reviews: StudioReview[];
  rating: number;
  totalReviews: number;
}

const StudioReviews = ({reviews,rating,totalReviews}: StudioReviewsProps) => {

  const visibleReviews = reviews.slice(0, 3);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="rounded-2xl border border-separator bg-surface p-5 sm:p-7">
   
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-label text-xl font-bold">
            Guest Reviews
          </h2>

          <p className="mt-1 text-sm text-muted">
            Feedback from people who have used this studio.
          </p>
        </div>

        {totalReviews > 0 && (
          <div className="flex items-center gap-2 rounded-xl bg-success/10 px-4 py-2">
            <MdStar size={22} className="text-success" />
            <div>
              <p className="text-lg font-bold leading-tight">
                {rating.toFixed(1)}
              </p>
              <p className="text-[10px] text-muted">
                {totalReviews} reviews
              </p>
            </div>
          </div>
        )}
      </div>

    
      {reviews.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-separator bg-default/50 px-4 py-10 text-center">
          <MdStar size={30} className="mx-auto text-muted" />
          <h3 className="mt-3 font-label font-bold">
            No reviews yet
          </h3>
          <p className="mt-1 text-sm text-muted">
            Be the first to share your experience with this studio.
          </p>
        </div>
      ) : (
        <>
         
          <div className="mt-6 divide-y divide-separator">
            {visibleReviews.map((review, index) => (
              <article
                key={`${review.reviewerName}-${index}`}
                className="py-5 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                 
                  <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-success/10 text-success">
                   <span className="font-bold">
                        {review.reviewerName?.charAt(0).toUpperCase() || "?"}
                      </span>
                  </div>

                  {/* Reviewer Information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-bold">
                        {review.reviewerName}
                      </h3>

                      <span className="text-xs text-muted">
                        {formatDate(review.date)}
                      </span>
                    </div>

                  
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <MdStar
                          key={starIndex}
                          size={15}
                          className={
                            starIndex < Math.round(review.rating)
                              ? "text-success"
                              : "text-muted/30"
                          }
                        />
                      ))}

                      <span className="ml-1 text-xs font-semibold">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>

                  
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

         
          {reviews.length > 3 && (
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-success/10 px-5 py-2.5 text-sm font-bold text-success transition hover:bg-success/20"
            >
              See All Reviews ({totalReviews})
              <MdArrowForward size={17} />
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default StudioReviews;
