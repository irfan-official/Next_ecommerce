import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";

function Hero_Text() {
  return (
    <section className="w-full h-full flex  gap-5 items-center justify-center  text-white/80 font-semibold">
      <span className="text-pink-300 text-4xl md:text-9xl">
        <TiShoppingCart />
      </span>
      <span className="hero-text-style   hero_text text-4xl md:text-9xl">
        Shop Today
      </span>
    </section>
  );
}

export default Hero_Text;
