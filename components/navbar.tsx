"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ActionLink } from "@/components/action-link";
import styles from "./site.module.css";

export function Navbar({ content, site }: { content: any; site: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 960) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}
      aria-label="Main navigation"
    >
      <div className={styles.navInner}>
        <Link href="/" className={styles.logoLink} aria-label={`${site.name} Home`}>
          <span className={styles.logoWordmark}>
            <Image src={site.logoSrc} alt={site.logoAlt} width={150} height={150} priority loading="eager" />
          </span>
        </Link>

        <div className={styles.desktopNav}>
          {content.navItems.map((item: any) => (
            <ActionLink key={item.label} action={item.action} className={styles.navLink}>
              {item.label}
            </ActionLink>
          ))}
        </div>

        <div className={styles.desktopCta}>
          <ActionLink
            action={site.instagramAction}
            ariaLabel={`${site.name} on Instagram`}
            className={styles.navIconLink}
          >
            <InstagramIcon />
          </ActionLink>
          <a href={site.phoneLink} aria-label={`Call ${site.name}`} className={styles.navIconLink}>
            <PhoneIcon />
          </a>
          <span className={styles.navDivider} aria-hidden="true" />
          <ActionLink action={content.ctaAction} className={styles.btnPrimary}>
            {content.ctaAction.label}
          </ActionLink>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileMenuInner}>
          {content.navItems.map((item: any) => (
            <ActionLink
              key={item.label}
              action={item.action}
              className={styles.mobileNavLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </ActionLink>
          ))}
          <div className={styles.mobileSocialRow}>
            <ActionLink
              action={site.instagramAction}
              className={styles.mobileSocialLink}
              onClick={() => setMenuOpen(false)}
            >
              <InstagramIcon />
              Instagram
            </ActionLink>
            <a href={site.phoneLink} className={styles.mobileSocialLink} onClick={() => setMenuOpen(false)}>
              <PhoneIcon />
              Call Us
            </a>
          </div>
          <ActionLink
            action={content.ctaAction}
            className={`${styles.btnPrimary} ${styles.mobileMenuCta}`}
            onClick={() => setMenuOpen(false)}
          >
            {content.ctaAction.label}
          </ActionLink>
        </div>
      </div>
    </nav>
  );
}

function MenuIcon() {
  return (
    <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2.03z" />
    </svg>
  );
}
