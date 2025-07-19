// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { useContextElement } from "@/context/Context";
// import SizeSelect from "../productDetails/SizeSelect";
// import ColorSelect from "../productDetails/ColorSelect";
// import QuantitySelect from "../productDetails/QuantitySelect";
// import Grid5 from "../productDetails/Grids/Grid5";
// import { Product } from "../productcards/ProductCard";

// // Define types for quick view item

// // Define types for context

// interface ContextType {
//     quickViewItem: Product;
//     addProductToCart: (id: number, quantity: number) => void;
//     isAddedToCartProducts: (id: number) => boolean;
//     addToWishlist: (id: number) => void;
//     isAddedtoWishlist: (id: number) => boolean;
//     addToCompareItem: (id: number) => void;
//     isAddedtoCompareItem: (id: number) => boolean;
//     cartProducts: Product[];
//     updateQuantity: (id: number, quantity: number) => void;
// }

// const QuickView: React.FC = () => {
//     const [activeColor, setActiveColor] = useState<string>("gray");
//     const [quantity, setQuantity] = useState<number>(1);

//     const {
//         quickViewItem,
//         addProductToCart,
//         isAddedToCartProducts,
//         addToWishlist,
//         isAddedtoWishlist,
//         addToCompareItem,
//         isAddedtoCompareItem,
//         cartProducts,
//         updateQuantity,
//     } = useContextElement() as ContextType;

//     // const openModalSizeChoice = () => {
//     //     import("bootstrap").then((bootstrap) => {
//     //         const modalElement = document.getElementById("size-guide");
//     //         if (modalElement) {
//     //             const myModal = new bootstrap.Modal(modalElement, {
//     //                 keyboard: false,
//     //             });
//     //             myModal.show();

//     //             modalElement.addEventListener("hidden.bs.modal", () => {
//     //                 myModal.hide();
//     //             });

//     //             const backdrops = document.querySelectorAll(".modal-backdrop");
//     //             if (backdrops.length > 1) {
//     //                 const lastBackdrop = backdrops[backdrops.length - 1];
//     //                 if (lastBackdrop instanceof HTMLElement) {
//     //                     lastBackdrop.style.zIndex = "1057";
//     //                 }
//     //             }
//     //         }
//     //     });
//     // };

//     return (
//         <div className="modal fullRight fade modal-quick-view" id="quickView">
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                     <Grid5 firstItem={quickViewItem.images[0].image} activeColor={activeColor} setActiveColor={setActiveColor} />

//                     <div className="wrap mw-100p-hidden">
//                         <div className="header">
//                             <h5 className="title">Quick View</h5>
//                             <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
//                         </div>

//                         <div className="tf-product-info-list">
//                             <div className="tf-product-info-heading">
//                                 <div className="tf-product-info-name">
//                                     <div className="text text-btn-uppercase">Clothing</div>
//                                     <h3 className="name">{quickViewItem.product_name}</h3>
//                                     <div className="sub">
//                                         <div className="tf-product-info-rate">
//                                             <div className="list-star">
//                                                 {[...Array(5)].map((_, index) => (
//                                                     <i key={index} className="icon icon-star" />
//                                                 ))}
//                                             </div>
//                                             <div className="text text-caption-1">(134 reviews)</div>
//                                         </div>
//                                         <div className="tf-product-info-sold">
//                                             <i className="icon icon-lightning" />
//                                             <div className="text text-caption-1">18 sold in last 32 hours</div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="tf-product-info-desc">
//                                     <div className="tf-product-info-price">
//                                         <h5 className="price-on-sale font-2">${quickViewItem.sale_price}</h5>
//                                         {quickViewItem.original_price && (
//                                             <>
//                                                 <div className="compare-at-price font-2">${quickViewItem.original_price}</div>
//                                                 <div className="badges-on-sale text-btn-uppercase">-25%</div>
//                                             </>
//                                         )}
//                                     </div>
//                                     <p>
//                                         The garments labelled as Committed are products that have been produced using sustainable fibres
//                                         or processes, reducing their environmental impact.
//                                     </p>
//                                     <div className="tf-product-info-liveview">
//                                         <i className="icon icon-eye" />
//                                         <p className="text-caption-1">
//                                             <span className="liveview-count">28</span> people are viewing this right now
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="tf-product-info-choose-option">
//                                 <ColorSelect activeColor={activeColor} setActiveColor={setActiveColor} />
//                                 <SizeSelect />
//                                 <div className="tf-product-info-quantity">
//                                     <div className="title mb_12">Quantity:</div>
//                                     <QuantitySelect
//                                         quantity={
//                                             isAddedToCartProducts(quickViewItem.id)
//                                                 ? cartProducts.find((item) => item.id === quickViewItem.id)?.Quantity || quantity
//                                                 : quantity
//                                         }
//                                         setQuantity={(qty: number) => {
//                                             if (isAddedToCartProducts(quickViewItem.id)) {
//                                                 updateQuantity(quickViewItem.id, qty);
//                                             } else {
//                                                 setQuantity(qty);
//                                             }
//                                         }}
//                                     />
//                                 </div>

//                                 <div>
//                                     <div className="tf-product-info-by-btn mb_10">
//                                         <a
//                                             className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 show-shopping-cart"
//                                             onClick={() => addProductToCart(quickViewItem.id, quantity)}
//                                         >
//                                             <span>{isAddedToCartProducts(quickViewItem.id) ? "Already Added" : "Add to cart -"}</span>
//                                             <span className="tf-qty-price total-price">
//                                                 {/* $
//                                                 {isAddedToCartProducts(quickViewItem.id)
//                                                     ? (
//                                                         quickViewItem.sale_price *
//                                                         (cartProducts.find((item) => item.id === quickViewItem.id)?.Quantity || 1)
//                                                     ).toFixed(2)
//                                                     : (quickViewItem.price * quantity).toFixed(2)} */}
//                                             </span>
//                                         </a>
//                                         <a
//                                             href="#compare"
//                                             onClick={() => addToCompareItem(quickViewItem.id)}
//                                             data-bs-toggle="offcanvas"
//                                             aria-controls="compare"
//                                             className="box-icon hover-tooltip compare btn-icon-action show-compare"
//                                         >
//                                             <span className="icon icon-gitDiff" />
//                                             <span className="tooltip text-caption-2">
//                                                 {isAddedtoCompareItem(quickViewItem.id) ? "Already compared" : "Compare"}
//                                             </span>
//                                         </a>
//                                         <a onClick={() => addToWishlist(quickViewItem.id)} className="box-icon hover-tooltip wishlist btn-icon-action">
//                                             <span className="icon icon-heart" />
//                                             <span className="tooltip text-caption-2">
//                                                 {isAddedtoWishlist(quickViewItem.id) ? "Already Wishlisted" : "Wishlist"}
//                                             </span>
//                                         </a>
//                                     </div>
//                                     <a href="#" className="btn-style-3 text-btn-uppercase">
//                                         Buy it now
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default QuickView;
