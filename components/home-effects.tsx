"use client";

import { useEffect } from "react";

export function HomeEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const counterElements = Array.from(document.querySelectorAll<HTMLElement>("[data-count-target]"));

    const showAll = () => {
      revealElements.forEach((element) => {
        element.setAttribute("data-reveal-state", "visible");
      });

      counterElements.forEach((element) => {
        const target = element.getAttribute("data-count-target");
        if (target) {
          element.textContent = target;
        }
      });
    };

    if (prefersReducedMotion) {
      showAll();
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.setAttribute("data-reveal-state", "visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    let countersAnimated = false;
    const runCounters = () => {
      if (countersAnimated) {
        return;
      }

      countersAnimated = true;

      counterElements.forEach((element) => {
        const rawTarget = element.getAttribute("data-count-target");
        const target = rawTarget ? Number.parseInt(rawTarget, 10) : 0;
        const duration = 1600;
        const stepDuration = 16;
        const increment = target / (duration / stepDuration);
        let current = 0;

        const timer = window.setInterval(() => {
          current += increment;

          if (current >= target) {
            current = target;
            window.clearInterval(timer);
          }

          element.textContent = String(Math.floor(current));
        }, stepDuration);
      });
    };

    const counterAnchor = document.querySelector<HTMLElement>("[data-count-section]") ?? counterElements[0];
    let counterObserver: IntersectionObserver | undefined;

    if (counterAnchor) {
      counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            runCounters();
            counterObserver?.disconnect();
          });
        },
        { threshold: 0.5 },
      );

      counterObserver.observe(counterAnchor);
    }

    return () => {
      revealObserver.disconnect();
      counterObserver?.disconnect();
    };
  }, []);

  return null;
}
