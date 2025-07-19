"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "../common/CountdownTimer";
import { useContextElement } from "@/context/Context";

// Define the structure of the product prop
interface ProductImage {
  image: string;
  is_main: boolean;
}

export interface Product {
  id: number;
  product_name: string;
  product_description: string;
  original_price: string;
  sale_price: string;
  color: string;
  images: ProductImage[];
  variations: string[];
  in_stock: boolean;
  Quantity?: number;
}


interface ProductCardProps {
  product: Product;
  gridClass?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, gridClass = "" }) => {
  const [currentImage, setCurrentImage] = useState<string>(product.images[0].image);

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

  useEffect(() => {
    setCurrentImage(product.images[0].image);
  }, [product]);

  return (
    <div
      className={`card-product wow fadeInUp ${gridClass} ${product.variations ? "card-product-size" : ""}`}
    >
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            src={currentImage}
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
        {/* 
        {product.hotSale && (
          <div className="marquee-product bg-main">
            <div className="marquee-wrapper">
              <div className="initial-child-container">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <React.Fragment key={index}>
                      <div className="marquee-child-item">
                        <p className="font-2 text-btn-uppercase fw-6 text-white">
                          Hot Sale 25% OFF
                        </p>
                      </div>
                      <div className="marquee-child-item">
                        <span className="icon icon-lightning text-critical" />
                      </div>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        )}

        {product.isOnisOnSale && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-{product.salePercentage}%</span>
          </div>
        )} */}

        {product.variations && (
          <div className="variant-wrap size-list">
            <ul className="variant-box">
              {product.variations.map((size) => (
                <li key={size} className="size-item">
                  {size}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* 
        {product.countdown && (
          <div className="variant-wrap countdown-wrap">
            <div className="variant-box">
              <div className="js-countdown" data-timer={product.countdown} data-labels="D :,H :,M :,S">
                <CountdownTimer />
              </div>
            </div>
          </div>
        )} */}

        <div className="list-product-btn">
          <button
            // onClick={() => addToWishlist(product.id)}
            className="box-icon wishlist btn-icon-action"
          >
            <span className="icon icon-heart" />
            <span className="tooltip">
              {/* {isAddedtoWishlist(product.id) ? "Already Wishlisted" : "Wishlist"} */}
            </span>
          </button>

          <button
            // onClick={() => addToCompareItem(product.id)}
            className="box-icon compare btn-icon-action"
          >
            <span className="icon icon-gitDiff" />
            <span className="tooltip">
              {/* {isAddedtoCompareItem(product.id) ? "Already compared" : "Compare"} */}
            </span>
          </button>

          <button
            // onClick={() => setQuickViewItem(product)}
            className="box-icon quickview tf-btn-loading"
          >
            <span className="icon icon-eye" />
            <span className="tooltip">Quick View</span>
          </button>
        </div>

        <div className="list-btn-main">
          <button className="btn-main-product"
          //  onClick={() => addProductToCart(product.id)}
          >
            {/* {isAddedToCartProducts(product.id) ? "Already Added" : "ADD TO CART"} */}
          </button>
        </div>
      </div>

      <div className="card-product-info">
        <Link href={`/product-detail/${product.id}`} className="title link">
          {product.product_name}
        </Link>

        <span className="price">
          {product.original_price && <span className="old-price">${product.original_price}</span>}{" "}
          ${product.sale_price}
        </span>

        {product.variations && (
          <ul className="list-color-product">
            {product.variations.map((color, index) => (
              <li
                key={index}
                className={`list-color-item color-swatch ${currentImage === color ? "active" : ""
                  } ${color === "bg-white" ? "line" : ""}`}
                onMouseOver={() => setCurrentImage(color)}
              >
                <span className={`swatch-value ${color}`} />
                <Image
                  className="lazyload"
                  src={color}
                  alt="color variant"
                  width={600}
                  height={800}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
