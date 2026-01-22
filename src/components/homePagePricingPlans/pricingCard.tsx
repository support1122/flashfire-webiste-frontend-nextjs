"use client";

import { useState, useMemo } from "react";
import { FaBolt } from "react-icons/fa";
import { trackButtonClick } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";

interface PricingPlan {
  title: string;
  tag?: string;
  subTitle: string;
  description: string;
  price: string;
  oldPrice?: string;
  features: string[];
  addOn?: boolean;
  highlight?: boolean;
  paymentLink?: string;
}

interface PricingCardProps {
  title: string;
  tag?: string;
  subTitle: string;
  description: string;
  price: string;
  oldPrice?: string;
  features: string[];
  addOn?: boolean;
  highlight?: boolean;
  paymentLink?: string;
  allPlans?: PricingPlan[];
  onUpgradeClick?: (planTitle: string) => void;
  isUpgradeOptionsVisible?: boolean;
  onBoosterClick?: (planTitle: string) => void;
  isBoosterOptionsVisible?: boolean;
  onOptionsClick?: (planTitle: string) => void;
  isOptionsVisible?: boolean;
}

export default function PricingCard({
  title,
  tag,
  subTitle,
  description,
  price,
  oldPrice,
  features,
  addOn,
  highlight,
  paymentLink,
  allPlans = [],
  onUpgradeClick,
  isUpgradeOptionsVisible = false,
  onBoosterClick,
  isBoosterOptionsVisible = false,
  onOptionsClick,
  isOptionsVisible = false,
}: PricingCardProps) {
  // Check if this plan has upgrade options
  const hasUpgradeOptions = useMemo(() => {
    if (!allPlans || allPlans.length === 0) return false;

    const planHierarchy = ["PRIME", "IGNITE", "PROFESSIONAL", "EXECUTIVE"];
    const currentPlanIndex = planHierarchy.indexOf(title);

    if (currentPlanIndex === -1 || currentPlanIndex === planHierarchy.length - 1) {
      return false;
    }

    // Check if there are any plans higher in hierarchy (excluding IGNITE from PRIME)
    return allPlans.some(plan => {
      const planIndex = planHierarchy.indexOf(plan.title);
      if (title === "PRIME" && plan.title === "IGNITE") {
        return false;
      }
      return planIndex > currentPlanIndex;
    });
  }, [title, allPlans]);

  // Parse base price from string (handles "$199" or "CA$279")
  const basePrice = useMemo(() => {
    const priceMatch = price.match(/[\d.]+/);
    return priceMatch ? parseFloat(priceMatch[0]) : 0;
  }, [price]);

  // Parse old price
  const oldBasePrice = useMemo(() => {
    if (!oldPrice) return 0;
    const match = oldPrice.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }, [oldPrice]);

  // Calculate discount percentage
  const discountPercent = useMemo(() => {
    if (!oldBasePrice || !basePrice) return 0;
    const discount = ((oldBasePrice - basePrice) / oldBasePrice) * 100;
    return Math.round(discount);
  }, [oldBasePrice, basePrice]);

  // Get currency symbol
  const currencySymbol = useMemo(() => {
    if (price.includes("CA$")) return "CA$";
    if (price.includes("$")) return "$";
    return "$";
  }, [price]);

  // Calculate displayed price: show base price
  const displayedPrice = useMemo(() => {
    return basePrice;
  }, [basePrice]);

  // Format price with currency
  const formattedPrice = useMemo(() => {
    return `${currencySymbol}${displayedPrice.toFixed(0)}`;
  }, [displayedPrice, currencySymbol]);

  // Get payment URL: use original paymentLink
  const currentPaymentLink = useMemo(() => {
    return paymentLink;
  }, [paymentLink]);

  return (
    <div className="flex flex-col w-full h-full">
      <div
        className={`bg-white border rounded-[0.3rem] p-4 sm:p-6 lg:p-8 flex-1 flex flex-col text-left relative transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] ${highlight ? "border-2 border-[#ff4c00]" : "border border-black"}`}
      >
        {tag && (
          <div
            className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs sm:text-[0.9rem] font-semibold rounded px-2 sm:px-3 py-0.5 sm:py-1 ${tag === "MOST POPULAR" ? "bg-[#ff4c00]" : "bg-[#111]"
              }`}
          >
            {tag}
          </div>
        )}

        <h4 className="text-[#ff4c00] text-lg sm:text-xl lg:text-[1.5rem] font-bold mb-1">
          {title}
        </h4>

        <div className="mb-3">
          {/* Old price + Discount tag */}
          {oldPrice && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-400 line-through">
                {oldPrice}
              </span>

              {discountPercent > 0 && (
                <span className="bg-orange-100 text-[#ff4c00] text-[11px] font-semibold px-2 py-[2px] rounded-full">
                  Save {discountPercent}%
                </span>
              )}
            </div>
          )}

          {/* Main price */}
          <div className="flex items-end gap-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-black leading-none">
              {formattedPrice}
            </h3>
           
          </div>
        </div>



        <p className="text-[#555] text-sm sm:text-base mb-4 sm:mb-6">
          {description}
        </p>

        <hr className="-mt-1 mb-2 sm:mb-3 text-black" />

        <ul className="list-none p-0 mb-4 sm:mb-6 flex-grow min-h-[8rem] sm:min-h-[10rem]">
          {/* Subtitle as first feature item - bold and colored */}
          <li className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#ff4c00] mb-2 sm:mb-3">
            <FaBolt className="text-[#ff4c00] text-base sm:text-lg flex-shrink-0" />
            <span className="font-extrabold text-[#ff4c00]">{subTitle}</span>
          </li>
          {features.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm sm:text-base text-black mb-1.5 sm:mb-2"
            >
              <FaBolt className="text-[#ff4c00] text-sm sm:text-base flex-shrink-0" /> <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          {(addOn || hasUpgradeOptions) ? (
            <button
              onClick={() => {
                if (onOptionsClick) {
                  onOptionsClick(title);
                } else {
                  // Fallback to individual handlers if combined handler not provided
                  if (addOn && onBoosterClick) {
                    onBoosterClick(title);
                  } else if (hasUpgradeOptions && onUpgradeClick) {
                    onUpgradeClick(title);
                  }
                }
              }}
              className="bg-[#ff4c00] text-white border-none py-2 sm:py-2.5 px-3 sm:px-4 font-semibold text-xs sm:text-sm rounded-[0.5rem] w-full cursor-pointer transition-all duration-300 hover:bg-[#e24300] mb-3 sm:mb-4"
            >
              {addOn && hasUpgradeOptions ? "View Options" : addOn && title === "EXECUTIVE" ? "View Options" : addOn ? "Booster Add-On" : "Upgrade Plan"}
            </button>
          ) : (
            <div className="mb-3 sm:mb-4 h-[2rem] sm:h-[2.5rem]"></div>
          )}

          {/* <p className="text-[0.85rem] text-[#555] mb-5">
        Total {subTitle.toLowerCase()} included
      </p> */}

          <button
            className="bg-black text-white border-none py-2.5 sm:py-[0.9rem] px-3 sm:px-4 font-semibold text-sm sm:text-[0.95rem] rounded-[0.4rem] w-full cursor-pointer transition-all duration-300 hover:bg-[#111]"
            onClick={() => {
              const utmSource = typeof window !== "undefined"
                ? localStorage.getItem("utm_source") || "WEBSITE"
                : "WEBSITE";
              const utmMedium = typeof window !== "undefined"
                ? localStorage.getItem("utm_medium") || "Pricing_Section"
                : "Pricing_Section";

              const finalPlanName = title;
              const finalPrice = formattedPrice;
              const finalSubtitle = subTitle;

              if (typeof window !== "undefined") {
                GTagUTM({
                  eventName: "pricing_cta_click",
                  label: `Pricing_${finalPlanName}_Button`,
                  utmParams: {
                    utm_source: utmSource,
                    utm_medium: utmMedium,
                    utm_campaign: localStorage.getItem("utm_campaign") || "Website",
                  },
                });
              }

              // PostHog tracking
              trackButtonClick(`Start Now - ${finalPlanName}`, "pricing_cta", "cta", {
                button_location: "pricing_plan",
                plan_name: finalPlanName,
                original_plan: title,
                plan_price: finalPrice,
                plan_subtitle: finalSubtitle,
                selected_booster: null,
                total_price: finalPrice
              });

              if (currentPaymentLink) {
                window.open(currentPaymentLink, "_blank");
              }
            }}
          >
            Start Now
          </button>
        </div>
      </div>

    </div>
  );
}
