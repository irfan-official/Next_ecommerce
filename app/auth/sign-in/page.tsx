"use client";

import React, { useState, useEffect, useContext, useRef } from "react";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import swal from "sweetalert";

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  let [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [googleLoading, setGoogleLoading] = useState(false);
  const [credentialLoading, setCredentialLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let [toggle, setToggle] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      ...form,
      redirect: false,
      callbackUrl,
    });

    setCredentialLoading(false);

    if (res?.error) {
      setErrorMsg("Invalid email or password!");
      return;
    }

    await swal({ icon: "success", title: "Login successfully" });

    router.replace(callbackUrl);
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl });
    setGoogleLoading(false);
  };

  function handleFormInput(e: any) {
    if (e.target.name === "email") {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value.toLowerCase(),
      }));
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  return (
    <div className="w-full min-h-screen p-5 flex flex-col md:flex-row items-center justify-center bg-slate-100 text-black gap-5 lg:gap-10 xl:gap-30">
      <div className="relative flex flex-col justify-start w-full md:w-1/2  max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 ">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">SignIn</h1>
            <p className="mt-2 text-gray-500">
              SignIn below to access your account
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleCredentialsLogin}>
              <div className="relative mt-6">
                <input
                  onChange={handleFormInput}
                  type="email"
                  name="email"
                  id="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="new-email"
                  value={form.email}
                  required
                  placeholder="Email Address"
                  className="peer mt-1 bg-white text-black w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 "
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
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="none"
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

              <div className="__button__ mb-4  flex flex-col justify-center items-center">
                <span
                  onClick={() => {
                    router.push("/auth/reset-password");
                  }}
                  className="my-3 text-start font-semibold text-[0.9rem] py-3 cursor-pointer underline text-orange-400 hover:text-red-400 "
                >
                  Forgot Password?
                </span>
                <button
                  type="submit"
                  disabled={credentialLoading}
                  className=" cursor-pointer shadow-lg w-full rounded-md bg-black px-3 py-4 text-white hover:text-orange-400 focus:bg-gray-600 focus:outline-none flex items-center justify-center"
                >
                  {credentialLoading ? (
                    <span className="loading loading-spinner loading-lg bg-white text-white "></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <hr className="border border-slate-300 w-1/3" />
                <section className="c">OR</section>
                <hr className="border border-slate-300 w-1/3" />
              </div>

              <div className="__google-login__ my-6 mt-4">
                <button
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  className=" cursor-pointer shadow-lg w-full rounded-md  px-3 py-3 text-black border border-slate-400 focus:bg-gray-600 focus:outline-none flex items-center justify-center hover:bg-slate-200"
                >
                  {googleLoading ? (
                    <span className="loading loading-spinner loading-lg bg-black "></span>
                  ) : (
                    <section className="flex items-center justify-center gap-3">
                      <section className="c">
                        <FcGoogle size={24} />
                      </section>
                      <section className="c">Google Login</section>
                    </section>
                  )}
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Don't have an account yet?
                <Link
                  href="/auth/sign-up"
                  className="underline font-semibold text-blue-500  hover:text-blue-700 focus:text-gray-800 focus:outline-none"
                >
                  {" "}
                  SignUp
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
        <section className="w-full flex items-center justify-center mt-4 font-semibold text-rose-500">
          {errorMsg}
        </section>
      </div>
    </div>
  );
}

export default Login;

(" Already have an account?");
