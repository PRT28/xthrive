"use client";

import type { MouseEvent, ReactNode } from "react";
import type { SiteAction } from "@/lib/site-content-schema";

type Props = {
  action: SiteAction;
  className?: string;
  children?: ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
};

export function ActionLink({ action, className, children, ariaLabel, onClick }: Props) {
  const label = children ?? action.label;

  const handleModalClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (action.type !== "open-modal") {
      return;
    }

    window.dispatchEvent(
      new CustomEvent("xthrive:open-modal", {
        detail: { modalId: action.modalId },
      }),
    );
    onClick?.();
  };

  if (action.type === "open-modal") {
    return (
      <button type="button" className={className} aria-label={ariaLabel} onClick={handleModalClick}>
        {label}
      </button>
    );
  }

  if (action.type === "section-link") {
    return (
      <a href={`#${action.sectionId}`} className={className} aria-label={ariaLabel} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <a
      href={action.url}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      target={action.newTab ? "_blank" : undefined}
      rel={action.newTab ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}
