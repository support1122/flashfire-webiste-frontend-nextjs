"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import PricingCard from "./pricingCard";
import Image from "next/image";
import { usPricingPlans, canadaPricingPlans } from "@/src/data/pricingData";
import FlashfireLogo from "@/src/components/FlashfireLogo";

interface UpgradePrice {
  from: string;
  to: string;
  price: number;
  paymentUrl?: string;
}

const upgradePrices: UpgradePrice[] = [
  { from: "PRIME", to: "PROFESSIONAL", price: 240, paymentUrl: "https://www.paypal.com/ncp/payment/SZW8UGWUF4KRC" },
  { from: "PRIME", to: "EXECUTIVE", price: 490, paymentUrl: "https://www.paypal.com/ncp/payment/4S564BKM8577N" },
  { from: "IGNITE", to: "PROFESSIONAL", price: 170, paymentUrl: "https://www.paypal.com/ncp/payment/7Z7GT5CF75L3A" },
  { from: "IGNITE", to: "EXECUTIVE", price: 420, paymentUrl: "https://www.paypal.com/ncp/payment/AHW9DGNYWABZ4" },
  { from: "PROFESSIONAL", to: "EXECUTIVE", price: 285, paymentUrl: "https://www.paypal.com/ncp/payment/VR5YKZW26JUEL" },
];

export default function HomePagePricingPlans() {
  const pathname = usePathname();
  const isCanadaContext = pathname.startsWith("/en-ca");
  const pricingPlans = isCanadaContext ? canadaPricingPlans : usPricingPlans;
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState<string | null>(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(null);
  const [selectedPlanForBooster, setSelectedPlanForBooster] = useState<string | null>(null);
  const [selectedBoosterPlanIndex, setSelectedBoosterPlanIndex] = useState<number | null>(null);
  const [selectedBoosterIndex, setSelectedBoosterIndex] = useState<number | null>(null);
  const boosterSectionRef = useRef<HTMLDivElement>(null);
  const upgradeSectionRef = useRef<HTMLDivElement>(null);
  const shouldScrollBoosterRef = useRef<boolean>(false);
  const shouldScrollUpgradeRef = useRef<boolean>(false);

  const currencySymbol = isCanadaContext ? "CA$" : "$";

  // Scroll to booster section when it becomes visible
  useEffect(() => {
    if (shouldScrollBoosterRef.current && boosterSectionRef.current) {
      const scrollToBooster = () => {
        if (boosterSectionRef.current) {
          // Wait for layout to fully update
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Dynamically calculate navbar height
              const stickyNavbar = document.querySelector('.sticky.top-0') || 
                                  document.querySelector('nav') ||
                                  document.querySelector('[class*="nav"]');
              const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
              
              const elementTop = boosterSectionRef.current?.getBoundingClientRect().top;
              if (elementTop !== undefined) {
                // Add navbar height + extra padding (30px) to ensure content is fully visible
                const offset = navbarHeight + 30;
                const offsetPosition = elementTop + window.pageYOffset - offset;
                window.scrollTo({
                  top: Math.max(0, offsetPosition),
                  behavior: "smooth"
                });
              }
              shouldScrollBoosterRef.current = false;
            });
          });
        }
      };
      
      // Increased delay to ensure DOM is fully updated and layout recalculated
      setTimeout(scrollToBooster, 300);
    }
  }, [selectedPlanForBooster, selectedBoosterPlanIndex]);

  // Scroll to upgrade section when it becomes visible
  useEffect(() => {
    if (shouldScrollUpgradeRef.current && upgradeSectionRef.current) {
      const scrollToUpgrade = () => {
        if (upgradeSectionRef.current) {
          // Wait for layout to fully update
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Dynamically calculate navbar height
              const stickyNavbar = document.querySelector('.sticky.top-0') || 
                                  document.querySelector('nav') ||
                                  document.querySelector('[class*="nav"]');
              const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
              
              const elementTop = upgradeSectionRef.current?.getBoundingClientRect().top;
              if (elementTop !== undefined) {
                // Add navbar height + extra padding (30px) to ensure content is fully visible
                const offset = navbarHeight + 30;
                const offsetPosition = elementTop + window.pageYOffset - offset;
                window.scrollTo({
                  top: Math.max(0, offsetPosition),
                  behavior: "smooth"
                });
              }
              shouldScrollUpgradeRef.current = false;
            });
          });
        }
      };
      
      // Increased delay to ensure DOM is fully updated and layout recalculated
      setTimeout(scrollToUpgrade, 300);
    }
  }, [selectedPlanForUpgrade, selectedPlanIndex]);

  // Get upgrade options for the selected plan
  const upgradeOptions = useMemo(() => {
    if (!selectedPlanForUpgrade) return [];
    
    const planHierarchy = ["PRIME", "IGNITE", "PROFESSIONAL", "EXECUTIVE"];
    const currentPlanIndex = planHierarchy.indexOf(selectedPlanForUpgrade);
    
    if (currentPlanIndex === -1 || currentPlanIndex === planHierarchy.length - 1) {
      return [];
    }
    
    return pricingPlans
      .filter(plan => {
        const planIndex = planHierarchy.indexOf(plan.title);
        // Exclude IGNITE from PRIME upgrade options
        if (selectedPlanForUpgrade === "PRIME" && plan.title === "IGNITE") {
          return false;
        }
        return planIndex > currentPlanIndex;
      })
      .map(plan => {
        const upgradePriceConfig = upgradePrices.find(
          up => up.from === selectedPlanForUpgrade && up.to === plan.title
        );
        const upgradePrice = upgradePriceConfig?.price || 0;
        const upgradePaymentUrl = upgradePriceConfig?.paymentUrl;
        
        return {
          ...plan,
          upgradePrice: upgradePrice,
          upgradePaymentUrl: upgradePaymentUrl,
        };
      });
  }, [selectedPlanForUpgrade, pricingPlans]);

  const handleUpgradeClick = (planTitle: string, planIndex: number) => {
    if (selectedPlanForUpgrade === planTitle) {
      setSelectedPlanForUpgrade(null);
      setSelectedPlanIndex(null);
      shouldScrollUpgradeRef.current = false;
    } else {
      setSelectedPlanForUpgrade(planTitle);
      setSelectedPlanIndex(planIndex);
      // Mark that we should scroll
      shouldScrollUpgradeRef.current = true;
    }
  };

  const handleBoosterClick = (planTitle: string, planIndex: number) => {
    if (selectedPlanForBooster === planTitle) {
      setSelectedPlanForBooster(null);
      setSelectedBoosterPlanIndex(null);
      setSelectedBoosterIndex(null);
      shouldScrollBoosterRef.current = false;
    } else {
      setSelectedPlanForBooster(planTitle);
      setSelectedBoosterPlanIndex(planIndex);
      setSelectedBoosterIndex(null);
      // Mark that we should scroll
      shouldScrollBoosterRef.current = true;
    }
  };

  const handleOptionsClick = (planTitle: string, planIndex: number) => {
    const plan = pricingPlans[planIndex];
    const hasBooster = plan.addOn;
    const planHierarchy = ["PRIME", "IGNITE", "PROFESSIONAL", "EXECUTIVE"];
    const currentPlanIndex = planHierarchy.indexOf(planTitle);
    const hasUpgrade = currentPlanIndex !== -1 && currentPlanIndex < planHierarchy.length - 1 && 
      pricingPlans.some(p => {
        const pIndex = planHierarchy.indexOf(p.title);
        if (planTitle === "PRIME" && p.title === "IGNITE") return false;
        return pIndex > currentPlanIndex;
      });

    // Toggle both options
    if ((selectedPlanForBooster === planTitle && hasBooster) || (selectedPlanForUpgrade === planTitle && hasUpgrade)) {
      // Close both if already open
      setSelectedPlanForBooster(null);
      setSelectedBoosterPlanIndex(null);
      setSelectedBoosterIndex(null);
      setSelectedPlanForUpgrade(null);
      setSelectedPlanIndex(null);
      shouldScrollBoosterRef.current = false;
      shouldScrollUpgradeRef.current = false;
    } else {
      // Open both if available
      if (hasBooster) {
        setSelectedPlanForBooster(planTitle);
        setSelectedBoosterPlanIndex(planIndex);
        setSelectedBoosterIndex(null);
        shouldScrollBoosterRef.current = true;
      }
      if (hasUpgrade) {
        setSelectedPlanForUpgrade(planTitle);
        setSelectedPlanIndex(planIndex);
        shouldScrollUpgradeRef.current = true;
      }
    }
  };

  // Get booster options for the selected plan
  const boosterOptions = useMemo(() => {
    if (!selectedPlanForBooster) return [];
    
    const country = isCanadaContext ? "CA" : "US";
    const planBoosterOptions: Record<string, Record<string, Array<{
      applications: number;
      price: number;
      label: string;
      paymentUrl: string;
    }>>> = {
      US: {
        PRIME: [
          { applications: 250, price: 120, label: "+250 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/5Z872VARCZ6R8" },
          { applications: 500, price: 200, label: "+500 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/QCMVESBD5YL7E" },
          { applications: 1000, price: 350, label: "+1000 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/24YFDJZBTQA5U" },
        ],
        IGNITE: [
          { applications: 250, price: 130, label: "+250 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/ZTFDFLX4LDXRN" },
          { applications: 500, price: 220, label: "+500 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/N9UN59NZ4TCZ6" },
          { applications: 1000, price: 380, label: "+1000 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/5RLLXWWV7KBL2" },
        ],
        PROFESSIONAL: [
          { applications: 250, price: 120, label: "+250 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/95X9FAUHTUPM4" },
          { applications: 500, price: 200, label: "+500 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/58R6C59U8LBMS" },
          { applications: 1000, price: 350, label: "+1000 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/QCQ5JTXK9ZY5L" },
        ],
        EXECUTIVE: [
          { applications: 250, price: 110, label: "+250 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/R3UJGRAV9363A" },
          { applications: 500, price: 190, label: "+500 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/JNJ7Y36YDSGYW" },
          { applications: 1000, price: 330, label: "+1000 Add-On", paymentUrl: "https://www.paypal.com/ncp/payment/2RZEKDPESWA5A" },
        ],
      },
      CA: {
        PRIME: [
          { applications: 250, price: 170, label: "+250 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/PRIME_250_CA_PLACEHOLDER" },
          { applications: 500, price: 280, label: "+500 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/PRIME_500_CA_PLACEHOLDER" },
          { applications: 1000, price: 490, label: "+1000 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/PRIME_1000_CA_PLACEHOLDER" },
        ],
        IGNITE: [
          { applications: 250, price: 180, label: "+250 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/VTDKG7AXSJ75Y" },
          { applications: 500, price: 305, label: "+500 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/EX2YV4CN2WV3L" },
          { applications: 1000, price: 530, label: "+1000 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/X4AC3EKGLV4WN" },
        ],
        PROFESSIONAL: [
          { applications: 250, price: 170, label: "+250 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/GMKAWCJ8TBV4J" },
          { applications: 500, price: 280, label: "+500 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/MMNRPXCKKLFX8" },
          { applications: 1000, price: 490, label: "+1000 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/AA2DZ2ZBUEQSQ" },
        ],
        EXECUTIVE: [
          { applications: 250, price: 155, label: "+250 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/S43ZN9SE6ER6U" },
          { applications: 500, price: 265, label: "+500 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/Y3Q97WGY7HCTW" },
          { applications: 1000, price: 460, label: "+1000 Extra Applications", paymentUrl: "https://www.paypal.com/ncp/payment/NM9683EWP7GKG" },
        ],
      },
    };
    
    return planBoosterOptions[country]?.[selectedPlanForBooster] || [];
  }, [selectedPlanForBooster, isCanadaContext]);

  return (
    <section
      id="pricing"
      className="bg-white py-12 sm:py-16 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 font-['Space_Grotesk',sans-serif] text-center overflow-x-hidden min-h-fit"
    >
      <div id="pricing-heading" className="mx-auto mb-8 sm:mb-12 w-full">
        <h2 className="text-2xl sm:text-3xl md:text-[2.4rem] lg:text-[3rem] font-bold mb-3 sm:mb-4 text-black leading-tight px-2">
          Choose Your Career Acceleration Plan
        </h2>
        <p className="max-w-[35rem] mx-auto text-black text-sm sm:text-base lg:text-[1.1rem] leading-relaxed px-2">
          All plans include our AI-powered job matching and application
          automation.
          <strong> Save 150+ hours monthly</strong> while we work for you 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 items-stretch max-w-7xl mx-auto">
        {pricingPlans.map((plan, index) => (
            <PricingCard
            key={index}
            title={plan.title}
            tag={plan.tag}
            subTitle={plan.subTitle}
            description={plan.description}
            price={plan.price}
            oldPrice={plan.oldPrice}
            features={plan.features}
            addOn={plan.addOn}
            highlight={plan.highlight}
            paymentLink={plan.paymentLink}
            allPlans={pricingPlans}
            onUpgradeClick={(planTitle) => handleUpgradeClick(planTitle, index)}
            isUpgradeOptionsVisible={selectedPlanForUpgrade === plan.title}
            onBoosterClick={(planTitle) => handleBoosterClick(planTitle, index)}
            isBoosterOptionsVisible={selectedPlanForBooster === plan.title}
            onOptionsClick={(planTitle) => handleOptionsClick(planTitle, index)}
            isOptionsVisible={(selectedPlanForBooster === plan.title || selectedPlanForUpgrade === plan.title)}
          />
        ))}
      </div>

      {/* === Options Sections - Below Cards === */}
      {((selectedPlanForBooster !== null && selectedBoosterPlanIndex !== null && boosterOptions.length > 0) || 
        (selectedPlanForUpgrade !== null && selectedPlanIndex !== null && upgradeOptions.length > 0)) && (
        <div className="mb-16 sm:mb-20 lg:mb-24 mt-4 sm:mt-6 px-2 sm:px-0">
          {(() => {
            const boosterPlanIndex = selectedBoosterPlanIndex;
            const upgradePlanIndex = selectedPlanIndex;
            const hasBoth = boosterPlanIndex !== null && upgradePlanIndex !== null && 
                            selectedPlanForBooster !== null && selectedPlanForUpgrade !== null;
            
            // When both are visible, display them full width side by side
            if (hasBoth) {
              return (
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Booster Add-On section */}
                  <div ref={boosterSectionRef} className="flex-1 bg-white border-2 border-[#ff4c00] rounded-[0.4rem] p-3 sm:p-4">
                    <div className="relative mb-3 sm:mb-4">
                      <div className="text-center">
                        <h5 className="text-base sm:text-[1.1rem] font-bold mb-1 text-black">
                          Booster Add-On
                        </h5>
                        <p className="text-xs sm:text-[0.75rem] text-[#666]">
                          Add more applications to boost your reach
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPlanForBooster(null);
                          setSelectedBoosterPlanIndex(null);
                          setSelectedBoosterIndex(null);
                        }}
                        className="absolute top-0 right-0 text-[#ff4c00] font-semibold text-xs hover:underline"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      {boosterOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedBoosterIndex(index);
                            if (option.paymentUrl) {
                              window.open(option.paymentUrl, "_blank");
                            }
                          }}
                          className={`w-full text-left p-1.5 sm:p-2 rounded border-2 transition-all duration-200 ${
                            selectedBoosterIndex === index
                              ? "bg-[#ff4c00] border-[#ff4c00] text-white"
                              : "bg-[#f8f7f6] border-[#f3dfd5] text-black hover:bg-[#f3dfd5]"
                          }`}
                        >
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-[0.7rem] sm:text-xs mb-0.5">
                                {option.label}
                              </div>
                            </div>
                            <div className="font-bold text-[0.7rem] sm:text-xs flex-shrink-0">
                              {currencySymbol}{option.price}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upgrade Plan section */}
                  <div ref={upgradeSectionRef} className="flex-1 bg-white border-2 border-[#ff4c00] rounded-[0.4rem] p-3 sm:p-4">
                    <div className="relative mb-3 sm:mb-4">
                      <div className="text-center">
                        <h5 className="text-base sm:text-[1.1rem] font-bold mb-1 text-black">
                          Upgrade Plan
                        </h5>
                        <p className="text-xs sm:text-[0.75rem] text-[#666]">
                          Upgrade to a higher tier for more applications and features
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPlanForUpgrade(null);
                          setSelectedPlanIndex(null);
                        }}
                        className="absolute top-0 right-0 text-[#ff4c00] font-semibold text-xs hover:underline"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      {upgradeOptions.map((upgradePlan) => (
                        <button
                          key={upgradePlan.title}
                          onClick={() => {
                            const paymentUrl = (upgradePlan as any).upgradePaymentUrl || upgradePlan.paymentLink;
                            if (paymentUrl) {
                              window.open(paymentUrl, "_blank");
                            }
                          }}
                          className="w-full text-left p-1.5 sm:p-2 rounded border-2 transition-all duration-200 bg-white border-[#ff4c00] text-black hover:bg-[#fff4e6]"
                        >
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-[0.7rem] sm:text-xs mb-0.5">
                                {upgradePlan.title}
                              </div>
                              <div className="text-[0.65rem] sm:text-[0.7rem] opacity-90">
                                {upgradePlan.subTitle}
                              </div>
                            </div>
                            <div className="font-bold text-[0.7rem] sm:text-xs flex-shrink-0">
                              {currencySymbol}{(upgradePlan as any).upgradePrice || 0}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            // When only one is visible, center it in the middle
            const planIndex = boosterPlanIndex !== null ? boosterPlanIndex : (upgradePlanIndex !== null ? upgradePlanIndex : 0);
            
            if (planIndex === null) return null;
            
            // Calculate empty columns to center the section (2 columns wide in a 4-column grid)
            const totalColumns = 4;
            const sectionWidth = 2;
            const emptyColumnsBefore = Math.floor((totalColumns - sectionWidth) / 2);
            const emptyColumnsAfter = totalColumns - sectionWidth - emptyColumnsBefore;
            
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
                {/* Empty columns before the section (to center it) */}
                {Array.from({ length: emptyColumnsBefore }).map((_, i) => (
                  <div key={`empty-before-${i}`} />
                ))}
                
                {/* Booster Add-On section (when only booster is visible) */}
                {selectedPlanForBooster !== null && boosterPlanIndex !== null && boosterOptions.length > 0 && (
                  <div ref={boosterSectionRef} className="col-span-1 sm:col-span-2 lg:col-span-2 bg-white border-2 border-[#ff4c00] rounded-[0.4rem] p-3 sm:p-4">
                    <div className="relative mb-3 sm:mb-4">
                      <div className="text-center">
                        <h5 className="text-base sm:text-[1.1rem] font-bold mb-1 text-black">
                          Booster Add-On
                        </h5>
                        <p className="text-xs sm:text-[0.75rem] text-[#666]">
                          Add more applications to boost your reach
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPlanForBooster(null);
                          setSelectedBoosterPlanIndex(null);
                          setSelectedBoosterIndex(null);
                        }}
                        className="absolute top-0 right-0 text-[#ff4c00] font-semibold text-xs hover:underline"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      {boosterOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedBoosterIndex(index);
                            if (option.paymentUrl) {
                              window.open(option.paymentUrl, "_blank");
                            }
                          }}
                          className={`w-full text-left p-1.5 sm:p-2 rounded border-2 transition-all duration-200 ${
                            selectedBoosterIndex === index
                              ? "bg-[#ff4c00] border-[#ff4c00] text-white"
                              : "bg-[#f8f7f6] border-[#f3dfd5] text-black hover:bg-[#f3dfd5]"
                          }`}
                        >
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-[0.7rem] sm:text-xs mb-0.5">
                                {option.label}
                              </div>
                            </div>
                            <div className="font-bold text-[0.7rem] sm:text-xs flex-shrink-0">
                              {currencySymbol}{option.price}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upgrade Plan section (when only upgrade is visible) */}
                {selectedPlanForUpgrade !== null && upgradePlanIndex !== null && upgradeOptions.length > 0 && (
                  <div ref={upgradeSectionRef} className="col-span-1 sm:col-span-2 lg:col-span-2 bg-white border-2 border-[#ff4c00] rounded-[0.4rem] p-3 sm:p-4">
                    <div className="relative mb-3 sm:mb-4">
                      <div className="text-center">
                        <h5 className="text-base sm:text-[1.1rem] font-bold mb-1 text-black">
                          Upgrade Plan
                        </h5>
                        <p className="text-xs sm:text-[0.75rem] text-[#666]">
                          Upgrade to a higher tier for more applications and features
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPlanForUpgrade(null);
                          setSelectedPlanIndex(null);
                        }}
                        className="absolute top-0 right-0 text-[#ff4c00] font-semibold text-xs hover:underline"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      {upgradeOptions.map((upgradePlan) => (
                        <button
                          key={upgradePlan.title}
                          onClick={() => {
                            const paymentUrl = (upgradePlan as any).upgradePaymentUrl || upgradePlan.paymentLink;
                            if (paymentUrl) {
                              window.open(paymentUrl, "_blank");
                            }
                          }}
                          className="w-full text-left p-1.5 sm:p-2 rounded border-2 transition-all duration-200 bg-white border-[#ff4c00] text-black hover:bg-[#fff4e6]"
                        >
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-[0.7rem] sm:text-xs mb-0.5">
                                {upgradePlan.title}
                              </div>
                              <div className="text-[0.65rem] sm:text-[0.7rem] opacity-90">
                                {upgradePlan.subTitle}
                              </div>
                            </div>
                            <div className="font-bold text-[0.7rem] sm:text-xs flex-shrink-0">
                              {currencySymbol}{(upgradePlan as any).upgradePrice || 0}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty columns after the section (to center it) */}
                {Array.from({ length: emptyColumnsAfter }).map((_, i) => (
                  <div key={`empty-after-${i}`} />
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* === Risk-Free Section === */}
      <div className="bg-[rgba(251,240,235,1)] w-full border border-[#ff4c00] mt-12 sm:mt-16 mb-6 sm:mb-8 px-2 sm:px-4">

      <div className="bg-white mt-2.5 mb-2.5 flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 lg:p-8">
          {/* Left Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
            {/* Pixel Art Mascot - on the left */}
            <div className="flex-shrink-0 relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
              <Image
                src="/images/right logo.png"
                alt="Flashfire Mascot"
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center sm:text-left flex-1">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-black">
                100% Risk Free
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-black leading-relaxed font-bold">
                If you didn&rsquo;t land interviews, we&rsquo;ll send{" "}
                <span className="text-[#ff4c00] italic font-bold">
                  150–200 more applications,
                </span>{" "}
                <span className="text-[#ff4c00] italic font-bold">
                  free of charge.
                </span>
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Because at Flashfire, you only pay for progress.
                <br />
                <span className="text-[10px] sm:text-xs font-normal not-italic">
                  *Not applicable to the Prime Plan.
                </span>
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-0 flex-shrink-0 hidden sm:flex">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-black leading-tight">
                Flashfire
              </span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-black leading-tight">
                Guarantee
              </span>
            </div>

            {/* Orange Checkmark in Starburst Icon - on the right */}
            <div className="flex-shrink-0 relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 -ml-4 sm:-ml-6">
              <FlashfireLogo
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
