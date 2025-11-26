import React from "react";
import { FaStar } from "react-icons/fa";
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
  return (
    <div className="flex  justify-start gap-6 border-b border-b-gray-300/70 w-full">
      <section className="__img__ __left__ w-[60px] lg:w-[53px] h-[52px] rounded-full overflow-hidden shadow border-2 border-slate-400">
        <img
          className="w-full h-full object-center bg-center"
          src={image}
          alt=""
        />
      </section>
      <section className="__details__ __right__ flex flex-col  w-full">
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
        <section className="__bottom__ w-full py-3 pb-5">{comment}</section>
      </section>
    </div>
  );
}

export default ClintComment;
