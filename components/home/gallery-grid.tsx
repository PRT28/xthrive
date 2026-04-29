"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import styles from "@/components/site.module.css";

const initialImageCount = 9;
type GalleryImage = { src: string; alt: string };

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleImages = expanded ? images : images.slice(0, initialImageCount);
  const hasMore = images.length > initialImageCount;
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const activePosition = activeIndex === null ? 0 : activeIndex + 1;
  const canUsePortal = typeof document !== "undefined";

  const closeCarousel = () => setActiveIndex(null);
  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? images.length - 1 : current - 1;
    });
  };
  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === images.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (current === null) {
            return current;
          }

          return current === 0 ? images.length - 1 : current - 1;
        });
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (current === null) {
            return current;
          }

          return current === images.length - 1 ? 0 : current + 1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  return (
    <div data-reveal data-reveal-state="hidden">
      <div className={styles.communityGrid}>
        {visibleImages.map((image, index) => (
          <button
            key={`${image.src}-${image.alt}-${index}`}
            type="button"
            className={styles.communityCell}
            onClick={() => setActiveIndex(index)}
            aria-label={`Open gallery image ${index + 1} of ${images.length}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className={styles.communityImage}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </button>
        ))}
      </div>

      {hasMore ? (
        <div className={styles.galleryMoreWrap}>
          <button type="button" className={styles.btnOutlineLightSmall} onClick={() => setExpanded((current) => !current)}>
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      ) : null}

      {activeImage && canUsePortal ? createPortal(
        <div className={styles.galleryOverlay} role="dialog" aria-modal="true" aria-label="Gallery carousel">
          <button type="button" className={styles.galleryBackdrop} aria-label="Close gallery" onClick={closeCarousel} />

          <div className={styles.galleryModal}>
            <div className={styles.galleryModalHeader}>
              <div className={styles.galleryCounter}>{activePosition} / {images.length}</div>
              <button type="button" className={styles.galleryClose} aria-label="Close gallery" onClick={closeCarousel}>
                <CloseIcon />
              </button>
            </div>

            <div className={styles.galleryCarousel}>
              <button type="button" className={`${styles.galleryNav} ${styles.galleryNavPrev}`} aria-label="Previous image" onClick={showPrevious}>
                <ChevronLeftIcon />
              </button>

              <div className={styles.galleryImageFrame}>
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className={styles.galleryImageLarge}
                  fill
                  sizes="100vw"
                  priority
                />
              </div>

              <button type="button" className={`${styles.galleryNav} ${styles.galleryNavNext}`} aria-label="Next image" onClick={showNext}>
                <ChevronRightIcon />
              </button>
            </div>

            <div className={styles.galleryMeta}>
              <span>{activeImage.alt}</span>
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
    </svg>
  );
}
