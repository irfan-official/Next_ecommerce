import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { Auth_Context } from "../../context/AuthContext.js";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Login() {
  let {
    googleSignIn,
    googleLoading,
    emailLogin,
    loading,
    forgotEmail,
    setForgotEmail,
  } = useContext(Auth_Context);

  let [form, setForm] = useState({
    email: "",
    password: "",
  });

  let [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const check = await emailLogin(form);
      if (check.success) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {}
  }

  async function handleGoogleLogin() {
    const check = await googleSignIn();

    if (check.success) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  function handleFormInput(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (e.target.name === "email") {
      setForgotEmail(e.target.value);
    }
  }

  return (
    <div className="w-full min-h-screen p-5 flex items-center justify-center bg-slate-100 text-black">
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Login</h1>
            <p className="mt-2 text-gray-500">
              Login below to access your account
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="relative mt-6">
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

              <div className="__button__ mb-4  flex flex-col justify-center items-center">
                <span
                  onClick={() => {
                    navigate("/reset-password");
                  }}
                  className="my-3 text-center font-semibold text-[0.9rem] py-3 cursor-pointer underline text-red-500 hover:text-red-700"
                >
                  Forgot Password?
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className=" cursor-pointer shadow-lg w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none flex items-center justify-center"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-lg bg-white text-white"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <hr className="border-2 w-1/3" />
                <section className="c">OR</section>
                <hr className="border-2 w-1/3" />
              </div>

              <div className="__google-login__ my-6 mt-4">
                <button
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  className=" cursor-pointer shadow-lg w-full rounded-md  px-3 py-3 text-black border border-black focus:bg-gray-600 focus:outline-none flex items-center justify-center"
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
                <NavLink
                  to="/register"
                  className="underline font-semibold text-blue-500  hover:text-blue-700 focus:text-gray-800 focus:outline-none"
                >
                  {" "}
                  Register
                </NavLink>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

(" Already have an account?");
