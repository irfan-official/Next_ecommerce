"use client";
import ManageProductCard from "@/components/ManageProductCard";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useData } from "@/context/DataContext";
import { TbApps } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { MdReviews } from "react-icons/md";
import { Product } from "@/models/product.model";
import useAxios from "@/hooks/useAxios";
import { AiOutlineProduct } from "react-icons/ai";
import { useSession, signIn } from "next-auth/react";
import { MdProductionQuantityLimits } from "react-icons/md";

function page() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // redirects to login page automatically
    }
  }, [status]);
  const { fetchProductLoader, allProductsData } = useData();
  const [searchProducts, setSearchProducts] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [MyProducts, setMyProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   MyProductsProducts.filter(({user}) => )
  // }, [])

  useEffect(() => {
    if (session?.user?.email && allProductsData.length >= 1) {
      const products = allProductsData.filter(
        (product) => String(product.user) === String(session?.user?.id)
      );

      console.log("products ====> ", products);
      setMyProducts(products);
    }
  }, [session?.user?.email, allProductsData.length, fetchProductLoader]);

  const axiosInstance = useAxios();

  useEffect(() => {
    // if input empty → clear filtered data
    if (!searchProducts.trim()) {
      setFilteredProducts([]);
      return;
    }

    setSearchLoading(true);

    try {
      // Escape regex special chars for safety
      const escaped = searchProducts.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i"); // case-insensitive

      const matched: Product[] | [] = MyProducts.filter(
        (item) => regex.test(item.category) || regex.test(item.title)
      );

      setFilteredProducts(matched);
    } catch (err: any | { message: string }) {
      console.error("Invalid regex:", err.message);
    } finally {
      setSearchLoading(false);
    }
  }, [searchProducts, allProductsData.length]);

  if (status === "loading") {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center text-6xl font-bold">
        <span className="loading loading-spinner loading-xl scale-200"></span>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (fetchProductLoader) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center text-6xl font-bold">
        <span className="loading loading-spinner loading-xl scale-200"></span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[90vh] text-black px-6 sm:px-10 md:px-20 flex flex-col gap-7 sm:gap-10">
      <section className="_title_&_info_ flex flex-col gap-20 sm:gap-30">
        <section className="_title_ flex flex-col items-center justify-center gap-7 sm:gap-4">
          <section className="flex items-center justify-center gap-3 sm:gap-3 mt-12">
            <h1 className="text-center text-3xl sm:text-4xl font-bold text-[#392F5A] inline-block">
              Manage Products
            </h1>
            <section className="_logo_ text-[#632EE3] flex">
              <AiOutlineProduct size={44} />
            </section>
          </section>
        </section>
        <section
          className="_modifier_ w-full flex items-center justify-between
          "
        >
          <h2 className="_apps-label_ text-[#632EE3] font-semibold flex items-center gap-2 text-[0.9rem] sm:text-[1rem]">
            <span className="px-4 py-2 bg-white rounded-md shadow font-extrabold">
              {searchProducts ? filteredProducts.length : MyProducts.length}
            </span>
            <span className=" underline"> Products Found</span>
          </h2>

          <span className="_search_ border w-40 sm:w-60 border-[#632EE3] py-2 px-3 flex justify-between items-center gap-2 rounded-md">
            <span
              onClick={() => {
                if (searchProducts) {
                  alert("Searching ...");
                }
              }}
              className="text-gray-500 cursor-pointer"
            >
              <IoSearch />
            </span>
            <input
              onChange={(e) => {
                setSearchProducts(e.target.value);
              }}
              type="text"
              value={searchProducts}
              className=" rounded-md outline-0 text-[0.9rem] sm:text-[1rem] w-[70%]"
              placeholder="Search Reviews..."
            />
            <span
              onClick={() => {
                setSearchProducts("");
              }}
              className="cursor-pointer"
            >
              {searchProducts && <RxCross2 />}
            </span>
          </span>
        </section>
      </section>

      {MyProducts.length >= 1 ? (
        <section
          className="_Apps-Card_ 
          w-full min-h-[40vh] 
          grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 
          gap-10  xl:gap-5 xl:gap-y-20 2xl:gap-10 md:gap-15 sm:gap-4 
          pb-20 px-10 md:px-0 pt-10 sm:pt-5 
          
          place-items-center
"
        >
          {searchProducts ? (
            searchLoading ? (
              <div className="col-span-full flex items-center justify-center">
                <span className="loading loading-spinner loading-xl text-[#632EE3]"></span>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map(({ _id, title, image, price }, index) => (
                <ManageProductCard
                  key={String(_id)}
                  _id={String(_id)}
                  title={title}
                  image={image}
                  price={price}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500 font-semibold">
                Sorry no reviews found!
              </p>
            )
          ) : (
            MyProducts.map(({ _id, title, image, price }, index) => (
              <ManageProductCard
                key={String(_id)}
                _id={String(_id)}
                title={title}
                image={image}
                price={price}
              />
            ))
          )}
        </section>
      ) : (
        <div className="w-full  min-h-[40vh]  flex items-center justify-center text-xl md:text-4xl  lg:text-6xl gap-3 mb-10 lg:mb-0">
          <span className="  text-red-600">
            <MdProductionQuantityLimits />
          </span>
          <span className="text-red-600 text-center ">No Product found</span>
        </div>
      )}
    </div>
  );
}

export default page;
