"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";
import { LuMail } from "react-icons/lu";
import { useSession } from "next-auth/react";
import AuthCode from "react-auth-code-input";
import { fetchWithRetry } from "@/context/DataContext";
import useAxios from "@/hooks/useAxios";
import swal from "sweetalert";

function page() {
  const router = useRouter();

  const axiosInstance = useAxios();
  const { data: session, status, update } = useSession();
  const [notVerifiedEmail, setNotVerifiedEmail] = useState("");

  const [emailPassResetMessage, setEmailPassResetMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [otpSentLoading, setOtpSentLoading] = useState(false);
  const [sendMatchOTP, setSendMatchOTP] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      setNotVerifiedEmail(session?.user.email);
    }
  }, [session?.user?.email]);

  const [code, setCode] = useState<string>("");

  const handleOnChange = (res: string) => {
    setCode(res);
  };

  async function sendOTPEmail(e: any) {
    e.preventDefault();

    setOtpSentLoading(true);
    const checkSender = await fetchWithRetry(() =>
      axiosInstance.post("/api/send-code", {
        email: notVerifiedEmail || session?.user?.email,
      })
    );
    if (checkSender.data.success) {
      setOtpSent(true);
    } else {
      swal({ icon: "error", title: checkSender?.data?.message });
    }
    setOtpSentLoading(false);
  }

  async function sendMatchCode(e: any) {
    e.preventDefault();

    setSendMatchOTP(true);

    const checkMatchCode = await fetchWithRetry(() =>
      axiosInstance.post("/api/auth/verify", {
        code,
        email: notVerifiedEmail || session?.user?.email,
      })
    );

    if (checkMatchCode.data.success) {
      await update({
        name: session?.user.name,
        email: session?.user.email,
        image: session?.user.image,
        isEmailVerified: true,
      });

      swal({
        icon: "success",
        title: "Email verification success",
      }).then(() => {
        router.push("/my-profile"); // redirect
        router.refresh(); // soft reload
      });
    } else {
      swal({ icon: "error", title: checkMatchCode?.data?.message });
    }

    setSendMatchOTP(false);
  }

  if (status === "loading") {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center text-6xl font-bold">
        <span className="loading loading-spinner loading-xl scale-200"></span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen ">
      <div className="w-full h-[80vh] p-5 flex flex-col gap-5 items-center justify-center ">
        <form className="w-[20rem] md:w-[35rem]  my-20 md:my-30  flex flex-col items-center gap-2 p-5 pt-10  rounded shadow-lg border border-slate-600/15 ">
          <section className="__container__ w-full md:w-[80%] flex flex-col gap-2">
            <section className="__email__ flex flex-col gap-5 items-center justify-center ">
              <h2 className=" w-full text-center flex items-center justify-center gap-2 ">
                <span
                  className={`text-2xl  ${otpSent ? "text-violet-600" : "text-orange-700"}`}
                >
                  <LuMail />
                </span>
                <span className="font-semibold text-[1.2rem]">
                  {otpSent ? "Enter your 6 degit code" : "Enter Your Email"}
                </span>
              </h2>

              {otpSent ? (
                <AuthCode
                  length={6} // number of digits
                  onChange={handleOnChange}
                  allowedCharacters="numeric" // only numbers
                  containerClassName="flex justify-center gap-2 lg:gap-5 w-full h-10 lg:h-12"
                  inputClassName="h-full w-full border border-violet-600 rounded shadow text-center"
                />
              ) : (
                <input
                  onChange={(e) => {
                    setNotVerifiedEmail(e.target.value);
                  }}
                  required
                  type="email"
                  name="email"
                  value={notVerifiedEmail}
                  className="w-full px-3 py-3 border border-slate-600/50 shadow rounded-sm outline-0"
                  placeholder="email"
                />
              )}
            </section>

            <section className="__button__ w-full flex items-center justify-center ">
              {otpSent ? (
                <button
                  onClick={sendMatchCode}
                  disabled={sendMatchOTP}
                  className="w-full mt-5 px-5 py-2 rounded-lg bg-violet-600 text-white border-1 cursor-pointer hover:bg-violet-700 hover:text-violet-300 shadow-md flex items-center justify-center"
                >
                  {sendMatchOTP ? (
                    <span className="loading loading-spinner loading-lg"></span>
                  ) : (
                    "Verify"
                  )}
                </button>
              ) : (
                <button
                  onClick={sendOTPEmail}
                  type="button"
                  disabled={otpSentLoading}
                  className="w-full px-5 py-2 rounded-lg bg-red-700 text-white border-1 cursor-pointer hover:bg-red-800 shadow-md"
                >
                  {otpSentLoading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                  ) : (
                    "Send Code"
                  )}
                </button>
              )}
            </section>
          </section>

          <section className="text-center text-red-500 text-[0.7rem] md:text-[0.9rem]">
            {""}
          </section>

          <button
            onClick={sendOTPEmail}
            type="button"
            className="__Back-button__ w-full text-center pt-0  underline text-blue-700 hover:text-blue-900 text-[0.7rem] md:text-[0.9rem] mt-4 cursor-pointer"
          >
            Didn't receive code? sent again?
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
