import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { toast, Bounce } from "react-toastify";

import { useSession, signIn as googleSignIn, signOut } from "next-auth/react";

function Register() {
  let [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photo_URL: "",
  });

  let [googleLoading, setGoogleLoading] = useState(false);

  let [toggle, setToggle] = useState(false);

  const [passValidator, setPassValidator] = useState({
    passwordFildInteraction: false,
    hasUppercase: false,
    hasLowercase: false,
    isValidLength: false,
  });

  // let { googleSignIn, googleLoading, emailSignUp, loading } =
  //   useContext(Auth_Context);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();

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

      const check = await emailSignUp(form);

      if (check.success) {
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleGoogleLogin() {
    const check = await googleSignIn();

    if (check.success) {
      navigate("/");
    } else {
      navigate("/register");
    }
  }

  function handleFormInput(e) {
    if (e.target.name === "password") {
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
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="w-full min-h-screen p-5 flex flex-col md:flex-row items-center justify-center bg-slate-100 text-black gap-5 lg:gap-10 xl:gap-30">
      <div className="relative md:w-1/2  max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 ">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Register</h1>
            <p className="mt-2 text-gray-500">
              Register to create your account
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="__name__ relative mt-6">
                <input
                  onChange={handleFormInput}
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  required
                  placeholder="name"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="off"
                />
                <label
                  htmlFor="name"
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
                  name="photo_URL"
                  id="photo_URL"
                  value={form.photo_URL}
                  required
                  placeholder="Image URL"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="off"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Image-Url
                </label>
              </div>

              <div className="__button__ my-6">
                <button
                  type="submit"
                  disabled={loading}
                  className=" cursor-pointer shadow-lg w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none flex items-center justify-center"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-lg bg-white text-white"></span>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <hr className="border-2 w-1/3" />
                <section className="c">OR</section>
                <hr className="border-2 w-1/3" />
              </div>

              <div className="__google-register__ my-6">
                <button
                  onClick={handleGoogleLogin}
                  type="submit"
                  disabled={googleLoading}
                  className=" cursor-pointer shadow-lg w-full rounded-md  px-3 py-3 text-black border border-black focus:bg-gray-600 focus:outline-none flex items-center justify-center"
                >
                  {googleLoading ? (
                    <span className="loading loading-spinner loading-lg bg-black"></span>
                  ) : (
                    <section className="flex items-center justify-center gap-3">
                      <section className="c">
                        <FcGoogle size={24} />
                      </section>
                      <section className="c">Google Register</section>
                    </section>
                  )}
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Already have an account?
                <NavLink
                  to="/login"
                  className="underline font-semibold text-blue-500 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  {" "}
                  Login
                </NavLink>
                .
              </p>
            </form>
          </div>
        </div>
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
