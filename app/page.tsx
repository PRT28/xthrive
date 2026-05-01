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
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Xthrive HSR Layout?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Xthrive is a strength and conditioning gym in HSR Layout, Bengaluru, built around coached group classes, functional fitness programming, calisthenics, Olympic weightlifting, and long-term athlete development. We've trained members in HSR for over 6 years, from complete beginners to competitive lifters.",
      },
    },
    {
      "@type": "Question",
      name: "Is Xthrive good for complete beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Most of our members started with zero gym experience. Every class at Xthrive HSR Layout is coached from start to finish, every movement is scaled to your current ability, and you'll never be thrown into a workout without a proper briefing.",
      },
    },
    {
      "@type": "Question",
      name: "Is functional fitness the same as CrossFit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Functional fitness is the training methodology. CrossFit is the brand that popularised it. At Xthrive, we use functional fitness principles, calisthenics, and barbell strength with our own programming philosophy built around long-term athlete development.",
      },
    },
    {
      "@type": "Question",
      name: "What happens in a typical functional fitness class?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical class runs 60 minutes and has four parts: a structured warm-up, a skill or strength segment (barbell work, calisthenics, or gymnastics), a conditioning workout, and a brief cool-down. The coach leads the entire session.",
      },
    },
    {
      "@type": "Question",
      name: "How is Xthrive different from a regular gym?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At a regular gym, you're on your own, with no programming, no accountability, and often no one to correct your form. Xthrive provides structured programming, daily coaching, and a community that keeps you showing up.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Xthrive HSR cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Memberships at Xthrive HSR Layout are priced in line with other premium strength and conditioning gyms in Bengaluru, with monthly, quarterly, half-yearly, and annual options covering functional fitness, calisthenics, Olympic weightlifting, and more. WhatsApp us for current pricing.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer a free trial class at Xthrive HSR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer free trial classes at Xthrive HSR Layout. Book your free trial through WhatsApp or the form on this page. You'll train alongside regular members and get a genuine feel for the programming, community, and coaching quality.",
      },
    },
    {
      "@type": "Question",
      name: "What should I bring to my first class?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wear comfortable training clothes and flat-soled shoes. Bring a water bottle and a small towel. All equipment is provided, including barbells, plates, pull-up rigs, gymnastic rings, and kettlebells. Arrive 10 minutes before class for a quick briefing.",
      },
    },
    {
      "@type": "Question",
      name: "Can I train at Xthrive if I have an injury or health condition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with the right precautions. Our coaches are trained to scale and modify movements around most common injuries, and many members train with pre-existing conditions across functional fitness and strength training. Talk to us before your first session.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to train with a disc bulge or back issue?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with the right setup. For members dealing with disc bulges or spinal conditions, we recommend an in-house consultation with our top-notch physiotherapist. We then build a training program tailored around your specific condition. Many HSR Layout members started with disc bulges and now train pain-free.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide nutrition guidance at Xthrive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide active on-floor nutrition guidance as part of every membership at Xthrive HSR Layout. Our coaches walk members through eating for strength, fat loss, recovery, and performance, with practical advice tailored to Indian food and your goals.",
      },
    },
    {
      "@type": "Question",
      name: "Is Xthrive women-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Roughly half of our members in HSR Layout are women, training across every class we offer, from Olympic weightlifting to calisthenics to functional fitness. Our coaching team includes experienced female coaches.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer calisthenics classes at Xthrive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Calisthenics is a core part of Xthrive's programming, woven into functional fitness classes and offered as dedicated skill work for pull-ups, muscle-ups, handstands, dips, and front levers. All sessions run inside our HSR Layout gym on dedicated rigs and rings.",
      },
    },
    {
      "@type": "Question",
      name: "What are the class timings at Xthrive HSR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Xthrive HSR Layout runs multiple class slots daily, including early morning (6 AM and 7 AM), evening (5 PM through 9 PM), and dedicated weekend sessions. Classes rotate across functional fitness, Olympic weightlifting, strength and conditioning, weight training, endurance, and calisthenics.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Xthrive HSR located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Xthrive HSR is at 4th Floor, No. 446, 17th Cross Road, above HDFC Bank, Sector 4, HSR Layout, Bengaluru, Karnataka 560102. Easily accessible from main HSR Layout roads and close to Koramangala and Bellandur.",
      },
    },
  ],
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
