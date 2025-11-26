import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
function ManageProductCard({
  _id,
  image,
  title,
  price,
}: {
  _id: string;
  image: string;
  title: string;
  price: number;
}) {
  return (
    <div className="bg-white flex flex-col items-center rounded shadow p-4   w-[280px] 2xl:w-[350px] gap-2">
      <section className="_img_ w-full h-full rounded-t-lg overflow-clip  hover:scale-105 hover:z-20 transition-transform duration-1000 relative">
        <img
          src={`${image}`}
          alt=""
          className="w-full h-48 lg:h-50 2xl:h-64 bg-contain bg-no-repeat bg-center object-center object-contain"
        />
        <span className="bg-slate-900 border border-white/20 px-3 py-2 text-white font-semibold rounded text-[0.9rem] 2xl:text-[1rem] absolute top-0">
          {price}$
        </span>
      </section>
      <section className="_gap_ my-1 lg:my-2 w-full border border-black/10"></section>
      <section className="_title_ w-full h-full font-semibold text-[0.9rem] 2xl:text-[1rem]">
        {title}
      </section>
      <section className="_price_ w-full h-full mt-2 mb-1 font-semibold flex gap-2  text-[0.9rem] 2xl:text-[1rem]">
        <button className="rounded-sm bg-lime-600 hover:bg-lime-700 w-[50%] py-2 text-lime-900 cursor-pointer hover:text-lime-400 shadow flex items-center justify-center gap-1">
          <section className=" pb-1">
            <FaRegEdit size={20} />
          </section>
          <span className="">Edit</span>
        </button>

        <button className="rounded-sm bg-red-600 hover:bg-red-700 hover:text-red-300 w-[50%] pt-2 pb-1 text-white cursor-pointer shadow flex items-center justify-center gap-1">
          <section className=" pb-1">
            <RiDeleteBin5Line size={22} />
          </section>
          <span className="">Delete</span>
        </button>
      </section>
      <section className="_button_ w-full h-full text-[0.9rem] 2xl:text-[1rem]">
        <Link
          href={`/product-details/${_id}`}
          className="w-full py-2 rounded-sm font-semibold text-white bg-slate-600 hover:bg-slate-700 hover:text-slate-100 shadow flex items-center justify-center cursor-pointer"
        >
          View Details
        </Link>
      </section>
    </div>
  );
}

export default ManageProductCard;
