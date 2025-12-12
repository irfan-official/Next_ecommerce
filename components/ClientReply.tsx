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

function ClintReply({
  index,
  arrLength,
  image,
  name,
  rating,
  comment,
}: {
  index: number;
  arrLength: number;
  image: string;
  name: string;
  rating: number;
  comment: string;
}) {
  const [clickReply, setClickReply] = useState<boolean>(false);
  const [openComments, setOpenComments] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div
      className={`flex  justify-start gap-3 sm:gap-4  mb-3 ${index + 1 != arrLength && "border-b border-b-gray-300/70 pb-3"} w-full `}
    >
      <section className="_left_ flex flex-col justify-start items-end gap-2 pb-1">
        <section className="__img__ __left__ rounded-full overflow-hidden shadow border-2 border-slate-400 shrink-0">
          <img
            className=" w-[47px] md:w-[40px] h-[38px] object-center bg-center shrink-0"
            src={image}
            alt=""
          />
        </section>
      </section>
      <section className="__details__ __right__ flex flex-col  w-full ">
        <section className="__top__ gap-7 flex items-center justify-start mt-3 ">
          <section className="__name__ font-semibold">{name}</section>
          <section className="__stars__ text-slate-600 flex items-center gap-1 text-sm">
            12/12/2024
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

          <section className="_Dis-Like_ flex gap-1 items-center justify-start">
            <span className="__Dis-Like-icon_ cursor-pointer">
              <BiDislike size={22} />
            </span>
          </section>
        </section>
      </section>
    </div>
  );
}

export default ClintReply;
