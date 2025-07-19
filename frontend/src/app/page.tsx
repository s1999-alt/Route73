import Features from "@/components/common/homes/Features";
import MarqueeSection from "@/components/common/MarqueeSection";
import Footer1 from "@/components/footer/Footer";
import Header4 from "@/components/headers/header";
import Collections from "@/components/homes/Collections";
import Hero from "@/components/homes/Hero";
import Products4 from "@/components/homes/Products4";
// import Testimonials from "@/components/homes/Testimonials";
import TopTrending from "@/components/homes/TopTrending";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Header4 />
      <Hero />
      <Products4 parentClass="flat-spacing" />
      <MarqueeSection />
      <TopTrending title="Top Trending" parentClass="flat-spacing" />
      <Features />
      {/* <Testimonials /> */}
      <Footer1 dark />
      {/*
      <Products2 title="Top Trending" parentClass="flat-spacing" />
      <Features parentClass="flat-spacing pt-0 line-bottom-container" />
      <Testimonials />
      <ShopGram />
      <div className="mt-5"></div>
      <Brands parentClass="flat-spacing-5 line-top mt--5" />
       */}
    </>
  );
}
