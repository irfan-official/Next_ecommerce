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
import { useData } from "@/context/DataContext";
import { SiAmazonluna } from "react-icons/si";
import { CgMenuLeftAlt } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react";

// Props received from Server Component
interface NavClientProps {
  user: {
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
  } | null;
}

export default function NavClient({ user }: NavClientProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoverDiv, setHoverDiv] = useState(false);
  const [toggleList, setToggleList] = useState(false);
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        // scrolling down → hide navbar
        setVisible(false);
      } else {
        // scrolling up → show navbar
        setVisible(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

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
    return `text-nowrap w-full  bg-white/50 backdrop-filter-2xl ${
      pathname.startsWith(path)
        ? "border-l-7 border-l-lime-400 text-lime-700"
        : " text-slate-900 "
    } p-1 px-2 rounded  text-start flex items-center gap-2 hover:bg-slate-950 hover:text-white`;
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
      className={` z-[9999] flex w-full px-5 md:px-10 pb-2 py-0 shadow-md pt-2 sticky top-0 right-0 bg-white transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"} `}
    >
      <section className="w-1/2 flex items-center justify-start gap-4 lg:gap-20">
        {isMobile && (
          <div className="dropdown dropdown-down  relative">
            <div
              tabIndex={0}
              role="button"
              className=" m-1 text-black w-10 border-0 text-xl outline-0"
            >
              <CgMenuLeftAlt size={28} />
            </div>
            <ul className="dropdown-content flex flex-col gap-2 menu rounded-box absolute w-52 p-3 shadow-sm bg-stone-950 text-white px-4">
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
        <section>
          {user?.name ? (
            <div className="relative">
              <div
                onClick={() => setToggleList((prev) => !prev)}
                onMouseEnter={() => setHoverDiv(true)}
                onMouseLeave={() => setHoverDiv(false)}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-50 rounded-full border-3 border-slate-300 overflow-hidden cursor-pointer"
              >
                <img
                  className="w-full h-full object-cover object-top"
                  src={
                    user.image ??
                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  }
                  alt="user image"
                />
              </div>

              {toggleList && (
                <ul className="absolute top-12 lg:top-17 right-[12%] lg:right-[15%] z-20 p-1 rounded flex flex-col gap-1 cursor-pointer bg-slate-700/40 backdrop-blur-2xl   shadow text-white ">
                  <Link
                    href="/my-profile"
                    className={activeListPage("/my-profile")}
                  >
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
                    className="w-full bg-violet-600 hover:bg-violet-800 p-1 px-2 rounded flex items-center gap-2"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <IoLogOutOutline /> Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
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
