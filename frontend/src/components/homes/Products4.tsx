"use client";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard1 from "../productcards/ProductCard1";
import { useContextElement } from "@/context/Context";

export default function Products4({ parentClass = "" }) {
  const { products } = useContextElement();

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">New Arrivals</h3>
          <p className="subheading text-secondary">
            Fresh styles just in! Elevate your look.
          </p>
        </div>

        {products.length > 0 ? (
          <Swiper
            className="swiper tf-sw-latest"
            dir="ltr"
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1200: { slidesPerView: 4, spaceBetween: 30 },
            }}
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".spd5",
            }}
          >
            {products.slice(0, 4).map((product) => (
              <SwiperSlide key={product.id} className="swiper-slide">
                <ProductCard1 product={product} />
              </SwiperSlide>
            ))}
            <div className="sw-pagination-latest spd5 sw-dots type-circle justify-content-center" />
          </Swiper>
        ) : (
          <div className="text-center">
            <p>No products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
