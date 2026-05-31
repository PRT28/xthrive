"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/components/site.module.css";

export function ClassCard({ item, index }: { item: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tapMode, setTapMode] = useState(false);

  useEffect(() => {
    const updateTapMode = () => {
      setTapMode(window.matchMedia("(max-width: 767px), (hover: none), (pointer: coarse)").matches);
    };

    updateTapMode();
    window.addEventListener("resize", updateTapMode);

    return () => window.removeEventListener("resize", updateTapMode);
  }, []);

  return (
    <article
      key={item.index}
      className={`${styles.classCard} ${item.featured ? styles.classCardFeatured : ""} ${
        tapMode && isOpen ? styles.classCardOpen : ""
      }`}
      itemScope
      itemType="https://schema.org/Service"
      role="button"
      tabIndex={0}
      data-reveal
      data-reveal-state="hidden"
      data-reveal-delay={index % 3 === 1 ? "1" : index % 3 === 2 ? "2" : undefined}
      aria-expanded={isOpen}
      onClick={() => {
        if (tapMode) {
          setIsOpen((open) => !open);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsOpen((open) => !open);
        }
      }}
    >
      <meta itemProp="name" content={`${item.title.replace("\n", " ")} - Xthrive HSR Layout Bangalore`} />
      <meta itemProp="description" content={item.description} />

      <Image
        src={item.image}
        alt={item.alt}
        className={styles.classImage}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className={styles.classOverlay} />
      <div className={styles.classTint} />

      <div className={styles.classContent}>
        <div className={styles.classTopRow}>
          <span className={styles.classIndex}>{item.index}</span>
          <div className={styles.classBadges}>
            {item.featured ? <span className={styles.badgeStrong}>★ Exclusive</span> : null}
            <span className={styles.badgePill}>{item.badgeOne}</span>
            <span className={styles.badgeSoft}>{item.badgeTwo}</span>
          </div>
        </div>

        <div className={styles.classBody}>
          <h3 className={styles.classTitle}>
            {item.title.split("\n").map((line: string) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h3>
          <p className={styles.classText}>{item.description}</p>
        </div>
      </div>
    </article>
  );
}
