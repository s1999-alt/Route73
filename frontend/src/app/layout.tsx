import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


import "../styles/css/bootstrap.min.css";
import "../styles/css/swiper-bundle.min.css";
import "../styles/css/animate.css";
import "../styles/css/photoswipe.css";
import "../styles/css/image-compare-viewer.min.css";
import "../styles/css/bootstrap-select.min.css"; // optional if needed
import "../styles/scss/main.scss";


import Context from "@/context/Context"
import CartModal from "@/components/Modals/CartModal";
import QuickAdd from "@/components/Modals/QuickAdd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Route73",
  description: "Customise Tshirts according to your needs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="preload-wrapper popup-loader">
        <Context>
          <div id="wrapper">{children}</div>
          <CartModal />
          {/* <QuickView /> */}
          <QuickAdd />
          {/* <Compare />
          <MobileMenu />

          <NewsLetterModal />
          <SearchModal />
          <SizeGuide />
          <Wishlist />
          <DemoModal />
          <Categories /> */}
        </Context>
      </body>
    </html>
  );
}
