export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
};

export const PROJECTS_RESOURCE = "Projects";

export const projectsFallback: Project[] = [];

export const projectsPlaceholder: Project[] = [
  {
    // Example project entry — replace with your real projects.
    title: "Example Project",
    description: "A short description of this sample project and its goals.",
    tech: ["React", "TypeScript"],
    link: "https://example.com",
  },
];
