"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdFoodBank, MdAdd, MdOutlineReviews } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import Aos from "aos";
import "aos/dist/aos.css";
import { MdInventory2 } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import { SiAmazonluna } from "react-icons/si";

// Props received from Server Component
interface NavClientProps {
  user: { name?: string; email?: string; image?: string } | null;
  logOut?: () => Promise<{ success: boolean }>;
}

export default function NavClient({ user, logOut }: NavClientProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoverDiv, setHoverDiv] = useState(false);
  const [toggleList, setToggleList] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    Aos.init();
    const handleResize = () => setIsMobile(window.innerWidth < 750);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <>
      <Link href="/" className={activePage("/")}>
        Home
      </Link>
      <Link href="/all-products" className={activePage("/all-products")}>
        All Products
      </Link>
      <Link
        href="#"
        onClick={() => {
          const footer = document.getElementById("footer");
          if (footer) footer.scrollIntoView({ behavior: "smooth" });
        }}
      >
        About Us
      </Link>
    </>
  );

  function activeListPage(path: string) {
    return `text-nowrap w-full hover:bg-white hover:text-slate-950 ${
      pathname.startsWith(path)
        ? "border-l-3 border-l-lime-400 bg-lime-500/30 "
        : ""
    } p-1 px-2 rounded text-slate-300 text-start flex items-center gap-2`;
  }

  function activePage(path: string) {
    if (path === "/") {
      return pathname === path
        ? "border-b-2 border-b-lime-500 text-nowrap"
        : "text-nowrap";
    }
    return pathname.startsWith(path)
      ? "border-b-2 border-b-lime-500 text-nowrap"
      : "text-nowrap";
  }

  return (
    <nav
      id="nav"
      data-aos="fade-down"
      className="relative z-[9999] flex w-full px-5 md:px-10 pb-2 py-0 shadow-md pt-2"
    >
      <section className="w-1/2 flex items-center justify-start gap-4 lg:gap-20">
        {isMobile && (
          <div className="dropdown dropdown-right shadow relative">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 bg-white text-black"
            >
              Click
            </div>
            <ul className="dropdown-content flex flex-col gap-2 menu rounded-box absolute w-52 p-3 shadow-sm bg-white text-black px-4">
              {navList}
            </ul>
          </div>
        )}

        <Link
          href="/"
          className="flex items-center justify-center gap-2 cursor-pointer"
        >
          <SiAmazonluna size={isMobile ? 35 : 45} />
          <h1 className="text-xl md:text-3xl font-bold">Shopify</h1>
        </Link>

        <section className="md:flex gap-10 items-center hidden">
          {navList}
        </section>
      </section>

      <section className="w-1/2 flex gap-5 items-center justify-end">
        <section className="flex items-center gap-2">
          <section className="bg-amber-50/20 flex items-center justify-center px-1 py-1 rounded-full">
            <BiSolidPhoneCall size={isMobile ? 25 : 35} />
          </section>
          <section className="flex flex-col justify-center font-semibold text-[0.75rem] lg:text-[1rem]">
            <span>Call us:</span>
            <span>+880 1XX</span>
          </section>
        </section>

        <section>
          {user?.name ? (
            <div className="relative">
              <div
                onClick={() => setToggleList((prev) => !prev)}
                onMouseEnter={() => setHoverDiv(true)}
                onMouseLeave={() => setHoverDiv(false)}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-50 rounded-full border-2 overflow-hidden cursor-pointer"
              >
                <img
                  className="w-full h-full object-cover"
                  src={user.image}
                  alt="user image"
                />
              </div>

              {toggleList && (
                <ul className="absolute top-20 right-[25%] z-20 p-1 rounded flex flex-col gap-1 cursor-pointer bg-slate-800  shadow text-white ">
                  <Link href="/profile" className={activeListPage("/profile")}>
                    <CgProfile /> My Profile
                  </Link>
                  <hr className="border-white/20" />
                  <Link
                    href="/manage-products"
                    className={activeListPage("/manage-products")}
                  >
                    <MdInventory2 /> Manage Products
                  </Link>
                  <hr className="border-white/20" />
                  <Link
                    href="/add-products"
                    className={activeListPage("/add-products")}
                  >
                    <MdAdd /> Add Products
                  </Link>
                  <hr className="border-white/20" />
                  <li
                    className="w-full hover:bg-red-700 p-1 px-2 rounded flex items-center gap-2"
                    onClick={async () => {
                      if (logOut) {
                        const result = await signOut();
                        window.location.href = "/";
                      }
                    }}
                  >
                    <IoLogOutOutline /> Logout
                  </li>
                </ul>
              )}
              {hoverDiv && !toggleList && (
                <div className="absolute z-[999999] -bottom-15 -right-[20%] min-w-22 bg-white/30 backdrop-blur-2xl rounded-md">
                  <section className="w-full h-full text-yellow-900 font-semibold flex items-center justify-center px-3 py-3">
                    {user.email}
                  </section>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-5 py-3 bg-gray-400 text-white rounded-sm"
            >
              Login
            </Link>
          )}
        </section>
      </section>
    </nav>
  );
}
