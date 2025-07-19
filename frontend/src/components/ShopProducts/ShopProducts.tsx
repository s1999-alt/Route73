"use client";

import { useEffect, useReducer, useState, useMemo, useCallback } from "react";
import { initialState, reducer } from "@/reducer/reducer";
import LayoutHandler from "./LayoutHandler";
import Sorting from "./Sorting";
import { useContextElement } from "@/context/Context";
import GridView from "./GridView";
import FilterMeta from "./FilterMeta";
import FilterSideBar from "./FilterSideBar";
import FilterModal from "./FilterModal";

interface FilterActions {
    setPrice: (value: [number, number]) => void;
    setColor: (value: string) => void;
    setSize: (value: string) => void;
    setAvailability: (value: boolean | null) => void;
    setSortingOption: (value: string) => void;
    toggleFilterWithOnSale: () => void;
    setCurrentPage: (value: number) => void;
    setItemPerPage: (value: number) => void;
    clearFilter: () => void;
}

type FilterProps = ReturnType<typeof reducer> & FilterActions;

const ShopProducts: React.FC = () => {
    const [activeLayout, setActiveLayout] = useState<number>(4);
    const [state, dispatch] = useReducer(reducer, initialState);
    const { products } = useContextElement();

    const {
        price,
        color,
        size,
        inStock,
        sortingOption,
        activeFilterOnSale,
        currentPage,
        itemPerPage,
    } = state;

    // Initialize products when they're loaded
    useEffect(() => {
        if (products.length > 0) {
            dispatch({ type: "SET_FILTERED", payload: products });
            dispatch({ type: "SET_SORTED", payload: products });
        }
    }, [products]);

    // Memoize action creators to prevent unnecessary re-renders
    const actions = useMemo((): FilterActions => ({
        setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),
        setColor: (value) => dispatch({ type: "SET_COLOR", payload: value }),
        setSize: (value) => dispatch({ type: "SET_SIZE", payload: value }),
        setAvailability: (value) => dispatch({ type: "SET_AVAILABILITY", payload: value }),
        setSortingOption: (value) => dispatch({ type: "SET_SORTING_OPTION", payload: value }),
        toggleFilterWithOnSale: () => dispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
        setCurrentPage: (value) => dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
        setItemPerPage: (value) => dispatch({ type: "SET_ITEM_PER_PAGE", payload: value }),
        clearFilter: () => dispatch({ type: "CLEAR_FILTER", payload: products }),
    }), [products]);

    const allProps: FilterProps = useMemo(() => ({
        ...state,
        ...actions,
    }), [state, actions]);

    // Apply filters
    const filteredProducts = useMemo(() => {
        if (products.length === 0) return [];
        
        let filteredList = [...products];

        // Color filter
        if (color !== "All") {
            filteredList = filteredList.filter(
                (item) => item.color.toLowerCase() === color.toLowerCase()
            );
        }

        // Size filter
        if (size !== "All" && size !== "Free Size") {
            filteredList = filteredList.filter((item) =>
                item.variations.some((v) => v.toLowerCase() === size.toLowerCase())
            );
        }

        // Stock availability filter - only apply when not null
        if (inStock !== null) {
            filteredList = filteredList.filter(
                (item) => item.in_stock === inStock
            );
        }

        // Sale filter
        if (activeFilterOnSale) {
            filteredList = filteredList.filter(
                (item) => parseFloat(item.original_price) > parseFloat(item.sale_price)
            );
        }

        // Price range filter
        filteredList = filteredList.filter((item) => {
            const priceVal = parseFloat(item.sale_price);
            return priceVal >= price[0] && priceVal <= price[1];
        });

        return filteredList;
    }, [products, color, size, inStock, activeFilterOnSale, price]);

    // Apply sorting
    const sortedProducts = useMemo(() => {
        if (filteredProducts.length === 0) return [];
        
        let sortedList = [...filteredProducts];

        switch (sortingOption) {
            case "Price Ascending":
                sortedList.sort((a, b) => parseFloat(a.sale_price) - parseFloat(b.sale_price));
                break;
            case "Price Descending":
                sortedList.sort((a, b) => parseFloat(b.sale_price) - parseFloat(a.sale_price));
                break;
            case "Title Ascending":
                sortedList.sort((a, b) => a.product_name.localeCompare(b.product_name));
                break;
            case "Title Descending":
                sortedList.sort((a, b) => b.product_name.localeCompare(a.product_name));
                break;
            default:
                // Default sorting or no sorting
                break;
        }

        return sortedList;
    }, [filteredProducts, sortingOption]);

    // Update state when computed values change
    useEffect(() => {
        dispatch({ type: "SET_FILTERED", payload: filteredProducts });
    }, [filteredProducts]);

    useEffect(() => {
        dispatch({ type: "SET_SORTED", payload: sortedProducts });
        // Reset to first page when sorting changes
        dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
    }, [sortedProducts]);

    // Pagination logic
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        return sortedProducts.slice(startIndex, endIndex);
    }, [sortedProducts, currentPage, itemPerPage]);

    // Callback for layout change to prevent unnecessary re-renders
    const handleLayoutChange = useCallback((value: React.SetStateAction<number>) => {
        setActiveLayout(value);
    }, []);

    // Debug logging
    useEffect(() => {
        console.log("Products from context:", products.length);
        console.log("Filtered products:", filteredProducts.length);
        console.log("Sorted products:", sortedProducts.length);
        console.log("Paginated products:", paginatedProducts.length);
    }, [products, filteredProducts, sortedProducts, paginatedProducts]);

    return (
        <>
            <section className="flat-spacing">
                <div className="container">
                    <div className="tf-shop-control">
                        <div className="tf-control-filter">
                            <button className="filterShop tf-btn-filter hidden-mx-1200">
                                <span className="icon icon-filter" />
                                <span className="text">Filters</span>
                            </button>
                            <a
                                href="#filterShop"
                                data-bs-toggle="offcanvas"
                                aria-controls="filterShop"
                                className="tf-btn-filter show-mx-1200"
                            >
                                <span className="icon icon-filter" />
                                <span className="text">Filters</span>
                            </a>
                        </div>
                        <ul className="tf-control-layout">
                            <LayoutHandler
                                setActiveLayout={handleLayoutChange}
                                activeLayout={activeLayout}
                                hasSidebar
                            />
                        </ul>
                        <div className="tf-control-sorting">
                            <p className="d-none d-lg-block text-caption-1">Sort by:</p>
                            <Sorting
                                sortingOption={allProps.sortingOption}
                                setSortingOption={allProps.setSortingOption}
                            />
                        </div>
                    </div>
                    <div className="wrapper-control-shop">
                        <FilterMeta productLength={sortedProducts.length} props={allProps} />

                        <div className="row">
                            <div className="col-xl-3">
                                <FilterSideBar allProps={allProps} />
                            </div>
                            <div className="col-xl-9">
                                <div className={`tf-grid-layout wrapper-shop tf-col-${activeLayout}`} id="gridLayout">
                                    <GridView products={paginatedProducts} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FilterModal allProps={allProps} />
        </>
    );
};

export default ShopProducts;