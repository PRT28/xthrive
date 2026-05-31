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
              ariaLabel={`${site.name} on Instagram`}
              onClick={() => setMenuOpen(false)}
            >
              <InstagramIcon />
            </ActionLink>
            <a
              href={site.phoneLink}
              className={styles.mobileSocialLink}
              aria-label={`Call ${site.name}`}
              onClick={() => setMenuOpen(false)}
            >
              <PhoneIcon />
            </a>
            <ActionLink
              action={site.whatsappAction}
              className={styles.mobileSocialLink}
              ariaLabel={`WhatsApp ${site.name}`}
              onClick={() => setMenuOpen(false)}
            >
              <WhatsAppIcon />
            </ActionLink>
          </div>
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

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
  );
}
