export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

export const SOCIALS_RESOURCE = "Socials";

export const socialsFallback: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com",
    icon: "mdi:github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "mdi:linkedin",
  },
  {
    id: "website",
    label: "Website",
    href: "https://example.com",
    icon: "mdi:web",
  },
];

export const socialsPlaceholder: SocialLink[] = [
  {
    id: "socials-unavailable",
    label: "Socials unavailable",
    href: "https://example.com/status",
    icon: "mdi:alert-circle-outline",
  },
];
