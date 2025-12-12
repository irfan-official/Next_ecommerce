"use client";
import { MdCelebration } from "react-icons/md";
import RatingStars from "@/components/RatingStars";
import { useState } from "react";
import { CgCloseO } from "react-icons/cg";

export default function ShareReviews({
  setShowReview,
}: {
  setShowReview: any;
}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  function handleReviewSubmit(e: any) {
    e.preventDefault();

    if (rating === 0 || !review) {
      return;
    }
    alert(`${rating} || ${review}`);
  }

  return (
    <form
      onSubmit={handleReviewSubmit}
      className=" p-5 relative sm:w-96  border border-slate-200 rounded-xl shadow flex flex-col items-center justify-center gap-2 bg-violet-200 "
    >
      <span
        onClick={() => setShowReview((prev: Boolean) => !prev)}
        className="absolute top-2 right-2 text-2xl sm:text-3xl text-white cursor-pointer hover:text-rose-900"
      >
        <CgCloseO />
      </span>

      <span className="w-full flex flex-col items-center justify-center gap-4">
        <section className="flex items-center gap-2 mt-3 sm:mt-0">
          <span className="text-4xl text-violet-950">
            <MdCelebration />
          </span>
          <h2 className="w-full  text-center text-3xl text-violet-950 font-semibold">
            Share a Review
          </h2>
        </section>
        <RatingStars initialValue={rating} onChange={setRating} size={35} />

        {/* <p className="mt-3 text-lg">Selected rating: {rating} ⭐</p> */}
        <textarea
          name="review"
          required={true}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="make a review..."
          className=" w-full rounded-md outline-0 ring ring-violet-100 focus:ring-violet-500 bg-violet-300 p-2 text-violet-950"
          id=""
        ></textarea>
      </span>

      <button
        type="submit"
        className="bg-violet-900 py-2 rounded-md font-semibold text-white w-full hover:bg-violet-950 cursor-pointer hover:text-violet-200"
      >
        Submit
      </button>
    </form>
  );
}
