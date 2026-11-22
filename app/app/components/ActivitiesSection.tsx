import type { ActivityEntry } from "@/app/types";
import Timeline from "@/app/components/Timeline";
import SectionHeading from "@/app/components/SectionHeading";

interface ActivitiesSectionProps {
  entries: ActivityEntry[];
}

// 塗りと輪郭の違いを凡例と共有し、色だけに頼らずカテゴリを伝える
const CATEGORY_DOT: Record<ActivityEntry["category"], string> = {
  education: "border-accent bg-accent",
  activity: "border-muted bg-background",
};

const ActivitiesSection = ({ entries }: ActivitiesSectionProps) => (
  <section id="activities" className="py-24">
    <div className="mx-auto max-w-[1080px] px-6 sm:px-8">
      <SectionHeading title="Activities" subtitle="学歴・活動" />
      <ul className="m-0 mb-8 flex list-none flex-wrap gap-6 p-0 text-[0.8125rem] text-muted">
        <li className="flex items-center gap-2">
          <span aria-hidden className={`h-[11px] w-[11px] rounded-full border-2 ${CATEGORY_DOT.education}`} />
          学歴
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className={`h-[11px] w-[11px] rounded-full border-2 ${CATEGORY_DOT.activity}`} />
          活動
        </li>
      </ul>
      {/* 最後の項目だけ線を透明にし、連続したタイムラインを最後のドットで止める */}
      <Timeline>
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;
          return (
            <li
              key={entry.id}
              className={`relative border-l py-0.5 pl-8 ${isLast ? "border-transparent pb-0" : "border-line pb-10"}`}
            >
              <span aria-hidden data-timeline-dot className={`timeline-dot absolute top-2 left-[-6px] h-[11px] w-[11px] rounded-full border-2 ${CATEGORY_DOT[entry.category]}`} />
              <span className="sr-only">{entry.category === "education" ? "学歴" : "活動"}</span>
              <time className="text-[0.8125rem] text-accent-text tabular-nums">{entry.period}</time>
              <h3 className="m-0 mt-2 text-xl leading-[1.6] font-bold">{entry.title}</h3>
              {entry.description && (
                <p className="m-0 mt-2 max-w-[36em] text-[0.9375rem] leading-[1.9] text-muted">{entry.description}</p>
              )}
            </li>
          );
        })}
      </Timeline>
    </div>
  </section>
);

export default ActivitiesSection;
