"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios, { AxiosResponse, AxiosError } from "axios";

import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";
import ToolbarBottom from "./ToolbarBottom";
import ScrollTop from "../common/ScrollTop";
import { footerLinks, socialLinks } from "@/data/footerLinks";

// Type definitions
interface Footer1Props {
  border?: boolean;
  dark?: boolean;
  hasPaddingBottom?: boolean;
}

interface EmailFormData {
  email: string;
}

interface ApiResponse {
  message?: string;
  status?: string;
}

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    email: HTMLInputElement;
    reset: () => void;
  };
}

export default function Footer1({
  border = true,
  dark = false,
  hasPaddingBottom = false,
}: Footer1Props) {
  const [success, setSuccess] = useState<boolean>(true);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleShowMessage = (): void => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendEmail = async (e: FormEvent): Promise<void> => {
    e.preventDefault(); // Prevent default form submission behavior
    const email: string = e.target.email.value;

    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.target.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        setSuccess(false); // Handle unexpected responses
        handleShowMessage();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error:", axiosError.response?.data || "An error occurred");
      setSuccess(false); // Set error state
      handleShowMessage();
      e.target.reset(); // Reset the form
    }
  };

  useEffect((): (() => void) => {
    const headings: NodeListOf<Element> = document.querySelectorAll(".footer-heading-mobile");

    const toggleOpen = (event: Event): void => {
      const target = event.target as HTMLElement;
      const parent = target.closest(".footer-col-block") as HTMLElement;
      const content = parent?.querySelector(".tf-collapse-content") as HTMLElement;

      if (parent && content) {
        if (parent.classList.contains("open")) {
          parent.classList.remove("open");
          content.style.height = "0px";
        } else {
          parent.classList.add("open");
          content.style.height = content.scrollHeight + 10 + "px";
        }
      }
    };

    headings.forEach((heading: Element) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return (): void => {
      headings.forEach((heading: Element) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount

  return (
    <>
      <footer
        id="footer"
        className={`footer ${dark ? "bg-main" : ""} ${
          hasPaddingBottom ? "has-pb" : ""
        } `}
      >
        <div className={`footer-wrap ${!border ? "border-0" : ""}`}>
          <div className="footer-body">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="footer-infor">
                    <div className="footer-logo">
                      <Link href={`/`}>
                        <Image
                          alt=""
                          src={
                            dark
                              ? "/images/logo/logo-white.svg"
                              : "/images/logo/logo.svg"
                          }
                          width={127}
                          height={24}
                          style={{ width: "auto", height: "auto" }}
                        />
                      </Link>
                    </div>
                    <div className="footer-address">
                      <p>549 Oak St.Crystal Lake, IL 60014</p>
                      <Link
                        href={`/contact`}
                        className={`tf-btn-default fw-6 ${
                          dark ? "style-white" : ""
                        } `}
                      >
                        GET DIRECTION
                        <i className="icon-arrowUpRight" />
                      </Link>
                    </div>
                    <ul className="footer-info">
                      <li>
                        <i className="icon-mail" />
                        <p>themesflat@gmail.com</p>
                      </li>
                      <li>
                        <i className="icon-phone" />
                        <p>315-666-6688</p>
                      </li>
                    </ul>
                    <ul
                      className={`tf-social-icon  ${
                        dark ? "style-white" : ""
                      } `}
                    >
                      {socialLinks.map((link, index: number) => (
                        <li key={index}>
                          <a href={link.href} className={link.className}>
                            <i className={`icon ${link.iconClass}`} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="footer-menu">
                    {footerLinks.map((section, sectionIndex: number) => (
                      <div className="footer-col-block" key={sectionIndex}>
                        <div className="footer-heading text-button footer-heading-mobile">
                          {section.heading}
                        </div>
                        <div className="tf-collapse-content">
                          <ul className="footer-menu-list">
                            {section.items.map((item, itemIndex: number) => (
                              <li className="text-caption-1" key={itemIndex}>
                                {item.isLink ? (
                                  <Link
                                    href={item.href}
                                    className="footer-menu_item"
                                  >
                                    {item.label}
                                  </Link>
                                ) : (
                                  <a
                                    href={item.href}
                                    className="footer-menu_item"
                                  >
                                    {item.label}
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="footer-col-block">
                    <div className="footer-heading text-button footer-heading-mobile">
                      Newsletter
                    </div>
                    <div className="tf-collapse-content">
                      <div className="footer-newsletter">
                        <p className="text-caption-1">
                          Sign up for our newsletter and get 10% off your first
                          purchase
                        </p>
                        <div
                          className={`tfSubscribeMsg  footer-sub-element ${
                            showMessage ? "active" : ""
                          }`}
                        >
                          {success ? (
                            <p style={{ color: "rgb(52, 168, 83)" }}>
                              You have successfully subscribed.
                            </p>
                          ) : (
                            <p style={{ color: "red" }}>Something went wrong</p>
                          )}
                        </div>
                        <form
                          onSubmit={sendEmail}
                          className={`form-newsletter subscribe-form ${
                            dark ? "style-black" : ""
                          }`}
                        >
                          <div className="subscribe-content">
                            <fieldset className="email">
                              <input
                                type="email"
                                name="email"
                                className="subscribe-email"
                                placeholder="Enter your e-mail"
                                tabIndex={0}
                                aria-required="true"
                                required
                              />
                            </fieldset>
                            <div className="button-submit">
                              <button
                                className="subscribe-button"
                                type="submit"
                              >
                                <i className="icon icon-arrowUpRight" />
                              </button>
                            </div>
                          </div>
                          <div className="subscribe-msg" />
                        </form>
                        <div className="tf-cart-checkbox">
                          <div className="tf-checkbox-wrapp">
                            <input
                              className=""
                              type="checkbox"
                              id="footer-Form_agree"
                              name="agree_checkbox"
                            />
                            <div>
                              <i className="icon-check" />
                            </div>
                          </div>
                          <label
                            className="text-caption-1"
                            htmlFor="footer-Form_agree"
                          >
                            By clicking subscribe, you agree to the{" "}
                            <Link className="fw-6 link" href={`/term-of-use`}>
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <a className="fw-6 link" href="#">
                              Privacy Policy
                            </a>
                            .
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="footer-bottom-wrap">
                    <div className="left">
                      <p className="text-caption-1">
                        ©{new Date().getFullYear()} Modave. All Rights Reserved.
                      </p>
                      <div className="tf-cur justify-content-end">
                        <div className="tf-currencies">
                          <CurrencySelect light={dark ? true : false} />
                        </div>
                        <div className="tf-languages">
                          <LanguageSelect
                            parentClassName={`image-select center style-default type-languages ${
                              dark ? "color-white" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="tf-payment">
                      <p className="text-caption-1">Payment:</p>
                      <ul>
                        <li>
                          <Image
                            alt="Payment method"
                            src="/images/payment/img-1.png"
                            width={100}
                            height={64}
                          />
                        </li>
                        <li>
                          <Image
                            alt="Payment method"
                            src="/images/payment/img-2.png"
                            width={100}
                            height={64}
                          />
                        </li>
                        <li>
                          <Image
                            alt="Payment method"
                            src="/images/payment/img-3.png"
                            width={100}
                            height={64}
                          />
                        </li>
                        <li>
                          <Image
                            alt="Payment method"
                            src="/images/payment/img-4.png"
                            width={98}
                            height={64}
                          />
                        </li>
                        <li>
                          <Image
                            alt="Payment method"
                            src="/images/payment/img-5.png"
                            width={102}
                            height={64}
                          />
                        </li>
                        <li>
                          <Image
                            alt="Payment method"
                            src="/images/payment/img-6.png"
                            width={98}
                            height={64}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ScrollTop hasPaddingBottom={hasPaddingBottom} />
      <ToolbarBottom />
    </>
  );
}