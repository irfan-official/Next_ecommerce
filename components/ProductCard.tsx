import React from "react";
import Link from "next/link";
function ProductCard({
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
      <section className="_img_ w-full h-full rounded-t-lg overflow-clip  hover:scale-105 hover:z-20 transition-transform duration-1000">
        <img
          src={`${image}`}
          alt=""
          className="w-full h-48 lg:h-50 2xl:h-64 bg-contain bg-no-repeat bg-center object-center object-contain"
        />
      </section>
      <section className="_gap_ my-1 lg:my-2 w-full border border-black/10"></section>
      <section className="_title_ w-full h-full font-semibold text-[0.9rem] 2xl:text-[1rem]">
        {title}
      </section>
      <section className="_price_ w-full h-full mt-2 mb-1 font-semibold">
        <span className="bg-slate-700/15 px-5 py-2 rounded text-[0.9rem] 2xl:text-[1rem]">
          {price}$
        </span>
      </section>
      <section className="_button_ w-full h-full text-[0.9rem] 2xl:text-[1rem]">
        <Link
          href={`/product-details/${_id}`}
          className="w-full py-2 rounded-md font-semibold text-white bg-slate-600 hover:bg-slate-700 hover:text-slate-100 shadow flex items-center justify-center cursor-pointer"
        >
          View Details
        </Link>
      </section>
    </div>
  );
}

export default ProductCard;
