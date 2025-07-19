"use client";
import Link from "next/link";
import React from "react";
import {
  blogLinks,
  demoItems,
  otherPageLinks,
  otherShopMenus,
  productFeatures,
  productLinks,
  productStyles,
  shopFeatures,
  shopLayout,
  swatchLinks,
} from "@/data/menu";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      {" "}
      <li
        className={`menu-item ${"active"} `}
      >
        <a href="/" className="item-link">
          Home
          {/* <i className="icon icon-arrow-down" /> */}
        </a>
        
      </li>
      <li
        className={`menu-item ${
          [
            ...shopLayout,
            ...shopFeatures,
            ...productStyles,
            ...otherShopMenus,
          ].some((elm) => elm.href.split("/")[1] == pathname.split("/")[1])
            ? "active"
            : ""
        } `}
      >
        <Link href="/shop" className="item-link">
          Shop
        </Link>
        
      </li>
      <li
        className={`menu-item ${
          [...productLinks, ...swatchLinks, ...productFeatures].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
          )
            ? "active"
            : ""
        } `}
      >
        <Link href="#" className="item-link">
          Products
        </Link>
      </li> 
    </>
  );
}
