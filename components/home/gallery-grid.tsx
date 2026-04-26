"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/components/site.module.css";

const initialImageCount = 3;

export function GalleryGrid({ images }: { images: Array<{ src: string; alt: string }> }) {
  const [expanded, setExpanded] = useState(false);
  const visibleImages = expanded ? images : images.slice(0, initialImageCount);
  const hasMore = images.length > initialImageCount;

  return (
    <div data-reveal data-reveal-state="hidden">
      <div className={styles.communityGrid}>
        {visibleImages.map((image, index) => (
          <div key={`${image.src}-${image.alt}-${index}`} className={styles.communityCell}>
            <Image
              src={image.src}
              alt={image.alt}
              className={styles.communityImage}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        ))}
      </div>

      {hasMore ? (
        <div className={styles.galleryMoreWrap}>
          <button type="button" className={styles.btnOutlineLightSmall} onClick={() => setExpanded((current) => !current)}>
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
