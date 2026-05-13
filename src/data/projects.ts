export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
};

export const PROJECTS_RESOURCE = "Projects";

export const projectsFallback: Project[] = [
  {
    title: "Portfolio Starter",
    description:
      "A clean portfolio starter with modular sections, localization, and static hosting support.",
    tech: ["Astro", "React", "TypeScript"],
    link: "https://example.com/portfolio-starter",
  },
  {
    title: "Design System Sandbox",
    description:
      "A component playground used to test accessibility, color themes, and interaction patterns.",
    tech: ["Storybook", "Tailwind CSS", "Playwright"],
    link: "https://example.com/design-system",
  },
];

export const projectsPlaceholder: Project[] = [
  {
    // Example project entry — replace with your real projects.
    title: "Example Project",
    description: "A short description of this sample project and its goals.",
    tech: ["React", "TypeScript"],
    link: "https://example.com",
  },
];
