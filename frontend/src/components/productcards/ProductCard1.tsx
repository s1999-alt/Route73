"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "../common/CountdownTimer";
import { Product } from "./ProductCard";
import { useContextElement } from "@/context/Context";

interface ProductCard1Props {
  product: Product;
  gridClass?: string;
}


// API Response interface for the paginated response
export interface ProductsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export interface ProductDetail {
  original_price: string;
  sale_price: string;
  color: string;
  product_code: string;
  is_available: boolean;
  images: ProductImage[];
  variations: ProductVariation[];
}

interface ProductImage {
  imagePath: string;
  is_main: boolean;
}

interface ProductVariation {
  size: Size;
  quantity_in_stock: number;
}

interface Size {
  size_name: string;
}

const ProductCard1: React.FC<ProductCard1Props> = ({ product, gridClass = "" }) => {
  const [currentImage, setCurrentImage] = useState<string | undefined>();

  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  const detail = product;

  useEffect(() => {
    const mainImage = detail.images.find((img) => img.is_main);
    const hoverImage = detail.images.find((img) => !img.is_main);
    if (mainImage) setCurrentImage(mainImage.image);
  }, [detail]);

  return (
    <div className={`card-product wow fadeInUp ${gridClass}`}>
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            src={currentImage || "/placeholder.jpg"}
            alt={product.product_name}
            width={600}
            height={800}
          />  
           <Image
            className="lazyload img-hover"
            src={product.images[1]?.image || "/placeholder.jpg"}
            alt={product.product_name}
            width={600}
            height={800}
          />


        </Link>

        <div className="list-product-btn">
          <a onClick={() => addToWishlist(product.id)} className="box-icon wishlist btn-icon-action">
            <span className="icon icon-heart" />
            <span className="tooltip">
              {isAddedtoWishlist(product.id) ? "Already Wishlisted" : "Wishlist"}
            </span>
          </a>
          <a
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="compare"
            onClick={() => addToCompareItem(product.id)}
            className="box-icon compare btn-icon-action"
          >
            <span className="icon icon-gitDiff" />
            <span className="tooltip">
              {isAddedtoCompareItem(product.id) ? "Already Compared" : "Compare"}
            </span>
          </a>
          <a
            href="#quickView"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon quickview tf-btn-loading"
          >
            <span className="icon icon-eye" />
            <span className="tooltip">Quick View</span>
          </a>
        </div>

        <div className="list-btn-main">
          <a className="btn-main-product" onClick={() => addProductToCart(product.id)}>
            {isAddedToCartProducts(product.id) ? "Already Added" : "ADD TO CART"}
          </a>
        </div>
      </div>

      <div className="card-product-info">
        <Link href={`/product-detail/${product.id}`} className="title link">
          {product.product_name}
        </Link>
        <span className="price">
          <span className="old-price">${parseFloat(detail.original_price).toFixed(2)}</span>{" "}
          ${parseFloat(detail.sale_price).toFixed(2)}
        </span>

        {/* {detail.variations?.length > 0 && (
          <div className="variant-wrap size-list">
            <ul className="variant-box">
              {detail.variations.map((variation, index) => (
                <li key={index} className="size-item">
                  {variation}
                </li>
              ))}
            </ul>
          </div>
        )} */}

        {detail.images?.length > 1 && (
          <ul className="list-color-product">
            {detail.images.map((img, index) => (
              <li
                key={index}
                className={`list-color-item color-swatch ${currentImage === img.image ? "active" : ""}`}
                onMouseOver={() => setCurrentImage(img.image)}
              >
                <Image
                  className="lazyload"
                  src={img.image}
                  alt="variant"
                  width={60}
                  height={60}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductCard1;