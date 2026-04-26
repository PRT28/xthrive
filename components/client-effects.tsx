"use client";

import { useEffect } from "react";

export function ClientEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const statEls = Array.from(document.querySelectorAll<HTMLElement>("[data-target]"));

    if (reducedMotion) {
      revealEls.forEach((element) => element.classList.add("visible"));
      statEls.forEach((element) => {
        element.textContent = element.dataset.target ?? element.textContent ?? "";
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("pending");
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const inInitialViewport = rect.top < window.innerHeight * 0.92;

      if (inInitialViewport) {
        element.classList.add("visible");
        return;
      }

      element.classList.add("pending");
      revealObserver.observe(element);
    });

    let statsAnimated = false;
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;

            statEls.forEach((element) => {
              const target = Number(element.dataset.target ?? "0");
              const duration = 1600;
              const step = 16;
              const increment = target / (duration / step);
              let current = 0;

              const timer = window.setInterval(() => {
                current += increment;
                if (current >= target) {
                  current = target;
                  window.clearInterval(timer);
                }
                element.textContent = Math.floor(current).toString();
              }, step);
            });

            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    const statsRoot = document.getElementById("about");
    if (statsRoot) {
      statsObserver.observe(statsRoot);
    }

    return () => {
      revealObserver.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  return null;
}
