"use client";
import React, { useEffect, useRef, useState } from "react";

interface LanguageOption {
  id: string;
  label: string;
}

interface LanguageSelectProps {
  parentClassName?: string;
  topStart?: boolean;
}

const languageOptions: LanguageOption[] = [
  { id: "en", label: "English" },
  { id: "vt", label: "Vietnam" },
];

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  parentClassName = "image-select center style-default type-languages",
  topStart = false,
}) => {
  const [selected, setSelected] = useState<LanguageOption>(languageOptions[0]);
  const [isDDOpen, setIsDDOpen] = useState<boolean>(false);
  const languageSelect = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageSelect.current &&
        !languageSelect.current.contains(event.target as Node)
      ) {
        setIsDDOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`dropdown bootstrap-select ${parentClassName} dropup`}
      onClick={() => setIsDDOpen((prev) => !prev)}
      ref={languageSelect}
    >
      <select
        className="image-select center style-default type-languages"
        tabIndex={-1}
      >
        {languageOptions.map((option, i) => (
          <option key={i} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        tabIndex={-1}
        className={`btn dropdown-toggle btn-light ${isDDOpen ? "show" : ""}`}
      >
        <div className="filter-option">
          <div className="filter-option-inner">
            <div className="filter-option-inner-inner">{selected.label}</div>
          </div>
        </div>
      </button>
      <div
        className={`dropdown-menu ${isDDOpen ? "show" : ""}`}
        style={{
          maxHeight: "899.688px",
          overflow: "hidden",
          minHeight: 0,
          position: "absolute",
          inset: topStart ? "" : "auto auto 0px 0px",
          margin: 0,
          transform: `translate(0px, ${topStart ? 22 : -20}px)`,
        }}
        data-popper-placement={`${!topStart ? "top" : "bottom"}-start`}
      >
        <div
          className="inner show"
          style={{
            maxHeight: "869.688px",
            overflowY: "auto",
            minHeight: 0,
          }}
        >
          <ul className="dropdown-menu inner show" role="presentation">
            {languageOptions.map((elm, i) => (
              <li
                key={i}
                onClick={() => setSelected(elm)}
                className={selected.id === elm.id ? "active selected" : ""}
              >
                <a
                  className={`dropdown-item ${
                    selected.id === elm.id ? "active selected" : ""
                  }`}
                >
                  <span className="text">{elm.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelect;
