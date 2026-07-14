"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./promoBanner.module.css";

const SALE_END = (() => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end;
})();

function getTimeLeft() {
  const diff = Math.max(0, SALE_END.getTime() - Date.now());

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

type Props = {
  pricingHref?: string;
};

export default function PromoBanner({ pricingHref = "/pricing" }: Props) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.promoBar}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="white">
        <path d="M10 1l2.39 6.26H19l-5.31 3.86 2.02 6.26L10 13.52l-5.7 3.86 2.02-6.26L1 7.26h6.61L10 1z" />
      </svg>
      <span className={styles.promoLabel}>Anniversary Sale</span>
      <div className={styles.promoDivider} />
      <span className={styles.promoText}>
        Celebrate with us — special anniversary pricing for a limited time.
      </span>
      <div className={styles.promoDivider} />
      <span className={styles.promoEnds}>Ends in</span>
      <div className={styles.timer}>
        <div className={styles.tSeg}>{pad(timeLeft.hours)}</div>
        <span className={styles.tColon}>:</span>
        <div className={styles.tSeg}>{pad(timeLeft.minutes)}</div>
        <span className={styles.tColon}>:</span>
        <div className={styles.tSeg}>{pad(timeLeft.seconds)}</div>
      </div>
      <Link href={pricingHref} className={styles.btnPricing}>
        View Pricing →
      </Link>
    </div>
  );
}
