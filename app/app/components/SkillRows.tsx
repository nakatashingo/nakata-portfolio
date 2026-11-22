import type { SkillCategory } from "@/app/types";

interface SkillRowsProps {
  categories: SkillCategory[];
}

const SkillRows = ({ categories }: SkillRowsProps) => (
  <dl className="m-0 divide-y divide-line">
    {categories.map((category) => (
      <div key={category.label} data-reveal className="skill-row relative grid gap-4 py-7 first:pt-0 last:pb-0 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
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
);

export default SkillRows;
