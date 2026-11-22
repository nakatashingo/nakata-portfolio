import type { ActivityEntry } from "@/app/types";
import Reveal from "@/app/components/Reveal";
import SectionHeading from "@/app/components/SectionHeading";

interface ActivitiesSectionProps {
  entries: ActivityEntry[];
}

// 学歴/その他活動でタイムラインのドットとラベルを軽く差別化する
const CATEGORY_STYLE: Record<ActivityEntry["category"], { dot: string; label: string }> = {
  education: { dot: "bg-accent shadow-[0_0_0_4px_rgba(18,168,156,0.2)]", label: "Education" },
  activity: { dot: "bg-gray-300 shadow-[0_0_0_4px_rgba(255,255,255,0.08)]", label: "Activity" },
};

const ActivitiesSection = ({ entries }: ActivitiesSectionProps) => (
  <section id="activities" className="px-6 py-24 sm:px-8">
    <div className="mx-auto max-w-[1080px]">
      <SectionHeading index="01" title="Activities" subtitle="学歴・活動" />
      {/*
        各<li>の border-l を隙間なく縦に積むことで、1本の連続したタイムライン線に見せている。
        最後の項目だけ border-transparent + pb-0 にして、線と余白が最後のドットで止まるようにする。
      */}
      <ol className="flex max-w-[760px] list-none flex-col">
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;
          const style = CATEGORY_STYLE[entry.category];
          return (
            <li
              key={entry.id}
              className={`relative border-l py-0.5 pl-8 ${isLast ? "border-transparent pb-0" : "border-white/12 pb-10"}`}
            >
              <span className={`absolute top-2 left-[-6px] h-[11px] w-[11px] rounded-full ${style.dot}`} />
              <Reveal delay={index * 0.05}>
                <div className="flex flex-wrap items-center gap-3">
                  <time className="font-mono text-[0.8125rem] text-accent">{entry.period}</time>
                  <span className="rounded border border-white/10 px-1.5 py-px font-mono text-[0.625rem] tracking-wider text-gray-500 uppercase">
                    {style.label}
                  </span>
                </div>
                <h3 className="m-0 mt-2 text-[1.0625rem] leading-[1.6] font-bold">{entry.title}</h3>
                {entry.description && (
                  <p className="m-0 mt-2 text-sm leading-[1.8] text-gray-400">{entry.description}</p>
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default ActivitiesSection;
