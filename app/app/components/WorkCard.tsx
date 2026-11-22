import { FiArrowUpRight } from "react-icons/fi";
import type { WorkItem } from "@/app/types";

interface WorkCardProps {
  item: WorkItem;
  /** サムネイル部分に表示する通し番号に使う */
  index: number;
}

const WorkCard = ({ item, index }: WorkCardProps) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-surface-alt transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
    {/* スクリーンショットが用意できるまでのサムネイル代わり */}
    <div className="relative flex h-44 items-end overflow-hidden bg-gradient-to-br from-card-gradient-start to-card-gradient-end p-5">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-40" />
      <span className="relative font-mono text-5xl font-bold text-white/25 transition-transform duration-300 group-hover:scale-110">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-6">
      <h3 className="m-0 text-[1.0625rem] leading-[1.5] font-bold">{item.title}</h3>
      <p className="m-0 flex-1 text-sm leading-[1.8] text-gray-400">{item.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[0.6875rem] font-medium text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex w-fit items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          GitHubで見る
          <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      ) : (
        <span className="mt-2 text-xs text-gray-500 italic">リンクは追加予定</span>
      )}
    </div>
  </article>
);

export default WorkCard;
