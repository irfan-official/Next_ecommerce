"use client";

import React, { useState, useEffect } from "react";

import { BsFillChatRightTextFill } from "react-icons/bs";
import ClientComment from "@/components/ClintComment";
import RatingShows from "@/components/RatingShows";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import ShareReviews from "@/components/ShareReviews";
import { Rating, ReviewComment, ProductReviews } from "@/lib/reviews&comments";
import productReviews from "@/lib/reviews&comments";

function ServicesDetails() {
  const { id } = useParams();

  const {
    allProductsData,
    AllProductsDataFetchingWithLoader,
    fetchProductLoader,
  } = useData();

  const [order, setOrder] = useState(false);
  const [exceedID, setExceedID] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [checkService, setCheckService] = useState<any>(null);
  const [sortedRatings, setSortedRatings] = useState<Rating[]>([]);

  useEffect(() => {
    if (fetchProductLoader) {
      return;
    }
    if (allProductsData.length < 1) {
      AllProductsDataFetchingWithLoader();
    }

    const foundProduct = allProductsData.find(
      (obj: any) => String(obj._id) === String(id)
    );

    if (!foundProduct) {
      setExceedID(true);
      return;
    }

    setCheckService(foundProduct);

    const ratings = [...productReviews.ratings];

    const sorted = ratings.sort((a, b) => {
      const getNum = (str: string) => parseInt(str.split(" ")[0]);
      return getNum(b.name) - getNum(a.name);
    });

    setSortedRatings(sorted);
  }, [fetchProductLoader, id, allProductsData.length]);

  if (fetchProductLoader) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center text-6xl font-bold">
        <span className="loading loading-spinner loading-xl scale-200"></span>
      </div>
    );
  }

  if (exceedID) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center text-6xl font-bold">
        Not Found!
      </div>
    );
  }

  return (
    <div className="w-full relative min-h-screen flex flex-col items-center gap-2 text-black px-6 sm:px-20 py-20">
      {showReview && (
        <div className="w-full fixed top-0 left-0 z-[9999] min-h-screen bg-slate-200/50 flex items-center justify-center">
          <ShareReviews setShowReview={setShowReview}/>
        </div>
      )}
      {/* Top Section */}
      <section className="_top_ w-full flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-b-gray-600/40 py-6 gap-10 lg:gap-8">
        <span className="_left_ _image_ w-full xl:w-[45%] rounded-xl overflow-hidden  inline-block">
          <img
            className="w-full h-[20rem] lg:h-[35rem] object-contain object-center"
            src={checkService?.image}
            alt=""
          />
        </span>

        <section className="_right_ _details_ w-full lg:w-[55%] flex flex-col items-start justify-center gap-5">
          <section className="_title_ text-3xl lg:text-5xl ">
            {checkService?.title}
          </section>
          <section className="_category_ px-5 py-3 rounded-full font-semibold bg-stone-400/10 text-stone-500">
            {checkService?.category}
          </section>
          <section className="_price_ text-red-400 font-semibold px-5">
            $ {checkService?.price}
          </section>
          <section className="text-xl mt-3 pl-5">
            {checkService?.description}
          </section>
          <section className="_button_ pl-5 mt-2">
            <button
              onClick={() => setShowReview((prev) => !prev)}
              className="px-5 py-3 rounded-sm bg-[#8E51FF] hover:bg-[#7328ff] font-semibold shadow-md text-[#ffffff]  hover:text-[#dbcaff] cursor-pointer "
            >
              Order Now
            </button>
          </section>
        </section>
      </section>

      {/* Ratings Section */}
      <section className="_Ratings_ w-full mt-10">
        <div className="w-full h-[400px] bg-transparent p-5 rounded-xl ">
          <h2 className="text-4xl font-bold mb-4">Ratings</h2>
          <RatingShows sortedRatings={sortedRatings} />
        </div>
      </section>

      {/* Reviews */}
      <section className="_Reviews_ w-full flex flex-col items-start justify-start gap-7 mt-20">
        <section className="flex gap-4 items-end mb-2">
          <h2 className="font-bold text-4xl">Reviews</h2>
          <span className="text-3xl">
            <BsFillChatRightTextFill />
          </span>
        </section>

        <hr className="w-full border-b-2" />

        {/* Comments Loop */}
        <section className="w-full flex flex-col items-start justify-start gap-4 ">
          {productReviews.reviewComments.map((item: ReviewComment) => (
            <ClientComment
              key={item.name}
              image={item.image}
              name={item.name}
              rating={item.rating}
              comment={item.comment}
            />
          ))}
        </section>
      </section>
    </div>
  );
}

export default ServicesDetails;
