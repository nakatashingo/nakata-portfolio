import type { SkillCategory } from "@/app/types";
import SectionHeading from "@/app/components/SectionHeading";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

const SkillsSection = ({ categories }: SkillsSectionProps) => (
  <section id="skills" className="border-y border-line bg-surface-alt py-24">
    <div className="mx-auto max-w-[1080px] px-6 sm:px-8">
      <SectionHeading title="Skills" subtitle="使用技術" />
      {/* 技術の分類を定義リストで示し、カードではなく行の区切りで整理する */}
      <dl className="m-0 divide-y divide-line">
        {categories.map((category) => (
          <div key={category.label} className="grid gap-4 py-7 first:pt-0 last:pb-0 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
            <dt className="text-[0.9375rem] font-medium text-muted">{category.label}</dt>
            <dd className="m-0 min-w-0">
              <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
                {category.items.map((item) => (
                  <li key={item} className="font-medium">{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default SkillsSection;
