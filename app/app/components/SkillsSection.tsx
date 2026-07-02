import type { SkillCategory } from "@/app/types";
import Reveal from "@/app/components/Reveal";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

const SkillsSection = ({ categories }: SkillsSectionProps) => (
  <section id="skills" className="bg-surface-alt px-8 py-22">
    <Reveal className="mx-auto flex max-w-[1080px] flex-col items-center">
      <div className="flex w-full flex-col items-center rounded-2xl bg-surface px-14 py-12 shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
        <h1 className="m-0 mb-2 text-3xl font-extrabold tracking-[-0.02em]">Skills</h1>
        <p className="m-0 mb-12 text-[0.9375rem] text-gray-400">使用技術</p>

        <div className="flex w-full flex-wrap justify-center gap-14">
          {categories.map((category) => (
            <div key={category.label} className="flex min-w-55 flex-col gap-4">
              <h3 className="m-0 text-xs font-bold tracking-wide text-gray-400 uppercase">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-background px-3.5 py-1.5 text-sm font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  </section>
);

export default SkillsSection;
