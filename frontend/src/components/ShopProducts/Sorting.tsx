"use client";

import React from "react";

interface SortingProps {
    sortingOption: string;
    setSortingOption: (option: string) => void;
}

const filterOptions: string[] = [
  "Sort by (Default)",
  "Title Ascending",
  "Title Descending",
  "Price Ascending",
  "Price Descending",
];

const Sorting: React.FC<SortingProps> = ({sortingOption,setSortingOption}) => {
  return (
    <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
      <div className="btn-select">
        <span className="text-sort-value">{sortingOption}</span>
        <span className="icon icon-arrow-down" />
      </div>
      <div className="dropdown-menu">
        {filterOptions.map((option: string, i: number) => (
          <div
            onClick={() => setSortingOption(option)}
            key={i}
            className={`select-item ${
              sortingOption === option ? "active" : ""
            }`}
          >
            <span className="text-value-item">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sorting;