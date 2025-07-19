"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard1, {  ProductsApiResponse } from "../productcards/ProductCard1";
import { Product } from "../productcards/ProductCard";

interface TopTrendingProps
{
    title : string,
    parentClass : string
}

const TopTrending:React.FC<TopTrendingProps> = ({ title , parentClass, }) => {

    const [products, setProducts] = useState<Product[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
    
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            setLoading(true);
            setError(null);
            
            const response = await fetch('http://3.108.58.47/api/product/get-all-products/', {
            });
            
            if (!response.ok) {
              const text = await response.text();
              throw new Error(`Failed to fetch products: ${response.status} - ${text}`);
            }
            
            const data: ProductsApiResponse = await response.json();
            setProducts(data.results || []); // Add fallback for empty results
          } catch (error) {
            console.error('Error fetching products:', error);
            setError(error instanceof Error ? error.message : 'Failed to fetch products');
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, []);
    
      // Loading state
      if (loading) {
        return (
          <section className={parentClass}>
            <div className="container">
              <div className="heading-section text-center">
                <h3 className="heading">New Arrivals</h3>
                <p className="subheading text-secondary">Loading...</p>
              </div>
            </div>
          </section>
        );
      }
    
      // Error state
      if (error) {
        return (
          <section className={parentClass}>
            <div className="container">
              <div className="heading-section text-center">
                <h3 className="heading">New Arrivals</h3>
                <p className="subheading text-secondary">
                  Unable to load products. Please try again later.
                </p>
              </div>
            </div>
          </section>
        );
      }
    return (
        <div>
            <section className={parentClass}>
                <div className="container">
                    <div className="heading-section text-center wow fadeInUp">
                        <h3 className="heading">{title}</h3>
                        <p className="subheading text-secondary">
                            Browse our Top Trending: the hottest picks loved by all.
                        </p>
                    </div>
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
                            el: ".spd4",
                        }}
                    >
                        {products.map((product, i) => (
                            <SwiperSlide key={i} className="swiper-slide">
                                <ProductCard1 product={product} />
                            </SwiperSlide>
                        ))}

                        <div className="sw-pagination-latest spd4  sw-dots type-circle justify-content-center" />
                    </Swiper>
                </div>
            </section>
        </div>
    )
}

export default TopTrending
