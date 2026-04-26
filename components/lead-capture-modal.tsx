"use client";

import { useEffect, useState } from "react";
import { LeadForm } from "@/components/lead-form";
import styles from "@/components/site.module.css";

const DISMISSED_KEY = "xthrive-lead-capture-dismissed";
const SUBMITTED_KEY = "xthrive-lead-capture-submitted";

export function LeadCaptureModal({
  content,
  leadForm,
  whatsappUrl,
}: {
  content: any;
  leadForm: any;
  whatsappUrl: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return;
  }, []);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ modalId?: string }>;

      if (customEvent.detail?.modalId === content.modalId) {
        setIsOpen(true);
      }
    };

    window.addEventListener("xthrive:open-modal", handleOpen);

    return () => {
      window.removeEventListener("xthrive:open-modal", handleOpen);
    };
  }, [content.modalId]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.sessionStorage.setItem(DISMISSED_KEY, "true");
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const close = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setIsOpen(false);
  };

  const handleSuccess = () => {
    window.sessionStorage.setItem(SUBMITTED_KEY, "true");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.leadCaptureBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-capture-title"
      onClick={close}
    >
      <div className={styles.leadCaptureModal} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.leadCaptureClose} aria-label="Close lead capture form" onClick={close}>
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.leadCaptureHeader}>
          <div className={styles.sectionLabel}>{content.sectionLabel}</div>
          <h2 id="lead-capture-title" className={styles.leadCaptureTitle}>
            {content.title}
          </h2>
          <p className={styles.leadCaptureText}>{content.text}</p>
        </div>

        <LeadForm content={leadForm} whatsappUrl={whatsappUrl} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
