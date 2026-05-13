export type Certification = {
  name: string;
  issuer: string;
  date: string;
  link?: string;
};

export const CERTIFICATIONS_RESOURCE = "Certifications";

export const certificationsFallback: Certification[] = [
  {
    name: "Web Accessibility Foundations",
    issuer: "W3C",
    date: "2024",
    link: "https://www.w3.org/WAI/fundamentals/",
  },
  {
    name: "Cloud Fundamentals",
    issuer: "Cloud Provider Academy",
    date: "2023",
  },
];

export const certificationsPlaceholder: Certification[] = [
  {
    name: "Unable to load certifications",
    issuer: "Please try again later.",
    date: "—",
  },
];
