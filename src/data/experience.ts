export type ExperienceEntry = {
  company: string;
  role: string;
  dates: string;
  description?: string;
  tech?: string[];
};

export const EXPERIENCE_RESOURCE = "Experience";

export const experienceFallback: ExperienceEntry[] = [];

export const experiencePlaceholder: ExperienceEntry[] = [
  {
    // Template placeholder entry. Replace with your own roles/companies.
    company: "Example Co.",
    role: "Product Designer",
    dates: "2022 — Present",
    description: "Short description of the role and accomplishments.",
    tech: ["Figma", "React", "TypeScript"],
  },
];
