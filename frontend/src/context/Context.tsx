"use client";

import { Product } from "@/components/productcards/ProductCard";
import { ProductDetail } from "@/components/productcards/ProductCard1";
import { openCartModal } from "@/utils/openCartModal";
import React, { useEffect, useState, useContext, ReactNode } from "react";

interface Testimonial {
  id: number;
  imgSrc: string;
  alt: string;
  quote: string;
  author: string;
  avatar: string;
  title: string;
  price: number;
}

interface ContextProps {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  totalPrice: number;
  addProductToCart: (id: number, qty?: number, isModal?: boolean) => void;
  isAddedToCartProducts: (id: number) => boolean;
  removeFromWishlist: (id: number) => void;
  addToWishlist: (id: number) => void;
  isAddedtoWishlist: (id: number) => boolean;
  quickViewItem: Product | Testimonial;
  wishList: number[];
  setQuickViewItem: React.Dispatch<React.SetStateAction<Testimonial | Product>>;
  quickAddItem: number;
  setQuickAddItem: React.Dispatch<React.SetStateAction<number>>;
  addToCompareItem: (id: number) => void;
  isAddedtoCompareItem: (id: number) => boolean;
  removeFromCompareItem: (id: number) => void;
  compareItem: number[];
  setCompareItem: React.Dispatch<React.SetStateAction<number[]>>;
  updateQuantity: (id: number, qty: number) => void;
}

const DataContext = React.createContext<ContextProps | undefined>(undefined);

export const useContextElement = (): ContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useContextElement must be used within a Context provider");
  }
  return context;
};

interface ContextProviderProps {
  children: ReactNode;
}

export default function Context({ children }: ContextProviderProps) {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [wishList, setWishList] = useState<number[]>([1, 2, 3]);
  const [compareItem, setCompareItem] = useState<number[]>([1, 2, 3]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://3.108.58.47/api/product/get-all-products");
        const data = await response.json();
        console.log("Fetched products:", data.results); // Debug log
        setProducts(data.results || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]); // Set empty array on error
      }
    }
    fetchProducts();
  }, []);

  const [quickViewItem, setQuickViewItem] = useState<Product | Testimonial>({
    id: 0,
    product_name: "",
    product_description: "",
    original_price: "",
    sale_price: "",
    color: "",
    images: [],
    variations: [],
    in_stock: false,
  });

  const [quickAddItem, setQuickAddItem] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      const detail = product;
      const price = typeof detail?.sale_price === "number" ? detail.sale_price : parseFloat(detail?.sale_price || "0");
      const quantity = product.Quantity ?? 1;
      return accumulator + price * quantity;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const isAddedToCartProducts = (id: number): boolean => {
    return cartProducts.some((product) => product.id === id);
  };

  const addProductToCart = (id: number, qty: number = 1, isModal: boolean = true): void => {
    if (!isAddedToCartProducts(id)) {
      const baseProduct = products.find((product) => product.id === id);
      if (!baseProduct) return;

      const item: Product = {
        ...baseProduct,
        Quantity: qty,
      };

      setCartProducts((prev) => [...prev, item]);
      if (isModal) openCartModal();
    }
  };

  const updateQuantity = (id: number, qty: number): void => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, Quantity: qty } : product
      )
    );
  };

  const addToWishlist = (id: number): void => {
    if (!wishList.includes(id)) {
      setWishList((prev) => [...prev, id]);
      openWishlistModal();
    }
  };

  const removeFromWishlist = (id: number): void => {
    setWishList((prev) => prev.filter((itemId) => itemId !== id));
  };

  const addToCompareItem = (id: number): void => {
    if (!compareItem.includes(id)) {
      setCompareItem((prev) => [...prev, id]);
    }
  };

  const removeFromCompareItem = (id: number): void => {
    setCompareItem((prev) => prev.filter((itemId) => itemId !== id));
  };

  const isAddedtoWishlist = (id: number): boolean => wishList.includes(id);
  const isAddedtoCompareItem = (id: number): boolean => compareItem.includes(id);

  // Load from localStorage only on client side
  useEffect(() => {
    if (isClient) {
      const cart = JSON.parse(localStorage.getItem("cartList") || "[]");
      if (cart.length) setCartProducts(cart);
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      const savedWish = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (savedWish.length) setWishList(savedWish);
    }
  }, [isClient]);

  // Save to localStorage only on client side
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cartList", JSON.stringify(cartProducts));
    }
  }, [cartProducts, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("wishlist", JSON.stringify(wishList));
    }
  }, [wishList, isClient]);

  const contextElement: ContextProps = {
    cartProducts,
    setCartProducts,
    products,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
    updateQuantity,
  };

  return <DataContext.Provider value={contextElement}>{children}</DataContext.Provider>;
}

function openWishlistModal() {
  console.log("Wishlist modal opened.");
}