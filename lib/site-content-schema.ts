export type SiteAction =
  | {
      type: "open-modal";
      label: string;
      modalId: string;
    }
  | {
      type: "external-link";
      label: string;
      url: string;
      newTab?: boolean;
    }
  | {
      type: "section-link";
      label: string;
      sectionId: string;
    };

export type SiteContent = {
  [key: string]: unknown;
};
