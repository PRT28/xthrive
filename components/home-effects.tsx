"use client";

import { useEffect } from "react";

export function HomeEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const counterElements = Array.from(document.querySelectorAll<HTMLElement>("[data-count-target]"));
    const parallaxScenes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-scene]"));
    const parallaxLayers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-layer]"));

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

    let pointerX = 0;
    let pointerY = 0;
    let animationFrame: number | undefined;

    const updateParallax = () => {
      animationFrame = undefined;

      parallaxLayers.forEach((layer) => {
        const depth = Number.parseFloat(layer.dataset.parallaxDepth || "0.08");
        const rect = layer.getBoundingClientRect();
        const viewportOffset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * depth;
        const x = pointerX * depth * 24;
        const y = viewportOffset + pointerY * depth * 24;

        layer.style.setProperty("--parallax-x", `${x.toFixed(2)}px`);
        layer.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
      });
    };

    const scheduleParallax = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateParallax);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
      scheduleParallax();
    };

    if (parallaxScenes.length > 0) {
      window.addEventListener("scroll", scheduleParallax, { passive: true });
      window.addEventListener("resize", scheduleParallax);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      scheduleParallax();
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
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", scheduleParallax);
      window.removeEventListener("pointermove", onPointerMove);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return null;
}
