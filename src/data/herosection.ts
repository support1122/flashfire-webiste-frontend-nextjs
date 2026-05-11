import { HeroSectionData } from "../types/heroSectionData";

const sharedUniversities = [
  { name: "Harvard University", domain: "harvard.edu" },
  { name: "Stanford University", domain: "stanford.edu" },
  { name: "UC Berkeley", domain: "berkeley.edu" },
  { name: "Carnegie Mellon University", domain: "cmu.edu" },
  { name: "University of Michigan", domain: "umich.edu" },
  { name: "Princeton University", domain: "princeton.edu" },
  { name: "Yale University", domain: "yale.edu" },
  { name: "Columbia University", domain: "columbia.edu" },
  { name: "Cornell University", domain: "cornell.edu" },
  { name: "University of Pennsylvania", domain: "upenn.edu" },
  { name: "Duke University", domain: "duke.edu" },
  { name: "Northwestern University", domain: "northwestern.edu" },
  { name: "University of Chicago", domain: "uchicago.edu" },
  { name: "Caltech", domain: "caltech.edu" },
];

const sharedHeroCopy = {
  badges: ["LAND INTERVIEW IN 1 WEEK", "50 USERS LANDED JOB"],
  headlineMain: "Land Interview Calls Faster with",
  headlineHighlight: "Flashfire",
  headlineSuffix: "AI Copilot",
  description:
    "We handle the applications, AI tailors your resume so you can focus on preparing, not applying.",
  cta: { label: "Book a Demo", href: "/contact-us" },
  trustText: "Trusted by 560+ Users",
  universityHeading:
    "Trusted by students and graduates from top global Universities",
  universities: sharedUniversities,
};

export const heroSectionData: HeroSectionData = {
  ...sharedHeroCopy,
};

export const heroSectionDataCA: HeroSectionData = {
  ...sharedHeroCopy,
};
