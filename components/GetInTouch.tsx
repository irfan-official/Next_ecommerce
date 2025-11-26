"use client";
import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";
import { fetchWithRetry } from "@/context/DataContext";
import useAxios from "@/hooks/useAxios";

function GetInTouch() {
  const axiosInstance = useAxios();

  const [email, setEmail] = useState<string>("");

  async function sendGetInTouchEmail(email: string) {
    const response = await fetchWithRetry(() => {
      axiosInstance
        .post("/api/send-emails", {
          email,
        })
        .then((res) => {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
          });
          return res;
        });
    });

    return response;
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (email.length < 5) {
      return;
    }
    try {
      sendGetInTouchEmail(email);
    } catch (error) {
      return;
    }
    e.target.reset();
    setEmail("");
  }

  function formOnChange(e: any) {
    setEmail(e.target.value);
  }

  return (
    <div className="w-full min-h-[30vh]  gap-15 flex flex-col items-center py-20 mb-0 px-5  bg-[url('https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjMxfHxwcm9kdWN0fGVufDB8fDB8fHww')] bg-cover bg-center">
      <h2 className="text-4xl md:text-5xl font-bold getInTouch_text">
        Get In Touch
      </h2>
      <form
        onSubmit={handleSubmit}
        action=""
        className="max-auto w-[97%] md:w-[80%] h-[20rem] md:h-[30rem] shadow bg-white/40 backdrop-blur-xs rounded-md flex items-center justify-center px-5"
      >
        <section className="mx-auto w-[30rem] flex flex-col gap-5">
          <input
            onChange={formOnChange}
            required
            value={email}
            name="email"
            type="email"
            placeholder="example@domain"
            className="border-2 border-stone-800 px-5 py-4 shadow rounded-lg text-[1rem] text-stone-800 font-semibold bg-white/30 backdrop-blur-3xl placeholder:text-stone-800/80 outline-0"
          />
          <button
            type="submit"
            className="font-semibold cursor-pointer px-5 py-3 rounded-md shadow bg-stone-800 text-slate-300 border border-white hover:text-orange-400"
          >
            Subscribe
          </button>
        </section>
      </form>
    </div>
  );
}

export default GetInTouch;
