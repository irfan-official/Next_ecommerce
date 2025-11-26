import React from "react";
import ProductCard from "./ProductCard";
import { useData } from "@/context/DataContext";
function LimitedProductCardShows() {
  const { limitedProductsData, fetchProductLoader } = useData();
  if (fetchProductLoader) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full   px-10 md:px-10 lg:px-20 xl:px-70 flex flex-col justify-start items-center gap-1 lg:gap-10">
      <section className="_heading_ text-4xl md:text-5xl font-bold">
        <h2 className="trending_text">Trending</h2>
      </section>
      <section className="w-full min-h-[40vh]  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10 xl:gap-5 2xl:gap-10 md:gap-15 justify-center items-center content-center mb-10 mt-12  place-items-center">
        {limitedProductsData.map(
          ({
            _id,
            image,
            title,
            price,
          }: {
            _id: any;
            image: string;
            title: string;
            price: number;
          }) => {
            return (
              <ProductCard
                key={String(_id)}
                _id={String(_id)}
                image={image}
                title={title}
                price={price}
              />
            );
          }
        )}
      </section>
    </div>
  );
}

export default LimitedProductCardShows;
