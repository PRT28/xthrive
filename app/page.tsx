import { Navbar } from "@/components/navbar";
import { HomeEffects } from "@/components/home-effects";
import { LeadCaptureModal } from "@/components/lead-capture-modal";
import { ActionLink } from "@/components/action-link";
import { getGoogleReviews } from "@/lib/google-reviews";
import {
  AboutSection,
  ClassesSection,
  CommunitySection,
  ContactSection,
  FaqSection,
  FooterSection,
  ResultsSection,
  ReviewsSection,
} from "@/components/home/sections";
import styles from "@/components/site.module.css";
import { readSiteContent } from "@/lib/site-content";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["GymOrHealthClub", "LocalBusiness"],
  name: "Xthrive HSR",
  alternateName: "Xthrive Functional Fitness HSR Layout",
  description:
    "Xthrive HSR is HSR Layout's premier strength and conditioning gym. We offer group functional fitness classes, progressive strength programming, and the Saturday Barbell Club — for every level from complete beginner to competitive athlete.",
  url: "https://xthrive.in",
  telephone: "+91-89510-49082",
  email: "coachsharanchinivar@gmail.com",
  priceRange: "₹₹",
  image: "https://xthrive.in/og-image.jpg",
  logo: "https://xthrive.in/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4th Floor, No.446, 17th Cross Rd, above HDFC Bank, Sector 4, HSR Layout",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560102",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9121,
    longitude: 77.6446,
  },
  hasMap:
    "https://maps.google.com/?q=4th+Floor,+No.446,+17th+Cross+Rd,+above+HDFC+Bank,+Sector+4,+HSR+Layout,+Bengaluru,+Karnataka+560102",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
};

const heroVideoId = "NtA-Nhyv_rE";
const heroVideoUrl = `https://www.youtube-nocookie.com/embed/${heroVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroVideoId}&playsinline=1&modestbranding=1&rel=0`;

export const revalidate = 43200;

export default async function HomePage() {
  const content = await readSiteContent<any>();
  const reviews = await getGoogleReviews(content.reviews);
  const whatsappUrl = new URL(content.site.whatsappAction.url);
  whatsappUrl.search = "";

  return (
    <main className={styles.page}>
      <Navbar content={content.navbar} site={content.site} />
      <HomeEffects />
      <LeadCaptureModal
        content={content.leadCaptureModal}
        leadForm={content.leadForm}
        whatsappUrl={whatsappUrl.toString()}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ActionLink
        action={content.site.instagramAction}
        className={styles.whatsappFloat}
        ariaLabel={`${content.site.name} Instagram`}
      >
        <InstagramIcon />
      </ActionLink>

      <section className={`${styles.hero} ${styles.grain}`} aria-label="Hero">
        <div className={styles.heroBg} />

        <div className={styles.heroVideoWrap} aria-hidden="true">
          <iframe
            className={styles.heroVideo}
            src={heroVideoUrl}
            title="Xthrive hero background video"
            aria-hidden="true"
            tabIndex={-1}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className={styles.heroOverlay} />

        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroCopy}>
              <div className={styles.locationBadge}>
                <LocationIcon />
                <span className={styles.locationText}>{content.hero.locationText}</span>
              </div>

              <h1 className={styles.heroTitle}>
                {content.hero.titleLines.map((line: string) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                <span className={styles.heroAccent}>{content.hero.accentLine}</span>
              </h1>

              <p className={styles.heroSubtitle}>{content.hero.subtitle}</p>
              <div className={styles.ratingRow}>
                <span className={styles.ratingScore} aria-label="4.9 stars on Google">
                  4.9<span className={styles.ratingStar}>★</span>
                </span>
                <span className={styles.ratingText}>on</span>
                <GoogleBrandIcon />
              </div>

              <div className={styles.heroCtas}>
                {content.hero.actions.map((action: any, index: number) => (
                  <ActionLink
                    key={`${action.label}-${index}`}
                    action={action}
                    className={index === 0 ? styles.btnPrimary : styles.btnOutline}
                  >
                    {action.label}
                    {index === 0 ? <ArrowIcon /> : null}
                  </ActionLink>
                ))}
              </div>

              <div className={styles.scrollCue}>
                <span className={styles.scrollLine} />
                <span className={styles.scrollText}>{content.hero.scrollText}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutSection content={content.about} />
      <ResultsSection content={content.results} />
      <ClassesSection content={content.classes} />
      <ReviewsSection content={reviews} />
      <CommunitySection content={content.community} />
      <ContactSection content={content.contact} leadForm={content.leadForm} site={content.site} />
      <FaqSection content={content.faq} />
      <FooterSection content={content.footer} site={content.site} />
    </main>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm8.5 1.5h-8.5A4.25 4.25 0 003.5 7.75v8.5a4.25 4.25 0 004.25 4.25h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5A3.5 3.5 0 1015.5 12 3.5 3.5 0 0012 8.5zm5.5-2.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
    </svg>
  );
}

function GoogleBrandIcon() {
  return (
    <svg className={styles.heroGoogleIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
