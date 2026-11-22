import type { SkillCategory } from "@/app/types";
import SectionHeading from "@/app/components/SectionHeading";
import SkillRows from "@/app/components/SkillRows";
import RevealObserver from "@/app/components/RevealObserver";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

const SkillsSection = ({ categories }: SkillsSectionProps) => (
  <section id="skills" className="border-y border-line bg-surface-alt py-24">
    <RevealObserver sectionId="skills" />
    <div className="mx-auto max-w-[1080px] px-6 sm:px-8">
      <SectionHeading title="Skills" subtitle="使用技術" />
      {/* 技術の分類を定義リストで示し、各スキルはテキストで表示する */}
      <SkillRows categories={categories} />
    </div>
  </section>
);

export default SkillsSection;
