"use client";
import { BsCurrencyDollar } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { BiSolidCommentAdd } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import useAxios from "@/hooks/useAxios";
import { useData } from "@/context/DataContext";
import { MdLibraryAdd } from "react-icons/md";
import { useSession, signIn } from "next-auth/react";

// import useAxiosSecure from "../hooks/useAxiosSecure";
import swal from "sweetalert";
import { fetchWithRetry } from "@/context/DataContext";

function page() {
  let [form, setForm] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // redirects to login page automatically
    }
  }, [status]);

  const [addReviewsLoader, setAddReviewsLoader] = useState(false);

  const { fetchProductLoader, setAddProductsStatus } = useData();

  const AxiosSecureInstance = useAxios();

  async function handleSubmit(e: any) {
    e.preventDefault();
    e.stopPropagation();

    if (
      !form.title.trim() ||
      !form.image.trim() ||
      !form.category.trim() ||
      !form.description.trim()
    ) {
      return swal("All fields are required");
    }

    if (form.description.length < 5) {
      return swal("reviewText must be at least 47 characters");
    }

    try {
      setAddReviewsLoader(true);

      const response = await fetchWithRetry(() =>
        AxiosSecureInstance.post("/api/create-product", {
          // name: user.name,
          // email: user.email,
          ...form,
        })
      );

      if (response.data.success) {
        swal({ icon: "success", title: "Product added successfully!" });

        setAddProductsStatus((prev) => !prev);

        // reset form after submit
        setForm({
          title: "",
          price: 0,
          description: "",
          category: "",
          image: "",
        });
      }
    } catch (error) {
      console.error(error);
      swal({ icon: "error", title: "Failed to add review!" });
    }

    setAddReviewsLoader(false);
  }

  function handleFormInput(e: any) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  if (status === "loading") {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center text-6xl font-bold">
        <span className="loading loading-spinner loading-xl scale-200"></span>
      </div>
    );
  }

  if (!session) return null; // user will be redirected

  return (
    <div className="w-full min-h-[65vh] lg:min-h-[90vh] text-black px-2 lg:px-6 sm:px-10 md:px-20 flex flex-col gap-7 sm:gap-10 items-center justify-start">
      <section className="flex items-center justify-center gap-3 sm:gap-3 mt-12">
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-[#392F5A] inline-block">
          Add Product
        </h1>
        <section className="_logo_ text-[#632EE3] flex">
          <MdLibraryAdd size={44} />
        </section>
      </section>
      <section className="w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-3 lg:p-8 rounded-md w-[95%] lg:w-[70%]  flex flex-col items-center justify-start gap-4 lg:gap-6 shadow"
        >
          <section className="_top_ w-full flex justify-between">
            <div className="_left_ w-[45%] flex flex-col items-start justify-center gap-2 lg:gap-4 ">
              <div className="_image_ rounded-lg overflow-hidden w-full h-[21vh] lg:h-[20vw] bg-gray-600/20 border border-white bg-center shadow bg-cover">
                {form?.image && (
                  <img
                    src={form.image}
                    className="w-full h-full  bg-no-repeat bg-center object-center object-contain"
                  />
                )}
              </div>
            </div>
            <div className="_right_ w-[53%] pt-1  rounded flex flex-col justify-between gap-2 ">
              <section className="_top_ w-full h-[53%] lg:h-[33%] flex flex-col justify-between gap-2 mt-1 ">
                <section className="__food_Name__ relative mt-0 text-[0.8rem] lg:text-[0.9rem]">
                  <input
                    onChange={handleFormInput}
                    type="text"
                    name="title"
                    id="title"
                    value={form.title}
                    required
                    placeholder="Title"
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="title"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Title
                  </label>
                </section>

                <section className="_category-location_ w-full flex flex-col lg:flex-row items-start lg:justify-start text-[0.8rem] lg:text-[0.9rem] gap-3">
                  <section className="_location_ border flex items-center gap-1 w-full lg:w-[70%] h-full  rounded border-black/10 shadow px-2 py-2">
                    <input
                      onChange={handleFormInput}
                      type="text"
                      name="category"
                      id="category"
                      value={form.category}
                      required
                      placeholder="Category"
                      className="w-full h-full px-1 outline-0"
                      autoComplete="off"
                    />
                  </section>

                  <section className="_location_ border flex items-center gap-1 w-full lg:w-[70%] h-full  rounded border-black/10 shadow">
                    <span className="text-xl px-1 py-1">
                      <BsCurrencyDollar />
                    </span>
                    <input
                      onChange={handleFormInput}
                      type="number"
                      name="price"
                      id="price"
                      value={form.price}
                      required
                      placeholder="Price"
                      className="w-full h-full px-1 outline-0 "
                      autoComplete="off"
                    />
                  </section>
                </section>
              </section>

              <section className="_bottom_ w-full h-[50%] lg:h-[57%] flex flex-col justify-end  gap-2 ">
                <span className="__img-URL__ w-full h-[80%] lg:h-[95%] relative  justify-center flex items-center gap-3 md:gap-5 text-[0.8rem] lg:text-[0.9rem] outline-0">
                  <textarea
                    onChange={handleFormInput}
                    value={form.image}
                    name="image"
                    id="image"
                    placeholder="image"
                    required
                    className="peer mt-1 w-full border rounded  px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none h-full border-black/10 shadow outline-0"
                  ></textarea>
                  <label
                    htmlFor="image"
                    className="pointer-events-none absolute -top-1 left-2 origin-left -translate-y-1/2 transform text-[0.7rem] text-gray-800 opacity-80 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 "
                  >
                    image url
                  </label>
                </span>
              </section>
            </div>
          </section>
          <section className="_body-text_ w-full">
            <textarea
              name="description"
              onChange={handleFormInput}
              value={form.description}
              className="w-full border border-black/10 shadow rounded p-2 text-[0.9rem] lg:text-[1rem] h-20 lg:h-24"
              id="description"
              placeholder="Description"
            ></textarea>
          </section>
          <section className="__post-button__ w-full ">
            <button
              type="submit"
              disabled={addReviewsLoader}
              className="w-full flex items-center cursor-pointer justify-center border py-3 rounded-md bg-violet-600 text-white hover:bg-violet-700 font-semibold hover:text-violet-300"
            >
              {addReviewsLoader ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                "Create Product"
              )}
            </button>
          </section>
        </form>
      </section>
    </div>
  );
}

export default page;
