"use client";
import React from "react";

interface ColorType {
  name: string;
  className?: string;
}

export interface AllProps {
  inStock: boolean | null; // Keep your naming but make it nullable
  price: [number, number];
  size: string;
  color: string | ColorType;
  setAvailability: (value: boolean | null) => void;
  setSize: (value: string) => void;
  setColor: (value: string) => void;
  setPrice: (value: [number, number]) => void;
  clearFilter: () => void;
}

interface FilterMetaProps {
  props: AllProps;
  productLength: number;
}

const FilterMeta: React.FC<FilterMetaProps> = ({ props, productLength }) => {
  const isColorObject = (color: any): color is ColorType => 
    typeof color === "object" && "name" in color;

  return (
    <div className="meta-filter-shop">
      <div id="product-count-grid" className="count-text">
        <span className="count">{productLength}</span> Products Found
      </div>
      <div id="applied-filters">
        {props.inStock !== null && (
          <span
            className="filter-tag"
            onClick={() => props.setAvailability(null)}
          >
            {props.inStock ? "In Stock" : "Out of Stock"}
            <span className="remove-tag icon-close" />
          </span>
        )}
        {props.size !== "All" && (
          <span
            className="filter-tag"
            onClick={() => props.setSize("All")}
          >
            {props.size}
            <span className="remove-tag icon-close" />
          </span>
        )}
        {props.color !== "All" && (
          <span
            className="filter-tag color-tag"
            onClick={() => props.setColor("All")}
          >
            {isColorObject(props.color) ? (
              <>
                <span className={`color bg-red ${props.color.className}`} />
                {props.color.name}
              </>
            ) : (
              props.color
            )}
            <span className="remove-tag icon-close" />
          </span>
        )}
      </div>
      {(props.inStock !== null ||
        props.size !== "All" ||
        props.color !== "All") && (
        <button
          id="remove-all"
          className="remove-all-filters text-btn-uppercase"
          onClick={props.clearFilter}
        >
          REMOVE ALL <i className="icon icon-close" />
        </button>
      )}
    </div>
  );
};

export default FilterMeta;
