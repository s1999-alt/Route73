"use client";

import React, { useState } from "react";

// Define the type for the props
interface ColorSelectProps {
    activeColor?: string;
    setActiveColor?: (color: string) => void;
    colorOptions?: { id: string; value: string; color: string }[];
}

const colorOptionsDefault = [
    {
        id: "values-beige",
        value: "Beige",
        color: "beige",
    },
    {
        id: "values-gray",
        value: "Gray",
        color: "gray",
    },
    {
        id: "values-grey",
        value: "Grey",
        color: "grey",
    },
];

const ColorSelect: React.FC<ColorSelectProps> = ({
    activeColor,
    setActiveColor,
    colorOptions = colorOptionsDefault,
}) => {
    const [activeColorDefault, setActiveColorDefault] = useState("gray");

    const handleSelectColor = (value: string) => {
        if (setActiveColor) {
            setActiveColor(value);
        } else {
            setActiveColorDefault(value);
        }
    };

    return (
        <div className="variant-picker-item">
            <div className="variant-picker-label mb_12">
                Colors:
                <span
                    className="text-title variant-picker-label-value value-currentColor"
                    style={{ textTransform: "capitalize" }}
                >
                    {activeColor || activeColorDefault}
                </span>
            </div>
            <div className="variant-picker-values">
                {colorOptions.map(({ id, value, color }) => (
                    <React.Fragment key={id}>
                        <input
                            id={id}
                            type="radio"
                            readOnly
                            checked={
                                activeColor ? activeColor === color : activeColorDefault === color
                            }
                        />
                        <label
                            onClick={() => handleSelectColor(color)}
                            className={`hover-tooltip tooltip-bot radius-60 color-btn ${
                                activeColor
                                    ? activeColor === color
                                        ? "active"
                                        : ""
                                    : activeColorDefault === color
                                        ? "active"
                                        : ""
                            }`}
                            htmlFor={id}
                        >
                            <span className={`btn-checkbox bg-color-${color}`} />
                            <span className="tooltip">{value}</span>
                        </label>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ColorSelect;
