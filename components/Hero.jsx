import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Hero_Text from "./Hero_Text.jsx";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Hero() {
  return (
    <div className="w-full h-[45vh] md:h-[100vh] overflow-hidden  ">
      <section className="m-5 md:m-10 h-[40vh] md:h-[86vh] relative rounded-3xl overflow-hidden">
        <div className=" h-full  flex  justify-center ">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide className="">
              <section className=" flex items-center justify-center w-full h-full">
                <section className="w-full h-full relative ">
                  <img
                    className="h-full w-full object-fill  "
                    src="https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D"
                    alt=""
                  />
                  <section className="w-full h-full bg-black/40 absolute top-0 right-0 z-20">
                    {" "}
                    <Hero_Text />
                  </section>
                </section>
              </section>
            </SwiperSlide>
            <SwiperSlide className="">
              <section className="bg-red-600 flex items-center justify-center w-full h-full">
                <section className="w-full h-full relative">
                  <img
                    className="h-full w-full object-cover  object-center"
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                    alt=""
                  />
                  <section className="w-full h-full bg-black/40 absolute top-0 right-0 z-20">
                    <Hero_Text />
                  </section>
                </section>
              </section>
            </SwiperSlide>
            <SwiperSlide className="">
              <section className="bg-red-600 flex items-center justify-center w-full h-full">
                <section className="w-full h-full relative">
                  <img
                    className="h-full w-full object-center object-cover"
                    src="https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D"
                    alt=""
                  />
                  <section className="w-full h-full bg-black/40 absolute top-0 right-0 z-20">
                    <Hero_Text />
                  </section>
                </section>
              </section>
            </SwiperSlide>
            <SwiperSlide className="">
              <section className="bg-red-600 flex items-center justify-center w-full h-full">
                <section className="w-full h-full relative">
                  <img
                    className="h-full w-full object-center bg-center object-cover"
                    src="https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D"
                    alt=""
                  />
                  <section className="w-full h-full bg-black/40 absolute top-0 right-0 z-20">
                    {" "}
                    <Hero_Text />
                  </section>
                </section>
              </section>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
}

export default Hero;
