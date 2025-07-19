'use client';

import React from 'react'
import { productMain } from "@/data/products";
import RangeSlider from "react-range-slider-input";
import 'react-range-slider-input/dist/style.css';
import { AllProps } from './FilterMeta';
import { availabilityOptions, colors, sizes } from '@/context/types';

interface FilterSideBarProps {
    allProps: AllProps;
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({ allProps }) => {
    return (
        <div className="sidebar-filter canvas-filter left">
            <div className="canvas-wrapper">
                <div className="canvas-header d-flex d-xl-none">
                    <h5>Filters</h5>
                    <span className="icon-close close-filter" />
                </div>
                <div className="canvas-body">

                    <div className="widget-facet facet-price">
                        <h6 className="facet-title">Price</h6>

                        <RangeSlider
                            min={300}
                            max={4000}
                            value={allProps.price}
                            onInput={(value) => allProps.setPrice(value)}
                        />
                        <div className="box-price-product mt-3">
                            <div className="box-price-item">
                                <span className="title-price">Min price</span>
                                <div
                                    className="price-val"
                                    id="price-min-value"
                                    data-currency="₹"
                                >
                                    {allProps.price[0]}
                                </div>
                            </div>
                            <div className="box-price-item">
                                <span className="title-price">Max price</span>
                                <div
                                    className="price-val"
                                    id="price-max-value"
                                    data-currency="₹"
                                >
                                    {allProps.price[1]}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="widget-facet facet-size">
                        <h6 className="facet-title">Size</h6>
                        <div className="facet-size-box size-box">
                            {sizes.map((size, index) => (
                                <span
                                    key={index}
                                    onClick={() => allProps.setSize(size)}
                                    className={`size-item size-check ${allProps.size === size ? "active" : ""
                                        }`}
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="widget-facet facet-color">
                        <h6 className="facet-title">Colors</h6>
                        <div className="facet-color-box">
                            {colors.map((color, index) => (
                                <div
                                    onClick={() => allProps.setColor(color.name)}
                                    key={index}
                                    className={`color-item color-check ${color == allProps.color ? "active" : ""
                                        }`}
                                >
                                    <span className={`color ${color.className}`} />
                                    {color.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="widget-facet facet-fieldset">
                        <h6 className="facet-title">Availability</h6>
                        <div className="box-fieldset-item">
                            {availabilityOptions.map((option, index) => (
                                <fieldset
                                    key={index}
                                    className="fieldset-item"
                                    onClick={() => allProps.setAvailability(option.value)}
                                >
                                    <input
                                        type="radio"
                                        name="availability"
                                        className="tf-check"
                                        readOnly
                                        checked={allProps.inStock === option.value}
                                    />
                                    <label>
                                        {option.label}{" "}
                                        <span className="count-stock">
                                            (
                                            {
                                                productMain.filter((el) => el.inStock == option.value)
                                                    .length
                                            }
                                            )
                                        </span>
                                    </label>
                                </fieldset>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="canvas-bottom d-block d-xl-none">
                    <button
                        id="reset-filter"
                        onClick={allProps.clearFilter}
                        className="tf-btn btn-reset"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterSideBar
