import type { SkillCategory } from "@/app/types";

export const skillCategories: SkillCategory[] = [
  {
    label: "言語",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "Go", "Python", "C#"],
  },
  {
    label: "フレームワーク / ライブラリ",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Zustand"],
  },
  {
    label: "ツール",
    items: ["Git", "GitHub", "Docker"],
  },
];
