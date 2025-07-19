"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { items } from "@/data/singleProductSliders";

// Define types for the item structure
interface Item {
    href: string;
    target?: string;
    scroll: string;
    width: number;
    height: number;
    zoom?: string;
    src: string;
    alt: string;
}

// Define props for the Grid5 component
interface Grid5Props {
    activeColor?: string;
    setActiveColor?: React.Dispatch<React.SetStateAction<string>>;
    firstItem?: string;
  }

  
const Grid5: React.FC<Grid5Props> = ({
    activeColor = "gray",
    setActiveColor = () => { },
    firstItem,
}) => {
    // Clone the items array to prevent direct mutation
    const finalItems: Item[] = [...items];
    finalItems[0].src = firstItem ?? finalItems[0].src;

    const observerRef = useRef<IntersectionObserver | null>(null);

    const scrollToTarget = () => {
        const heightScroll = window.scrollY;
        const targetElement = document.querySelector(
            `[data-scroll='${activeColor}']`
        );

        if (targetElement) {
            setTimeout(() => {
                if (window.scrollY === heightScroll) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            }, 200);
        }
    };

    useEffect(() => {
        scrollToTarget();
    }, [activeColor]);

    useEffect(() => {
        const options = {
            rootMargin: "-50% 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                //need to check 
               if (entry.isIntersecting) {
                    const scrollValue = entry.target.getAttribute("data-scroll") || "defaultColor"; // Provide a default
                    setActiveColor(scrollValue);
                }
                
            });
        }, options);

        const elements = document.querySelectorAll(".item-scroll-quickview");
        elements.forEach((el) => observer.observe(el));
        observerRef.current = observer;

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    return (
        <div className="tf-quick-view-image">
            <div className="wrap-quick-view wrapper-scroll-quickview">
                {finalItems.map((link, index) => (
                    <a
                        href={link.href}
                        target={link.target}
                        className="quickView-item item-scroll-quickview"
                        data-scroll={link.scroll}
                        data-pswp-width={`${link.width}px`}
                        data-pswp-height={`${link.height}px`}
                        key={index}
                    >
                        <Image
                            className="lazyload"
                            data-zoom={link.zoom}
                            data-src={link.src}
                            alt={link.alt}
                            src={link.src}
                            width={link.width}
                            height={link.height}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Grid5;
