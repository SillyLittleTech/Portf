export const SKILLS_RESOURCE = "Skills";

export const skillsFallback: string[] = [];

const skillIconEntries = [
  ["javascript", "simple-icons:javascript"],
  ["typescript", "simple-icons:typescript"],
  ["react", "simple-icons:react"],
  ["css", "material-symbols:style"],
  ["accessibility", "material-symbols:accessible-rounded"],
  ["testing", "material-symbols:bug-report-rounded"],
  ["design systems", "material-symbols:palette-rounded"],
  ["devops", "material-symbols:cloud-rounded"],
  ["node.js", "simple-icons:node-dot-js"],
  ["postgresql", "simple-icons:postgresql"],
] as const;

const skillIconMap = skillIconEntries.reduce<Record<string, string>>(
  (acc, [label, icon]) => {
    acc[label] = icon;
    return acc;
  },
  {},
);

export function getSkillIcon(label: string): string | undefined {
  return skillIconMap[label.trim().toLowerCase()];
}

export const skillsPlaceholder: string[] = [
  "Unable to load skills",
  "Please refresh to try again",
];
