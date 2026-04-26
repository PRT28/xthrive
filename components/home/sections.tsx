import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ActionLink } from "@/components/action-link";
import { LeadForm } from "@/components/lead-form";
import { GalleryGrid } from "@/components/home/gallery-grid";
import styles from "@/components/site.module.css";

export function AboutSection({ content }: { content: any }) {
  return (
    <section id="about" aria-label="Stats and brand philosophy">
      <div className={styles.statsStrip} data-count-section>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {content.stats.map((item: any, index: number) => (
              <div
                key={`${item.label}-${index}`}
                className={styles.statCard}
                data-reveal
                data-reveal-state="hidden"
                data-reveal-delay={index > 0 ? String(index) : undefined}
              >
                <div className={styles.statValueWrap}>
                  <span
                    className={styles.statNum}
                    data-count-target={item.suffix === "★" ? undefined : item.value}
                  >
                    {item.suffix === "★" ? item.value : "0"}
                  </span>
                  {item.suffix === "+" ? <span className={styles.statPlus}>+</span> : null}
                  {item.suffix === "★" ? <span className={styles.statStar}>★</span> : null}
                </div>
                <span className={styles.statLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.philosophySection}>
        <div className={styles.narrowContainer}>
          <div className={styles.philosophyGrid}>
            <div data-reveal data-reveal-state="hidden">
              <div className={styles.sectionLabel}>{content.sectionLabel}</div>
              <h2 className={styles.sectionTitle}>
                {content.titleLines.map((line: string) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>
              <div className={styles.accentBar} />
              {content.paragraphs.map((paragraph: string) => (
                <p key={paragraph} className={styles.bodyLarge}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div data-reveal data-reveal-state="hidden" data-reveal-delay="1">
              {content.infoBlocks.map((block: any) => (
                <div
                  key={block.title}
                  className={`${styles.infoBlock} ${block.muted ? styles.infoBlockMuted : ""}`}
                >
                  <h3 className={styles.infoTitle}>{block.title}</h3>
                  <p className={styles.bodyText}>{block.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ResultsSection({ content }: { content: any }) {
  return (
    <section className={`${styles.resultsSection} ${styles.grain}`} aria-label="Member results timeline">
      <div className={styles.container}>
        <div data-reveal data-reveal-state="hidden">
          <div
            style={{ width: "100%", textAlign: "center" }}
            className={`${styles.sectionLabel} ${styles.sectionLabelCentered} ${styles.sectionLabelMuted}`}
          >
            {content.sectionLabel}
          </div>
          <h2 style={{ width: "100%", textAlign: "center" }} className={styles.centerTitle}>
            {content.titleLines.map((line: string) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <div className={`${styles.accentBar} ${styles.centerAccent}`} />
          <p className={styles.centerText}>{content.intro}</p>
        </div>

        <div style={{ marginTop: "42px" }} className={styles.resultsGrid}>
          {content.items.map((item: any, index: number) => (
            <div
              key={`${item.top}-${item.bottom}`}
              className={styles.resultItem}
              data-reveal
              data-reveal-state="hidden"
              data-reveal-delay={index % 2 === 1 ? "1" : undefined}
            >
              <div className={styles.resultLabel}>
                <span className={styles.resultTop}>{item.top}</span>
                <span className={styles.resultBottom}>{item.bottom}</span>
              </div>
              <div className={styles.resultDesc}>{item.description}</div>
            </div>
          ))}
        </div>

        <div className={styles.centerCta} data-reveal data-reveal-state="hidden">
          <ActionLink action={content.cta} className={styles.btnPrimary}>
            {content.cta.label}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

export function ClassesSection({ content }: { content: any }) {
  return (
    <section
      id="services"
      className={styles.classesSection}
      aria-label="Group fitness classes at Xthrive HSR Layout Bangalore"
    >
      <div className={styles.container}>
        <div className={styles.classesHeaderBlock}>
          <div className={styles.classesTop} data-reveal data-reveal-state="hidden">
            <div>
              <div className={styles.sectionLabel}>{content.sectionLabel}</div>
              <h2 className={styles.classesTitle}>
                {content.titleLines.map((line: string) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>
            </div>
            <p className={styles.classesIntro}>
              {content.intro.split("\n").map((line: string) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div className={styles.quickStats} data-reveal data-reveal-state="hidden">
            {content.quickStats.map((item: any) => (
              <div key={item.label} className={styles.quickStat}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div itemScope itemType="https://schema.org/ItemList" className={styles.visuallyHidden}>
          <meta itemProp="name" content="Group Fitness Class Types at Xthrive HSR Layout Bangalore" />
          <meta itemProp="numberOfItems" content={String(content.items.length)} />
        </div>

        <div className={styles.classGrid}>
          {content.items.map((item: any, index: number) => (
            <article
              key={item.index}
              className={`${styles.classCard} ${item.featured ? styles.classCardFeatured : ""}`}
              itemScope
              itemType="https://schema.org/Service"
              tabIndex={0}
              data-reveal
              data-reveal-state="hidden"
              data-reveal-delay={index % 3 === 1 ? "1" : index % 3 === 2 ? "2" : undefined}
            >
              <meta itemProp="name" content={`${item.title.replace("\n", " ")} – Xthrive HSR Layout Bangalore`} />
              <meta itemProp="description" content={item.description} />

              <Image
                src={item.image}
                alt={item.alt}
                className={styles.classImage}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              <div className={styles.classOverlay} />
              <div className={styles.classTint} />
              <div className={styles.classArrow}>
                <div className={styles.classArrowButton}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.classArrowIcon}>
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
              </div>

              <div className={styles.classContent}>
                <div className={styles.classTopRow}>
                  <span className={styles.classIndex}>{item.index}</span>
                  <div className={styles.classBadges}>
                    {item.featured ? <span className={styles.badgeStrong}>★ Exclusive</span> : null}
                    <span className={styles.badgePill}>{item.badgeOne}</span>
                    <span className={styles.badgeSoft}>{item.badgeTwo}</span>
                  </div>
                </div>

                <div className={styles.classBody}>
                  {item.featured ? <div className={styles.classKicker}>Signature Weekend Session</div> : null}
                  <h3 className={styles.classTitle}>
                    {item.title.split("\n").map((line: string) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </h3>
                  <p className={styles.classText}>{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.classFooter} data-reveal data-reveal-state="hidden">
          <p className={styles.classFooterText}>{content.footerText}</p>
          
        </div>
      </div>
    </section>
  );
}

export function TransformationsSection({ content }: { content: any }) {
  return (
    <section id="transformations" className={styles.transformationsSection} aria-label="Member transformations">
      <div className={styles.container}>
        <div className={styles.transformationsHeader} data-reveal data-reveal-state="hidden">
          <div>
            <div className={styles.sectionLabel}>{content.sectionLabel}</div>
            <h2 className={styles.sectionTitle}>
              {content.titleLines.map((line: string) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
          </div>
          <p className={styles.mutedText}>{content.intro}</p>
        </div>
      </div>

      <div className={styles.transformationRailWrap}>
        <div className={styles.transformationRail}>
          {content.items.map((item: any, index: number) => (
            <article
              key={item.name}
              className={styles.transformationRailCard}
              data-reveal
              data-reveal-state="hidden"
              data-reveal-delay={String(Math.min(index, 3))}
            >
              <Image
                src={item.image}
                alt={item.alt}
                className={styles.transformationImage}
                fill
                sizes="(min-width: 768px) 320px, 85vw"
              />
              <div className={styles.transformationOverlay} />
              <div className={styles.transformationContent}>
                <div className={styles.stars}>★★★★★</div>
                <h3 className={styles.transformationName}>{item.name}</h3>
                <p className={styles.transformationMeta}>{item.meta}</p>
                <p className={styles.transformationText}>&quot;{item.body}&quot;</p>
                <span className={styles.transformationTag}>{item.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.centerCta} data-reveal data-reveal-state="hidden">
          <ActionLink action={content.cta} className={styles.btnDark}>
            {content.cta.label}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection({ content }: { content: any }) {
  return (
    <section id="reviews" className={styles.reviewsSection} aria-label="Google reviews">
      <div className={styles.container}>
        <div className={styles.reviewsHeader} data-reveal data-reveal-state="hidden">
          <div className={`${styles.sectionLabel} ${styles.sectionLabelCentered}`}>{content.sectionLabel}</div>
          <h2 className={styles.sectionTitle}>{content.title}</h2>
          <p className={styles.mutedText}>{content.intro}</p>
        </div>

        <div className={styles.reviewsGrid}>
          {content.items.map((review: any, index: number) => (
            <article
              key={review.name}
              className={styles.reviewCard}
              data-reveal
              data-reveal-state="hidden"
              data-reveal-delay={String(index)}
            >
              <div className={styles.reviewTop}>
                <div className={styles.avatar} style={{ background: review.color }}>
                  {review.initial}
                </div>
                <div>
                  <div className={styles.reviewName}>{review.name}</div>
                  <div className={styles.reviewDate}>{review.date}</div>
                </div>
                <div className={styles.googleIconWrap}>
                  <GoogleIcon />
                </div>
              </div>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.reviewText}>&quot;{review.body}&quot;</p>
            </article>
          ))}
        </div>

        <div className={styles.centerCta} data-reveal data-reveal-state="hidden">
          <ActionLink action={content.googleAction} className={styles.googleLink}>
            <GoogleIcon />
            {content.googleAction.label}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

export function CommunitySection({ content }: { content: any }) {
  return (
    <section id="gallery" className={`${styles.communitySection} ${styles.grain}`} aria-label="Xthrive gallery">
      <div className={styles.narrowContainer}>
        <div className={styles.communityWrap}>
          <div className={styles.communityLead} data-reveal data-reveal-state="hidden">
            <div className={`${styles.sectionLabel} ${styles.sectionLabelMuted}`}>{content.sectionLabel}</div>
            <h2 className={styles.communityTitle}>
              {content.titleLines.map((line: string) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <div className={styles.accentBar} />
            {content.paragraphs.map((paragraph: string) => (
              <p key={paragraph} className={styles.communityText}>
                {paragraph}
              </p>
            ))}
          </div>

          <GalleryGrid images={content.images} />
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ content, leadForm, site }: { content: any; leadForm: any; site: any }) {
  const whatsappUrl = new URL(site.whatsappAction.url);
  whatsappUrl.search = "";

  return (
    <section id="contact" className={styles.contactSection} aria-label={`Contact ${site.name}`}>
      <div className={styles.container}>
        <div className={styles.contactHeader} data-reveal data-reveal-state="hidden">
          <div className={`${styles.sectionLabel} ${styles.sectionLabelCentered}`}>{content.sectionLabel}</div>
          <h2 className={styles.sectionTitle}>
            {content.titleLines.map((line: string) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p className={styles.mutedText}>{content.intro}</p>
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.contactCard} data-reveal data-reveal-state="hidden">
            <LeadForm content={leadForm} whatsappUrl={whatsappUrl.toString()} />
          </div>

          <div className={styles.contactInfoColumn} data-reveal data-reveal-state="hidden" data-reveal-delay="1">
            <div className={styles.mapFrameWrap}>
              <iframe
                src={site.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${site.name} Location`}
                className={styles.mapFrame}
              />
            </div>

            <address className={styles.addressList}>
              <ContactItem icon={<LocationIcon />} label={content.addressLabel}>
                <>
                  {site.addressLine1}
                  <br />
                  {site.addressLine2}
                  <br />
                  <ActionLink action={content.addressCta} className={styles.contactTextLink}>
                    {content.addressCta.label}
                  </ActionLink>
                </>
              </ContactItem>

              <ContactItem icon={<PhoneIcon />} label={content.phoneLabel}>
                <a href={site.phoneLink} className={styles.contactTextLink}>
                  {site.phoneDisplay}
                </a>
              </ContactItem>

              <ContactItem icon={<WhatsAppSmallIcon />} label={content.whatsappLabel} bg="rgba(37,211,102,0.12)" color="#25D366">
                <ActionLink action={content.whatsappCta} className={styles.contactTextLink}>
                  {content.whatsappCta.label}
                </ActionLink>
              </ContactItem>

              <ContactItem icon={<ClockIcon />} label={content.hoursLabel}>
                <>
                  {content.hours.map((item: string) => (
                    <span key={item}>
                      {item}
                      <br />
                    </span>
                  ))}
                </>
              </ContactItem>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ content }: { content: any }) {
  return (
    <section id="faq" className={styles.faqSection} aria-label="Frequently asked questions">
      <div className={styles.faqContainer}>
        <div className={styles.faqHeader} data-reveal data-reveal-state="hidden">
          <div className={`${styles.sectionLabel} ${styles.sectionLabelCentered}`}>{content.sectionLabel}</div>
          <h2 className={styles.sectionTitle}>
            {content.titleLines.map((line: string) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p className={styles.mutedText}>{content.intro}</p>
        </div>

        <div className={styles.faqItems} data-reveal data-reveal-state="hidden">
          {content.items.map((item: any) => (
            <details key={item.question} className={styles.faqItem}>
              <summary className={styles.faqSummary}>
                <span>{item.question}</span>
                <span className={styles.faqIcon}>
                  <PlusIcon />
                </span>
              </summary>
              <div className={styles.faqAnswer}>{item.answer}</div>
            </details>
          ))}
        </div>

        <div className={styles.faqFooter} data-reveal data-reveal-state="hidden">
          <p className={styles.mutedText}>{content.footerText}</p>
          <ActionLink action={content.footerAction} className={styles.btnDark}>
            {content.footerAction.label}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

export function FooterSection({ content, site }: { content: any; site: any }) {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrandBlock}>
            <Link href="/" className={styles.logoLink} aria-label={`${site.name} Home`}>
              <span className={styles.logoWordmark}>
                <Image src={site.logoSrc} alt={site.logoAlt} width={150} height={150} />
              </span>
            </Link>
            <p className={styles.footerCopy}>{content.brandCopy}</p>
            <div className={styles.footerSocials}>
              <ActionLink
                action={site.instagramAction}
                className={styles.footerSocialLink}
                ariaLabel={`${site.name} Instagram`}
              >
                <InstagramFillIcon />
              </ActionLink>
              <ActionLink
                action={site.whatsappAction}
                className={styles.footerSocialLink}
                ariaLabel={`${site.name} WhatsApp`}
              >
                <WhatsAppBrandIcon />
              </ActionLink>
              <ActionLink
                action={site.linkedinAction}
                className={styles.footerSocialLink}
                ariaLabel={`${site.name} LinkedIn`}
              >
                <LinkedInBrandIcon />
              </ActionLink>
            </div>
          </div>

          <div>
            <div className={styles.footerHeading}>Quick Links</div>
            <ul className={styles.footerList}>
              {content.quickLinks.map((item: any) => (
                <li key={item.label}>
                  <ActionLink action={item.action} className={styles.footerLink}>
                    {item.label}
                  </ActionLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={styles.footerHeading}>Contact</div>
            <ul className={styles.footerList}>
              <li>
                <ActionLink action={site.whatsappAction.type === "external-link" ? { ...site.whatsappAction, url: site.mapUrl, label: site.addressLine2 } : site.whatsappAction} className={styles.footerLink}>
                  {`${site.addressLine1}, ${site.addressLine2}`}
                </ActionLink>
              </li>
              <li>
                <a href={site.phoneLink} className={styles.footerLink}>
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={styles.footerLink}>
                  {site.email}
                </a>
              </li>
              <li>
                <ActionLink action={site.whatsappAction} className={styles.footerLink}>
                  {site.whatsappAction.label} →
                </ActionLink>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerMeta}>{site.copyrightText}</p>
          <p className={styles.footerMeta}>{site.footerMeta}</p>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({
  icon,
  label,
  children,
  bg = "rgba(74,140,140,0.12)",
  color = "#4A8C8C",
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  bg?: string;
  color?: string;
}) {
  return (
    <div className={styles.contactItem}>
      <div className={styles.contactIconWrap} style={{ background: bg, color }}>
        {icon}
      </div>
      <div>
        <div className={styles.contactLabel}>{label}</div>
        <div className={styles.contactText}>{children}</div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className={styles.googleIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.8 19.8 0 011.62 3.33 2 2 0 013.6 1.27h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11l-.95.95a16 16 0 006.18 6.18l.95-.95a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"
      />
    </svg>
  );
}

function WhatsAppSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 7v5l3 2" />
    </svg>
  );
}

function InstagramFillIcon() {
  return (
    <svg className={styles.footerSocialIcon} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="instagramGradient" x1="2" x2="22" y1="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.25" stopColor="#FA7E1E" />
          <stop offset="0.5" stopColor="#D62976" />
          <stop offset="0.75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <path fill="url(#instagramGradient)" d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm8.5 1.5h-8.5A4.25 4.25 0 003.5 7.75v8.5a4.25 4.25 0 004.25 4.25h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5A3.5 3.5 0 1015.5 12 3.5 3.5 0 0012 8.5zm5.5-2.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
    </svg>
  );
}

function WhatsAppBrandIcon() {
  return (
    <svg className={styles.footerSocialIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#25D366" d="M12.05 2C6.56 2 2.1 6.45 2.1 11.94c0 1.75.46 3.46 1.33 4.97L2 22l5.22-1.37a9.92 9.92 0 004.83 1.23h.01c5.49 0 9.95-4.45 9.95-9.94C22 6.45 17.54 2 12.05 2z" />
      <path fill="#FFFFFF" d="M17.82 14.92c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.75-1.79-.19-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.52.07.46-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

function LinkedInBrandIcon() {
  return (
    <svg className={styles.footerSocialIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#0A66C2" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28zM5.32 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.1 20.45H3.53V9H7.1v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}
