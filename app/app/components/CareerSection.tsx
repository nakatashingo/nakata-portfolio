import type { CareerEntry } from "@/app/types";
import Reveal from "@/app/components/Reveal";

interface CareerSectionProps {
  entries: CareerEntry[];
}

// 学歴/その他活動でタイムラインのドットの色を軽く差別化する
const DOT_COLOR: Record<CareerEntry["category"], string> = {
  education: "bg-accent",
  activity: "bg-white/70",
};

const CareerSection = ({ entries }: CareerSectionProps) => (
  <section id="career" className="px-8 py-22">
    <div className="mx-auto max-w-[720px]">
      <Reveal>
        <h1 className="m-0 mb-2 text-center text-3xl font-extrabold tracking-[-0.02em]">経歴</h1>
        <p className="m-0 mb-12 text-center text-[0.9375rem] text-gray-400">学歴・活動</p>
      </Reveal>
      <Reveal delay={0.1}>
        {/*
          各<li>の border-l を隙間なく縦に積むことで、1本の連続したタイムライン線に見せている。
          最後の項目だけ border-transparent + pb-0 にして、線と余白が最後のドットで止まるようにする。
        */}
        <ol className="flex list-none flex-col">
          {entries.map((entry, index) => {
            const isLast = index === entries.length - 1;
            return (
              <li
                key={entry.id}
                className={`relative border-l-2 py-1 pl-8 ${isLast ? "border-transparent pb-0" : "border-white/15 pb-10"}`}
              >
                <span
                  className={`absolute top-1.5 left-[-5px] h-3 w-3 rounded-full ${DOT_COLOR[entry.category]}`}
                />
                <time className="block text-[0.8125rem] text-gray-500">{entry.period}</time>
                <h3 className="m-0 mt-1 text-[1.0625rem] font-bold">{entry.title}</h3>
                {entry.description && (
                  <p className="m-0 mt-1 text-[0.9375rem] leading-[1.7] text-gray-300">
                    {entry.description}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </Reveal>
    </div>
  </section>
);

export default CareerSection;
