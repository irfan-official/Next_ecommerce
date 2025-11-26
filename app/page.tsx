"use client";
import ProductCard from "@/components/ProductCard";
import React from "react";
import LimitedProductCardShows from "@/components/LimitedProductCardShows";
import GetInTouch from "@/components/GetInTouch";
import { useData } from "@/context/DataContext";
import ClientFeedbackShows from "@/components/ClientFeedbackShows";
import Article from "@/components/Article";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

function page() {
  const { fetchProductLoader } = useData();
  if (fetchProductLoader) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center text-6xl font-bold">
        <span className="loading loading-spinner loading-xl scale-200"></span>
      </div>
    );
  }
  return (
    <div className="w-full bg-[#F2F4F8] min-h-[90vh] flex flex-col items-center justify-start">
      <Hero />
      <Features />
      <LimitedProductCardShows />
      <ClientFeedbackShows />
      <Article />
      <GetInTouch />
    </div>
  );
}

export default page;
