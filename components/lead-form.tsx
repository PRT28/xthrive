"use client";

import { FormEvent, useState } from "react";
import { ActionLink } from "@/components/action-link";
import styles from "./site.module.css";

type FormState = {
  name: string;
  phone: string;
  interest: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  phone: "",
  interest: "",
  message: "",
};

const validateForm = (form: FormState): FormErrors => {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  }

  if (!form.interest) {
    errors.interest = "Please select an interest.";
  }

  return errors;
};

export function LeadForm({
  content,
  whatsappUrl,
  onSuccess,
}: {
  content: any;
  whatsappUrl: string;
  onSuccess?: () => void;
}) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
    onSuccess?.();

    const msg = encodeURIComponent(
      `Hi, I'm ${form.name}. I filled the form on your website and I'm interested in: ${form.interest}. My phone is ${form.phone}. ${form.message ? `Message: ${form.message}.` : ""}`,
    );

    window.setTimeout(() => {
      window.open(`${whatsappUrl}?text=${msg}`, "_blank", "noopener,noreferrer");
    }, 800);
  };

  if (submitted) {
    return (
      <div className={styles.formSuccess}>
        <div className={styles.successIconWrap}>
          <svg className={styles.successIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={styles.successTitle}>{content.successTitle}</h3>
        <p className={styles.successText}>{content.successText}</p>
        <ActionLink action={content.successAction} className={`${styles.btnPrimary} ${styles.successCta}`}>
          {content.successAction.label}
        </ActionLink>
      </div>
    );
  }

  return (
    <form className={styles.leadForm} onSubmit={onSubmit} noValidate>
      <div className={styles.formGrid}>
        <Field
          id="name"
          label={content.nameLabel}
          type="text"
          value={form.name}
          autoComplete="name"
          error={errors.name}
          onChange={(value) => {
            setForm((current) => ({ ...current, name: value }));
            setErrors((current) => ({ ...current, name: undefined }));
          }}
        />
        <Field
          id="phone"
          label={content.phoneLabel}
          type="tel"
          value={form.phone}
          autoComplete="tel"
          error={errors.phone}
          onChange={(value) => {
            setForm((current) => ({ ...current, phone: value }));
            setErrors((current) => ({ ...current, phone: undefined }));
          }}
        />

        <div className={`${styles.formGroup} ${styles.selectGroup}`}>
          <label htmlFor="interest" className={styles.selectLabel}>
            {content.interestLabel}
          </label>
          <select
            id="interest"
            name="interest"
            className={`${styles.formSelect} ${errors.interest ? styles.formControlInvalid : ""}`}
            required
            aria-invalid={errors.interest ? "true" : undefined}
            aria-describedby={errors.interest ? "interest-error" : undefined}
            value={form.interest}
            onChange={(event) => {
              setForm((current) => ({ ...current, interest: event.target.value }));
              setErrors((current) => ({ ...current, interest: undefined }));
            }}
          >
            <option value="" disabled>
              {content.interestPlaceholder}
            </option>
            {content.options.map((option: { value: string; label: string }) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className={styles.selectIcon}>
            <svg className={styles.chevronIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {errors.interest ? (
            <p id="interest-error" className={styles.formError}>
              {errors.interest}
            </p>
          ) : null}
        </div>

        <Field
          id="message"
          label={content.messageLabel}
          type="text"
          value={form.message}
          autoComplete="off"
          required={false}
          onChange={(value) => setForm((current) => ({ ...current, message: value }))}
        />

        <div>
          <button type="submit" className={`${styles.btnPrimary} ${styles.formSubmit}`}>
            {content.submitLabel}
          </button>
          <p className={styles.formNote}>{content.note}</p>
        </div>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type,
  value,
  autoComplete,
  required = true,
  error,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  autoComplete: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.formGroup}>
      <input
        id={id}
        name={id}
        type={type}
        className={`${styles.formInput} ${error ? styles.formControlInvalid : ""}`}
        placeholder={label}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      {error ? (
        <p id={`${id}-error`} className={styles.formError}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
