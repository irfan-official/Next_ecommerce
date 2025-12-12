"use client";
import { useState } from "react";

import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";

import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa";
import React from "react";
import { FaStar } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

import InsertComment from "./InsertComment";

import ClientReply from "@/components/ClientReply";

import productReviews2 from "@/lib/reviews&comments";
import { ReviewComment } from "@/lib/reviews&comments";

function ClintComment({
  image,
  name,
  rating,
  comment,
}: {
  image: string;
  name: string;
  rating: number;
  comment: string;
}) {
  const [clickReply, setClickReply] = useState<boolean>(false);
  const [openComments, setOpenComments] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [showLine, setShowLine] = useState(false);

  const { data: session, status } = useSession();
  const arrLength = productReviews2?.reviewComments.length;

  return (
    <div className="flex  justify-start gap-3 sm:gap-4 border-b mb-5 border-b-gray-300/70 pb-3 w-full ">
      <section className="_left_ flex flex-col justify-start items-end gap-2 ">
        <section className="__img__ __left__ w-[51px] lg:w-[53px] h-[52px] rounded-full overflow-hidden shadow border-2 border-slate-400 shrink-0">
          <img
            className="w-full h-full object-center bg-center"
            src={image}
            alt=""
          />
        </section>
        <section className="_bottom_ _line_ _section_ w-full h-full flex flex-col items-end ">
          {showLine && (
            <section className=" border-l-2  border-b-2 border-gray-400/60 rounded-bl-2xl h-24 w-[50%]"></section>
          )}
        </section>
      </section>
      <section className="__details__ __right__ flex flex-col  w-full ">
        <section className="__top__ gap-7 flex items-center justify-start mt-3 ">
          <section className="__name__ font-semibold">{name}</section>
          <section className="__stars__ text-yellow-400 flex items-center gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </section>
        </section>
        <section className="__comment__ w-full py-3 pb-3">{comment}</section>

        <section className="__bottom__ w-full flex items-center justify-start gap-3 ">
          <section className="_Like_ flex gap-1 items-center justify-start">
            <span className="_Like-icon_ cursor-pointer">
              <BiLike size={22} />
            </span>
            <span className="_Like-count_">12</span>
          </section>

          <section
            onClick={() => setShowReply((prev) => !prev)}
            className="_Dis-Like_ flex gap-1 items-center justify-start"
          >
            <span className="__Dis-Like-icon_ cursor-pointer">
              <BiDislike size={22} />
            </span>
          </section>

          <section
            onClick={() => {
              setClickReply((prev) => !prev);
              setShowLine((prev) => !prev);
            }}
            className="_Reply_ ml-2 px-5 py-1 bg-blue-200/65 rounded-full cursor-pointer hover:bg-blue-200"
          >
            Reply
          </section>

          <section className="flex gap-2 items-center justify-center">
            <span className="font-semibold">12</span>
            <span className="text-slate-400">
              <FaCommentDots size={24} />
            </span>
            <span
              onClick={() => {
                setShowReply((prev) => !prev);
                setOpenComments((prev) => !prev);
              }}
              className={`text-blue-950 cursor-pointer transform transition-transform duration-300 ease-in-out
                ${openComments ? "rotate-180" : "rotate-0"}
              `}
            >
              <IoIosArrowDropdownCircle size={27} />
            </span>
          </section>
        </section>
        {clickReply && session?.user?.image && (
          <InsertComment
            clickReply={clickReply}
            setClickReply={setClickReply}
            setShowLine={setShowLine}
          />
        )}
        {showReply && (
          <section className="w-full flex flex-col items-start justify-start mt-5">
            {productReviews2.reviewComments.map(
              (item: ReviewComment, index) => (
                <ClientReply
                  key={`${item.name}dkdkmdlkmkmk`}
                  arrLength={arrLength}
                  index={index}
                  image={item.image}
                  name={item.name}
                  rating={item.rating}
                  comment={item.comment}
                />
              )
            )}
          </section>
        )}
      </section>
    </div>
  );
}

export default ClintComment;
