export type EducationEntry = {
  school: string;
  program: string;
  dates: string;
  tech?: string[];
};

export const EDUCATION_RESOURCE = "Education";

export const educationFallback: EducationEntry[] = [
  {
    school: "State University",
    program: "B.S. in Computer Science",
    dates: "2017 — 2021",
    tech: ["Software Engineering", "Databases", "Networks"],
  },
  {
    school: "Open Learning Institute",
    program: "Continuing Education in Product Design",
    dates: "2023 — Present",
    tech: ["Design Systems", "UX Research"],
  },
];

export const educationPlaceholder: EducationEntry[] = [
  {
    school: "Unable to load education timeline",
    program: "We couldn't fetch the most recent education data.",
    dates: "—",
    tech: ["Please try again later"],
  },
];
