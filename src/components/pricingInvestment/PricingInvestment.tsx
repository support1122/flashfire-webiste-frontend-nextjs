"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./PricingInvestment.module.css";

const workingDaysPerMonth = 25;
const minutesPerManualApplication = 20;
const flashfireResponseMultiplier = 2.8;
const maxFlashfireResponseRate = 50;

const sliderStyle = (value: number, min: number, max: number) =>
  ({
    "--slider-progress": `${((value - min) / (max - min)) * 100}%`,
  } as CSSProperties);

export default function PricingInvestment() {
  const [applicationsPerDay, setApplicationsPerDay] = useState(20);
  const [companyResponseRate, setCompanyResponseRate] = useState(10);

  const results = useMemo(() => {
    const monthlyApplications = applicationsPerDay * workingDaysPerMonth;
    const timeSavedHours = Math.round(
      (monthlyApplications * minutesPerManualApplication) / 60
    );
    const flashfireResponseRate = Math.min(
      maxFlashfireResponseRate,
      Math.round(companyResponseRate * flashfireResponseMultiplier)
    );

    return {
      flashfireResponseRate,
      monthlyApplications,
      timeSavedHours,
    };
  }, [applicationsPerDay, companyResponseRate]);

  return (
    <section className={styles.section} aria-labelledby="pricing-investment-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="pricing-investment-title">
            See How Much Time You Save with{" "}
            <span>FlashFire</span>
          </h2>
          <p>
            Adjust your job hunt volume and company response rate to see the
            difference instantly.
          </p>
        </header>

        <div className={styles.calculator}>
          <div className={styles.controls} aria-label="FlashFire savings calculator">
            <label className={styles.sliderGroup}>
              <span className={styles.sliderLabel}>
                Applications you fill in a day
              </span>
              <div className={styles.sliderRow}>
                <div className={styles.rangeWrap}>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={applicationsPerDay}
                    onChange={(event) =>
                      setApplicationsPerDay(Number(event.target.value))
                    }
                    style={sliderStyle(applicationsPerDay, 1, 100)}
                    aria-label="Applications you fill in a day"
                  />
                  <div className={styles.rangeLimits}>
                    <span>1</span>
                    <span>100</span>
                  </div>
                </div>
                <strong className={styles.valueBlock}>
                  {applicationsPerDay}
                  <span>/ day</span>
                </strong>
              </div>
            </label>

            <label className={styles.sliderGroup}>
              <span className={styles.sliderLabel}>
                Response rate from companies (%)
              </span>
              <div className={styles.sliderRow}>
                <div className={styles.rangeWrap}>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={companyResponseRate}
                    onChange={(event) =>
                      setCompanyResponseRate(Number(event.target.value))
                    }
                    style={sliderStyle(companyResponseRate, 1, 50)}
                    aria-label="Response rate from companies"
                  />
                  <div className={styles.rangeLimits}>
                    <span>1%</span>
                    <span>50%</span>
                  </div>
                </div>
                <strong className={styles.valueBlock}>
                  {companyResponseRate}
                  <span>%</span>
                </strong>
              </div>
            </label>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <aside className={styles.results} aria-live="polite">
            <span className={styles.resultBadge}>Your Results</span>
            <div className={styles.resultMetric}>
              <strong>{results.timeSavedHours} hours</strong>
              <span>saved from manual applications each month</span>
            </div>
            <div className={styles.responseMetric}>
              <strong>{results.flashfireResponseRate}%</strong>
              <span>estimated company response rate with FlashFire</span>
            </div>
            <p className={styles.resultNote}>
              Based on {results.monthlyApplications.toLocaleString()} targeted
              applications per month, with FlashFire applying consistently while
              you focus on interviews.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
