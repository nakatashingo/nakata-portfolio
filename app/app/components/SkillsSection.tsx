import type { SkillCategory } from "@/app/types";
import Reveal from "@/app/components/Reveal";
import SectionHeading from "@/app/components/SectionHeading";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

const SkillsSection = ({ categories }: SkillsSectionProps) => (
  <section id="skills" className="border-y border-white/6 bg-surface-alt px-6 py-24 sm:px-8">
    <div className="mx-auto max-w-[1080px]">
      <SectionHeading index="02" title="Skills" subtitle="使用技術" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {categories.map((category, index) => (
          <Reveal key={category.label} delay={index * 0.08} className="h-full">
            <div className="flex h-full flex-col gap-5 rounded-2xl border border-white/8 bg-background/60 p-7 transition-colors hover:border-accent/40">
              <h3 className="m-0 text-sm font-bold text-gray-300">{category.label}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
