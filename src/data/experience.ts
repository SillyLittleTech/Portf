export type ExperienceEntry = {
  company: string;
  role: string;
  dates: string;
  description?: string;
  tech?: string[];
};

export const EXPERIENCE_RESOURCE = "Experience";

export const experienceFallback: ExperienceEntry[] = [
  {
    company: "Example Co.",
    role: "Product Designer",
    dates: "2022 — Present",
    description:
      "Short description of the role and accomplishments with measurable outcomes.",
    tech: ["Figma", "React", "TypeScript"],
  },
  {
    company: "Acme Labs",
    role: "Frontend Engineer",
    dates: "2020 — 2022",
    description:
      "Built and shipped customer-facing features with an emphasis on performance and accessibility.",
    tech: ["React", "Tailwind CSS", "Playwright"],
  },
];

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
