"use client";

import React, { useState, useEffect, useContext, useRef } from "react";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { toast, Bounce } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchWithRetry } from "@/context/DataContext";
import useAxios from "@/hooks/useAxios";
import Link from "next/link";
import swal from "sweetalert";

function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const axiosInstance = useAxios();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [credentialLoading, setCredentialLoading] = useState(false);
  const [error, setError] = useState("");

  let [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  let [toggle, setToggle] = useState(false);

  const [passValidator, setPassValidator] = useState({
    passwordFildInteraction: false,
    hasUppercase: false,
    hasLowercase: false,
    isValidLength: false,
  });

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      setError("");
      let {
        passwordFildInteraction,
        hasUppercase,
        hasLowercase,
        isValidLength,
      } = passValidator;

      if (!passwordFildInteraction) {
        toast.error("Please compete the form", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
        return;
      }

      if (!hasUppercase || !hasLowercase || !isValidLength) {
        toast.error("Check the password field conditions", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
        return;
      }

      setCredentialLoading(true);

      const res = await fetchWithRetry(() =>
        axiosInstance.post(
          "/api/auth/sign-up",
          {
            ...form,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
      );

      if (!res.data?.success) {
        setError(res?.data?.message || "Signup failed");
        swal({ icon: "error", title: res?.data?.message });
      } else {
        const newRes = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
          callbackUrl,
        });

        if (newRes?.error) {
          alert(newRes.error);
          return;
        }

        await swal({ icon: "success", title: res?.data?.message });

        router.replace(callbackUrl);
        router.refresh();
      }
    } catch (error: any | { message: string }) {
      console.log("error => ", error);
      swal({ icon: "error", title: error.response.data.message });
    } finally {
      setCredentialLoading(false);
    }
  }

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    signIn("google", { callbackUrl });
    setGoogleLoading(false);
  };

  function handleFormInput(e: any) {
    if (e.target.name === "email") {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.toLowerCase(),
      }));
    } else if (e.target.name === "password") {
      const hasUppercase = /[A-Z]/;
      const hasLowercase = /[a-z]/;
      const isValidLength = /^.{6,}$/;

      // // testing --->
      // hasUppercase.test(e.target.value);
      // hasLowercase.test(e.target.value);
      // isValidLength.test(e.target.value);

      // set the result --->
      setPassValidator((prev) => ({
        ...prev,
        passwordFildInteraction: true,
        hasUppercase: hasUppercase.test(e.target.value),
        hasLowercase: hasLowercase.test(e.target.value),
        isValidLength: isValidLength.test(e.target.value),
      }));
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  return (
    <div className="w-full min-h-screen p-5 flex flex-col md:flex-row items-center justify-center bg-slate-100 text-black gap-5 lg:gap-10 xl:gap-30">
      <div className="relative flex flex-col justify-start md:w-1/2 w-full  max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 ">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">SignUp</h1>
            <p className="mt-2 text-gray-500">SignUp to create your account</p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="__name__ relative mt-6">
                <input
                  onChange={handleFormInput}
                  type="text"
                  name="username"
                  id="username"
                  value={form.username}
                  required
                  placeholder="username"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="off"
                />
                <label
                  htmlFor="username"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Name
                </label>
              </div>

              <div className="__email__ relative mt-6">
                <input
                  onChange={handleFormInput}
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  required
                  placeholder="Email Address"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="off"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Email Address
                </label>
              </div>

              <div className="__password__ relative mt-6">
                <input
                  onChange={handleFormInput}
                  type={toggle ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  value={form.password}
                  placeholder="Password"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Password
                </label>
                <span className="absolute top-0 right-0 h-full  ">
                  <span
                    onClick={() => {
                      setToggle((prev) => !prev);
                    }}
                    className="h-full flex items-center cursor-pointer"
                  >
                    {toggle ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </span>
              </div>

              <div className="__photo-URL__ relative mt-6">
                <input
                  onChange={handleFormInput}
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  value={form.imageUrl}
                  required
                  placeholder="Image URL"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="off"
                />
                <label
                  htmlFor="imageUrl"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Image-Url
                </label>
              </div>

              <div className="__button__ my-6">
                <button
                  type="submit"
                  disabled={credentialLoading}
                  className=" cursor-pointer shadow-lg w-full rounded-md bg-black hover:text-orange-400 px-3 py-4 text-white focus:bg-gray-600 focus:outline-none flex items-center justify-center"
                >
                  {credentialLoading ? (
                    <span className="loading loading-spinner loading-lg bg-white text-white"></span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <hr className="border border-slate-300/50 w-1/3" />
                <section className="c">OR</section>
                <hr className="border border-slate-300/50 w-1/3" />
              </div>

              <div className="__google-register__ my-6">
                <button
                  onClick={handleGoogleLogin}
                  type="submit"
                  disabled={googleLoading}
                  className=" cursor-pointer shadow-lg w-full rounded-md  px-3 py-3 text-black border border-slate-400 focus:bg-gray-600 focus:outline-none flex items-center justify-center hover:bg-slate-200"
                >
                  {googleLoading ? (
                    <span className="loading loading-spinner loading-lg bg-black"></span>
                  ) : (
                    <section className="flex items-center justify-center gap-3">
                      <section className="c">
                        <FcGoogle size={24} />
                      </section>
                      <section className="c">Google SignUp</section>
                    </section>
                  )}
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Already have an account?
                <Link
                  href="/auth/sign-in"
                  className="underline font-semibold text-blue-500 hover:text-blue-900 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  {" "}
                  SignIn
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className=" border p-5 rounded-lg  flex flex-col justify-center gap-2 text-[0.9rem] sm:text-[1rem]">
        <h2 className="text-center text-2xl font-semibold mb-5">
          Passsword Validation
        </h2>
        <section
          className={`flex items-center justify-start gap-3 ${
            passValidator.passwordFildInteraction &&
            (passValidator.hasUppercase ? "text-lime-500" : "text-red-500")
          }`}
        >
          <span className="c">
            {passValidator.hasUppercase ? (
              <IoMdCheckmarkCircleOutline size={20} />
            ) : passValidator.passwordFildInteraction ? (
              <RxCross2 />
            ) : (
              <IoMdCheckmarkCircleOutline size={20} />
            )}
          </span>
          <span className="c">
            Must have an Uppercase letter in the password
          </span>
        </section>
        <section
          className={`flex items-center justify-start gap-3 ${
            passValidator.passwordFildInteraction &&
            (passValidator.hasLowercase ? "text-lime-500" : "text-red-500")
          }`}
        >
          <span>
            {passValidator.hasLowercase ? (
              <IoMdCheckmarkCircleOutline size={20} />
            ) : passValidator.passwordFildInteraction ? (
              <RxCross2 />
            ) : (
              <IoMdCheckmarkCircleOutline size={20} />
            )}
          </span>
          <span className="c">
            Must have a Lowercase letter in the password
          </span>
        </section>
        <section
          className={`flex items-center justify-start gap-3  ${
            passValidator.passwordFildInteraction &&
            (passValidator.isValidLength ? "text-lime-500" : "text-red-500")
          }`}
        >
          <span className="c">
            {passValidator.isValidLength ? (
              <IoMdCheckmarkCircleOutline size={20} />
            ) : passValidator.passwordFildInteraction ? (
              <RxCross2 />
            ) : (
              <IoMdCheckmarkCircleOutline size={20} />
            )}
          </span>
          <span className="c">Length must be at least 6 character</span>
        </section>
      </div>
    </div>
  );
}

export default Register;
