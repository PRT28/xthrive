type SiteReview = {
  initial: string;
  name: string;
  date: string;
  color: string;
  body: string;
  rating?: number;
  authorUrl?: string;
  profilePhotoUrl?: string;
};

type ReviewsContent = {
  sectionLabel?: string;
  title?: string;
  intro?: string;
  items: SiteReview[];
  googleAction?: {
    type: string;
    label: string;
    url?: string;
    modalId?: string;
    newTab?: boolean;
  };
};

type GooglePlaceReview = {
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: {
    text?: string;
  };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type GooglePlaceDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GooglePlaceReview[];
};

const avatarColors = ["#4A8C8C", "#3D7576", "#111111", "#7A6048", "#6B7280"];

const getInitial = (name: string) => name.trim().charAt(0).toUpperCase() || "G";

const toSiteReview = (review: GooglePlaceReview, index: number): SiteReview | null => {
  const name = review.authorAttribution?.displayName?.trim() || "Google reviewer";
  const body = review.text?.text?.trim();

  if (!body) {
    return null;
  }

  return {
    initial: getInitial(name),
    name,
    date: review.relativePublishTimeDescription || "Google review",
    color: avatarColors[index % avatarColors.length],
    body,
    rating: review.rating,
    authorUrl: review.authorAttribution?.uri,
    profilePhotoUrl: review.authorAttribution?.photoUri,
  };
};

const fetchPlaceIdFromQuery = async (apiKey: string, query: string) => {
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: query }),
    next: { revalidate: 60 * 60 * 24 * 30 },
  });

  if (!response.ok) {
    return "";
  }

  const data = (await response.json()) as { places?: Array<{ id?: string }> };
  return data.places?.[0]?.id || "";
};

export const getGoogleReviews = async (content: ReviewsContent): Promise<ReviewsContent> => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  let placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey) {
    return content;
  }

  if (!placeId && process.env.GOOGLE_PLACE_QUERY) {
    placeId = await fetchPlaceIdFromQuery(apiKey, process.env.GOOGLE_PLACE_QUERY);
  }

  if (!placeId) {
    return content;
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: 60 * 60 * 12 },
    });

    if (!response.ok) {
      return content;
    }

    const place = (await response.json()) as GooglePlaceDetailsResponse;
    const reviews = place.reviews?.map(toSiteReview).filter((review): review is SiteReview => Boolean(review)) || [];

    if (reviews.length === 0) {
      return content;
    }

    const rating = place.rating?.toFixed(1);
    const count = place.userRatingCount;
    const ratingText = rating && count ? `Rated ${rating} ★ on Google · Read all ${count}+ reviews →` : content.googleAction?.label;

    return {
      ...content,
      title: rating ? `Rated ${rating} ★ on Google` : content.title,
      intro: count ? `${count}+ verified reviews from members in HSR Layout, Bengaluru` : content.intro,
      googleAction: place.googleMapsUri
        ? {
            type: "external-link",
            label: ratingText || "Read reviews on Google →",
            url: place.googleMapsUri,
            newTab: true,
          }
        : content.googleAction,
      items: reviews.slice(0, 4),
    };
  } catch {
    return content;
  }
};
